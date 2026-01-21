// src/components/HomeClient.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// ✅ Prevent SSR/build from bundling wallet deps
const SaveWalletButton = dynamic(() => import('@/components/SaveWalletButton'), {
  ssr: false,
  loading: () => null,
})

export default function HomeClient() {
  return (
    <main style={{ padding: 24, maxWidth: 980, margin: '0 auto' }}>
      <h1 style={{ fontSize: 34, fontWeight: 900, margin: 0 }}>Virdato Wallet Dashboard</h1>
      <p style={{ marginTop: 10, color: '#666' }}>
        Connect your wallet to view balances and optionally save it for rewards.
      </p>

      <div style={{ marginTop: 14 }}>
        <SaveWalletButton />
      </div>
    </main>
  )
}
