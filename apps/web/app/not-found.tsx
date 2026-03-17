import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-background px-6 text-center">
      <span className="material-symbols-rounded text-[64px]" style={{ color: '#7B61FF' }}>
        search_off
      </span>
      <h1 className="text-2xl font-bold text-navy mt-4">Page Not Found</h1>
      <p className="text-sm text-muted mt-2 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/home"
        className="h-12 px-6 rounded-xl text-white font-semibold text-sm flex items-center"
        style={{ backgroundColor: '#7B61FF' }}
      >
        Go Home
      </Link>
    </div>
  )
}
