"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { LandingHeader } from "@/components/LandingHeader"
import { WaitlistModal } from "@/components/WaitlistModal"

const basicFeatures = [
  { label: "Limited prompts", included: true },
  { label: "Basic admin", included: true },
  { label: "Basic data retention", included: true },
  { label: "Generative floor plans", included: true },
  { label: "Custom data retention", included: false },
] as const

const premiumFeatures = [
  "Multi-step design",
  "Unlimited prompts",
  "Unlimited team seats",
  "Advanced admin",
  "Custom data retention",
] as const

export default function PricingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white relative overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f6f4ff]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-300/60 blur-3xl" />
        <div className="absolute -top-24 right-[-220px] h-[560px] w-[560px] rounded-full bg-blue-300/60 blur-3xl" />
        <div className="absolute bottom-[-240px] left-[20%] h-[640px] w-[640px] rounded-full bg-indigo-300/50 blur-3xl" />
      </div>

      <LandingHeader />

      <main className="container mx-auto px-4 pt-28 md:pt-36 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <p className="text-xs font-semibold tracking-widest text-gray-600 mb-3">
              PLANS &amp; PRICING
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1a3c]">
              Simple plans for every studio
            </h1>
            <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-lg text-gray-600 leading-relaxed">
              Start free and upgrade when you need deeper workflows, more prompts, and team-ready controls.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
            className="mt-12 grid w-full gap-6 md:grid-cols-2 md:gap-8"
            aria-label="Pricing tiers"
          >
            <article className="flex flex-col rounded-[28px] border border-black/8 bg-white/70 backdrop-blur-md p-8 shadow-[0_16px_48px_rgba(30,43,214,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#0b1a3c]">Basic</h2>
                <span className="rounded-full border border-black/10 bg-gray-50 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-600">
                  DEFAULT
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Core floor-plan assistance and essentials to get started.
              </p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1a3c]">
                  Free
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Forever — no card required</p>

              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {basicFeatures.map((feature) => (
                  <li key={feature.label} className="flex items-start gap-3 text-gray-700">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                        feature.included
                          ? "bg-[#1e2bd6]/10 text-[#1e2bd6]"
                          : "bg-gray-100 text-gray-400"
                      }`}
                      aria-hidden
                    >
                      {feature.included ? <Check className="h-3 w-3" strokeWidth={2.5} /> : <X className="h-3 w-3" strokeWidth={2.5} />}
                    </span>
                    <span className="leading-snug">{feature.label}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-[#0b1a3c] shadow-sm hover:bg-gray-50 transition-colors"
              >
                Get started free
              </Link>
            </article>

            <article className="relative flex flex-col rounded-[28px] border border-[#1e2bd6]/25 bg-gradient-to-b from-white to-[#eef0ff] backdrop-blur-md p-8 shadow-[0_24px_70px_rgba(30,43,214,0.14)] ring-1 ring-[#1e2bd6]/10">
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#1e2bd6]/40 to-transparent" aria-hidden />
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-[#0b1a3c]">Company</h2>
                <span className="rounded-full bg-[#1e2bd6] px-3 py-1 text-[10px] font-bold tracking-widest text-white shadow-sm">
                  PREMIUM
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Full workspace power for teams that live in iteration and reviews.
              </p>

              <div className="mt-6 flex flex-wrap items-baseline gap-1">
                <span className="text-lg font-semibold text-gray-500">₹</span>
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1a3c]">299</span>
                <span className="text-base font-medium text-gray-600">/month</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">Billed monthly · cancel anytime</p>

              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {premiumFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-gray-700">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e2bd6]/10 text-[#1e2bd6]"
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#1e2bd6] px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
              >
                Join waitlist
              </button>
            </article>
          </motion.section>

          <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-14 text-center md:text-left"
          >
            <Link href="/" className="text-sm font-semibold text-[#1e2bd6] hover:underline">
              ← Back to home
            </Link>
          </motion.p>
        </div>
      </main>
    </div>
  )
}
