'use client'

import { useState } from 'react'
import {
  User,
  Briefcase,
  Heart,
  Users,
  FileText,
  Cake,
  Ruler,
  Cross,
  Languages,
  Utensils,
  Palette,
  MapPin,
  GraduationCap,
  Building2,
  MapPinCheck,
  PawPrint,
  Baby,
  Zap,
  Users2,
  BookOpen,
} from 'lucide-react'

interface Profile {
  // Personal
  firstName: string
  lastName: string
  age: number
  gender: string
  dateOfBirth: string
  height: string
  religion: string
  caste: string
  gotra: string
  motherTongue: string
  languagesKnown: string
  manglik: string
  dietaryPreference: string
  complexion: string
  nativePlace: string

  // Professional
  undergraduateCollege: string
  degree: string
  currentCompany: string
  designation: string
  annualIncome: string

  // Preferences
  wantKids: string
  openToRelocate: string
  openToPets: string
  horoscopePreference: string
  familyTypePreference: string
  idealPartnerNotes: string

  // Family
  numberOfSiblings: string
  familyStatus: string
  parentsOccupation: string
}

export default function TabsSection({ profile }: { profile: Profile }) {
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'professional', label: 'Professional', icon: Briefcase },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'family', label: 'Family', icon: Users },
  ]

  return (
    <div className="bg-white rounded-2xl border p-6" style={{ borderColor: '#EDE4DC' }}>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b" style={{ borderColor: '#EDE4DC' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative"
              style={{
                color: isActive ? '#6B1F2A' : '#A89E9A',
              }}
            >
              <Icon size={16} />
              {tab.label}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#6B1F2A' }}
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'personal' && (
          <>
            <InfoPill icon={Cake} label="Date of Birth" value={profile.dateOfBirth} />
            <InfoPill icon={FileText} label="Gender" value={profile.gender} />
            <InfoPill icon={Ruler} label="Height" value={profile.height} />
            <InfoPill icon={Cross} label="Religion" value={profile.religion} />
            <InfoPill icon={Cross} label="Caste" value={profile.caste} />
            <InfoPill icon={BookOpen} label="Gotra" value={profile.gotra} />
            <InfoPill icon={Languages} label="Mother Tongue" value={profile.motherTongue} />
            <InfoPill icon={Languages} label="Languages" value={profile.languagesKnown} />
            <InfoPill icon={Zap} label="Manglik" value={profile.manglik} isManglik={true} />
            <InfoPill icon={Utensils} label="Diet" value={profile.dietaryPreference} />
            <InfoPill icon={Palette} label="Complexion" value={profile.complexion} />
            <InfoPill icon={MapPin} label="Native Place" value={profile.nativePlace} />
          </>
        )}

        {activeTab === 'professional' && (
          <>
            <InfoPill icon={GraduationCap} label="College" value={profile.undergraduateCollege} />
            <InfoPill icon={GraduationCap} label="Degree" value={profile.degree} />
            <InfoPill icon={Building2} label="Company" value={profile.currentCompany} />
            <InfoPill icon={Briefcase} label="Designation" value={profile.designation} />
            <InfoPill
              icon={FileText}
              label="Annual Income"
              value={`₹${profile.annualIncome}`}
            />
          </>
        )}

        {activeTab === 'preferences' && (
          <>
            <InfoPill icon={Baby} label="Want Kids" value={profile.wantKids} />
            <InfoPill icon={MapPinCheck} label="Open to Relocate" value={profile.openToRelocate} />
            <InfoPill icon={PawPrint} label="Open to Pets" value={profile.openToPets} />
            <InfoPill
              icon={BookOpen}
              label="Horoscope Preference"
              value={profile.horoscopePreference}
            />
            <InfoPill icon={Users2} label="Family Type" value={profile.familyTypePreference} />
            <div className="md:col-span-2">
              <div className="rounded-lg p-4 border" style={{ backgroundColor: '#FDFAF7', borderColor: '#F0E8E0' }}>
                <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                  Ideal Partner Notes
                </p>
                <p className="text-sm" style={{ color: '#1A1A1A' }}>
                  {profile.idealPartnerNotes}
                </p>
              </div>
            </div>
          </>
        )}

        {activeTab === 'family' && (
          <>
            <InfoPill icon={Users} label="Siblings" value={profile.numberOfSiblings} />
            <InfoPill icon={Users2} label="Family Status" value={profile.familyStatus} />
            <div className="md:col-span-2">
              <div className="rounded-lg p-4 border" style={{ backgroundColor: '#FDFAF7', borderColor: '#F0E8E0' }}>
                <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                  Parents Occupation
                </p>
                <p className="text-sm" style={{ color: '#1A1A1A' }}>
                  {profile.parentsOccupation}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function InfoPill({
  icon: Icon,
  label,
  value,
  isManglik = false,
}: {
  icon: React.ElementType
  label: string
  value: string
  isManglik?: boolean
}) {
  const isNonManglik = isManglik && value === 'No'
  const isManglikYes = isManglik && value === 'Yes'

  if (isManglik && (isNonManglik || isManglikYes)) {
    return (
      <div className="rounded-lg p-4 border" style={{ backgroundColor: '#FDFAF7', borderColor: '#F0E8E0' }}>
        <div className="flex items-start gap-3">
          <Icon size={18} style={{ color: '#6B1F2A', marginTop: '2px', flexShrink: 0 }} />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
              {label}
            </p>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: isNonManglik ? '#DCFCE7' : '#FEE2E2',
                color: isNonManglik ? '#166534' : '#991B1B',
              }}
            >
              {isNonManglik ? 'Non-Manglik' : 'Manglik'}
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg p-4 border" style={{ backgroundColor: '#FDFAF7', borderColor: '#F0E8E0' }}>
      <div className="flex items-start gap-3">
        <Icon size={18} style={{ color: '#6B1F2A', marginTop: '2px', flexShrink: 0 }} />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
            {label}
          </p>
          <p className="text-sm mt-1" style={{ color: '#1A1A1A' }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  )
}
