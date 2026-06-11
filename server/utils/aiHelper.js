import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    responseMimeType: "application/json",
    temperature: 0.8, 
    maxOutputTokens: 8192,
    topP: 0.9,
    topK: 40
  }
});

/**
 * Evaluates compatibility between primary customer and potential matches using Google Gemini AI.
 */
export const evaluateMatches = async (primaryCustomer, potentialMatches) => {
  if (!potentialMatches || !potentialMatches.length) return [];

  // Calculate proper age for primary customer
  const primaryAge = new Date().getFullYear() - new Date(primaryCustomer.dob).getFullYear();
  const primaryCustomerForAI = {
    ...primaryCustomer,
    age: primaryAge
  };

  // Format potential matches with ages
  const formattedPotentialMatches = potentialMatches.map(match => {
    const age = new Date().getFullYear() - new Date(match.dob).getFullYear();
    return { ...match, age };
  });

  // 🎯 GENDER-SPECIFIC INSTRUCTIONS
  const genderSpecificInstructions = primaryCustomer.gender === 'Male' 
    ? `FOR MALE CUSTOMER: 
  - TOP PRIORITY: Younger female candidates
  - Income: Lower or similar to primary customer
  - Height: Shorter than or similar to primary customer
  - Children preference must match or align
  - CRITICAL: Cultural compatibility: same religion, caste consideration, vegetarian/non-vegetarian compatibility
  - Higher score for same city, similar background`
    : `FOR FEMALE CUSTOMER:
  - TOP PRIORITY: Professional compatibility, stable income
  - Relocation preference alignment
  - Same cultural/religious background
  - Family-oriented values
  - Higher score for similar education/professional field, compatible lifestyle`;

  const prompt = `
    # 🧡 THE DATE CREW - ELITE INDIAN MATRIMONIAL MATCHMAKER

    ## ROLE
    You are a seasoned Indian matrimonial matchmaker with exceptional cultural insight.

    ## PRIMARY CUSTOMER
    ${JSON.stringify(primaryCustomerForAI, null, 2)}

    ## POTENTIAL MATCHES TO EVALUATE
    ${JSON.stringify(formattedPotentialMatches, null, 2)}

    ## INSTRUCTIONS
    ${genderSpecificInstructions}

    ## FOR EACH CANDIDATE, GENERATE THESE 4 THINGS:
    1. customerId: Use the candidate's _id (from the data)
    2. score: Realistic compatibility 0-100
    3. reasoning: 2-3 detailed sentences, include specific labels like "High Potential Match"
    4. introEmail: 3-4 line warm, personalized email from matchmaker to primary customer

    ## CRITICAL RULES
    - STRICT VALID JSON ONLY
    - SCORE GUIDELINES:
      - 80-90: Exceptional match, strong cultural/lifestyle alignment
      - 70-79: Good match, many compatible factors
      - 60-69: Fair match, some compatibility
      - 50-59: Basic match only
    - NO scores 95-100 (unrealistic)
    - Label reasoning with phrases like "High Potential Match" or "Strong Value Alignment"
    - Intro emails must mention both names, profession, and city
    - No repetition of exact same reasoning
    - Reference specific data points from profiles

    ## REQUIRED OUTPUT FORMAT
    {"results":[{"customerId":"66...","score":82,"reasoning":"High Potential Match: Both are Hindu Brahmin from Bangalore, vegetarian, and want children. Both are in tech industry with similar income levels, great cultural alignment.","introEmail":"Hi PRIMNAME,\nI'm thrilled to share an amazing match! MATCHFIRSTNAME MATCHLASTNAME is a MATCHAGE-year-old MATCHDESIGNATION from MATCHCITY with wonderful family values. I truly believe you two would connect wonderfully.\nWarm regards,\nThe Date Crew Team"}]}
  `;

  try {
    console.log('🤖 Sending to Gemini AI for matching...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse response
    let parsed;
    try {
      parsed = JSON.parse(text.trim());
    } catch (jsonErr) {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw jsonErr;
      }
    }

    const results = parsed.results || parsed.matches || [];
    console.log(`✅ AI evaluated ${results.length} matches!`);
    
    return results;
  } catch (error) {
    console.error('❌ Gemini AI Error:', error.message);
    
    // FALLBACK: Smart fallback scoring when AI fails
    return formattedPotentialMatches.map(match => {
      let score = 50;
      let reasoning = "Basic compatibility match";
      
      // Add points for cultural alignment
      if (match.religion === primaryCustomer.religion) { score += 15; reasoning = "Religious compatibility"; }
      if (match.city === primaryCustomer.city) { score += 10; }
      if (match.wantKids !== 'Maybe' && match.wantKids === primaryCustomer.wantKids) { score += 10; }
      
      const introEmail = `Hi ${primaryCustomerForAI.firstName},\nI'm excited to share a potential match for you! ${match.firstName} ${match.lastName} is a ${match.age}-year-old ${match.designation || 'professional'} from ${match.city}.\nBest,\nThe Date Crew Team`;
      
      return {
        customerId: match._id,
        score: Math.min(score, 90),
        reasoning,
        introEmail
      };
    });
  }
};

