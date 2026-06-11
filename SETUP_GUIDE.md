# The Date Crew - Matchmaker MVP Setup Guide

## 🚀 QUICK START IN 5 STEPS

### 1. INSTALL DEPENDENCIES
#### Frontend (Root Directory):
```bash
cd "c:\Users\TAJ\Desktop\TDC_Assignment"
npm install
```
#### Backend (Server Directory):
```bash
cd server
npm install
```

---

### 2. CONFIGURE .ENV (IMPORTANT!)
Create a file named `.env` in the **server** folder (copy from .env.example and update):
```env
PORT=5000
MONGO_URI=mongodb+srv://TDC:zDSbMx4RJZNUEbCn@tdc.mnoec4u.mongodb.net/?appName=TDC
JWT_SECRET=your_jwt_secret_here (any string is fine for demo)
GEMINI_API_KEY=ENTER_YOUR_GEMINI_API_KEY_HERE (GET FROM aistudio.google.com)
NODE_ENV=development
```

---

### 3. RESET & SEED DATABASE WITH 100 PROFILES!
First, reset completely to ensure diversity:
```bash
cd server
node reset-db.js
```
This creates **Priya/Admin** and **Ananya/Manager** demo accounts + 100 unique profiles (50 male, 50 female)!

---

### 4. START THE SERVERS!
#### Backend:
```bash
cd server
npm run dev
```
#### Frontend: (NEW TERMINAL)
```bash
cd "c:\Users\TAJ\Desktop\TDC_Assignment"
npm run dev
```

---

### 5. TEST THE POSTMAN COLLECTION!
1. Open **Postman**
2. Click Import > Drag & Drop `THE_DATE_CREW_POSTMAN_COLLECTION.json`
3. Start with Auth > Login as Priya
4. Replace placeholders with real Customer IDs!
5. **Get Matches** to see AI in action!

---

## 🎯 HOW TO VERIFY GENDER-SPECIFIC MATCHING IS WORKING
- Get a male customer ID and generate matches - should see FEMALE matches only!
- Get a female customer ID and generate matches - should see MALE matches only!
- AI provides:
  - ✅ **Score + Rank with "High Potential Match" style explanations
  - ✅ Personalized intro emails
  - ✅ Cultural/reasoning for each profile!

---

## 🎯 ACCOUNTS FOR TESTING
| Username | Password | Name | Role |
| --- | --- | --- | --- |
| priya | tdc123 | Priya Sharma | Admin |
| ananya | tdc456 | Ananya Menon | Manager |

---

## 📁 WHAT YOU GET:
- `PROJECT_WRITEUP.txt`: Detailed project explanation
- `THE_DATE_CREW_POSTMAN_COLLECTION.json`: Full backend API
- `/server/`: Complete Node.js backend with Gemini AI
- `/app/`: Complete Next.js frontend!
