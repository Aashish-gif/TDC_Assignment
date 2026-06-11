'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Bell, LogOut, Users, CheckCircle, Send, X } from 'lucide-react'
import CustomerTable from '@/components/CustomerTable'

interface Matchmaker {
  id: string
  name: string
  username: string
  assignedClients: string[]
}

export default function DashboardPage() {
  const [matchmaker, setMatchmaker] = useState<Matchmaker | null>(null)
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [genderFilter, setGenderFilter] = useState('All')
  const [stageFilter, setStageFilter] = useState('All')
  const router = useRouter()

  // Fetch clients function
  const fetchClients = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/api/customers')
      const data = await response.json()
      setClients(data)
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedMatchmaker = localStorage.getItem('tdc_matchmaker')
    if (!storedMatchmaker) {
      router.push('/login')
      return
    }

    const parsed = JSON.parse(storedMatchmaker) as Matchmaker
    setMatchmaker(parsed)

    fetchClients()
  }, [router])

  // Handle refresh when returning from customer view
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === '/dashboard') {
        fetchClients()
      }
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('tdc_matchmaker')
    router.push('/login')
  }

  if (!matchmaker || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F4' }}>
        <div style={{ color: '#A89E9A' }}>Loading...</div>
      </div>
    )
  }

  // Filter clients
  let filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesGender = genderFilter === 'All' || client.gender === genderFilter
    const matchesStage = stageFilter === 'All' || client.stage === stageFilter

    return matchesSearch && matchesGender && matchesStage
  })

  // Calculate stats with status mapping
  const totalClients = clients.length
  const verifiedProfiles = clients.filter((c) => 
    c.status === 'Verified' || c.stage === 'Verified'
  ).length
  const matchesSent = clients.filter((c) => 
    c.status === 'Matches Sent' || c.stage === 'Matches Sent' || c.status === 'Matched'
  ).length
  const closed = clients.filter((c) => 
    c.status === 'Closed' || c.stage === 'Closed'
  ).length

  const getTodayDate = () => {
    return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FDF6F0' }}>
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
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold" style={{ color: '#6B1F2A' }}>
              The Date Crew Matchmaker
            </span>
            <span style={{ color: '#C9963E' }}>♥</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium" style={{ color: '#6B1F2A' }}>
              {matchmaker.name}
            </span>
            <Bell size={20} style={{ color: '#6B1F2A' }} className="cursor-pointer" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                color: '#6B1F2A',
                backgroundColor: '#FEF3EA',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FEF3EA'
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Greeting Banner */}
      <div
        className="border-b"
        style={{
          backgroundColor: '#FEF3EA',
          borderColor: '#EDE4DC',
          padding: '20px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <div className="font-serif text-2xl font-bold" style={{ color: '#6B1F2A' }}>
              Good morning, {matchmaker.name.split(' ')[0]} ✦
            </div>
            <div className="text-sm mt-1" style={{ color: '#A89E9A' }}>
              You have {filteredClients.length} clients in your portfolio
            </div>
          </div>
          <div className="text-sm font-medium" style={{ color: '#A89E9A' }}>
            {getTodayDate()}
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div
        className="overflow-hidden border-b"
        style={{
          backgroundColor: '#F5EAE0',
          borderColor: '#EDE4DC',
          padding: '12px 0',
        }}
      >
        <div className="marquee-ticker whitespace-nowrap">
          <span
            style={{
              fontSize: '11px',
              color: '#A89E9A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: '500',
              display: 'inline-block',
              paddingRight: '40px',
            }}
          >
            ✦ 1000+ Successful Matches · 85% Success Rate · 18+ Countries · 4.9/5 Client Satisfaction · India&apos;s #1 Matchmakers ·
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#A89E9A',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: '500',
              display: 'inline-block',
              paddingRight: '40px',
            }}
          >
            ✦ 1000+ Successful Matches · 85% Success Rate · 18+ Countries · 4.9/5 Client Satisfaction · India&apos;s #1 Matchmakers ·
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold" style={{ color: '#6B1F2A' }}>
              My Clients
            </h1>
            <span
              className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold text-white rounded-full"
              style={{ backgroundColor: '#6B1F2A' }}
            >
              {filteredClients.length}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Clients"
            value={totalClients}
            icon={Users}
            borderColor="#6B1F2A"
          />
          <StatCard
            label="Verified Profiles"
            value={verifiedProfiles}
            icon={CheckCircle}
            borderColor="#C9963E"
          />
          <StatCard
            label="Matches Sent"
            value={matchesSent}
            icon={Send}
            borderColor="#4A7C59"
          />
          <StatCard
            label="Closed"
            value={closed}
            icon={X}
            borderColor="#888"
          />
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search
              size={18}
              style={{ color: '#A89E9A' }}
              className="absolute left-3 top-3"
            />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none transition-all"
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
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-all appearance-none pr-8 bg-white"
              style={{
                borderColor: '#EDE4DC',
                color: '#1A1A1A',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B1F2A' d='M1 4l5 4 5-4'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#6B1F2A'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#EDE4DC'
              }}
            >
              <option value="All">Filter by Gender: All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="px-4 py-2.5 border rounded-lg text-sm focus:outline-none transition-all appearance-none pr-8 bg-white"
              style={{
                borderColor: '#EDE4DC',
                color: '#1A1A1A',
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B1F2A' d='M1 4l5 4 5-4'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#6B1F2A'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#EDE4DC'
              }}
            >
              <option value="All">Filter by Stage: All</option>
              <option value="Onboarding">Onboarding</option>
              <option value="Verified">Verified</option>
              <option value="Searching">Searching</option>
              <option value="In-Pool">In-Pool</option>
              <option value="Matches Sent">Matches Sent</option>
              <option value="In Talks">In Talks</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Customer Table */}
        <CustomerTable clients={filteredClients} />
      </div>
    </div>
  )
}

interface IconProps {
  size?: number
  style?: React.CSSProperties
}

function StatCard({
  label,
  value,
  icon: Icon,
  borderColor,
}: {
  label: string
  value: number
  icon: React.ComponentType<IconProps>
  borderColor: string
}) {
  return (
    <div
      className="bg-white rounded-lg p-6 border"
      style={{
        borderColor: '#EDE4DC',
        boxShadow: '0 2px 8px rgba(107, 31, 42, 0.06)',
        borderLeft: `3px solid ${borderColor}`,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium" style={{ color: '#A89E9A' }}>
            {label}
          </p>
          <p className="font-serif text-4xl font-bold mt-2" style={{ color: '#1A1A1A' }}>
            {value}
          </p>
        </div>
        <Icon size={24} style={{ color: borderColor }} />
      </div>
    </div>
  )
}
