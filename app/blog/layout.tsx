import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Clairvyn",
  description: "Updates, product news, and ideas from the Clairvyn team.",
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
