const PRODUCTION_API_URL = 'https://tdc-assignment-backend.onrender.com'
const LOCAL_API_URL = 'http://localhost:5000'

export function getApiUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')
  }

  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return LOCAL_API_URL
  }

  return PRODUCTION_API_URL
}
