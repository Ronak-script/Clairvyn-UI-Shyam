"use client"

import { useEffect } from "react"
import { PageTransition } from "@/components/AnimatedMessage"
import { NetworkStatus } from "@/components/NetworkStatus"
import { FeedbackWidget } from "@/components/FeedbackWidget"
import { initializePerformanceMonitoring } from "@/lib/performanceMonitoring"
import { analytics } from "@/lib/analytics"
import { usePageTransition, useAnalytics } from "@/hooks/useFeatures"

/**
 * Enhanced Root Layout Example
 * Shows integration of all new features
 */
export function EnhancedRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isTransitioning } = usePageTransition()
  const { trackEvent } = useAnalytics()

  // Initialize monitoring on mount
  useEffect(() => {
    // Initialize performance monitoring
    initializePerformanceMonitoring()

    // Track app initialization
    analytics.trackEvent("app_initialized", {
      timestamp: new Date().toISOString(),
    })

    console.log("[App] Enhanced features initialized")
  }, [])

  // Handle feedback submission
  const handleFeedbackSubmit = async (feedback: any) => {
    try {
      // Track the feedback
      analytics.trackEvent("feedback_submitted", {
        type: feedback.type,
        message: feedback.message,
        rating: feedback.rating,
      })

      // Send to backend
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedback),
      })

      if (response.ok) {
        console.log("[App] Feedback submitted successfully")
      }
    } catch (error) {
      analytics.trackEvent("error", {
        error_name: "FeedbackSubmissionError",
        error_message: String(error),
      })
      console.error("[App] Failed to submit feedback:", error)
    }
  }

  return (
    <html>
      <body>
        {/* Network status indicator */}
        <NetworkStatus />

        {/* Page transitions */}
        <PageTransition>
          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-50" : "opacity-100"
            }`}
          >
            {children}
          </div>
        </PageTransition>

        {/* Feedback widget */}
        <FeedbackWidget position="bottom-right" />
      </body>
    </html>
  )
}

/**
 * Enhanced Page Component Example
 * Shows tracking and analytics
 */
export function EnhancedPageExample() {
  const { trackEvent, trackInteraction } = useAnalytics()

  useEffect(() => {
    // Track page view (auto-tracked by usePageTransition)
    console.log("[Page] Page component mounted")
  }, [])

  const handleButtonClick = (buttonName: string) => {
    // Track interaction
    trackInteraction("button", buttonName, "click")

    // Track event
    trackEvent("button_clicked", {
      button_name: buttonName,
      page: "example",
    })

    console.log(`[Page] Button clicked: ${buttonName}`)
  }

  const handleFormSubmit = (formName: string, data: Record<string, any>) => {
    // Track form submission
    trackEvent("form_submitted", {
      form_name: formName,
      fields: Object.keys(data),
      timestamp: new Date().toISOString(),
    })

    // Track interaction
    trackInteraction("form", formName, "submit")

    console.log(`[Page] Form submitted: ${formName}`)
  }

  return (
    <div className="space-y-4">
      <h1>Enhanced Features Example</h1>

      {/* Button with tracking */}
      <button
        onClick={() => handleButtonClick("primary-cta")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Click Me (Tracked)
      </button>

      {/* Form with tracking */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          handleFormSubmit("example-form", Object.fromEntries(formData))
        }}
        className="space-y-2"
      >
        <input type="email" name="email" placeholder="Email" required />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Submit (Tracked)
        </button>
      </form>
    </div>
  )
}

/**
 * Enhanced Chat Component Example
 * Shows message animations and analytics
 */
import { AnimatedMessageList } from "@/components/AnimatedMessage"

export function EnhancedChatExample({
  messages,
}: {
  messages: Array<{ id: string; content: string; author: "user" | "assistant" }>
}) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Track chat opened
    trackEvent("chat_opened", {
      messageCount: messages.length,
      timestamp: new Date().toISOString(),
    })
  }, [messages.length, trackEvent])

  return (
    <div className="space-y-4">
      <h2>Chat with Animations</h2>

      <AnimatedMessageList
        messages={messages}
        renderMessage={(msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded ${
              msg.author === "user"
                ? "bg-blue-100 ml-8"
                : "bg-gray-100 mr-8"
            }`}
          >
            {msg.content}
          </div>
        )}
        delay={0}
      />
    </div>
  )
}

/**
 * Enhanced Image Gallery Example
 * Shows lazy loading with blur-up
 */
import { LazyImage } from "@/components/LazyImage"

export function EnhancedImageGalleryExample({
  images,
}: {
  images: Array<{ src: string; alt: string; blur?: string }>
}) {
  const { trackEvent } = useAnalytics()

  const handleImageLoad = (imageSrc: string) => {
    trackEvent("image_loaded", {
      src: imageSrc,
      timestamp: new Date().toISOString(),
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img) => (
        <LazyImage
          key={img.src}
          src={img.src}
          alt={img.alt}
          blurDataURL={img.blur}
        />
      ))}
    </div>
  )
}
