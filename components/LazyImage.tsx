"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  blurDataURL?: string
  priority?: boolean
  objectFit?: "cover" | "contain" | "fill"
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = "",
  blurDataURL,
  priority = false,
  objectFit = "cover",
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(priority)
  const [isInView, setIsInView] = useState(priority)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [priority])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: width && height ? width / height : undefined,
      }}
    >
      {isInView || priority ? (
        <>
          {/* Blur placeholder */}
          {blurDataURL && !isLoaded && (
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${blurDataURL})`,
                filter: "blur(10px)",
              }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Actual image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setIsLoaded(true)}
              style={{
                objectFit: objectFit,
                objectPosition: "center",
              }}
              priority={priority}
            />
          </motion.div>

          {/* Skeleton loader while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
          )}
        </>
      ) : (
        /* Placeholder before in view */
        <div className="w-full h-full bg-gray-100" />
      )}
    </div>
  )
}
