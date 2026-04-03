import { apiFetch } from "@/lib/backendApi"

export type MeApiProfile = {
  university: string | null
  city: string | null
  country: string | null
}

/** True when the user still needs the onboarding country step (backend is source of truth). */
export function profileCountryMissing(profile: MeApiProfile | null | undefined): boolean {
  return !profile?.country?.trim()
}

export async function fetchMeProfile(token: string): Promise<MeApiProfile | null> {
  try {
    const me = await apiFetch<{ profile?: MeApiProfile }>("/api/me", { token })
    return me.profile ?? null
  } catch {
    return null
  }
}
