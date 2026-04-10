"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { analytics } from "@/lib/analytics"

export function useAnalytics() {
  const pathname = usePathname()

  // Track page views
  useEffect(() => {
    analytics.trackPageView(pathname)
  }, [pathname])

  // Track Core Web Vitals using PerformanceObserver
  useEffect(() => {
    if (typeof window === "undefined") return

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any
      const value = lastEntry.renderTime || lastEntry.loadTime || 0
      analytics.trackCoreWebVitals("LCP", value)
    })

    try {
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
    } catch {
      // LCP not supported
    }

    // Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const perfEntry = entry as any
        if (!perfEntry.hadRecentInput) {
          analytics.trackCoreWebVitals("CLS", perfEntry.value || 0)
        }
      }
    })

    try {
      clsObserver.observe({ entryTypes: ["layout-shift"] })
    } catch {
      // CLS not supported
    }

    return () => {
      lcpObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  return analytics
}
