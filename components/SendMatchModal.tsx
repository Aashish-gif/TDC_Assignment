'use client'

import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'

interface Match {
  firstName: string
  lastName: string
  age: number
  city: string
  designation: string
  company: string
}

export default function SendMatchModal({
  match,
  onClose,
}: {
  match: Match
  onClose: () => void
}) {
  const [message, setMessage] = useState(
    `Dear [Name], We're excited to share a potential match with you. ${match.firstName} ${match.lastName}, ${match.age}, from ${match.city} works as a ${match.designation}. Based on shared values and life goals, we believe this could be a meaningful connection. Please review their profile and let us know your thoughts. Warm regards, The Date Crew Team`
  )
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)

  const handleCopyMessage = async () => {
    await navigator.clipboard.writeText(message)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMock = () => {
    setSent(true)
    setTimeout(() => {
      onClose()
    }, 2000)
  }

  if (sent) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div className="bg-white rounded-2xl p-8 max-w-sm text-center shadow-2xl">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#DCFCE7' }}
          >
            <Check size={24} style={{ color: '#166534' }} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: '#6B1F2A' }}>
            Match Introduction Sent!
          </h3>
          <p className="text-sm" style={{ color: '#A89E9A' }}>
            The introduction message has been successfully sent to both parties.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: '#EDE4DC' }}>
          <h2 className="font-serif text-xl font-bold" style={{ color: '#6B1F2A' }}>
            Send Introduction
          </h2>
          <button
            onClick={onClose}
            className="p-1 transition-colors"
            style={{ color: '#A89E9A' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Profile Summaries */}
          <div className="flex items-center justify-between gap-4">
            <div
              className="flex-1 rounded-lg p-4 border"
              style={{
                backgroundColor: '#FDFAF7',
                borderColor: '#EDE4DC',
              }}
            >
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                Your Client
              </p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>
                Rahul Mehta
              </p>
              <p className="text-sm" style={{ color: '#A89E9A' }}>
                29, Mumbai
              </p>
              <p className="text-sm" style={{ color: '#A89E9A' }}>
                Senior Software Engineer
              </p>
            </div>

            <div className="text-2xl" style={{ color: '#C9963E' }}>
              ♥
            </div>

            <div
              className="flex-1 rounded-lg p-4 border"
              style={{
                backgroundColor: '#FDFAF7',
                borderColor: '#EDE4DC',
              }}
            >
              <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#A89E9A', letterSpacing: '0.05em' }}>
                Match
              </p>
              <p className="font-semibold" style={{ color: '#1A1A1A' }}>
                {match.firstName} {match.lastName}
              </p>
              <p className="text-sm" style={{ color: '#A89E9A' }}>
                {match.age}, {match.city}
              </p>
              <p className="text-sm" style={{ color: '#A89E9A' }}>
                {match.designation}
              </p>
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#6B1F2A' }}>
              Introduction Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none transition-all resize-none"
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
            />
            <p className="text-xs mt-2" style={{ color: '#A89E9A' }}>
              Feel free to customize the message before sending.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full font-medium border transition-all"
              style={{
                borderColor: '#EDE4DC',
                color: '#6B1F2A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FDF8F4'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleCopyMessage}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-medium border transition-all"
              style={{
                borderColor: '#EDE4DC',
                color: '#6B1F2A',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FDF8F4'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Message'}
            </button>

            <button
              onClick={handleSendMock}
              className="flex items-center gap-2 px-4 py-2 text-white font-medium rounded-full transition-all"
              style={{ backgroundColor: '#6B1F2A' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#5a1724'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#6B1F2A'
              }}
            >
              <span>Send (Mock)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
