'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

const MATCHMAKERS = [
  {
    id: 'm1',
    username: 'priya',
    password: 'tdc123',
    name: 'Priya Sharma',
    assignedClients: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10'],
  },
  {
    id: 'm2',
    username: 'ananya',
    password: 'tdc456',
    name: 'Ananya Menon',
    assignedClients: ['c11', 'c12', 'c13', 'c14', 'c15', 'c16', 'c17', 'c18', 'c19', 'c20'],
  },
]

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    const matchmaker = MATCHMAKERS.find(
      (m) => m.username === username && m.password === password
    )

    if (matchmaker) {
      localStorage.setItem('tdc_matchmaker', JSON.stringify(matchmaker))
      router.push('/dashboard')
    } else {
      setError('Invalid credentials. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background: 'radial-gradient(ellipse at center, #FDF8F4 0%, #E8D5C4 100%)',
      }}
    >
      <div className="w-full max-w-[420px]">
        {/* Card */}
        <div
          className="bg-white rounded-lg border p-12"
          style={{
            borderColor: '#EDE4DC',
            boxShadow: '0 8px 40px rgba(107, 31, 42, 0.10)',
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="font-serif text-3xl font-bold" style={{ color: '#6B1F2A' }}>
              TDC Matchmaker
            </span>
            <span className="text-2xl" style={{ color: '#C9963E' }}>
              ♥
            </span>
          </div>

          {/* Decorative Line */}
          <div className="flex justify-center mb-6">
            <div
              className="h-px"
              style={{ width: '60px', backgroundColor: '#C9963E' }}
            />
          </div>

          {/* Subtitle */}
          <p
            className="text-center text-xs uppercase tracking-wider mb-8"
            style={{ color: '#A89E9A', letterSpacing: '0.15em' }}
          >
            Matchmaker Portal
          </p>

          {/* Welcome Message */}
          <h2 className="font-serif text-lg text-center mb-8" style={{ color: '#6B1F2A' }}>
            Welcome back
          </h2>

          {/* Error Banner */}
          {error && (
            <div
              className="mb-6 p-4 rounded-lg text-sm text-white text-center animate-in fade-in slide-in-from-top-2"
              style={{ backgroundColor: '#C0392B' }}
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: '#6B1F2A' }}>
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="priya or ananya"
                className="w-full px-4 py-3 border rounded-lg transition-all focus:outline-none"
                style={{
                  borderColor: '#EDE4DC',
                  color: '#1A1A1A',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#6B1F2A'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 31, 42, 0.08)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#EDE4DC'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#6B1F2A' }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border rounded-lg transition-all focus:outline-none pr-10"
                  style={{
                    borderColor: '#EDE4DC',
                    color: '#1A1A1A',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6B1F2A'
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(107, 31, 42, 0.08)'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#EDE4DC'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 transition-colors"
                  style={{ color: '#6B1F2A' }}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-white font-medium rounded-full transition-all duration-200 mt-8"
              style={{
                backgroundColor: isLoading ? '#5a1724' : '#6B1F2A',
                letterSpacing: '0.05em',
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#5a1724'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#6B1F2A'
                }
              }}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials Pill */}
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setShowDemo(!showDemo)}
              className="px-3 py-1 rounded-full border text-xs transition-colors"
              style={{
                borderColor: '#EDE4DC',
                color: '#A89E9A',
                backgroundColor: showDemo ? '#FEF3EA' : 'transparent',
              }}
            >
              Demo credentials
            </button>
          </div>

          {showDemo && (
            <div className="mt-4 p-3 rounded-lg text-xs text-center" style={{ backgroundColor: '#FDFAF7', color: '#6B1F2A' }}>
              <div className="font-medium mb-1">Test Accounts:</div>
              <div>priya / tdc123</div>
              <div>ananya / tdc456</div>
            </div>
          )}

          {/* Footer Text */}
          <p className="text-center text-xs mt-6" style={{ color: '#A89E9A' }}>
            For internal use only · The Date Crew
          </p>
        </div>
      </div>
    </div>
  )
}
