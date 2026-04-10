/**
 * Analytics service for tracking user interactions, page views, and performance
 */

interface PageViewEvent {
  path: string
  timestamp: number
  sessionId: string
}

interface ClickEvent {
  elementId?: string
  elementText?: string
  elementClass?: string
  path: string
  timestamp: number
  sessionId: string
}

interface CustomEvent {
  name: string
  properties?: Record<string, unknown>
  timestamp: number
  sessionId: string
}

const STORAGE_KEY = "clairvyn_analytics_session"
const EVENTS_STORAGE_KEY = "clairvyn_analytics_events"

class AnalyticsService {
  private sessionId: string
  private events: unknown[] = []

  constructor() {
    this.sessionId = this.getOrCreateSessionId()
    this.loadEvents()
  }

  private getOrCreateSessionId(): string {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return stored

      const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
      localStorage.setItem(STORAGE_KEY, sessionId)
      return sessionId
    } catch {
      return `session_${Date.now()}_fallback`
    }
  }

  private loadEvents(): void {
    try {
      const stored = localStorage.getItem(EVENTS_STORAGE_KEY)
      if (stored) {
        this.events = JSON.parse(stored)
      }
    } catch {
      this.events = []
    }
  }

  private saveEvents(): void {
    try {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(this.events))
    } catch {
      // Silently fail if storage is full
    }
  }

  trackPageView(path: string): void {
    const event: PageViewEvent = {
      path,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }
    this.events.push(event)
    this.saveEvents()

    // Send to backend (fire and forget)
    if (typeof window !== "undefined") {
      navigator.sendBeacon("/api/analytics/page-view", JSON.stringify(event))
    }
  }

  trackClick(element: HTMLElement, path: string): void {
    const event: ClickEvent = {
      elementId: element.id,
      elementText: element.textContent?.slice(0, 50),
      elementClass: element.className,
      path,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }
    this.events.push(event)
    this.saveEvents()

    // Send to backend
    if (typeof window !== "undefined") {
      navigator.sendBeacon("/api/analytics/click", JSON.stringify(event))
    }
  }

  trackEvent(name: string, properties?: Record<string, unknown>): void {
    const event: CustomEvent = {
      name,
      properties,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    }
    this.events.push(event)
    this.saveEvents()

    // Send to backend
    if (typeof window !== "undefined") {
      navigator.sendBeacon("/api/analytics/event", JSON.stringify(event))
    }
  }

  trackCoreWebVitals(
    metric: "LCP" | "FID" | "CLS",
    value: number
  ): void {
    this.trackEvent(`core_web_vital_${metric}`, { value })
  }

  getSessionId(): string {
    return this.sessionId
  }

  getEvents(): unknown[] {
    return this.events
  }

  clearEvents(): void {
    this.events = []
    try {
      localStorage.removeItem(EVENTS_STORAGE_KEY)
    } catch {
      // Ignore
    }
  }
}

export const analytics = new AnalyticsService()
