"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

export function LandingHeader() {
  const router = useRouter()

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-40",
        /* Pairs with Radix/react-remove-scroll body margin when dialogs lock scroll */
        "width-before-scroll-bar"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-3xl border border-black/5 bg-white/70 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/light.png"
                alt="Clairvyn"
                width={120}
                height={40}
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
              {/* <Link href="/#features" className="hover:text-gray-900 transition-colors">Features</Link> */}
              <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
              <Link href="/about" className="hover:text-gray-900 transition-colors">About</Link>
              <Link href="/blog" className="hover:text-gray-900 transition-colors">
                Blog
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/signin")}
                className="rounded-full bg-[#1e2bd6] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:shadow-md transition-shadow"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
