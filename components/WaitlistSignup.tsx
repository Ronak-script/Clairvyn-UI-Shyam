"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getBackendUrl } from "@/lib/backendApi"
import { cn } from "@/lib/utils"

type WaitlistApiOk = { ok?: boolean; already_registered?: boolean; error?: string }

export type WaitlistSignupProps = {
  className?: string
  title?: string
  description?: string
  userEmail?: string
}

export function WaitlistSignup({
  className,
  title = "Join the waitlist",
  description,
  userEmail,
}: WaitlistSignupProps) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [alreadyRegistered, setAlreadyRegistered] = useState(false)

  useEffect(() => {
    if (userEmail) {
      setEmail(userEmail)
    }
  }, [userEmail])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setAlreadyRegistered(false)
    const trimmed = email.trim()
    if (!trimmed) {
      setError("Please enter your email.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch(getBackendUrl("/api/waitlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      const data = (await res.json().catch(() => ({}))) as WaitlistApiOk
      if (res.ok && data.ok) {
        if (data.already_registered) {
          setAlreadyRegistered(true)
        } else {
          setSuccess(true)
        }
        return
      }
      setError(typeof data.error === "string" ? data.error : "Something went wrong")
    } catch {
      setError("Could not reach the server. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      {title ? <h3 className="text-lg font-semibold tracking-tight">{title}</h3> : null}
      {description ? <p className={cn("mt-1 text-sm", "text-muted-foreground")}>{description}</p> : null}

      <form onSubmit={handleSubmit} className={cn(title || description ? "mt-4" : "", "space-y-3")}>
        {!userEmail && (
          <div className="space-y-2">
            <Label htmlFor="waitlist-email">Email</Label>
            <Input
              id="waitlist-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading || success}
            />
          </div>
        )}
        {error ? <p className={cn("text-sm", "text-destructive")}>{error}</p> : null}
        {success ? (
          <p className={cn("text-sm", "text-emerald-600")}>You&apos;re on the list. We&apos;ll be in touch.</p>
        ) : null}
        {alreadyRegistered ? (
          <p className={cn("text-sm", "text-emerald-600")}>You&apos;re already on the waitlist.</p>
        ) : null}
        <Button type="submit" disabled={loading || success || alreadyRegistered} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden />
              Joining…
            </>
          ) : (
            "Join waitlist"
          )}
        </Button>
      </form>
    </div>
  )
}
