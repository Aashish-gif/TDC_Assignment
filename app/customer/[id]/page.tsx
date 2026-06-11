'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
  Mail,
  Phone,
  ArrowLeft,
  Save,
  Zap,
  FileText,
  Heart,
  Users,
  Briefcase,
  Heart as HeartIcon,
} from 'lucide-react'
import CustomerDetailSidebar from '@/components/CustomerDetailSidebar'
import TabsSection from '@/components/TabsSection'
import NotesSection from '@/components/NotesSection'
import MatchPanel from '@/components/MatchPanel'

// Hardcoded profile for Rahul Mehta (c1)
const CUSTOMER_PROFILE = {
  id: 'c1',
  firstName: 'Rahul',
  lastName: 'Mehta',
  age: 29,
  city: 'Mumbai',
  gender: 'Male',
  maritalStatus: 'Never Married',
  stage: 'Verified',
  lastActivity: '1 day ago',
  email: 'rahul.mehta@email.com',
  phone: '+91-98765-43210',
  bio: 'Passionate about building scalable solutions and exploring new technologies. Loves traveling and photography.',

  // Personal Tab
  dateOfBirth: '15 Mar 1995',
  height: '5\'10"',
  religion: 'Hindu',
  caste: 'Brahmin',
  gotra: 'Bharadwaj',
  motherTongue: 'Hindi',
  languagesKnown: 'Hindi, English, Gujarati',
  manglik: 'No',
  dietaryPreference: 'Vegetarian',
  complexion: 'Fair',
  nativePlace: 'Mumbai',

  // Professional Tab
  undergraduateCollege: 'IIT Mumbai',
  degree: 'B.Tech Computer Science',
  currentCompany: 'TechCorp India',
  designation: 'Senior Software Engineer',
  annualIncome: '18 LPA',

  // Preferences Tab
  wantKids: 'Maybe',
  openToRelocate: 'Yes',
  openToPets: 'No',
  horoscopePreference: 'Matching not required',
  familyTypePreference: 'Nuclear',
  idealPartnerNotes:
    'Looking for someone who values family, enjoys adventures, and has a good sense of humor.',

  // Family Tab
  numberOfSiblings: '1 (Sister)',
  familyStatus: 'Upper Middle Class',
  parentsOccupation: 'Father: Business | Mother: Homemaker',
}

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showMatches, setShowMatches] = useState(false)
  const customerId = params.id as string

  const handleGenerateMatches = () => {
    setShowMatches(true)
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF8F4' }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-sm"
        style={{
          borderColor: '#EDE4DC',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left */}
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 transition-colors"
            style={{ color: '#6B1F2A' }}
          >
            <span className="font-serif text-xl font-bold" style={{ color: '#6B1F2A' }}>
              TDC Matchmaker
            </span>
            <span style={{ color: '#C9963E' }}>♥</span>
          </button>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                color: '#6B1F2A',
                backgroundColor: '#FEF3EA',
              }}
            >
              <ArrowLeft size={16} />
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - 30% */}
          <div className="lg:col-span-1">
            <CustomerDetailSidebar
              profile={CUSTOMER_PROFILE}
              onGenerateMatches={handleGenerateMatches}
              onBackToDashboard={handleBackToDashboard}
            />
          </div>

          {/* Right Main Content - 70% */}
          <div className="lg:col-span-2">
            {!showMatches ? (
              <>
                {/* Tabs Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                  <TabsSection profile={CUSTOMER_PROFILE} />
                </div>

                {/* Notes Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                  <NotesSection customerId={customerId} />
                </div>

                {/* Match Suggestions Placeholder */}
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-lg border border-rose-200 p-8 text-center">
                  <Heart size={40} className="mx-auto mb-4 text-rose-400" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Ready to Find Matches?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Click "Generate Matches" in the sidebar to see compatibility suggestions.
                  </p>
                </div>
              </>
            ) : (
              <MatchPanel customerId={customerId} onClose={() => setShowMatches(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
