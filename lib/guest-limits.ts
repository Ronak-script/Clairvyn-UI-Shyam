/** Number of free AI generations for guest users before paywall. */
export const FREE_GUEST_GENERATIONS = 3

const STORAGE_KEY = "guestGenerationsUsed"

export function getGuestGenerationsUsed(): number {
  if (typeof window === "undefined") return 0
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    const n = v ? parseInt(v, 10) : 0
    return Number.isFinite(n) && n >= 0 ? n : 0
  } catch {
    return 0
  }
}

export function setGuestGenerationsUsed(n: number): void {
  if (typeof window === "undefined") return
  try {
    const val = Math.max(0, Math.min(n, FREE_GUEST_GENERATIONS))
    localStorage.setItem(STORAGE_KEY, String(val))
  } catch {
    // ignore
  }
}

export function incrementGuestGenerationsUsed(): number {
  const next = getGuestGenerationsUsed() + 1
  setGuestGenerationsUsed(next)
  return next
}

export function canGuestGenerate(): boolean {
  return getGuestGenerationsUsed() < FREE_GUEST_GENERATIONS
}
