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

  const startTour = useCallback(() => {
    if (typeof window === "undefined" || authLoading || !userUid || isGuest) return

    clearScheduledTour()
    unmountingRef.current = false
    driverRef.current?.destroy()
    driverRef.current = null

    setIsSidebarOpen(true)

    const markFinished = () => {
      localStorage.setItem(onboardingDoneStorageKey(userUid), "1")
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
        onDestroyed: () => {
          driverRef.current = null
          if (unmountingRef.current) return
          markFinished()
        },
        steps: [
          {
            element: '[data-onboarding="sidebar-profile"]',
            popover: {
              title: "Your profile",
              description: "Access your profile here.",
              side: "right",
              align: "start",
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              setIsSidebarOpen(true)
              window.setTimeout(() => d.refresh(), LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="new-chat"]',
            popover: {
              title: "New chat",
              description: "Generate different prompts using new chat option.",
              side: "right",
              align: "start",
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              setIsSidebarOpen(true)
              window.setTimeout(() => d.refresh(), LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="recent-chats"]',
            popover: {
              title: "Recent chats",
              description: "You can access your previously generated prompts here.",
              side: "right",
              align: "start",
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              setIsSidebarOpen(true)
              window.setTimeout(() => d.refresh(), LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="chat-input"]',
            popover: {
              title: "Floor plan prompts",
              description: "Use this chatbot to generate architectural floor plans",
              side: "top",
              align: "center",
            },
            onHighlightStarted: () => {
              setIsSidebarOpen(false)
            },
            onHighlighted: (_el, _step, { driver: d }) => {
              window.setTimeout(() => d.refresh(), LAYOUT_MS)
            },
          },
          {
            element: '[data-onboarding="send"]',
            popover: {
              title: "Send",
              description: "Hit send after generating the whole prompt",
              side: "top",
              align: "end",
            },
          },
        ],
      })

      driverRef.current = driverObj
      driverObj.drive(0)
    }, START_DELAY_MS)
  }, [authLoading, userUid, isGuest, setIsSidebarOpen, clearScheduledTour])

  useEffect(() => {
    if (authLoading || !userUid || isGuest) return
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
