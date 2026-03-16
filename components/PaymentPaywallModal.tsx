"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import { getBackendUrl } from "@/lib/backendApi"

const PAYWALL_PRICE_INR = 9999999
const FREE_GENERATIONS = 6

type PaymentPaywallModalProps = {
  open: boolean
  onClose: () => void
  isDarkMode: boolean
  /** When true, user is logged in and we can call payment API. */
  hasUser: boolean
  getToken: () => Promise<string | null>
  onSignInClick: () => void
}

export function PaymentPaywallModal({
  open,
  onClose,
  isDarkMode,
  hasUser,
  getToken,
  onSignInClick,
}: PaymentPaywallModalProps) {
  const [payLoading, setPayLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayWithPhonePe = async () => {
    if (!hasUser) {
      onSignInClick()
      return
    }
    setError(null)
    setPayLoading(true)
    try {
      const token = await getToken()
      if (!token) {
        setError("Please sign in to pay.")
        setPayLoading(false)
        return
      }
      const origin = typeof window !== "undefined" ? window.location.origin : ""
      const merchantOrderId = `clv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
      const redirectUrl = `${origin}/chatbot?payment_return=1&order_id=${encodeURIComponent(merchantOrderId)}`

      const res = await fetch(getBackendUrl("/api/payments/phonepe/create"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount_in_inr: PAYWALL_PRICE_INR,
          order_id: merchantOrderId,
          redirect_url: redirectUrl,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || "Failed to start payment")
        setPayLoading(false)
        return
      }
      const redirectTo = data?.redirect_url
      if (redirectTo) {
        window.location.href = redirectTo
        return
      }
      setError("No payment link received")
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong")
    } finally {
      setPayLoading(false)
    }
  }

  const handleMaybeLater = () => {
    setError(null)
    onClose()
  }

  const bg = isDarkMode
    ? "bg-gray-900 border-gray-700 text-gray-100"
    : "bg-white border-gray-200 text-gray-900"
  const muted = isDarkMode ? "text-gray-400" : "text-gray-600"
  const btnPrimary =
    "bg-gradient-to-r from-teal-600 to-green-500 hover:from-teal-500 hover:to-green-400 text-white border-0 shadow-md"

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleMaybeLater()}>
      <DialogContent
        className={`${bg} border-2 max-w-md shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out`}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-teal-500/20 p-2">
              <Sparkles className="h-5 w-5 text-teal-400" />
            </div>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Unlock more generations
            </DialogTitle>
          </div>
          <DialogDescription className={`${muted} text-left pt-1`}>
            You&apos;ve used your <strong className="text-teal-500 dark:text-teal-400">{FREE_GENERATIONS} free generations</strong>.
            {hasUser
              ? " Pay with PhonePe to continue designing floor plans."
              : " Sign in and pay with PhonePe to get unlimited access."}
          </DialogDescription>
        </DialogHeader>

        <div className={`rounded-xl border ${isDarkMode ? "bg-gray-800/50 border-gray-600" : "bg-gray-50 border-gray-200"} px-4 py-3`}>
          <p className={`text-sm ${muted}`}>
            One-time unlock — <span className="font-semibold text-teal-600 dark:text-teal-400">₹{PAYWALL_PRICE_INR}</span> via PhonePe (UPI, cards, net banking)
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 bg-red-500/10 dark:bg-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-2">
          {hasUser ? (
            <Button
              onClick={handlePayWithPhonePe}
              disabled={payLoading}
              className={btnPrimary}
            >
              {payLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Pay ₹9999999 with PhonePe"
              )}
            </Button>
          ) : (
            <Button onClick={handlePayWithPhonePe} className={btnPrimary}>
              Sign in to pay with PhonePe
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleMaybeLater}
            className={isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800" : ""}
          >
            Maybe later
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
