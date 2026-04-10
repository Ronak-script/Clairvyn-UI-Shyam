import { analytics } from "@/lib/analytics"

interface VitalMetric {
  name: string
  value: number
  unit: string
  rating: "good" | "needsImprovement" | "poor"
}

const VITAL_THRESHOLDS = {
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 }, // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 }, // Cumulative Layout Shift
  TTFB: { good: 600, needsImprovement: 1200 }, // Time to First Byte
}

function getRating(
  name: string,
  value: number
): "good" | "needsImprovement" | "poor" {
  const thresholds = VITAL_THRESHOLDS[name as keyof typeof VITAL_THRESHOLDS]
  if (!thresholds) return "needsImprovement"

  if (value <= thresholds.good) return "good"
  if (value <= thresholds.needsImprovement) return "needsImprovement"
  return "poor"
}

function trackMetric(vital: VitalMetric) {
  analytics.trackEvent("performance_metric", {
    metric_name: vital.name,
    value: vital.value,
    unit: vital.unit,
    rating: vital.rating,
  })
}

/**
 * Initialize performance monitoring
 * Should be called once on app initialization
 */
export function initializePerformanceMonitoring() {
  if (typeof window === "undefined") return

  // Monitor Largest Contentful Paint
  if ("PerformanceObserver" in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]

        const vital: VitalMetric = {
          name: "LCP",
          value: Math.round((lastEntry as any).renderTime || (lastEntry as any).loadTime),
          unit: "ms",
          rating: getRating("LCP", (lastEntry as any).renderTime || (lastEntry as any).loadTime),
        }

        trackMetric(vital)

        if (process.env.NODE_ENV === "development") {
          console.log("[Performance] LCP:", vital)
        }
      })

      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
    } catch (e) {
      // LCP observer not supported
    }

    // Monitor First Input Delay
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const processingTime = (entry as any).processingDuration
          const vital: VitalMetric = {
            name: "FID",
            value: Math.round(processingTime),
            unit: "ms",
            rating: getRating("FID", processingTime),
          }

          trackMetric(vital)

          if (process.env.NODE_ENV === "development") {
            console.log("[Performance] FID:", vital)
          }
        }
      })

      fidObserver.observe({ entryTypes: ["first-input"] })
    } catch (e) {
      // FID observer not supported
    }

    // Monitor Cumulative Layout Shift
    try {
      let clsValue = 0

      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value

            const vital: VitalMetric = {
              name: "CLS",
              value: Number(clsValue.toFixed(3)),
              unit: "",
              rating: getRating("CLS", clsValue),
            }

            trackMetric(vital)

            if (process.env.NODE_ENV === "development") {
              console.log("[Performance] CLS:", vital)
            }
          }
        }
      })

      clsObserver.observe({ entryTypes: ["layout-shift"] })
    } catch (e) {
      // CLS observer not supported
    }
  }

  // Track Time to First Byte using Navigation Timing API
  if (window.performance && window.performance.timing) {
    window.addEventListener("load", () => {
      const timing = window.performance.timing
      const ttfb = timing.responseStart - timing.navigationStart

      const vital: VitalMetric = {
        name: "TTFB",
        value: ttfb,
        unit: "ms",
        rating: getRating("TTFB", ttfb),
      }

      trackMetric(vital)

      if (process.env.NODE_ENV === "development") {
        console.log("[Performance] TTFB:", vital)
      }
    })
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  if (typeof window === "undefined") return null

  const navigation = window.performance?.timing
  if (!navigation) return null

  return {
    timeToFirstByte: navigation.responseStart - navigation.navigationStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
    pageLoad: navigation.loadEventEnd - navigation.navigationStart,
    resourceTiming: window.performance?.getEntriesByType("resource"),
  }
}

/**
 * Track specific operation performance
 */
export function measureOperation(
  operationName: string,
  fn: () => void | Promise<void>
) {
  const startMark = `${operationName}_start`
  const endMark = `${operationName}_end`
  const measureName = `${operationName}_duration`

  performance.mark(startMark)

  const result = fn()

  if (result instanceof Promise) {
    return result.finally(() => {
      performance.mark(endMark)
      performance.measure(measureName, startMark, endMark)

      const measure = performance.getEntriesByName(measureName)[0]
      if (measure) {
        trackMetric({
          name: operationName,
          value: measure.duration,
          unit: "ms",
          rating: getRating("TTFB", measure.duration),
        })
      }
    })
  }

  performance.mark(endMark)
  performance.measure(measureName, startMark, endMark)

  const measure = performance.getEntriesByName(measureName)[0]
  if (measure) {
    trackMetric({
      name: operationName,
      value: measure.duration,
      unit: "ms",
      rating: getRating("TTFB", measure.duration),
    })
  }
}
