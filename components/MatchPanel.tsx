'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, ArrowLeft, Loader2 } from 'lucide-react'
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
  reasoning: string
  introEmail: string
}

export default function MatchPanel({
  customerId,
  onClose,
}: {
  customerId: string
  onClose: () => void
}) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://tdc-assignment-backend.onrender.com/api/matches/${customerId}`)
        const data = await response.json()
        
        // Ensure data is an array
        const matchesArray = Array.isArray(data) ? data : []
        
        // Add label based on score and/or reasoning
        const processedMatches = matchesArray.map(match => {
          let label = 'Possible Match'
          
          // Try to extract label from reasoning first
          if (match.reasoning) {
            if (match.reasoning.includes('High Potential')) label = 'High Potential Match'
            else if (match.reasoning.includes('Good Fit') || match.reasoning.includes('Strong')) label = 'Good Fit'
          } else {
            // Fallback to score-based labeling
            if (match.score >= 80) label = 'High Potential Match'
            else if (match.score >= 70) label = 'Good Fit'
          }
          
          return { ...match, label }
        })
        
        setMatches(processedMatches)
      } catch (error) {
        console.error('Error fetching matches:', error)
        setMatches([])
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [customerId])

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
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-rose-500" />
            <p className="font-medium">AI is evaluating 100+ profiles...</p>
            <p className="text-sm">Calculating cultural and lifestyle compatibility</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">No matches found for this criteria yet.</p>
          </div>
        ) : (
          matches.map((match) => {
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
                    >
                      Send Introduction
                    </button>
                  </div>
                </div>

                {/* AI Explanation Accordion */}
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
                    AI Compatibility Analysis
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-4">
                      <div className="bg-[#FDFAF7] p-4 rounded-xl border border-[#EDE4DC]">
                        <p className="text-sm leading-relaxed" style={{ color: '#4A4A4A' }}>
                          <span className="font-bold text-[#6B1F2A] block mb-1">Why this match?</span>
                          {match.reasoning}
                        </p>
                      </div>
                      
                      <div className="bg-[#F5EAE0] p-4 rounded-xl border border-[#EDE4DC]">
                        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#A89E9A' }}>
                          Personalized Introduction Email
                        </p>
                        <div className="text-sm italic whitespace-pre-wrap" style={{ color: '#6B1F2A' }}>
                          &quot;{match.introEmail}&quot;
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
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
