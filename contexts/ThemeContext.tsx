"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { usePathname } from "next/navigation"

import {
  CHATBOT_DARK_STORAGE_KEY,
  isChatbotPath,
} from "@/lib/documentTheme"

interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function applyDocumentTheme(pathname: string | null, isDarkMode: boolean) {
  const root = document.documentElement
  const onChatbot = isChatbotPath(pathname)

  try {
    localStorage.removeItem("theme")
  } catch {
    /* ignore */
  }

  if (onChatbot && isDarkMode) {
    root.classList.add("dark")
    root.style.colorScheme = "dark"
  } else {
    root.classList.remove("dark")
    root.style.colorScheme = "light only"
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHATBOT_DARK_STORAGE_KEY)
      if (saved === "1") setIsDarkMode(true)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      if (isDarkMode) localStorage.setItem(CHATBOT_DARK_STORAGE_KEY, "1")
      else localStorage.removeItem(CHATBOT_DARK_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [isDarkMode])

  useEffect(() => {
    applyDocumentTheme(pathname, isDarkMode)
  }, [pathname, isDarkMode])

  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) applyDocumentTheme(pathname, isDarkMode)
    }
    window.addEventListener("pageshow", onPageShow)
    return () => window.removeEventListener("pageshow", onPageShow)
  }, [pathname, isDarkMode])

  const toggleDarkMode = () => setIsDarkMode((v) => !v)

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
