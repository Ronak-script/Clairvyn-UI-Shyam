"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Home } from "lucide-react"

import { useAuth } from "@/contexts/AuthContext"
import { apiFetch } from "@/lib/backendApi"
import { getCountrySelectOptions } from "@/lib/countryOptions"
import { fetchMeProfile, profileCountryMissing } from "@/lib/meProfile"
import { ONBOARDING_SESSION_KEY } from "@/lib/onboardingConstants"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ProfilePatchResponse = {
  user_id: number
  university: string | null
  city: string | null
  country: string | null
}

export default function OnboardingProfilePage() {
  const router = useRouter()
  const { user, loading: authLoading, getIdToken } = useAuth()
  const [gateOk, setGateOk] = useState(false)
  const [countryCode, setCountryCode] = useState("")
  const [isStudent, setIsStudent] = useState<"yes" | "no" | "">("")
  const [university, setUniversity] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const countryOptions = useMemo(() => getCountrySelectOptions(), [])

  useEffect(() => {
    if (authLoading || !user) return

    let cancelled = false

    void (async () => {
      const token = await getIdToken()
      if (cancelled) return
      if (!token) {
        router.replace("/signin")
        return
      }

      const profile = await fetchMeProfile(token)
      if (cancelled) return
      if (!profileCountryMissing(profile)) {
        router.replace("/chatbot")
        return
      }

      setGateOk(true)
    })()

    return () => {
      cancelled = true
    }
  }, [authLoading, user, router, getIdToken])

  const countryLabel = useMemo(() => {
    if (!countryCode) return ""
    return countryOptions.find((o) => o.value === countryCode)?.label ?? countryCode
  }, [countryCode, countryOptions])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError("")

      if (!countryCode) {
        setError("Please select your country.")
        return
      }
      if (isStudent !== "yes" && isStudent !== "no") {
        setError("Please tell us if you are a student.")
        return
      }
      if (isStudent === "yes" && !university.trim()) {
        setError("Please enter your university.")
        return
      }

      const token = await getIdToken()
      if (!token) {
        setError("Could not verify your session. Try signing in again.")
        return
      }
      if (!user) {
        setError("Could not verify your session. Try signing in again.")
        return
      }

      const body: { country: string; university: string | null } = {
        country: countryLabel,
        university: isStudent === "yes" ? university.trim() : null,
      }

      setIsSubmitting(true)
      try {
        await apiFetch<ProfilePatchResponse, typeof body>("/api/me/profile", {
          method: "PATCH",
          body,
          token,
        })
        if (typeof window !== "undefined") {
          sessionStorage.setItem(ONBOARDING_SESSION_KEY, "1")
        }
        router.replace("/chatbot")
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Something went wrong."
        setError(message)
      } finally {
        setIsSubmitting(false)
      }
    },
    [countryCode, countryLabel, getIdToken, isStudent, university, router, user]
  )

  if (authLoading || !gateOk) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-sm">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[url('/login_bg.png')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/65 to-white/20" />
      <div
        className="hidden md:block absolute right-0 top-0 h-full w-1/2 bg-white/25 backdrop-blur-lg"
        style={{
          WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 100%)",
          maskImage: "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,1) 100%)",
        }}
      />

      <Link href="/" className="absolute left-6 top-6 z-20">
        <div className="w-10 h-10 rounded-full bg-white/70 border border-white/60 shadow flex items-center justify-center">
          <Home className="w-5 h-5 text-teal-700" />
        </div>
      </Link>

      <div className="relative z-10 min-h-screen flex items-center justify-evenly p-5 sm:pl-12 sm:pr-16 md:w-1/2 md:ml-auto">
        <div className="w-full max-w-[430px] rounded-2xl bg-white/75 border border-white/60 shadow-[0_30px_90px_rgba(15,118,110,0.18)]">
          <div className="p-6 sm:p-8">
            <h1 className="text-[#1E3A8A] text-3xl sm:text-[30px] font-bold leading-tight">
              Tell us about you
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              A few quick details help us improve Clairvyn for your region and community.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-gray-800">Where are you from?</Label>
                <Select value={countryCode || undefined} onValueChange={setCountryCode}>
                  <SelectTrigger className="h-12 rounded-xl bg-white/80 border-gray-200 focus:ring-teal-500">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {countryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-800">Are you a student?</Label>
                <RadioGroup
                  value={isStudent}
                  onValueChange={(v) => setIsStudent(v as "yes" | "no")}
                  className="flex flex-col gap-2"
                >
                  <label className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/60 px-3 py-2 cursor-pointer">
                    <RadioGroupItem value="yes" id="student-yes" />
                    <span className="text-sm text-gray-800">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white/60 px-3 py-2 cursor-pointer">
                    <RadioGroupItem value="no" id="student-no" />
                    <span className="text-sm text-gray-800">No</span>
                  </label>
                </RadioGroup>
              </div>

              {isStudent === "yes" && (
                <div className="space-y-2">
                  <Label htmlFor="university" className="text-gray-800">
                    University
                  </Label>
                  <Input
                    id="university"
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="h-12 rounded-xl bg-white/80 border-gray-200 focus-visible:ring-teal-500 placeholder:text-gray-500"
                    placeholder="School or university name"
                    autoComplete="organization"
                  />
                </div>
              )}

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-white font-semibold"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
