'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const signIn = useAuthStore((s) => s.signIn)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      router.replace('/home')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
          style={{ backgroundColor: '#7B61FF' }}
        >
          <span className="text-white text-2xl font-bold">₱</span>
        </div>
        <h1 className="text-2xl font-bold text-navy">Finance Tracker</h1>
        <p className="text-sm text-muted mt-1">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-12 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#7B61FF' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-sm text-muted">
          No account?{' '}
          <Link href="/register" className="font-semibold" style={{ color: '#7B61FF' }}>
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}
