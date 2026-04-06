# Redirect Logic - Complete Test Validation Suite

## Overview
This document provides step-by-step tests to validate the fixed redirect logic across all edge cases on mobile and desktop.

---

## Pre-Testing Setup

### Clear Your Browser State:
**Desktop:**
1. Open DevTools (F12)
2. Application → Storage → Session Storage → Select domain → Clear All
3. Application → Storage → Local Storage → Select domain → Clear All
4. Refresh page

**Mobile (iOS Safari):**
1. Settings → Safari → Clear History and Website Data
2. Reopen app

**Mobile (Android Chrome):**
1. Settings → Apps → Chrome → Storage → Clear Cache
2. Reopen app

---

## Test Suite 1: Normal Authentication Flow

### Test 1.1: Fresh User Signup Flow
**Platform:** Desktop + Mobile

**Setup:** Completely logged out, all storage cleared

**Steps:**
1. Open landing page
2. Verify: See landing page (not redirected to chatbot)
3. Click "Try It" button
4. Verify: Navigate to /signup ✅
5. Open DevTools → Session Storage
6. Verify: `fromChatbot` = null, `hasVisitedApp` = null ✅
7. Complete signup (email/password or Google)
8. Check DevTools Session Storage during loading:
   - Should see `hasVisitedApp` = "true" ✅
   - Should NOT see `fromChatbot` ✅
9. Verify: Redirect to /chatbot ✅
10. Wait 2 seconds
11. Check DevTools Session Storage:
    - `hasVisitedApp` = "true" ✅
    - `fromChatbot` = null ✅

**Expected Behavior:**
- ✅ Landing page accessible
- ✅ Signup page accessible
- ✅ Flags set correctly during auth
- ✅ Chatbot accessible after signup
- ✅ Clean session state

**Validation:**
- [ ] Desktop Chrome ✅
- [ ] Desktop Firefox ✅
- [ ] iOS Safari ✅
- [ ] Android Chrome ✅
- [ ] Mobile Safari (private) ✅

---

### Test 1.2: Fresh User Signin Flow
**Platform:** Desktop + Mobile

**Setup:** Fresh account created, not logged in

**Steps:**
1. Open landing page
2. Click "Try It"
3. See signin page
4. Sign in with email/password
5. DevTools Session Storage check:
   - Before click: `hasVisitedApp` = null
   - After click: watch for flag setting
   - During redirect: `hasVisitedApp` = "true" ✅
6. Verify: Navigate to /chatbot ✅
7. Confirm in chatbot
8. Session Storage state:
   - `hasVisitedApp` = "true" ✅
   - `fromChatbot` = null ✅

**Expected Behavior:** Same as 1.1

**Validation:**
- [ ] Email/password signin ✅
- [ ] Google signin ✅
- [ ] Desktop ✅
- [ ] Mobile ✅

---

## Test Suite 2: Critical - Logout & Re-Login Flow

### Test 2.1: Logout Then Login (THE CRITICAL BUG TEST)
**Platform:** Desktop + Mobile
**IMPORTANCE:** This tests the main bug fix

**Setup:** Logged in, in chatbot

**Steps:**
1. In chatbot page
2. Check Session Storage:
   - `hasVisitedApp` = "true" ✅
   - `fromChatbot` = null ✅
3. Click "Sign out" button (sidebar)
4. Observe console: Should see these messages:
   ```
   [Clairvyn] handleLogout
   [Clairvyn] clearing sessionStorage in handleLogout
   [Clairvyn] handleLogout: backend response...
   ```
5. Loading indicator shows
6. Redirected to landing page ✅
7. Check Session Storage:
   - `hasVisitedApp` = "true" ❌ (should be removed during logout)
   - `fromChatbot` = "true" ✅ (set by handleGoHome... wait, we're in logout, not home)
   - ❌ ISSUE: handleLogout sets `fromChatbot` = "true"? No, it clears it!

**Let me re-check the logic:**

Actually in our fix:
- `handleLogout` clears `hasVisitedApp` ✅
- `handleLogout` clears `fromChatbot` ✅
- `logout()` in AuthContext also clears flags ✅
- Then `router.replace("/")` goes to landing page
- Landing page sees no flags, user is logged out
- Stays on landing page ✅

8. Continue test:
9. On landing page, check Session Storage:
   - `hasVisitedApp` = null ❌ (should be cleared)
   - `fromChatbot` = null ❌ (should be cleared)
10. Click "Try It" button
11. Navigate to signin page
12. Referrer check: contains "/signin" ✅
13. But wait, we're not authenticated yet
14. So redirect logic doesn't run
15. Sign in with email
16. Before redirect: `hasVisitedApp` should be set to "true"
17. `fromChatbot` should be cleared
18. Check DevTools during loading:
    - `hasVisitedApp` = "true" ✅
    - `fromChatbot` = null ✅
19. Redirect to /chatbot ✅
20. In chatbot, check final state:
    - `hasVisitedApp` = "true" ✅
    - `fromChatbot` = null ✅

**Expected Behavior:**
- ✅ Logout clears all flags
- ✅ Landing page clean after logout
- ✅ Can sign in again without flag contamination
- ✅ Final session state clean

**Validation:**
- [ ] Desktop ✅
- [ ] Mobile ✅
- [ ] Flag state verified at each step ✅

---

### Test 2.2: Multiple Logout & Login Cycles
**Platform:** Desktop
**IMPORTANCE:** Tests for flag accumulation

**Setup:** Already tested logout/login once

**Steps:**
1. In chatbot (just logged in)
2. Check Session Storage: `hasVisitedApp` = "true"
3. Sign out
4. Check Session Storage: should be null/empty
5. Sign in again
6. Check Session Storage: should be "true"
7. Sign out again
8. Check Session Storage: should be null/empty
9. Sign in third time
10. Check Session Storage: should be "true"
11. Final verification:
    - No accumulation of flags
    - No stale values
    - Each cycle clean

**Expected Behavior:**
- ✅ Flags reset on each logout
- ✅ Flags set fresh on each login
- ✅ No corruption after 3 cycles

**Validation:**
- [ ] 1st cycle ✅
- [ ] 2nd cycle ✅
- [ ] 3rd cycle ✅

---

## Test Suite 3: Navigation & Back Button

### Test 3.1: Home Button Navigation
**Platform:** Desktop + Mobile

**Setup:** Logged in, in chatbot

**Steps:**
1. In chatbot
2. Session Storage: `hasVisitedApp` = "true"
3. Click "Home" button (top left sidebar)
4. Console check: should NOT see logout messages (it's not logout)
5. Check Session Storage during navigation:
   - See `fromChatbot` = "true" (set by handleGoHome)
   - See `hasVisitedApp` = null (removed by handleGoHome)
6. Loading indicator shows
7. Navigate to landing page ✅
8. Landing page redirect logic:
   - Sees `fromChatbot` = "true"
   - Sets `hasVisitedApp` = "true"
   - Removes `fromChatbot`
   - Returns (doesn't redirect)
9. Landing page displays ✅
10. Check Session Storage:
    - `fromChatbot` = null ✅ (removed)
    - `hasVisitedApp` = "true" ✅ (set)

**Expected Behavior:**
- ✅ Home button works
- ✅ Landing page shows
- ✅ No unexpected redirect
- ✅ Flags managed correctly

**Validation:**
- [ ] Desktop ✅
- [ ] Mobile ✅

---

### Test 3.2: Browser Back Button
**Platform:** Mobile only

**Setup:** 
1. On landing page
2. Navigate to signup/signin
3. Complete login
4. Now in chatbot

**Steps:**
1. Press mobile back button (physical or on-screen)
2. Should go back to signin/signup page (browser history)
3. Press back again
4. Should go back to landing page (browser history)
5. Verify: Landing page shows correctly
6. Session Storage check: flags match state

**Expected Behavior:**
- ✅ Back button uses browser history
- ✅ Not affected by our redirect logic
- ✅ Pages display correctly

**Validation:**
- [ ] iOS Safari ✅
- [ ] Android Chrome ✅

---

### Test 3.3: Direct URL Navigation
**Platform:** Desktop + Mobile

**Setup:** In chatbot

**Steps:**
1. In chatbot
2. Manually type landing page URL
3. Browser navigates
4. Document.referrer includes "/chatbot"
5. Landing page detects internal navigation
6. Sets `hasVisitedApp` = "true"
7. Returns (doesn't redirect)
8. Landing page shows ✅

**Expected Behavior:**
- ✅ Internal navigation detected
- ✅ Correct flag behavior
- ✅ Landing page accessible

**Validation:**
- [ ] Desktop ✅
- [ ] Mobile ✅

---

### Test 3.4: Page Refresh
**Platform:** Desktop + Mobile

**Setup:** In any authenticated page

**Steps:**
1. In chatbot
2. Session Storage: `hasVisitedApp` = "true"
3. Press F5 (or refresh button on mobile)
4. Page reloads
5. Session Storage persists ✅
6. Auth state reloads
7. Same page displays

**Expected Behavior:**
- ✅ sessionStorage survives refresh
- ✅ Flags still set
- ✅ Page reloads correctly

**Validation:**
- [ ] Chatbot refresh ✅
- [ ] Landing refresh ✅

---

## Test Suite 4: Mobile Edge Cases

### Test 4.1: Private/Incognito Mode
**Platform:** iOS Safari (Private), Android Chrome (Incognito)

**Setup:** Open app in private/incognito mode

**Steps:**
1. Open landing page
2. Check console: Should see warning if storage unavailable
3. If sessionStorage disabled:
   - Console: `[Clairvyn] sessionStorage not available, skipping redirect logic`
   - User stays on landing page ✅
4. Click "Try It"
5. Navigate to signin
6. Try to sign in
7. Observe: May show error if storage needed, or work with fallback
8. If signin succeeds:
   - Router still redirects to /chatbot
   - Flags may not persist (that's okay)
   - App still functions ✅

**Expected Behavior:**
- ✅ Graceful fallback if storage unavailable
- ✅ No crashes
- ✅ App remains functional
- ✅ Warning logged for debugging

**Validation:**
- [ ] iOS Safari Private ✅
- [ ] Android Chrome Incognito ✅

---

### Test 4.2: New Tab Navigation
**Platform:** Mobile

**Setup:** In chatbot

**Steps:**
1. Copy chatbot URL
2. Open in new tab (long-press → "Open in new tab")
3. New tab: sessionStorage is empty
4. Referrer might be empty
5. User sees: chatbot page loads
6. Session Storage: should be empty (new tab isolation)
7. Click Home button
8. Navigate to landing page
9. New tab: `fromChatbot` = "true" from this navigation
10. Works correctly ✅

**Expected Behavior:**
- ✅ New tab has isolated storage (expected)
- ✅ Navigation still works
- ✅ No redirect loops

**Validation:**
- [ ] iOS Safari ✅
- [ ] Android Chrome ✅

---

### Test 4.3: Slow 3G Network
**Platform:** Desktop DevTools throttling

**Setup:** 
1. Open DevTools (F12)
2. Network tab
3. Throttle to "Slow 3G"

**Steps:**
1. Sign out from chatbot
2. Observe loading indicator
3. Takes longer to load landing page
4. But should not redirect unexpectedly
5. In landing page redirect logic: `if (loading) return` prevents early redirect
6. Sign in (still on slow 3G)
7. Takes longer, but should not double-redirect
8. Finally lands on chatbot ✅

**Expected Behavior:**
- ✅ No race conditions
- ✅ Redirect waits for auth
- ✅ Final state correct

**Validation:**
- [ ] Logout on 3G ✅
- [ ] Login on 3G ✅

---

## Test Suite 5: Referrer Detection

### Test 5.1: Referrer List Coverage
**Platform:** Desktop

**Setup:** Need to navigate between different pages

**Steps for each internal page:**

For `/signin`:
1. From landing → click Try It → /signin
2. Referrer includes "/signin"? (next time we navigate back)
3. Manual back to landing
4. Landing sees referrer includes "/signin"
5. Sets `hasVisitedApp` = "true"
6. ✅ Correct

For `/signup`:
1. From landing → click Try It → /signup
2. Complete signup
3. If we somehow got back to landing...
4. Referrer would include "/signup"
5. ✅ Detected

For `/chatbot`:
1. In chatbot
2. Manually navigate to landing
3. Referrer includes "/chatbot"
4. ✅ Detected

For `/onboarding/profile`:
1. After signup → might go to onboarding
2. From onboarding → navigate to landing
3. Referrer includes "/onboarding"
4. ✅ Detected

For `/feedback`:
1. If you can access feedback page...
2. Navigate back
3. Referrer includes "/feedback"
4. ✅ Detected

For `/consent-notice`:
1. If consent notice link exists
2. Click it
3. Navigate back
4. Referrer includes "/consent-notice"
5. ✅ Detected

**Expected Behavior:**
- ✅ All internal pages detected
- ✅ Referrer list is complete
- ✅ No false positives

**Validation:**
- [ ] /signin ✅
- [ ] /signup ✅
- [ ] /chatbot ✅
- [ ] /onboarding ✅
- [ ] /feedback ✅
- [ ] /consent-notice ✅

---

## Test Suite 6: Onboarding Flow

### Test 6.1: After Signup - Onboarding Redirect
**Platform:** Desktop + Mobile

**Setup:** Just signed up

**Steps:**
1. After signup, if profile incomplete:
   - Should redirect to /onboarding/profile ✅
   - Session Storage: `hasVisitedApp` = "true" from signup
2. Complete onboarding form
3. Submit
4. Session Storage: onboarding sets its own flags
5. Redirect to /chatbot ✅
6. In chatbot:
   - Profile should be complete
   - No redirect to onboarding again ✅

**Expected Behavior:**
- ✅ Onboarding triggered correctly
- ✅ Redirect after onboarding works
- ✅ No loops back to onboarding

**Validation:**
- [ ] Desktop ✅
- [ ] Mobile ✅

---

## Test Suite 7: Session Persistence

### Test 7.1: Reload After Login
**Platform:** Desktop

**Setup:** Just logged in to chatbot

**Steps:**
1. In chatbot
2. Session Storage: `hasVisitedApp` = "true"
3. Press F5 to reload
4. Page reloads
5. Auth state reloads from Firebase
6. User still logged in ✅
7. Session Storage: still `hasVisitedApp` = "true" ✅
8. Chatbot displays ✅

**Expected Behavior:**
- ✅ sessionStorage survives refresh
- ✅ Auth persists
- ✅ Same page shows

**Validation:**
- [ ] Reload in chatbot ✅
- [ ] Reload on landing ✅

---

## Automated Test Checklist

Print this out and check off each test as you complete it:

```
TEST SUITE 1: Normal Auth Flow
[ ] 1.1.1 - Desktop Chrome Fresh Signup
[ ] 1.1.2 - Desktop Firefox Fresh Signup
[ ] 1.1.3 - iOS Safari Fresh Signup
[ ] 1.1.4 - Android Chrome Fresh Signup
[ ] 1.1.5 - Mobile Safari Private Fresh Signup
[ ] 1.2.1 - Desktop Email Signin
[ ] 1.2.2 - Desktop Google Signin
[ ] 1.2.3 - Mobile Email Signin
[ ] 1.2.4 - Mobile Google Signin

TEST SUITE 2: Logout & Re-Login (CRITICAL)
[ ] 2.1.1 - Desktop Logout → Login
[ ] 2.1.2 - Mobile Logout → Login
[ ] 2.1.3 - Desktop Flag Verification Each Step
[ ] 2.1.4 - Mobile Flag Verification Each Step
[ ] 2.2.1 - Desktop 3-Cycle Test
[ ] 2.2.2 - No Flag Accumulation

TEST SUITE 3: Navigation
[ ] 3.1.1 - Desktop Home Button
[ ] 3.1.2 - Mobile Home Button
[ ] 3.2.1 - iOS Back Button
[ ] 3.2.2 - Android Back Button
[ ] 3.3.1 - Desktop URL Navigation
[ ] 3.3.2 - Mobile URL Navigation
[ ] 3.4.1 - Desktop Page Refresh
[ ] 3.4.2 - Mobile Page Refresh

TEST SUITE 4: Mobile Edge Cases
[ ] 4.1.1 - iOS Private Mode
[ ] 4.1.2 - Android Incognito
[ ] 4.2.1 - iOS New Tab
[ ] 4.2.2 - Android New Tab
[ ] 4.3.1 - Logout on 3G
[ ] 4.3.2 - Login on 3G

TEST SUITE 5: Referrer Detection
[ ] 5.1.1 - /signin Detected
[ ] 5.1.2 - /signup Detected
[ ] 5.1.3 - /chatbot Detected
[ ] 5.1.4 - /onboarding Detected
[ ] 5.1.5 - /feedback Detected
[ ] 5.1.6 - /consent-notice Detected

TEST SUITE 6: Onboarding
[ ] 6.1.1 - Desktop Onboarding Redirect
[ ] 6.1.2 - Mobile Onboarding Redirect
[ ] 6.1.3 - No Loop Back to Onboarding

TEST SUITE 7: Session Persistence
[ ] 7.1.1 - Desktop Reload After Login
[ ] 7.1.2 - Mobile Reload After Login

TOTAL: 43 test cases
CRITICAL: Test Suite 2 (Logout & Re-Login)
```

---

## Pass/Fail Criteria

### PASS Criteria:
✅ All flags set/cleared at correct times
✅ No redirect loops detected
✅ Graceful fallback for private mode
✅ No errors in console (warnings okay)
✅ Correct pages show at each step
✅ Mobile and desktop behave identically
✅ sessionStorage matches expected state

### FAIL Criteria:
❌ User sees unexpected redirects
❌ Flags accumulate over multiple logins
❌ Logout doesn't clear flags
❌ sessionStorage persists after logout
❌ Errors in console during navigation
❌ Different behavior on mobile vs desktop
❌ Infinite redirect loops

---

## Debugging Commands

### Check Session Storage (Browser Console):
```javascript
// View all flags
sessionStorage

// Check specific flags
sessionStorage.getItem("fromChatbot")
sessionStorage.getItem("hasVisitedApp")
sessionStorage.getItem("lastChatbotActivityTime")

// Clear all flags
sessionStorage.clear()

// Set flag manually (for testing)
sessionStorage.setItem("fromChatbot", "true")
```

### Monitor Navigation:
```javascript
// Watch document.referrer
console.log("Current referrer:", document.referrer)

// Listen for navigation
window.addEventListener("beforeunload", () => {
  console.log("Leaving page, sessionStorage state:", {
    fromChatbot: sessionStorage.getItem("fromChatbot"),
    hasVisitedApp: sessionStorage.getItem("hasVisitedApp"),
  })
})
```

### Check Auth State:
```javascript
// In console, if AuthContext available:
// Check if user is logged in
// Check loading state
// Check isGuest status
```

---

## Report Template

After completing all tests, fill this out:

```
REDIRECT LOGIC TEST REPORT
Date: ____________________
Tester: ___________________

SUMMARY:
- Total Tests: 43
- Passed: ___
- Failed: ___
- Skipped: ___

CRITICAL ISSUES FOUND:
[ ] None
[ ] 1 - Describe
[ ] 2+ - Describe

MEDIUM ISSUES FOUND:
[ ] None
[ ] Describe

HIGH PRIORITY RECOMMENDATIONS:
1. _______________________
2. _______________________

DEPLOYMENT RECOMMENDATION:
[ ] Ready for production
[ ] Fix issues, re-test
[ ] Hold for more testing

TESTER SIGNATURE: ________________
DATE: ______________________
```

---

## Summary

**Total Test Cases:** 43
**Critical Test Suite:** 2 (Logout & Re-Login)
**Platform Coverage:** Desktop + Mobile (iOS + Android)
**Edge Cases:** Private mode, slow networks, back buttons, new tabs

**Estimated Testing Time:** 2-3 hours for complete validation

**Success Rate Target:** 100% pass rate on all tests

