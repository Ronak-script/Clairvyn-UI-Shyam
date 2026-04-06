"use client"

import { useTheme } from "@/contexts/ThemeContext"

/**
 * Animated loading indicator shown during assistant processing.
 * Animated dots with status text for better UX.
 */
export default function TypingIndicator() {
  const { isDarkMode } = useTheme()

  return (
    <div className="flex items-center gap-2 mt-2 text-sm" aria-hidden>
      {/* Loading dots */}
      <div className="flex items-center gap-1">
        <span 
          className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-yellow-600' : 'bg-gray-400'}`}
          style={{ animationDelay: '0s' }}
        />
        <span 
          className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-yellow-600' : 'bg-gray-400'}`}
          style={{ animationDelay: '0.2s' }}
        />
        <span 
          className={`w-2 h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-yellow-600' : 'bg-gray-400'}`}
          style={{ animationDelay: '0.4s' }}
        />
      </div>
      
      <span className={`${isDarkMode ? 'text-yellow-700' : 'text-gray-600'} text-xs sm:text-sm`}>
        Processing...
      </span>
    </div>
  )
}
