'use client'

import { useRouter } from 'next/navigation'

interface Client {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  gender: string
  maritalStatus: string
  stage: string
  lastActivity: string
}

export default function CustomerTable({ clients }: { clients: Client[] }) {
  const router = useRouter()

  const getMaritalStatusBadge = (status: string) => {
    switch (status) {
      case 'Never Married':
        return { bg: '#EBF8FF', text: '#0369A1' }
      case 'Divorced':
        return { bg: '#FEF3C7', text: '#B45309' }
      case 'Widowed':
        return { bg: '#F3F4F6', text: '#6B7280' }
      default:
        return { bg: '#F3F4F6', text: '#6B7280' }
    }
  }

  const getStageBadge = (stage: string) => {
    switch (stage) {
      case 'New Lead':
        return { bg: '#F5EDE4', text: '#6B1F2A' }
      case 'Verified':
        return { bg: '#FDF0D8', text: '#8B6914' }
      case 'Matches Sent':
        return { bg: '#EDE4FE', text: '#5B21B6' }
      case 'In Talks':
        return { bg: '#DCFCE7', text: '#166534' }
      case 'Closed':
        return { bg: '#F1F5F9', text: '#475569' }
      default:
        return { bg: '#F3F4F6', text: '#6B7280' }
    }
  }

  const getAvatarUrl = (firstName: string, lastName: string) => {
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`
  }

  return (
    <div className="bg-white rounded-lg border overflow-hidden shadow-sm" style={{ borderColor: '#EDE4DC' }}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              style={{
                backgroundColor: '#FDF8F4',
                borderColor: '#EDE4DC',
              }}
              className="border-b"
            >
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Name
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Age
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Marital Status
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Stage
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Last Activity
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#6B1F2A', letterSpacing: '0.08em' }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => {
              const maritalBadge = getMaritalStatusBadge(client.maritalStatus)
              const stageBadge = getStageBadge(client.stage)

              return (
                <tr
                  key={client.id}
                  onClick={() => router.push(`/customer/${client.id}`)}
                  className="border-b cursor-pointer transition-colors duration-150"
                  style={{
                    backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FDFAF7',
                    borderColor: '#EDE4DC',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FEF3EA'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#FFFFFF' : '#FDFAF7'
                  }}
                >
                  {/* Avatar + Name + City */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={getAvatarUrl(client.firstName, client.lastName)}
                          alt={`${client.firstName} ${client.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: '#1A1A1A' }}>
                          {client.firstName} {client.lastName}
                        </p>
                        <p className="text-sm" style={{ color: '#A89E9A' }}>
                          {client.city}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Age */}
                  <td className="px-6 py-4" style={{ color: '#6B1F2A' }}>
                    {client.age}
                  </td>

                  {/* Marital Status */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: maritalBadge.bg,
                        color: maritalBadge.text,
                      }}
                    >
                      {client.maritalStatus}
                    </span>
                  </td>

                  {/* Stage */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: stageBadge.bg,
                        color: stageBadge.text,
                      }}
                    >
                      {client.stage}
                    </span>
                  </td>

                  {/* Last Activity */}
                  <td className="px-6 py-4 text-sm" style={{ color: '#A89E9A' }}>
                    {client.lastActivity}
                  </td>

                  {/* Action Button */}
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/customer/${client.id}`)
                      }}
                      className="px-4 py-1.5 rounded-full text-sm font-medium border transition-all"
                      style={{
                        borderColor: '#6B1F2A',
                        color: '#6B1F2A',
                        backgroundColor: 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6B1F2A'
                        e.currentTarget.style.color = '#FFFFFF'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = '#6B1F2A'
                      }}
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {clients.length === 0 && (
        <div className="px-6 py-12 text-center" style={{ color: '#A89E9A' }}>
          <p>No clients found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
