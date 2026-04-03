"use client"

import { motion } from "framer-motion"
import { LandingHeader } from "@/components/LandingHeader"
import Link from "next/link"

const highlights = [
  {
    title: "Floor plan design",
    text: "Iterate on layouts with suggestions and feedback tuned for architectural workflows.",
  },
  {
    title: "CAD & technical work",
    text: "Get help with modeling, drawings, and specifications without losing rigor.",
  },
  {
    title: "Built for learning",
    text: "We focus on students and educators who need clear guidance, not black-box answers.",
  },
] as const

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black relative overflow-hidden overflow-x-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f6f4ff] dark:from-black dark:via-black dark:to-[#0b0a14]" />
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-300/60 blur-3xl dark:bg-purple-500/20" />
        <div className="absolute -top-24 right-[-220px] h-[560px] w-[560px] rounded-full bg-blue-300/60 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute bottom-[-240px] left-[20%] h-[640px] w-[640px] rounded-full bg-indigo-300/50 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <LandingHeader />

      <main className="container mx-auto px-4 pt-28 md:pt-36 pb-20 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold tracking-widest text-gray-600 dark:text-gray-300 mb-3">
              CLAIRVYN
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0b1a3c] dark:text-white">
              About us
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Clairvyn creates AI powered CAD software. Our mission is to democratise access to spatially aware artificial intelligence, empowering human creativity and innovation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
            className="mt-10 space-y-5 text-base text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            <p>
              Clairvyn sits at the intersection of architecture education and AI: we care about precision, iteration,
              and teaching—not just one-shot images. Our product is meant to feel like a capable studio partner that
              respects how you already work.
            </p>
            <p>
              Whether you&apos;re refining a studio project or exploring options for a plan, we want you to stay in
              control of the design while the heavy lifting gets a little lighter.
            </p>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
            className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
          >
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-[22px] border border-black/8 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-5 py-6 shadow-[0_16px_48px_rgba(30,43,214,0.06)]"
              >
                <h2 className="text-sm font-bold text-[#0b1a3c] dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.text}</p>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.18 }}
            className="mt-14 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex rounded-full bg-[#1e2bd6] px-7 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-lg transition-shadow"
            >
              Get started
            </Link>
            <Link
              href="/pricing"
              className="inline-flex text-sm font-semibold text-[#1e2bd6] hover:underline"
            >
              View pricing
            </Link>
            <a
              href="mailto:hello@clairvyn.com"
              className="inline-flex text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-[#1e2bd6] dark:hover:text-white transition-colors"
            >
              hello@clairvyn.com
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="mt-12"
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
