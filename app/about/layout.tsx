import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Clairvyn",
  description:
    "Self-led digital floor plan platform. AI powered CAD software—democratising spatially aware AI for architecture.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
