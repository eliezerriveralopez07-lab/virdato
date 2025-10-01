// app/page.tsx
'use client'

import { useEffect } from 'react'
import PhBoot from './ph-boot'

export default function Home() {
  useEffect(() => {
    console.log('[PAGE] client page mounted')
  }, [])

  return (
    <main className="min-h-screen grid place-items-center">
      {/* Force PH boot to render visibly here */}
      <PhBoot />
      <div className="p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold text-blue-600">Tailwind is working ✅</h1>
        <p className="mt-2 text-sm opacity-70">If this looks styled, your setup is correct.</p>
      </div>
    </main>
  )
}
