/** Persisted when user enables dark mode in /chatbot only. */
export const CHATBOT_DARK_STORAGE_KEY = "chatbot-dark-mode"

export function isChatbotPath(pathname: string | null): boolean {
  return Boolean(pathname?.startsWith("/chatbot"))
}

/**
 * Runs before React hydrates so the first paint matches route + preference
 * and OS/browser dark mode does not tint the landing app chrome.
 */
export const DOCUMENT_THEME_SYNC_SCRIPT = `(function(){
  try {
    var p = location.pathname || "";
    var onChatbot = p.indexOf("/chatbot") === 0;
    var dark = false;
    try { dark = onChatbot && localStorage.getItem("${CHATBOT_DARK_STORAGE_KEY}") === "1"; } catch (e) {}
    var r = document.documentElement;
    if (dark) { r.classList.add("dark"); r.style.colorScheme = "dark"; }
    else { r.classList.remove("dark"); r.style.colorScheme = "light only"; }
    try { localStorage.removeItem("theme"); } catch (e) {}
  } catch (e) {}
})();`
