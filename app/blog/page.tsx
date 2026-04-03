"use client"

import { motion } from "framer-motion"
import { LandingHeader } from "@/components/LandingHeader"
import Link from "next/link"

export default function BlogPage() {
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
              Blog
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Product updates, tutorials, and stories about designing smarter. New posts will appear here as we publish them.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            className="mt-14 rounded-[28px] border border-black/8 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md px-8 py-14 text-center shadow-[0_24px_70px_rgba(30,43,214,0.08)]"
          >
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              No posts yet — check back soon.
            </p>
            <Link
              href="/"
              className="inline-flex mt-6 text-sm font-semibold text-[#1e2bd6] hover:underline"
            >
              ← Back to home
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
