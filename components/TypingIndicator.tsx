"use client"

/**
 * Inline “typing” dots shown under assistant loading copy in the chatbot.
 */
export default function TypingIndicator() {
  const delays = ["", "[animation-delay:120ms]", "[animation-delay:240ms]"] as const
  return (
    <div className="flex items-center gap-1 mt-2" aria-hidden>
      {delays.map((delayClass, i) => (
        <span
          key={i}
          className={`inline-block h-1.5 w-1.5 rounded-full bg-teal-600/70 dark:bg-teal-400/80 animate-bounce ${delayClass}`}
        />
      ))}
    </div>
  )
}
