"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedMessageProps {
  children: ReactNode
  delay?: number
  index?: number
  variant?: "user" | "assistant"
  className?: string
}

/**
 * Animated message component with stagger effect
 * Each message slides in from the side with fade
 */
export function AnimatedMessage({
  children,
  delay = 0,
  index = 0,
  variant = "assistant",
  className = "",
}: AnimatedMessageProps) {
  const isUser = variant === "user"

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isUser ? 20 : -20,
        y: 10,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: delay + index * 0.05,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * Message list container with staggered animations
 */
export function AnimatedMessageList({
  messages,
  renderMessage,
  delay = 0,
}: {
  messages: any[]
  renderMessage: (message: any, index: number) => ReactNode
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {messages.map((message, index) => (
        <AnimatedMessage key={message.id || index} index={index} delay={delay}>
          {renderMessage(message, index)}
        </AnimatedMessage>
      ))}
    </motion.div>
  )
}

/**
 * Page transition wrapper component
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
