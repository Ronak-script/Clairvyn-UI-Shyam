"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

import { WaitlistSignup } from "@/components/WaitlistSignup"

type WaitlistModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps & { userEmail?: string }) {
  const [formKey, setFormKey] = useState(0)
  const [mounted, setMounted] = useState(false)
  const skipNextReset = useRef(true)
  const { user } = useAuth()

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
        className="relative w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 text-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm p-1 text-gray-500 opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#1e2bd6] focus:ring-offset-2"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
        <h2 id="waitlist-modal-title" className="pr-8 text-lg font-semibold tracking-tight">
          Join the waitlist
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Be the first to know when the Company plan is available.
        </p>
        <WaitlistSignup key={formKey} title="" className="mt-4" userEmail={user?.email || undefined} />
      </div>
    </div>,
    document.body
  )
}
