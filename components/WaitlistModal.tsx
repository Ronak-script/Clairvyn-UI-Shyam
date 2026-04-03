"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"

import { WaitlistSignup } from "@/components/WaitlistSignup"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from "@/lib/utils"

type WaitlistModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const { isDarkMode } = useTheme()
  const [formKey, setFormKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  const skipNextReset = useRef(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    if (skipNextReset.current) {
      skipNextReset.current = false
      return
    }
    setFormKey((k) => k + 1)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onOpenChange])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="waitlist-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false)
      }}
    >
      <div
        className={cn(
          "relative w-full max-w-md rounded-xl border p-6 shadow-2xl",
          isDarkMode
            ? "border-gray-800 bg-gray-900 text-gray-100"
            : "border-gray-200 bg-white text-gray-900"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className={cn(
            "absolute right-4 top-4 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2",
            isDarkMode
              ? "text-gray-400 ring-offset-gray-900 focus:ring-indigo-400"
              : "text-gray-500 ring-offset-white focus:ring-[#1e2bd6]"
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        <h2 id="waitlist-modal-title" className="pr-8 text-lg font-semibold tracking-tight">
          Join the waitlist
        </h2>
        <p
          className={cn(
            "mt-1 text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}
        >
          Be the first to know when the Company plan is available.
        </p>
        <WaitlistSignup key={formKey} isDarkMode={isDarkMode} title="" className="mt-4" />
      </div>
    </div>,
    document.body
  )
}
