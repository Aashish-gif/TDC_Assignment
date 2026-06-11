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

export default function CustomerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showMatches, setShowMatches] = useState(false)
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const customerId = params.id as string

  // Fetch customer data
  const fetchCustomer = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/customers/${customerId}`)
      const data = await response.json()
      setCustomer(data)
    } catch (error) {
      console.error('Error fetching customer:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (customerId) {
      fetchCustomer()
    }
  }, [customerId])

  // Handle customer update
  const handleUpdateCustomer = async (updates: any) => {
    try {
      setUpdating(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      const response = await fetch(`${apiUrl}/api/customers/${customerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (response.ok) {
        await fetchCustomer() // Refresh data
      }
    } catch (error) {
      console.error('Error updating customer:', error)
    } finally {
      setUpdating(false)
    }
  }

  const handleGenerateMatches = () => {
    setShowMatches(true)
  }

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F4' }}>
        <div style={{ color: '#A89E9A' }}>Loading profile...</div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#FDF8F4' }}>
        <div className="text-center">
          <p style={{ color: '#6B1F2A' }} className="mb-4">Profile not found</p>
          <button onClick={handleBackToDashboard} className="text-sm underline">Back to Dashboard</button>
        </div>
      </div>
    )
  }

  // Map backend data to frontend UI structure
  const profile = {
    ...customer,
    dateOfBirth: new Date(customer.dob).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    annualIncome: `${(customer.income / 100000).toFixed(0)} LPA`,
    dietaryPreference: customer.diet,
    numberOfSiblings: customer.siblings,
    manglik: customer.manglikStatus,
    horoscopePreference: customer.horoscopeMatch ? 'Required' : 'Not required'
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
              The Date Crew Matchmaker
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
              profile={profile}
              onGenerateMatches={handleGenerateMatches}
              onBackToDashboard={handleBackToDashboard}
              onUpdate={handleUpdateCustomer}
            />
          </div>

          {/* Right Main Content - 70% */}
          <div className="lg:col-span-2">
            {!showMatches ? (
              <>
                {/* Tabs Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                  <TabsSection profile={profile} />
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
                    Click "Generate Matches" in the sidebar to see compatibility suggestions for {profile.firstName}.
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
