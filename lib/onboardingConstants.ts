/** Session-only: show product tour after first profile completion (driver.js). */
export const ONBOARDING_SESSION_KEY = "clairvyn_show_onboarding_v1"

export function onboardingDoneStorageKey(uid: string) {
  return `clairvyn_onboarding_v1_done_${uid}`
}
