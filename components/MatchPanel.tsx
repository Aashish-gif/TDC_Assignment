'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react'
import SendMatchModal from './SendMatchModal'

interface Match {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  designation: string
  company: string
  score: number
  label: string
  factors: { name: string; points: number }[]
}

const SAMPLE_MATCHES: Match[] = [
  {
    id: 'match1',
    firstName: 'Priya',
    lastName: 'Patel',
    age: 27,
    city: 'Bangalore',
    designation: 'Product Manager',
    company: 'Google India',
    score: 92,
    label: 'High Potential Match',
    factors: [
      { name: 'Lifestyle Match', points: 25 },
      { name: 'Values Alignment', points: 22 },
      { name: 'Location Preferences', points: 20 },
      { name: 'Family Goals', points: 15 },
      { name: 'Education Level', points: 10 },
    ],
  },
  {
    id: 'match2',
    firstName: 'Neha',
    lastName: 'Sharma',
    age: 26,
    city: 'Mumbai',
    designation: 'Data Scientist',
    company: 'Microsoft',
    score: 78,
    label: 'Good Fit',
    factors: [
      { name: 'Education Level', points: 20 },
      { name: 'Values Alignment', points: 18 },
      { name: 'Career Ambition', points: 16 },
      { name: 'Location Preferences', points: 14 },
      { name: 'Family Status', points: 10 },
    ],
  },
  {
    id: 'match3',
    firstName: 'Anjali',
    lastName: 'Verma',
    age: 28,
    city: 'Delhi',
    designation: 'Consultant',
    company: 'McKinsey',
    score: 71,
    label: 'Good Fit',
    factors: [
      { name: 'Career Ambition', points: 18 },
      { name: 'Education Level', points: 17 },
      { name: 'Lifestyle Match', points: 15 },
      { name: 'Values Alignment', points: 12 },
      { name: 'Other Factors', points: 9 },
    ],
  },
  {
    id: 'match4',
    firstName: 'Riya',
    lastName: 'Gupta',
    age: 25,
    city: 'Pune',
    designation: 'Software Engineer',
    company: 'Amazon',
    score: 65,
    label: 'Possible Match',
    factors: [
      { name: 'Education Level', points: 15 },
      { name: 'Lifestyle Match', points: 13 },
      { name: 'Other Factors', points: 12 },
      { name: 'Career Ambition', points: 14 },
      { name: 'Values Alignment', points: 11 },
    ],
  },
  {
    id: 'match5',
    firstName: 'Sneha',
    lastName: 'Kulkarni',
    age: 29,
    city: 'Hyderabad',
    designation: 'Designer',
    company: 'Adobe',
    score: 54,
    label: 'Possible Match',
    factors: [
      { name: 'Lifestyle Match', points: 12 },
      { name: 'Other Factors', points: 11 },
      { name: 'Education Level', points: 10 },
      { name: 'Career Ambition', points: 12 },
      { name: 'Location Preferences', points: 9 },
    ],
  },
]

export default function MatchPanel({
  customerId,
  onClose,
}: {
  customerId: string
  onClose: () => void
}) {
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [showModal, setShowModal] = useState(false)

  const getScoreFillColor = (score: number) => {
    if (score >= 80) return '#166534'
    if (score >= 60) return '#B45309'
    return '#888888'
  }

  const getLabelConfig = (label: string) => {
    if (label === 'High Potential Match') {
      return { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' }
    }
    if (label === 'Good Fit') {
      return { bg: '#FDF0D8', text: '#8B6914', border: '#FECB81' }
    }
    return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' }
  }

  const getAvatarRingColor = (label: string) => {
    if (label === 'High Potential Match') return '#166534'
    if (label === 'Good Fit') return '#C9963E'
    return '#888888'
  }

  const handleSendMatch = (match: Match) => {
    setSelectedMatch(match)
    setShowModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Decorative Line */}
      <div className="flex justify-center">
        <div className="h-px w-10" style={{ backgroundColor: '#C9963E' }} />
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onClose}
          className="flex items-center gap-2 transition-colors font-medium"
          style={{ color: '#6B1F2A' }}
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div>
          <h2 className="font-serif text-2xl font-bold" style={{ color: '#6B1F2A' }}>
            ✦ Match Suggestions
          </h2>
          <p className="text-xs italic mt-1" style={{ color: '#A89E9A' }}>
            Curated by compatibility analysis
          </p>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="space-y-4">
        {SAMPLE_MATCHES.map((match) => {
          const isExpanded = expandedMatch === match.id
          const labelConfig = getLabelConfig(match.label)
          const scoreColor = getScoreFillColor(match.score)
          const ringColor = getAvatarRingColor(match.label)

          return (
            <div
              key={match.id}
              className="bg-white border rounded-2xl p-6 transition-all duration-200"
              style={{
                borderColor: '#EDE4DC',
                boxShadow: '0 2px 8px rgba(107, 31, 42, 0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(107, 31, 42, 0.10)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(107, 31, 42, 0.06)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Match Card Header */}
              <div className="flex items-start justify-between gap-4">
                {/* Left: Avatar + Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                      style={{
                        border: `2px solid ${ringColor}`,
                      }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${match.firstName}+${match.lastName}&background=6B1F2A&color=ffffff&size=56`}
                        alt={`${match.firstName} ${match.lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold" style={{ color: '#1A1A1A' }}>
                        {match.firstName} {match.lastName}
                      </h3>
                      <p className="text-sm" style={{ color: '#A89E9A' }}>
                        {match.age} • {match.city}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: '#A89E9A' }}>
                        {match.designation} at {match.company}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center: Score */}
                <div className="flex flex-col items-center gap-3">
                  <div className="text-center">
                    <p className="font-serif text-5xl font-bold" style={{ color: '#6B1F2A' }}>
                      {match.score}
                    </p>
                    <p className="text-sm" style={{ color: '#A89E9A' }}>
                      %
                    </p>
                  </div>
                  <div
                    className="w-24 h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: '#E8D5C4' }}
                  >
                    <div
                      className="h-full transition-all rounded-full"
                      style={{
                        width: `${match.score}%`,
                        backgroundColor: scoreColor,
                      }}
                    />
                  </div>
                </div>

                {/* Right: Label + Button */}
                <div className="flex flex-col gap-3 items-end">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: labelConfig.bg,
                      color: labelConfig.text,
                      borderColor: labelConfig.border,
                    }}
                  >
                    {match.label}
                  </span>
                  <button
                    onClick={() => handleSendMatch(match)}
                    className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full text-sm transition-all"
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
                    Send Introduction
                  </button>
                </div>
              </div>

              {/* Score Details Accordion */}
              <div
                className="mt-4 border-t pt-4"
                style={{ borderColor: '#EDE4DC' }}
              >
                <button
                  onClick={() =>
                    setExpandedMatch(isExpanded ? null : match.id)
                  }
                  className="flex items-center gap-2 text-sm font-medium transition-colors w-full"
                  style={{ color: '#6B1F2A' }}
                >
                  Score Details
                  {isExpanded ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-3 space-y-2">
                    {match.factors.map((factor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm px-2 py-1.5 rounded"
                        style={{
                          backgroundColor: index % 2 === 0 ? '#FDFAF7' : 'transparent',
                        }}
                      >
                        <span style={{ color: '#A89E9A' }}>{factor.name}</span>
                        <span className="font-medium" style={{ color: '#6B1F2A' }}>
                          {factor.points}/{20}
                        </span>
                      </div>
                    ))}
                    <div
                      className="flex items-center justify-between text-sm pt-2 px-2 py-1.5 font-semibold border-t"
                      style={{
                        borderColor: '#EDE4DC',
                        color: '#6B1F2A',
                      }}
                    >
                      <span>Total</span>
                      <span>
                        {match.factors.reduce((sum, f) => sum + f.points, 0)}/100
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Send Match Modal */}
      {showModal && selectedMatch && (
        <SendMatchModal
          match={selectedMatch}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
