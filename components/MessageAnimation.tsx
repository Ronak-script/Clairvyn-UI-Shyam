"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface MessageAnimationProps {
  children: ReactNode
  index: number
  delay?: number
}

export function MessageAnimation({
  children,
  index,
  delay = 0,
}: MessageAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.05 + delay,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
