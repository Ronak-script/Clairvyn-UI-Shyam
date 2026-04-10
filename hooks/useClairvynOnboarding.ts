"use client"

import { useCallback, useEffect, useRef } from "react"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"
import {
  ONBOARDING_SESSION_KEY,
  onboardingDoneStorageKey,
} from "@/lib/onboardingConstants"

const LAYOUT_MS = 420
const START_DELAY_MS = 450

type Params = {
  authLoading: boolean
  userUid: string | undefined
  isGuest: boolean
  setIsSidebarOpen: (open: boolean) => void
}

export function useClairvynOnboarding({
  authLoading,
  userUid,
  isGuest,
  setIsSidebarOpen,
}: Params) {
  const driverRef = useRef<ReturnType<typeof driver> | null>(null)
  const unmountingRef = useRef(false)
  const tourTimeoutRef = useRef<number | null>(null)

  const clearScheduledTour = useCallback(() => {
    if (tourTimeoutRef.current !== null) {
      window.clearTimeout(tourTimeoutRef.current)
      tourTimeoutRef.current = null
    }
  }, [])

  const isDark = useCallback(() => {
    return typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  }, [])

  const applyPopoverTheme = useCallback(() => {
    const dark = isDark()
    const popover = document.querySelector<HTMLElement>(".driver-popover.clairvyn-driver-popover")
    if (!popover) return

    // Use setProperty to avoid wiping driver.js positioning inline styles
    const set = (el: HTMLElement, props: Record<string, string>) => {
      Object.entries(props).forEach(([k, v]) => el.style.setProperty(k, v, "important"))
    }

    if (dark) {
      set(popover, {
        "background": "#2D2C2B",
        "background-color": "#2D2C2B",
        "border": "1px solid rgba(255,255,255,0.1)",
        "box-shadow": "0 24px 64px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)",
        "color": "#F5E6D3",
        "padding": "28px",
        "border-radius": "20px",
        "max-width": "min(420px, 90vw)",
      })
    }

    const title = popover.querySelector<HTMLElement>(".driver-popover-title")
    if (title) set(title, {
      "color": dark ? "#F5E6D3" : "#0f172a",
      "font-size": "1.4rem",
      "font-weight": "700",
      "letter-spacing": "-0.02em",
      "padding-bottom": "14px",
      "margin-bottom": "14px",
      "background": "transparent",
      "border": "none",
      "outline": "none",
    })

    const desc = popover.querySelector<HTMLElement>(".driver-popover-description")
    if (desc) set(desc, {
      "color": dark ? "#C8C4BC" : "#475569",
      "font-size": "1rem",
      "line-height": "1.65",
      "margin": "0",
      "background": "transparent",
      "border": "none",
      "outline": "none",
    })

    const footer = popover.querySelector<HTMLElement>(".driver-popover-footer")
    if (footer) set(footer, {
      "display": "flex",
      "align-items": "center",
      "justify-content": "space-between",
      "margin-top": "20px",
      "padding-top": "16px",
      "background": "transparent",
      "background-color": "transparent",
      "border": "none",
      "outline": "none",
    })

    const progress = popover.querySelector<HTMLElement>(".driver-popover-progress-text")
    if (progress) set(progress, {
      "color": dark ? "#8A8680" : "#64748b",
      "font-size": "0.82rem",
      "background": "transparent",
      "background-color": "transparent",
    })

    const closeBtn = popover.querySelector<HTMLElement>(".driver-popover-close-btn")
    if (closeBtn) set(closeBtn, {
      "color": dark ? "#8A8680" : "#64748b",
      "background": "transparent",
      "background-color": "transparent",
      "box-shadow": "none",
      "border": "none",
      "pointer-events": "auto",
      "cursor": "pointer",
    })

    const prevBtn = popover.querySelector<HTMLElement>(".driver-popover-prev-btn")
    if (prevBtn) set(prevBtn, {
      "background": dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      "background-color": dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
      "color": dark ? "#B1ADA1" : "#0f172a",
      "border": dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
      "border-radius": "10px",
      "padding": "9px 18px",
      "font-size": "0.9rem",
      "font-weight": "600",
      "text-shadow": "none",
      "box-shadow": "none",
      "cursor": "pointer",
    })

    const nextBtn = popover.querySelector<HTMLElement>(".driver-popover-next-btn")
      ?? popover.querySelector<HTMLElement>(".driver-popover-done-btn")
    if (nextBtn) set(nextBtn, {
      "background": dark ? "#F5E6D3" : "#1A1918",
      "background-color": dark ? "#F5E6D3" : "#1A1918",
      "color": dark ? "#1A1918" : "#F5E6D3",
      "border": "none",
      "border-radius": "10px",
      "padding": "9px 18px",
      "font-size": "0.9rem",
      "font-weight": "600",
      "text-shadow": "none",
      "box-shadow": "none",
      "cursor": "pointer",
    })

    const navBtns = popover.querySelector<HTMLElement>(".driver-popover-navigation-btns")
    if (navBtns) set(navBtns, {
      "display": "flex",
      "gap": "8px",
      "background": "transparent",
      "background-color": "transparent",
      "flex-grow": "1",
      "justify-content": "flex-end",
    })
  }, [isDark])

  const startTour = useCallback(() => {
    if (typeof window === "undefined" || authLoading) return

    clearScheduledTour()
    unmountingRef.current = false
    driverRef.current?.destroy()
    driverRef.current = null

    setIsSidebarOpen(true)

    const markFinished = () => {
      if (userUid) localStorage.setItem(onboardingDoneStorageKey(userUid), "1")
    }

    tourTimeoutRef.current = window.setTimeout(() => {
      tourTimeoutRef.current = null
      sessionStorage.removeItem(ONBOARDING_SESSION_KEY)

      const driverObj = driver({
        showProgress: true,
        progressText: "{{current}} of {{total}}",
        popoverClass: "clairvyn-driver-popover",
        overlayOpacity: 0.72,
        smoothScroll: true,
        allowClose: true,
        showButtons: ["next", "previous", "close"],
        nextBtnText: "Next",
        prevBtnText: "Back",
        doneBtnText: "Done",
        onPopoverRender: () => {
          applyPopoverTheme()
        },
        onDestroyStarted: (_el, _step, { driver: d }) => {
          d.destroy()
          driverRef.current = null
          if (!unmountingRef.current) markFinished()
        },
        onNextClick: (_el, _step, { driver: d }) => {
          d.moveNext()
        },
        onPrevClick: (_el, _step, { driver: d }) => {
          d.movePrevious()
        },
        onOverlayClick: (_el, _step, { driver: d }) => {
          if (d.isLastStep()) {
            d.destroy()
            markFinished()
          } else {
            d.moveNext()
          }
        },
        steps: [
          {
            element: "body",
            popover: {
              title: "Welcome to Clairvyn",
              description: "Clairvyn generates residential floor plans from text. Describe your requirements and the AI will produce a layout you can download.",
              side: "center",
              align: "center",
            },
          },
          {
            element: '[data-onboarding="chat-input"]',
            popover: {
              title: "Describe Your Floor Plan",
              description: "Type your requirements here — area, number of rooms, BHK type, or any specific layout needs. The AI will generate a floor plan based on your description.",
              side: "top",
              align: "center",
            },
            onHighlightStarted: () => {
              setIsSidebarOpen(false)
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              window.setTimeout(() => {
                d.refresh()
              }, LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="send"]',
            popover: {
              title: "Generate",
              description: "Hit this to send your description. Generation takes about 5–10 minutes.",
              side: "top",
              align: "end",
            },
          },
          {
            element: '[data-onboarding="new-chat"]',
            popover: {
              title: "New Generation",
              description: "Start a fresh chat to generate a different floor plan. Previous chats are saved in the sidebar.",
              side: "right",
              align: "start",
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              setIsSidebarOpen(true)
              window.setTimeout(() => {
                d.refresh()
              }, LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="recent-chats"]',
            popover: {
              title: "Your Past Designs",
              description: "All your previously generated floor plans are listed here. Click any to revisit it.",
              side: "right",
              align: "start",
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              setIsSidebarOpen(true)
              window.setTimeout(() => {
                d.refresh()
              }, LAYOUT_MS)
            },
          },
        ],
      })

      driverRef.current = driverObj
      driverObj.drive(0)
    }, START_DELAY_MS)
  }, [authLoading, userUid, applyPopoverTheme, setIsSidebarOpen, clearScheduledTour])

  useEffect(() => {
    if (authLoading || isGuest) return
    if (!userUid) return
    const show = sessionStorage.getItem(ONBOARDING_SESSION_KEY) === "1"
    const done = localStorage.getItem(onboardingDoneStorageKey(userUid))
    if (!show || done) return
    startTour()
  }, [authLoading, userUid, isGuest, startTour])

  useEffect(() => {
    return () => {
      unmountingRef.current = true
      clearScheduledTour()
      driverRef.current?.destroy()
      driverRef.current = null
    }
  }, [userUid, clearScheduledTour])

  return { startTutorial: startTour }
}
