'use client';

import { useEffect, useState } from 'react';
import { getMagic } from '@/lib/magicClient';

export default function HomeClient() {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    try {
      const m = getMagic();
      if (!m) throw new Error('Magic not initialized (server render or missing key)');
      setOk(true);
    } catch (e: any) {
      setErr(e?.message ?? 'Magic init failed');
    }
  }, []);

  if (err) return <pre>{err}</pre>;
  return <div>{ok ? 'Magic ready' : 'Initializing…'}</div>;
}
