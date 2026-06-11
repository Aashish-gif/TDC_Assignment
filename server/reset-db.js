import mongoose from 'mongoose';
import Customer from './models/Customer.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const indianCities = ['Bangalore', 'Mumbai', 'Delhi-NCR', 'Hyderabad', 'Pune', 'Chennai', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Lucknow'];
const castes = ['Brahmin', 'Kshatriya', 'Vaishya', 'Kayastha', 'Maratha', 'Patel', 'Nair', 'Reddy', 'Iyer', 'Gupta'];
const religions = ['Hindu', 'Sikh', 'Jain', 'Christian', 'Muslim'];
const degrees = ['B.Tech', 'MBBS', 'B.Com', 'MBA', 'M.Tech', 'PhD', 'B.A.', 'M.A.', 'CA', 'Law'];
const companies = ['Google', 'TCS', 'Infosys', 'Microsoft', 'Amazon', 'Reliance', 'HDFC', 'Zomato', 'Swiggy', 'Flipkart'];
const designations = ['Software Engineer', 'Product Manager', 'Doctor', 'Analyst', 'Marketing Lead', 'Consultant', 'Designer', 'Scientist', 'Architect', 'Professor'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomIncome = () => Math.floor(Math.random() * (6000000 - 800000 + 1)) + 800000;
const getRandomHeight = (gender) => {
  if (gender === 'Male') return Math.floor(Math.random() * (195 - 165 + 1)) + 165;
  return Math.floor(Math.random() * (180 - 150 + 1)) + 150;
};
const getRandomDOB = (minAge, maxAge) => {
  const year = new Date().getFullYear() - (Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge);
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
};

const resetDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected!');

    console.log('🗑️  Clearing collections...');
    await Customer.deleteMany({});
    await User.deleteMany({});
    
    console.log('👥 Creating Demo Matchmakers...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('tdc123', salt);
    const hashedPassword2 = await bcrypt.hash('tdc456', salt);
    
    const admin1 = await User.create({
      username: 'priya',
      password: hashedPassword1,
      name: 'Priya Sharma'
    });

    const admin2 = await User.create({
      username: 'ananya',
      password: hashedPassword2,
      name: 'Ananya Menon'
    });

    console.log('👩‍❤️‍👨 Seeding 100 Unique Profiles (50 Male, 50 Female)...');
    const customers = [];
    const firstNamesMale = ['Aarav', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ishaan', 'Advait', 'Kabir', 'Aryan', 'Vivaan', 'Rohan', 'Karan', 'Rahul', 'Aditya', 'Sameer'];
    const firstNamesFemale = ['Aaradhya', 'Ananya', 'Diya', 'Ishani', 'Myra', 'Navya', 'Pari', 'Saanvi', 'Zoya', 'Kyra', 'Sneha', 'Meera', 'Pooja', 'Divya', 'Anita'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Iyer', 'Patel', 'Reddy', 'Singh', 'Kapoor', 'Mehta', 'Nair', 'Malhotra', 'Desai', 'Pillai', 'Chatterjee', 'Kulkarni'];

    const statuses = ['Onboarding', 'Verified', 'Searching', 'Matches Sent', 'In-Pool', 'Matched', 'In Talks', 'Closed'];

    for (let i = 0; i < 100; i++) {
      const gender = i < 50 ? 'Male' : 'Female';
      const firstName = gender === 'Male' ? getRandom(firstNamesMale) : getRandom(firstNamesFemale);
      const lastName = getRandom(lastNames);
      
      // Ensure diverse distribution of statuses for stats
      let status;
      if (i < 20) status = 'Verified';
      else if (i < 40) status = 'Matches Sent';
      else if (i < 50) status = 'Closed';
      else status = getRandom(['Searching', 'In-Pool', 'Onboarding']);

      customers.push({
        firstName,
        lastName,
        gender,
        dob: getRandomDOB(22, 38),
        country: 'India',
        city: getRandom(indianCities),
        height: getRandomHeight(gender),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@thecrew.com`,
        phoneNumber: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        undergraduateCollege: 'College of ' + getRandom(['Engineering', 'Commerce', 'Arts', 'Science', 'Law']),
        degree: getRandom(degrees),
        currentCompany: getRandom(companies),
        designation: getRandom(designations),
        income: getRandomIncome(),
        maritalStatus: getRandom(['Never Married', 'Divorced', 'Widowed']),
        languagesKnown: ['English', 'Hindi', getRandom(['Marathi', 'Tamil', 'Telugu', 'Bengali', 'Gujarati'])],
        siblings: Math.floor(Math.random() * 3),
        caste: getRandom(castes),
        religion: getRandom(religions),
        diet: getRandom(['Veg', 'Non-Veg', 'Eggetarian', 'Jain']),
        horoscopeMatch: Math.random() > 0.5,
        manglikStatus: getRandom(['Manglik', 'Non-Manglik', 'Anshik Manglik']),
        wantKids: getRandom(['Yes', 'No', 'Maybe']),
        openToRelocate: getRandom(['Yes', 'No', 'Maybe']),
        openToPets: getRandom(['Yes', 'No', 'Maybe']),
        status: status,
        assignedMatchmaker: i % 2 === 0 ? admin1._id : admin2._id,
        notes: 'Looking for a compatible life partner.',
        lastActivity: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      });
    }

    await Customer.insertMany(customers);

    console.log('--- SEEDING COMPLETE ---');
    console.log(`✅ Total Profiles: 100`);
    console.log(`✅ Verified: ${await Customer.countDocuments({ status: 'Verified' })}`);
    console.log(`✅ Matches Sent: ${await Customer.countDocuments({ status: 'Matches Sent' })}`);
    console.log(`✅ Closed: ${await Customer.countDocuments({ status: 'Closed' })}`);
    console.log(`✅ Demo Login: priya / tdc123`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during reset:', error);
    process.exit(1);
  }
};

resetDatabase();
