import Link from "next/link"

export default function TermsModal() {
  return (
    <Link
      href="/terms-of-service"
      className="text-gray-600 hover:text-teal-600 transition-colors font-medium focus:outline-none"
    >
      Terms of Service
    </Link>
  )
}
