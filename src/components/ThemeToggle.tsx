import { useEffect, useState } from 'react'

function getInitialDark(): boolean {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(getInitialDark())

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme','dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme','light')
    }
  }, [dark])

  return (
    <button
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="btn fixed bottom-5 right-5 z-50 backdrop-blur-sm"
      onClick={() => setDark(v => !v)}
    >
      <span className="i">{dark ? '🌙' : '☀️'}</span>
      <span className="sr-only">{dark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
