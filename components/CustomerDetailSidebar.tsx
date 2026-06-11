'use client'

import { useState } from 'react'
import { Mail, Phone, Cake, MapPin, Sparkles, ChevronLeft } from 'lucide-react'

interface Profile {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  stage: string
  email: string
  phone: string
  bio: string
}

export default function CustomerDetailSidebar({
  profile,
  onGenerateMatches,
  onBackToDashboard,
}: {
  profile: Profile
  onGenerateMatches: () => void
  onBackToDashboard: () => void
}) {
  const [stage, setStage] = useState(profile.stage)

  const handleStageChange = (newStage: string) => {
    setStage(newStage)
    localStorage.setItem(`stage_${profile.id}`, newStage)
  }

  const getAvatarUrl = (firstName: string, lastName: string) => {
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=6B1F2A&color=ffffff&size=80`
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div
        className="bg-white rounded-2xl border p-6 shadow-sm"
        style={{
          borderColor: '#EDE4DC',
          boxShadow: '0 2px 12px rgba(107, 31, 42, 0.06)',
        }}
      >
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div
            className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              border: '2px solid #C9963E',
              padding: '3px',
              backgroundColor: '#6B1F2A',
              color: 'white',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            {profile.firstName.charAt(0)}
            {profile.lastName.charAt(0)}
          </div>
        </div>

        {/* Name and Info */}
        <h2 className="font-serif text-2xl font-bold text-center" style={{ color: '#1A1A1A' }}>
          {profile.firstName} {profile.lastName}
        </h2>

        {/* Age and City with Icons */}
        <div className="text-center mt-2 flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-1" style={{ color: '#A89E9A', fontSize: '14px' }}>
            <Cake size={16} />
            <span>{profile.age} years</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: '#A89E9A', fontSize: '14px' }}>
            <MapPin size={16} />
            <span>{profile.city}</span>
          </div>
        </div>

        {/* Stage Dropdown */}
        <div className="mt-6 pt-6 border-t" style={{ borderColor: '#EDE4DC' }}>
          <label className="block text-xs font-semibold uppercase mb-2" style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}>
            Edit Stage
          </label>
          <select
            value={stage}
            onChange={(e) => handleStageChange(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-all"
            style={{
              borderColor: '#EDE4DC',
              color: '#1A1A1A',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#6B1F2A'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#EDE4DC'
            }}
          >
            <option value="New Lead">New Lead</option>
            <option value="Verified">Verified</option>
            <option value="Matches Sent">Matches Sent</option>
            <option value="In Talks">In Talks</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Contact Info */}
        <div className="mt-6 pt-6 border-t space-y-4" style={{ borderColor: '#EDE4DC' }}>
          <div className="flex items-start gap-3">
            <Mail size={18} style={{ color: '#6B1F2A', flexShrink: 0, marginTop: '2px' }} />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                Email
              </p>
              <p className="text-sm break-all" style={{ color: '#6B1F2A' }}>
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 pt-2 border-t" style={{ borderColor: '#EDE4DC' }}>
            <Phone size={18} style={{ color: '#6B1F2A', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p className="text-xs font-semibold uppercase" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                Phone
              </p>
              <p className="text-sm" style={{ color: '#6B1F2A' }}>
                {profile.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Bio */}
        {profile.bio && (
          <div className="mt-6 pt-6 border-t" style={{ borderColor: '#EDE4DC' }}>
            <p className="text-sm italic" style={{ color: '#A89E9A' }}>
              {profile.bio}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <button
        onClick={onGenerateMatches}
        className="w-full py-3 px-4 text-white font-medium rounded-full flex items-center justify-center gap-2 transition-all"
        style={{
          backgroundColor: '#6B1F2A',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#5a1724'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#6B1F2A'
        }}
      >
        <Sparkles size={18} />
        Generate Matches
      </button>

      <button
        onClick={onBackToDashboard}
        className="w-full py-3 px-4 border-2 font-medium rounded-full flex items-center justify-center gap-2 transition-all"
        style={{
          borderColor: '#EDE4DC',
          color: '#6B6460',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FDF8F4'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
      >
        <ChevronLeft size={18} />
        Back to Dashboard
      </button>
    </div>
  )
}
