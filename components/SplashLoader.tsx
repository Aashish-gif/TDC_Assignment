'use client'

import { useState, useEffect } from 'react'

export default function SplashLoader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="splash-container fixed inset-0 z-9999 flex items-center justify-center"
      style={{ backgroundColor: '#FDF8F4' }}
    >
      <div className="text-center flex flex-col items-center">
        {/* TDC Text */}
        <div
          className="splash-text font-serif font-bold"
          style={{
            fontSize: '52px',
            color: '#6B1F2A',
          }}
        >
          TDC
        </div>

        {/* Gold Line */}
        <div
          className="splash-line mt-4"
          style={{
            height: '2px',
            backgroundColor: '#C9963E',
          }}
        />

        {/* Gold Heart */}
        <div
          className="splash-heart mt-4 text-3xl"
          style={{ color: '#C9963E' }}
        >
          ♥
        </div>

        {/* Subtitle */}
        <div
          className="splash-subtitle mt-3"
          style={{
            fontSize: '11px',
            color: '#6B1F2A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: '500',
          }}
        >
          The Date Crew
        </div>
      </div>
    </div>
  )
}
