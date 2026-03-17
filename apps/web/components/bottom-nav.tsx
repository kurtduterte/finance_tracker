'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type NavItem = {
  href: string
  icon: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { href: '/home', icon: 'home', label: 'Home' },
  { href: '/history', icon: 'history', label: 'History' },
  { href: '/analytics', icon: 'bar_chart', label: 'Analytics' },
  { href: '/account', icon: 'person', label: 'Account' },
]

export function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 flex items-center justify-around px-2 pb-safe z-50"
      style={{ height: '64px' }}>
      {/* First two tabs */}
      {NAV_ITEMS.slice(0, 2).map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 flex-1 py-2"
          >
            <span
              className="material-symbols-rounded text-[24px]"
              style={{ color: active ? '#7B61FF' : '#9CA3AF' }}
            >
              {item.icon}
            </span>
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? '#7B61FF' : '#9CA3AF' }}
            >
              {item.label}
            </span>
          </Link>
        )
      })}

      {/* Center FAB */}
      <div className="flex flex-col items-center flex-1">
        <button
          onClick={() => router.push('/add')}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg -mt-5"
          style={{ backgroundColor: '#1A1A2E' }}
          aria-label="Add expense"
        >
          <span className="material-symbols-rounded text-white text-[28px]">add</span>
        </button>
      </div>

      {/* Last two tabs */}
      {NAV_ITEMS.slice(2).map((item) => {
        const active = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-0.5 flex-1 py-2"
          >
            <span
              className="material-symbols-rounded text-[24px]"
              style={{ color: active ? '#7B61FF' : '#9CA3AF' }}
            >
              {item.icon}
            </span>
            <span
              className="text-[10px] font-medium"
              style={{ color: active ? '#7B61FF' : '#9CA3AF' }}
            >
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
