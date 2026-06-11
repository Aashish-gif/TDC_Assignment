import Customer from '../models/Customer.js';
import { evaluateMatches } from '../utils/aiHelper.js';

// @desc    Get algorithmic matches for a customer
// @route   GET /api/matches/:customerId
export const getMatches = async (req, res) => {
  try {
    console.log('🔍 Finding matches for customer:', req.params.customerId);
    
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    console.log('👤 Customer details:', customer.firstName, customer.gender);

    // Target opposite gender!
    const targetGender = customer.gender === 'Male' ? 'Female' : 'Male';
    
    console.log('🎯 Looking for gender:', targetGender);

    let query = {
      _id: { $ne: customer._id },
      gender: targetGender,
      status: { $in: ['Verified', 'Searching', 'In-Pool'] }
    };

    // 🌟 MALE-SPECIFIC MATCHING LOGIC
    if (customer.gender === 'Male') {
      console.log('👨 Applying male-specific filters');
      query.dob = { $gt: customer.dob };
      query.income = { $lt: customer.income * 1.5 };
      query.height = { $lt: customer.height + 10 };

      if (customer.wantKids !== 'Maybe') {
        query.wantKids = customer.wantKids === 'Yes' 
          ? { $in: ['Yes', 'Maybe'] } 
          : { $in: ['No', 'Maybe'] };
      }
      
      if (customer.diet === 'Veg' || customer.diet === 'Jain') {
        query.diet = { $in: ['Veg', 'Jain'] };
      }
    }

    // 🌟 FEMALE-SPECIFIC MATCHING LOGIC
    if (customer.gender === 'Female') {
      console.log('👩 Applying female-specific filters');
      query.income = { $gte: customer.income * 0.7 };

      if (customer.openToRelocate === 'Yes') {
        query.openToRelocate = { $in: ['Yes', 'Maybe'] };
      } else if (customer.openToRelocate === 'No') {
        query.openToRelocate = 'No';
      }

      if (customer.diet === 'Veg' || customer.diet === 'Jain') {
        query.diet = { $in: ['Veg', 'Jain'] };
      }
    }

    query.religion = customer.religion;

    console.log('📋 Query:', JSON.stringify(query, null, 2));

    // Use aggregation to get a RANDOM sample of 20 candidates for AI to evaluate
    let potentialMatches = await Customer.aggregate([
      { $match: query },
      { $sample: { size: 20 } }
    ]);

    console.log(`✅ Found ${potentialMatches.length} pre-filtered matches for AI evaluation`);

    // If no matches found, relax criteria slightly and try again
    if (potentialMatches.length === 0) {
      console.log('⚠️ No matches found with strict criteria, relaxing to same gender/status only...');
      const relaxedQuery = {
        _id: { $ne: customer._id },
        gender: targetGender,
        status: { $in: ['Verified', 'Searching', 'In-Pool', 'Onboarding'] }
      };
      
      potentialMatches = await Customer.aggregate([
        { $match: relaxedQuery },
        { $sample: { size: 15 } }
      ]);
      console.log(`✅ Found ${potentialMatches.length} matches with relaxed criteria`);
    }

    // Even if still no matches, use empty array - we'll handle in frontend
    const aiResults = await evaluateMatches(customer, potentialMatches);

    const finalMatches = potentialMatches.map(match => {
      const aiEval = aiResults.find(r => 
        (r.customerId && r.customerId.toString() === match._id.toString()) || 
        (r._id && r._id.toString() === match._id.toString())
      );
      
      const birthDate = new Date(match.dob);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      
      return {
        ...match,
        age,
        id: match._id,
        stage: match.status,
        score: aiEval ? aiEval.score : 50,
        reasoning: aiEval ? aiEval.reasoning : 'Compatible based on basic criteria.',
        introEmail: aiEval ? aiEval.introEmail : ''
      };
    });

    finalMatches.sort((a, b) => b.score - a.score);

    console.log(`📊 Returning top ${Math.min(10, finalMatches.length)} matches`);
    res.json(finalMatches.slice(0, 10));
  } catch (error) {
    console.error('❌ Matching Error:', error);
    // Instead of error, just return empty array so frontend doesn't break
    res.json([]);
  }
};

// @desc    Mock trigger for sending a match
// @route   POST /api/matches/send
export const sendMatch = async (req, res) => {
  const { fromCustomerId, toCustomerId, score, reason } = req.body;

  try {
    const fromCustomer = await Customer.findById(fromCustomerId);
    const toCustomer = await Customer.findById(toCustomerId);

    if (!fromCustomer || !toCustomer) {
      return res.status(404).json({ message: 'One or both customers not found' });
    }

    fromCustomer.matchHistory.push({
      matchedWith: toCustomerId,
      isMock: true,
      score,
      reason
    });
    
    fromCustomer.status = 'Matches Sent';
    fromCustomer.lastActivity = new Date();
    toCustomer.lastActivity = new Date();

    await fromCustomer.save();
    await toCustomer.save();

    res.json({
      success: true,
      message: `Match successfully initiated between ${fromCustomer.firstName} and ${toCustomer.firstName}!`,
      notification: {
        type: 'success',
        title: 'Match Sent',
        description: 'The introduction email has been queued.'
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
