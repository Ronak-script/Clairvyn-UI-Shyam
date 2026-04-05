"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Page transition animation hook
 * Applies fade + slide transition when route changes
 */
export function usePageTransition() {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => setIsTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return { isTransitioning, pathname }
}

/**
 * Network status detection hook
 * Detects online/offline status and connection quality
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check connection quality
    if ("connection" in navigator) {
      const connection = (navigator as any).connection
      const handleConnectionChange = () => {
        const effectiveType = connection.effectiveType
        setIsSlowConnection(effectiveType === "2g" || effectiveType === "3g")
      }

      connection.addEventListener("change", handleConnectionChange)
      handleConnectionChange()

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
        connection.removeEventListener("change", handleConnectionChange)
      }
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return { isOnline, isSlowConnection }
}

/**
 * Analytics tracking hook
 * Tracks page views, events, and user interactions
 */
export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("config", "GA_MEASUREMENT_ID", {
        page_path: pathname,
      })
    }
  }, [pathname])

  const trackEvent = (
    eventName: string,
    eventParams?: Record<string, any>
  ) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", eventName, eventParams)
    }
  }

  const trackInteraction = (
    elementType: string,
    elementName: string,
    action: string
  ) => {
    trackEvent("user_interaction", {
      element_type: elementType,
      element_name: elementName,
      action: action,
      timestamp: new Date().toISOString(),
    })
  }

  return { trackEvent, trackInteraction }
}

/**
 * Performance monitoring hook
 * Monitors Core Web Vitals and page performance
 */
export function usePerformanceMonitoring() {
  useEffect(() => {
    // Track Largest Contentful Paint (LCP)
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (typeof window !== "undefined" && (window as any).gtag) {
            ;(window as any).gtag("event", "page_view", {
              value: (entry as any).renderTime || (entry as any).loadTime,
              metric_type: (entry as any).name,
            })
          }
        }
      })

      try {
        observer.observe({ entryTypes: ["largest-contentful-paint"] })
      } catch (e) {
        // PerformanceObserver not fully supported
      }

      return () => observer.disconnect()
    }
  }, [])
}
