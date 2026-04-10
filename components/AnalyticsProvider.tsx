"use client"

import { ReactNode } from "react"
import { useAnalytics } from "@/hooks/useAnalytics"

export default function AnalyticsProvider({
  children,
}: {
  children: ReactNode
}) {
  useAnalytics()
  return children
}
