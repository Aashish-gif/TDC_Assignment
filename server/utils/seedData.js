import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const indianCities = ['Bangalore', 'Mumbai', 'Delhi-NCR', 'Hyderabad', 'Pune', 'Chennai'];
const castes = ['Brahmin', 'Kshatriya', 'Vaishya', 'Kayastha', 'Maratha', 'Patel'];
const religions = ['Hindu', 'Sikh', 'Jain', 'Christian', 'Muslim'];
const degrees = ['B.Tech', 'MBBS', 'B.Com', 'MBA', 'M.Tech', 'PhD'];
const companies = ['Google', 'TCS', 'Infosys', 'Microsoft', 'Amazon', 'Reliance', 'HDFC'];
const designations = ['Software Engineer', 'Product Manager', 'Doctor', 'Analyst', 'Marketing Lead', 'Consultant'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomIncome = () => Math.floor(Math.random() * (5000000 - 600000 + 1)) + 600000;
const getRandomHeight = (gender) => {
  if (gender === 'Male') return Math.floor(Math.random() * (190 - 165 + 1)) + 165;
  return Math.floor(Math.random() * (175 - 150 + 1)) + 150;
};
const getRandomDOB = (minAge, maxAge) => {
  const year = new Date().getFullYear() - (Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge);
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
};

export const seedDatabase = async () => {
  try {
    const customerCount = await Customer.countDocuments();
    if (customerCount > 0) {
      console.log('Database already seeded.');
      return;
    }

    // Create a default matchmaker user
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

    const customers = [];
    const firstNamesMale = ['Arav', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ishaan', 'Aarav', 'Advait', 'Kabir', 'Aryan'];
    const firstNamesFemale = ['Aaradhya', 'Ananya', 'Diya', 'Ishani', 'Myra', 'Navya', 'Pari', 'Saanvi', 'Zoya', 'Kyra'];
    const lastNames = ['Sharma', 'Verma', 'Gupta', 'Iyer', 'Patel', 'Reddy', 'Singh', 'Kapoor', 'Mehta', 'Nair'];

    for (let i = 0; i < 100; i++) {
      const gender = i < 50 ? 'Male' : 'Female';
      const firstName = gender === 'Male' ? getRandom(firstNamesMale) : getRandom(firstNamesFemale);
      const lastName = getRandom(lastNames);
      
      customers.push({
        firstName,
        lastName,
        gender,
        dob: getRandomDOB(22, 35),
        country: 'India',
        city: getRandom(indianCities),
        height: getRandomHeight(gender),
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
        phoneNumber: `+91${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        undergraduateCollege: 'IIT ' + getRandom(['Delhi', 'Bombay', 'Madras', 'Kanpur']),
        degree: getRandom(degrees),
        currentCompany: getRandom(companies),
        designation: getRandom(designations),
        income: getRandomIncome(),
        maritalStatus: 'Never Married',
        languagesKnown: ['English', 'Hindi', getRandom(['Marathi', 'Tamil', 'Telugu', 'Bengali'])],
        siblings: Math.floor(Math.random() * 3),
        caste: getRandom(castes),
        religion: getRandom(religions),
        diet: getRandom(['Veg', 'Non-Veg', 'Eggetarian', 'Jain']),
        horoscopeMatch: Math.random() > 0.5,
        manglikStatus: getRandom(['Manglik', 'Non-Manglik', 'Anshik Manglik']),
        wantKids: getRandom(['Yes', 'No', 'Maybe']),
        openToRelocate: getRandom(['Yes', 'No', 'Maybe']),
        openToPets: getRandom(['Yes', 'No', 'Maybe']),
        status: getRandom(['Onboarding', 'Verified', 'Searching', 'Matches Sent', 'In-Pool']),
        assignedMatchmaker: i < 50 ? admin1._id : admin2._id,
        notes: 'Interested in finding a compatible partner soon.',
        lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Random last activity in last 7 days
      });
    }

    await Customer.insertMany(customers);
    console.log('Successfully seeded 100 customers!');
  } catch (error) {
    console.error('Seeding Error:', error);
  }
};

// If run directly
if (process.argv[2] === '--run') {
  mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
      await seedDatabase();
      mongoose.connection.close();
    })
    .catch(err => console.error(err));
}
