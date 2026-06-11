import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dob: { type: Date, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    height: { type: Number, required: true }, // in cm
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },

    // Professional / Financial
    undergraduateCollege: { type: String },
    degree: { type: String },
    currentCompany: { type: String },
    designation: { type: String },
    income: { type: Number, required: true }, // Annual INR

    // Social / Family Culture
    maritalStatus: { 
      type: String, 
      enum: ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'], 
      required: true 
    },
    languagesKnown: [{ type: String }],
    siblings: { type: Number, default: 0 },
    caste: { type: String },
    religion: { type: String, required: true },
    
    // Additional Indian Matchmaking Fields
    diet: { type: String, enum: ['Veg', 'Non-Veg', 'Eggetarian', 'Jain'], default: 'Veg' },
    horoscopeMatch: { type: Boolean, default: false },
    manglikStatus: { type: String, enum: ['Manglik', 'Non-Manglik', 'Anshik Manglik'], default: 'Non-Manglik' },

    // Preferences & Lifestyle
    wantKids: { type: String, enum: ['Yes', 'No', 'Maybe'], required: true },
    openToRelocate: { type: String, enum: ['Yes', 'No', 'Maybe'], required: true },
    openToPets: { type: String, enum: ['Yes', 'No', 'Maybe'], required: true },

    // System Fields
    status: { 
      type: String, 
      enum: ['Onboarding', 'Verified', 'Searching', 'Matches Sent', 'In-Pool', 'Matched', 'In Talks', 'Closed'], 
      default: 'In-Pool' 
    },
    assignedMatchmaker: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    },
    notes: { type: String },
    lastActivity: { type: Date, default: Date.now },
    matchHistory: [
      {
        matchedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
        matchedAt: { type: Date, default: Date.now },
        score: { type: Number },
        reason: { type: String },
        isMock: { type: Boolean, default: false }
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
