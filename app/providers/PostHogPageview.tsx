'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function PostHogPageview() {
  const pathname = usePathname()
  const search = useSearchParams()

  useEffect(() => {
    if (pathname) posthog.capture('$pageview')
  }, [pathname, search])

  return null
}

