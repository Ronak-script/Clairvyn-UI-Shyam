"use client"

/**
 * Optimized animated house icon loader for landing page.
 * Faster and smoother animation optimized for initial page load.
 */
export default function LandingPageLoader() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      {/* House Building Animation - Optimized for landing page */}
      <div className="flex-shrink-0 w-8 h-8 landing-page-loader">
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
            className="house-outline-landing"
          />
        </svg>
      </div>

      <style jsx>{`
        .landing-page-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .house-outline-landing {
          animation: drawHouseLanding 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }

        @keyframes drawHouseLanding {
          0% {
            stroke-dashoffset: 120;
            opacity: 0.6;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 120;
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  )
}
