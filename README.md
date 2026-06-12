<div align="center">

<img src="https://img.shields.io/badge/TDC-Matchmaker%20Portal-6B1F2A?style=for-the-badge&logoColor=white" alt="TDC Matchmaker"/>

# ✦ TDC Matchmaker Portal

### Internal CRM for The Date Crew — India's #1 Premium Matrimonial Matchmaking Company

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-6B1F2A?style=for-the-badge)](https://tdc-assignment-two.vercel.app/)
[![Demo Video](https://img.shields.io/badge/Demo%20Video-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/920NaO0eHPw?si=Aw-mZIDDHSeIL5Ac)
[![API Docs](https://img.shields.io/badge/API%20Docs-Postman-FF6C37?style=for-the-badge&logo=postman)](https://documenter.getpostman.com/view/39216526/2sBXwsLphs)
[![GitHub](https://img.shields.io/badge/Repo-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/Aashish-gif/TDC_Assignment)

</div>



## ✦ Overview

The **TDC Matchmaker Portal** is a full-stack internal CRM built for professional matchmakers at [The Date Crew](https://www.thedatecrew.com/). It helps them manage clients, track matchmaking journeys, run AI-powered compatibility analysis, and send personalised introductions — all from one premium, branded dashboard.

Built as part of a Full Stack Developer Internship assignment, the portal covers the complete matchmaking workflow from lead intake to successful match closure.

---

## 🎬 Demo Video

> Click the thumbnail below to watch the full walkthrough

[![Demo Video](https://img.shields.io/badge/▶%20Watch%20Demo-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/920NaO0eHPw?si=Aw-mZIDDHSeIL5Ac)

---

## 🌐 Live Site

> **[https://tdc-assignment-two.vercel.app/](https://tdc-assignment-two.vercel.app/)**

---

## ✨ Features

### 🔒 Authentication
- JWT-based secure login for matchmakers
- Protected routes with middleware
- bcrypt password hashing
- Auto-redirect on session expiry

### 📊 Matchmaker Dashboard
- Personalised greeting with real-time date
- 4 stat cards — Total Clients, Verified, Matches Sent, Closed
- Full client table with journey stage badges
- Real-time search by name
- Filter by gender and stage

### 👤 Client Profile View
- Complete Indian matrimonial biodata across 4 tabs:
  - **Personal** — DOB, religion, caste, gotra, manglik status, diet, languages
  - **Professional** — College, degree, company, designation, income
  - **Preferences** — Kids, relocation, pets, horoscope, family type
  - **Family** — Siblings, family status, native place
- Journey stage management (update inline)
- Matchmaker notes with timestamps (persisted in DB)

### 🤝 AI-Powered Match Generation
- Gender-specific compatibility algorithm built from scratch
- **For male clients** — weights age gap, height, income alignment, kids preference
- **For female clients** — weights profession compatibility, income, relocation, values
- Compatibility score out of 100 with full breakdown per factor
- AI label — High Potential / Good Fit / Possible Match
- Gemini AI-generated explanation for top matches (specific, not generic)

### 💌 Introduction System
- Send Introduction modal with both profiles side by side
- Gemini AI drafts a personalised intro email with compatibility points
- Editable before sending
- Match status updates automatically on send

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes (Serverless) |
| Database | MongoDB Atlas |
| AI | Google Gemini 1.5 Flash |
| Authentication | JWT + bcryptjs |
| Hosting | Vercel |

---

## 📡 API Documentation

Full Postman documentation with all endpoints, request/response examples:

> **[View API Docs on Postman](https://documenter.getpostman.com/view/39216526/2sBXwsLphs)**

### Endpoints Summary

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Matchmaker login | ❌ |
| GET | `/api/auth/me` | Get current matchmaker | ✅ |
| GET | `/api/profiles` | Get assigned clients | ✅ |
| GET | `/api/profiles/:id` | Get single profile | ✅ |
| PATCH | `/api/profiles/:id/stage` | Update journey stage | ✅ |
| POST | `/api/matches/generate` | Generate AI matches | ✅ |
| POST | `/api/matches/intro-email` | Generate intro email | ✅ |
| GET | `/api/notes/:profileId` | Get client notes | ✅ |
| POST | `/api/notes/:profileId` | Add note | ✅ |

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- Google Gemini API key (free at aistudio.google.com)

### Setup

```bash
# 1. Clone the repo
git clone YOUR_GITHUB_REPO_LINK_HERE
cd tdc-matchmaker

# 2. Install dependencies
npm install

# 3. Create .env.local
cp .env.example .env.local
# Fill in your MONGODB_URI, JWT_SECRET, GEMINI_API_KEY

# 4. Seed the database
node seed/seed.js

# 5. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with `priya / tdc123`

### Environment Variables

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🧠 Matching Algorithm

### Male Client Matching
Scores female candidates on:
| Factor | Max Points |
|---|---|
| Want Kids alignment | 20 |
| Age compatibility | 20 |
| Religion match | 15 |
| Height compatibility | 15 |
| Income alignment | 15 |
| Caste match | 10 |
| Relocation compatibility | 10 |
| Manglik compatibility | 10 |
| Dietary preference | 5 |

### Female Client Matching
Scores male candidates on:
| Factor | Max Points |
|---|---|
| Want Kids alignment | 20 |
| Income compatibility | 20 |
| Education level | 15 |
| Relocation flexibility | 15 |
| Religion match | 15 |
| Family type | 10 |
| Language overlap | 10 |
| Manglik compatibility | 5 |
| Dietary preference | 5 |

---

## 🗂️ Project Structure

```
tdc-matchmaker/
├── app/
│   ├── login/page.jsx
│   ├── dashboard/page.jsx
│   ├── customer/[id]/page.jsx
│   └── api/
│       ├── auth/login/route.js
│       ├── profiles/route.js
│       ├── matches/generate/route.js
│       ├── matches/intro-email/route.js
│       └── notes/[profileId]/route.js
├── lib/
│   ├── db.js
│   ├── auth.js
│   ├── matchingEngine.js
│   └── gemini.js
├── models/
│   ├── Profile.js
│   ├── Matchmaker.js
│   ├── Note.js
│   └── Match.js
├── components/
│   ├── Navbar.jsx
│   ├── MatchPanel.jsx
│   ├── IntroModal.jsx
│   └── Loader.jsx
└── seed/seed.js
```

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary (Burgundy) | `#6B1F2A` |
| Gold Accent | `#C9963E` |
| Background (Cream) | `#FDF8F4` |
| Card Background | `#FFFFFF` |
| Border | `#EDE4DC` |
| Heading Font | Georgia / Playfair Display (serif) |
| Body Font | Inter |

Designed to match [The Date Crew](https://www.thedatecrew.com/) brand identity — warm, premium, editorial.

---

## 📬 Submission

Built for the **Full Stack Developer Internship Assignment** at [The Date Crew](https://www.thedatecrew.com/).

Submitted to: tech@thedatecrew.com

---

<div align="center">

Made with ♥ for The Date Crew

</div>
