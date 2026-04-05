"use client"

/**
 * Animated house icon loader shown during assistant processing.
 * House building animation that pairs with dynamic status messages.
 */
export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mt-2" aria-hidden>
      {/* House Building Animation */}
      <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 house-loader">
        <svg
          viewBox="0 0 64 64"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* House outline */}
          <polyline 
            points="32,12 52,28 52,54 12,54 12,28 32,12" 
            fill="none"
            stroke="#1e2bd6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120"
            className="house-outline"
          />
        </svg>
      </div>

      <style jsx>{`
        .house-loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .house-outline {
          animation: drawHouse 2.5s ease-in-out infinite;
        }

        @keyframes drawHouse {
          0% {
            stroke-dashoffset: 120;
          }
          40% {
            stroke-dashoffset: 0;
          }
          60% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: 120;
          }
        }
      `}</style>
    </div>
  )
}
