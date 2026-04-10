# Enhanced Features Implementation Guide

This document covers the new features added to improve UX, performance, and analytics.

## Features Implemented

### 1. Page Transition Animations
Smooth fade + slide transitions when navigating between pages.

**Usage in Layout:**
```tsx
'use client'

import { PageTransition } from "@/components/AnimatedMessage"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  )
}
```

**Hook Usage:**
```tsx
import { usePageTransition } from "@/hooks/useFeatures"

export function MyComponent() {
  const { isTransitioning, pathname } = usePageTransition()

  return (
    <div className={isTransitioning ? "opacity-50" : "opacity-100"}>
      Current page: {pathname}
    </div>
  )
}
```

---

### 2. Message Animations
Staggered message animations for chat interfaces.

**Usage:**
```tsx
import { AnimatedMessage, AnimatedMessageList } from "@/components/AnimatedMessage"

export function ChatMessages({ messages }) {
  return (
    <AnimatedMessageList
      messages={messages}
      renderMessage={(msg, idx) => (
        <div key={idx} className="bg-blue-50 p-4 rounded">
          {msg.content}
        </div>
      )}
      delay={0.1}
    />
  )
}

// Or individual messages:
<AnimatedMessage index={0} variant="user">
  <div>User message</div>
</AnimatedMessage>

<AnimatedMessage index={1} variant="assistant">
  <div>Assistant response</div>
</AnimatedMessage>
```

---

### 3. Lazy Image Loading with Blur-Up Effect
Images load lazily with blur placeholder.

**Usage:**
```tsx
import { LazyImage } from "@/components/LazyImage"

export function Gallery() {
  return (
    <LazyImage
      src="/images/photo.jpg"
      alt="Photo"
      blurDataURL="data:image/jpeg;base64,..." // Optional blur placeholder
      width={800}
      height={600}
      priority={false} // Set to true for above-the-fold images
      onLoad={() => console.log("Image loaded")}
    />
  )
}
```

---

### 4. Component Memoization
Prevent unnecessary re-renders with memoization utilities.

**Usage:**
```tsx
import { withMemo, useDeepMemo, useMemoCallback } from "@/lib/memoization"

// Memoize an entire component
const MemoizedButton = withMemo(MyButton, "MyButton")

// Deep memo for complex props
const complexData = useDeepMemo({ user: { name: "John" } }, [userId])

// Memoized callbacks
const handleClick = useMemoCallback(() => {
  console.log("Clicked")
}, [dependencies])

// Expensive computations
const result = useMemoComputation(() => {
  return expensiveCalculation(data)
}, [data])
```

---

### 5. Network Error Detection
Automatic detection of offline status and slow connections.

**Component Usage:**
```tsx
import { NetworkStatus } from "@/components/NetworkStatus"

export default function Layout() {
  return (
    <>
      <NetworkStatus />
      {/* Rest of layout */}
    </>
  )
}
```

**Hook Usage:**
```tsx
import { useNetworkStatus } from "@/hooks/useFeatures"

export function MyComponent() {
  const { isOnline, isSlowConnection } = useNetworkStatus()

  if (!isOnline) {
    return <div>You are offline. Some features may be limited.</div>
  }

  if (isSlowConnection) {
    return <div>Slow connection detected. Pages may load slower.</div>
  }

  return <div>Online and fast</div>
}
```

---

### 6. Analytics & User Interaction Tracking

**Page View Tracking:**
```tsx
import { useAnalytics } from "@/hooks/useFeatures"

export function MyPage() {
  const { trackEvent, trackInteraction } = useAnalytics()

  useEffect(() => {
    // Automatically tracks page view on route change
  }, [])

  return (
    <button
      onClick={() => {
        trackInteraction("button", "submit-form", "click")
      }}
    >
      Submit
    </button>
  )
}
```

**Direct Analytics Usage:**
```tsx
import { analytics } from "@/lib/analytics"

// Track custom events
analytics.trackEvent("custom_event", {
  category: "engagement",
  value: 10,
})

// Track button clicks
analytics.trackButtonClick("sign-up", { source: "homepage" })

// Track form submissions
analytics.trackFormSubmission("contact-form", { source: "footer" }, true)

// Track errors
analytics.trackError("FileUploadError", "File too large", stackTrace)

// Track feature usage
analytics.trackFeatureUsage("floorplan-generator", { type: "3d" })

// Set user properties
analytics.setUserProperties({ role: "premium", signupDate: "2024-01-01" })
```

---

### 7. Performance Monitoring
Monitor Core Web Vitals and custom performance metrics.

**Setup in App Root:**
```tsx
// app/layout.tsx
'use client'

import { useEffect } from "react"
import { initializePerformanceMonitoring } from "@/lib/performanceMonitoring"

export default function RootLayout({ children }) {
  useEffect(() => {
    initializePerformanceMonitoring()
  }, [])

  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

**Measure Custom Operations:**
```tsx
import { measureOperation, getPerformanceMetrics } from "@/lib/performanceMonitoring"

// Measure async operation
async function loadData() {
  await measureOperation("fetch_user_data", async () => {
    const response = await fetch("/api/user")
    return response.json()
  })
}

// Get current metrics
const metrics = getPerformanceMetrics()
console.log("Page load time:", metrics.pageLoad)
```

---

### 8. Feedback & Bug Reporting Widget
Users can submit feedback, request features, and report bugs.

**Setup in Layout:**
```tsx
import { FeedbackWidget } from "@/components/FeedbackWidget"

export default function Layout({ children }) {
  return (
    <>
      <FeedbackWidget
        position="bottom-right"
        onSubmit={(feedback) => {
          console.log("Feedback received:", feedback)
          // Send to backend
        }}
      />
      {children}
    </>
  )
}
```

**Feedback Types:**
- **Feature Request** - Users suggest new features
- **Bug Report** - Users report issues they encountered
- **Rating** - Users rate their overall experience

---

### 9. Enhanced Avatar Component
Improved avatar with auto-generated initials and colors.

**Usage:**
```tsx
import { EnhancedAvatar } from "@/components/EnhancedAvatar"

<EnhancedAvatar
  name="John Doe"
  email="john@example.com"
  src="https://api.example.com/avatar.jpg"
  size="md" // sm, md, lg
  onImageError={() => console.log("Failed to load avatar")}
/>
```

---

## Environment Setup

### Google Analytics Integration
Set the measurement ID in `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

The analytics service will:
- Auto-track page views
- Auto-track user interactions
- Track custom events
- Monitor performance metrics
- Handle offline scenarios gracefully

---

## Best Practices

### Performance
1. **Use `priority={true}`** for above-the-fold images
2. **Memoize complex components** to prevent unnecessary re-renders
3. **Lazy load non-critical components** with React.lazy()
4. **Monitor performance metrics** regularly

### Analytics
1. **Track meaningful interactions** (not every click)
2. **Use consistent event naming** (snake_case)
3. **Include relevant context** in event data
4. **Respect user privacy** and GDPR requirements

### User Experience
1. **Show offline indicator** prominently
2. **Provide fallbacks** for failed image loads
3. **Use appropriate loading states**
4. **Maintain consistent animations** across pages

---

## Configuration

### Disable Features (Optional)
```tsx
// In your environment or config
const DISABLE_ANALYTICS = process.env.NEXT_PUBLIC_DISABLE_ANALYTICS === "true"
const DISABLE_PERFORMANCE_MONITORING = process.env.NEXT_PUBLIC_DISABLE_PERF === "true"
```

---

## Support & Debugging

### Enable Debug Mode
Set in development environment:

```tsx
// Debug logs will appear in console
// Already enabled when NODE_ENV === 'development'
```

### Check Metrics
Open browser DevTools → Performance tab to see:
- Core Web Vitals
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)

---

## Migration Checklist

- [ ] Add `NetworkStatus` component to layout
- [ ] Initialize performance monitoring in root layout
- [ ] Add `PageTransition` wrapper to pages
- [ ] Replace message lists with `AnimatedMessageList`
- [ ] Replace images with `LazyImage` component
- [ ] Add `FeedbackWidget` to app
- [ ] Set up Google Analytics (optional but recommended)
- [ ] Test offline mode (DevTools Network tab)
- [ ] Verify animations on mobile devices
- [ ] Check performance metrics regularly

---

## Examples

See example implementations in:
- `/app/chatbot/page.tsx` - Message animations
- `/app/page.tsx` - Page transitions
- `/components/FeedbackWidget.tsx` - Feedback form
- `/lib/performanceMonitoring.ts` - Performance tracking
