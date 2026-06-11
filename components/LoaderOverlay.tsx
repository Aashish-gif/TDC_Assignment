'use client'

import { useState, useEffect } from 'react'

export default function LoaderOverlay() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="loader-container fixed inset-0 flex items-center justify-center bg-[#FDF8F4] z-[9999]">
      <div className="text-center flex flex-col items-center">
        <div className="loader-text font-serif text-5xl text-[#6B1F2A]">
          TDC
        </div>
        <div className="loader-line mt-4 h-px bg-[#C9963E]" />
        <div className="loader-heart mt-4 text-xl text-[#C9963E]">
          ♥
        </div>
        <div className="loader-subtitle mt-4 text-xs uppercase tracking-widest text-[#6B1F2A]">
          Matchmaker Portal
        </div>
      </div>
    </div>
  )
}
