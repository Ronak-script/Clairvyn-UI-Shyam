"use client"


import { motion } from "framer-motion"
import { Instagram, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { TermsOfServiceModal } from "@/components/TermsOfServiceModal"
import { PrivacyPolicyModal } from "@/components/PrivacyPolicyModal"
import { ConsentNoticeModal } from "@/components/ConsentNoticeModal"
import { LandingHeader } from "@/components/LandingHeader"


export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [termsOpen, setTermsOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  const [heroStack, setHeroStack] = useState([0, 1, 2] as number[])
  const [leavingId, setLeavingId] = useState<number | null>(null)

  // Prefetch chatbot so redirect feels instant
  useEffect(() => {
    router.prefetch("/chatbot")
  }, [router])

  const heroSlides = [
    { src: "/landing/landing_2.png", alt: "Clairvyn editor preview", objectPosition: "50% 45%" },
    { src: "/landing/landing_1.png", alt: "Clairvyn editor preview", objectPosition: "55% 20%" },
    { src: "/landing/landing_3.png", alt: "Clairvyn editor preview", objectPosition: "75% 55%" },
  ] as const

  useEffect(() => {
    const holdMs = 2200
    const id = window.setInterval(() => {
      // Drive rotation off animation completion for seamless motion.
      if (leavingId !== null) return
      setLeavingId(heroStack[0] ?? null)
    }, holdMs)

    return () => window.clearInterval(id)
  }, [heroStack, leavingId])

  // If already logged in, redirect to chat screen immediately
  useEffect(() => {
    if (loading) return
    if (user) {
      router.replace("/chatbot")
    }
  }, [user, loading, router])

  const handleTryIt = () => {
    console.log('handleTryIt called')
    if (user) {
      console.log('User is authenticated, redirecting to /chatbot')
      router.push("/chatbot")
    } else {
      console.log('User is not authenticated, redirecting to /signup')
      router.push("/signup")
    }
  }

  // Don't show landing page while checking auth — logged-in users go straight to chat
  if (loading || user) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-pulse text-gray-400 dark:text-gray-500 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f6f4ff] dark:from-black dark:via-black dark:to-[#0b0a14]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-300/60 blur-3xl dark:bg-purple-500/20" />
        <div className="absolute -top-24 right-[-220px] h-[560px] w-[560px] rounded-full bg-blue-300/60 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute bottom-[-240px] left-[20%] h-[640px] w-[640px] rounded-full bg-indigo-300/50 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <LandingHeader />

      <div className="container mx-auto px-4 pt-28 md:pt-36 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <section className="grid lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-5">
              <div className="text-xs font-semibold tracking-widest text-gray-600 dark:text-gray-300 mb-4">
                DESIGN SMARTER, NOT HARDER
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0b1a3c] dark:text-white leading-tight">
                Design Architectural <br className="hidden sm:block" />
                Floor plans using <br className="hidden sm:block" />
                Simple Prompts.
              </h1>
              <div className="mt-8">
                <button
                  onClick={handleTryIt}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#1e2bd6] px-8 py-5 text-[1em] font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
                >
                  Try Now
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative lg:scale-[1.08] origin-left"
              >
                <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-white/60 to-white/10 dark:from-white/10 dark:to-white/5 blur-xl" />

                <div className="relative overflow-visible rounded-[20px] border border-black/8 bg-white/80 backdrop-blur-md shadow-[0_40px_100px_rgba(30,43,214,0.22),0_8px_32px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-[#1a1a1a]/80">
                  <div className="relative aspect-[16/9] overflow-visible">
                    {heroStack.map((slideIdx, stackPos) => {
                      const isLeaving = slideIdx === leavingId

                      const base = {
                        x: stackPos * 22,
                        y: stackPos * 22,
                        scale: 1 - stackPos * 0.035,
                        opacity: 1 - stackPos * 0.24,
                      }

                      const leaving = {
                        x: 0,
                        y: -10,
                        scale: 1.01,
                        opacity: 0,
                      }

                      return (
                        <motion.div
                          key={slideIdx}
                          initial={false}
                          animate={isLeaving ? leaving : base}
                          transition={{ duration: 0.52, ease: "easeInOut" }}
                          className="absolute inset-0"
                          style={{ zIndex: 10 - stackPos }}
                          onAnimationComplete={() => {
                            if (!isLeaving) return
                            setHeroStack((prev) => [...prev.slice(1), prev[0]])
                            setLeavingId(null)
                          }}
                        >
                          <div className="absolute inset-0">
                            <div className="absolute inset-0 rounded-[18px] overflow-hidden border border-black/6 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.14)] dark:border-white/10 dark:bg-[#1c1c1c]">

                              {/* macOS Safari-style browser chrome */}
                              <div className="flex items-center gap-2 px-3 py-[9px] border-b border-black/[0.07] dark:border-white/10 bg-[#ececec] dark:bg-[#2a2a2a]">
                                {/* Traffic lights */}
                                <div className="flex items-center gap-[5px]">
                                  <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                                  <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                                  <span className="h-[11px] w-[11px] rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15)]" />
                                </div>

                                {/* Sidebar toggle */}
                                <svg viewBox="0 0 18 14" className="h-[14px] w-[14px] text-gray-400 dark:text-gray-500 ml-1 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="1" y="1" width="16" height="12" rx="2" />
                                  <line x1="6" y1="1" x2="6" y2="13" />
                                </svg>

                                {/* URL bar – centered */}
                                <div className="flex-1 flex justify-center">
                                  <div className="flex items-center gap-1.5 bg-white/90 dark:bg-[#3c3c3c] rounded-[7px] px-2.5 py-[4px] text-[10px] text-gray-500 dark:text-gray-400 border border-black/10 dark:border-white/10 w-full max-w-[200px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]">
                                    {/* Shield / lock icon */}
                                    <svg viewBox="0 0 10 12" className="h-[10px] w-[10px] shrink-0 opacity-50" fill="currentColor">
                                      <path d="M5 0L1 2v4c0 2.5 1.7 4.7 4 5 2.3-.3 4-2.5 4-5V2L5 0zm0 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <span className="font-medium flex-1 text-center tracking-tight">clairvyn.com</span>
                                    {/* Refresh icon */}
                                    <svg viewBox="0 0 12 12" className="h-[10px] w-[10px] shrink-0 opacity-50" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M10.5 6a4.5 4.5 0 1 1-1.32-3.18" />
                                      <polyline points="9.5,1.5 9.5,4.5 6.5,4.5" />
                                    </svg>
                                  </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex items-center gap-[9px] text-gray-400 dark:text-gray-500">
                                  {/* Share */}
                                  <svg viewBox="0 0 14 16" className="h-[14px] w-[14px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 1v10M3 5l4-4 4 4M1 11v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3" />
                                  </svg>
                                  {/* Plus */}
                                  <svg viewBox="0 0 12 12" className="h-[13px] w-[13px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                                    <path d="M6 2v8M2 6h8" />
                                  </svg>
                                  {/* Tabs grid */}
                                  <svg viewBox="0 0 14 14" className="h-[13px] w-[13px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="9" height="10" rx="1.5" />
                                    <path d="M4 3V2a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1" />
                                  </svg>
                                </div>
                              </div>

                              {/* Window content */}
                              <div className="relative w-full h-[calc(100%-44px)]">
                                <Image
                                  src={heroSlides[slideIdx].src}
                                  alt={heroSlides[slideIdx].alt}
                                  fill
                                  priority={stackPos === 0}
                                  className="object-cover"
                                  style={{ objectPosition: heroSlides[slideIdx].objectPosition }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom-left bubbles removed */}
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {[
              {
                image: { src: "/landing/floor_plan.png", alt: "Floor plan design", objectPosition: "50% 50%" },
                title: "Floor plan design",
                description: "Create detailed floor plans with intelligent suggestions and real-time feedback",
                color: "from-[#e9edff] to-white",
              },
              {
                image: { src: "/landing/cad_projects.png", alt: "CAD Projects", objectPosition: "50% 50%" },
                title: "CAD Projects",
                description: "Get assistance with CAD modeling, technical drawings, and design specifications",
                color: "from-[#eef7ff] to-white",
              },
              {
                image: { src: "/landing/student_focused.png", alt: "Student Focused", objectPosition: "50% 50%" },
                title: "Student Focused",
                description: "Tailored specifically for architecture students with educational guidance",
                color: "from-[#f1efff] to-white",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
                className="text-center p-10 md:p-12 rounded-[28px] bg-gradient-to-b from-white to-[#C8BFFB] dark:bg-white/5 border border-purple-500/7 dark:border-white/10 hover:shadow-xl transition-shadow backdrop-blur"
              >
                <div
                  className={`w-48 h-48 bg-gradient-to-br ${feature.color} rounded-[34px] flex items-center justify-center mx-auto mb-9 shadow-[0_22px_55px_rgba(30,43,214,0.14)]`}
                >
                  <div className="relative h-40 w-40 rounded-[26px] overflow-hidden bg-white/85 border border-black/5 shadow-sm">
                    <Image
                      src={feature.image.src}
                      alt={feature.image.alt}
                      fill
                      className="object-contain"
                      style={{ objectPosition: feature.image.objectPosition }}
                      sizes="96px"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0b1a3c] dark:text-white mb-4">{feature.title}</h3>
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer - fades in from transparent for seamless transition */}
      <footer className="relative z-10 mt-12 overflow-hidden bg-gradient-to-b from-transparent to-white dark:to-gray-900">
      <div className="absolute inset-x-0 top-0 h-32 from-black to-white/50 dark:to-gray-900/80" aria-hidden />
        {/* Backdrop-blurred top strip */}
        <div className="container mx-auto px-4 py-8 relative">
          {/* Badges */}
          <div className="mt-12 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Backed By
            </h3>
            <div className="flex flex-nowrap justify-center items-center gap-8 overflow-x-auto py-2">
              <img src="/nvidia-inception.png" alt="NVIDIA Inception" className="h-20 max-w-[200px] w-auto object-contain" />
              <img src="/aws-activate.png" alt="AWS Activate" className="h-20 max-w-[200px] w-auto object-contain" />
              <img src="/Microsoft-for-Startups.png" alt="Microsoft for Startups" className="h-20 max-w-[200px] w-auto object-contain" />
              <img src="/Amplitude.png" alt="Amplitude" className="h-20 max-w-[200px] w-auto object-contain" />
              <img src="/Auth0.svg.png" alt="Auth0" className="h-20 max-w-[200px] w-auto object-contain" />
            </div>
          </div>

          <div className="flex justify-between items-start">
            {/* Quicklinks */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-4">Quicklinks</h3>
              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => setTermsOpen(true)}
                  className="text-gray-600 hover:text-teal-600 transition-colors font-medium focus:outline-none hover:underline"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => setPrivacyOpen(true)}
                  className="text-gray-600 hover:text-teal-600 transition-colors font-medium focus:outline-none hover:underline"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setConsentOpen(true)}
                  className="text-gray-600 hover:text-teal-600 transition-colors font-medium focus:outline-none hover:underline"
                >
                  Consent Notice
                </button>
              </div>
            </div>

            {/* Connect */}
            <div className="flex-1 flex justify-end">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-4">Connect</h3>
                <div className="flex justify-center space-x-8">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/clairvyn.ai?igsh=ZnR4M3dhd255aGhq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <Instagram size={24} className="text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/clairvyn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <Linkedin size={24} className="text-gray-600 dark:text-gray-300 group-hover:text-blue-700 transition-colors" />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@clairvyn.com"
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <Mail size={24} className="text-gray-600 dark:text-gray-300 group-hover:text-green-500 transition-colors" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright removed per request */}
        </div>
      </footer>

      <TermsOfServiceModal open={termsOpen} onClose={() => setTermsOpen(false)} />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ConsentNoticeModal open={consentOpen} onClose={() => setConsentOpen(false)} />
    </div>
  )
}
