'use client';

import { useEffect, useState } from 'react';
import { getMagic } from '@/lib/magicClient';
import { getVirdContract } from '@/lib/vird';

export default function Home() {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  async function signIn() {
    const magic = getMagic();
    if (!magic) {
      alert('Magic is not available (missing NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY or not in browser).');
      return;
    }
    await magic.auth.loginWithEmailOTP({ email });
    // Magic injects an EIP-1193 provider
    const accounts = await (magic.rpcProvider as any).request({
      method: 'eth_requestAccounts',
    });
    setAddress(accounts[0]);
  }

  useEffect(() => {
    if (!address) {
      setBalance('');
      return;
    }
    (async () => {
      try {
        const vird = getVirdContract(); // read-only provider
        const bal = await vird.balanceOf(address);
        setBalance((Number(bal) / 1e18).toFixed(4));
      } catch (e) {
        console.error(e);
        setBalance('error');
      }
    })();
  }, [address]);

  return (
    <main style={{ padding: 24 }}>
      <h1>VIRD (Amoy) Dashboard</h1>

      {!address ? (
        <div style={{ marginTop: 12 }}>
          <input
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 8, width: 320, marginRight: 8 }}
          />
          <button onClick={signIn} style={{ padding: '8px 12px' }}>
            Sign in with Magic
          </button>
        </div>
      ) : (
        <div style={{ marginTop: 12 }}>
          <div>Address: {address}</div>
          <div>Balance: {balance || '…'} VIRD</div>
        </div>
      )}
    </main>
  );
}
