'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const signUp = useAuthStore((s) => s.signUp)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password)
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <span className="material-symbols-rounded text-[64px]" style={{ color: '#22C55E' }}>
          mark_email_read
        </span>
        <h2 className="text-xl font-bold text-navy mt-4">Check your email</h2>
        <p className="text-sm text-muted mt-2 mb-6">
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="h-12 w-full rounded-xl text-white font-semibold text-sm"
          style={{ backgroundColor: '#7B61FF' }}
        >
          Back to Sign In
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center mb-8">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
          style={{ backgroundColor: '#7B61FF' }}
        >
          <span className="text-white text-2xl font-bold">₱</span>
        </div>
        <h1 className="text-2xl font-bold text-navy">Create Account</h1>
        <p className="text-sm text-muted mt-1">Start tracking your expenses</p>
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
            minLength={6}
            className="h-12 rounded-xl border border-border px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-navy" htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
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
          {loading ? 'Creating account...' : 'Register'}
        </button>

        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold" style={{ color: '#7B61FF' }}>
            Sign In
          </Link>
        </p>
      </form>
    </div>
  )
}
