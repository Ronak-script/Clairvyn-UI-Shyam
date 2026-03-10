/** Base URL of the Flask backend. Use in browser and server so all API calls hit the backend. */
export const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000"
    : process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000"

/** Return full URL for a path (e.g. for images or logout that need the backend origin). */
export function getBackendUrl(path: string): string {
  const base = API_BASE_URL.replace(/\/$/, "")
  const p = path.startsWith("/") ? path : `/${path}`
  return `${base}${p}`
}

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface ApiFetchOptions<TBody> {
  method?: HttpMethod
  body?: TBody
  token: string | null
  signal?: AbortSignal
}

const DEBUG = typeof process !== "undefined" ? process.env.NODE_ENV === "development" : true

export async function apiFetch<TResponse, TBody = unknown>(
  path: string,
  { method = "GET", body, token, signal }: ApiFetchOptions<TBody>
): Promise<TResponse> {
  const url = getBackendUrl(path)

  if (DEBUG) {
    console.log("[Clairvyn:api] Request", {
      method,
      path,
      url,
      hasToken: !!token,
      body: body !== undefined ? (typeof body === "object" && body !== null ? { ...(body as object) } : body) : undefined,
    })
  }

  const headers: Record<string, string> = {}

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  if (body !== undefined) {
    headers["Content-Type"] = "application/json"
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal,
  })

  if (DEBUG) {
    console.log("[Clairvyn:api] Response", {
      path,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    })
  }

  if (!response.ok) {
    const text = await response.text().catch(() => "")
    console.error("[Clairvyn:api] Error response", { path, status: response.status, body: text })
    throw new Error(`API ${response.status}: ${text || response.statusText}`)
  }

  // For 204/empty responses, avoid JSON parsing.
  const contentType = response.headers.get("content-type") || ""
  if (!contentType.includes("application/json")) {
    return (await response.blob().catch(() => null)) as TResponse
  }

  const json = (await response.json()) as TResponse
  if (DEBUG && path.includes("/turn")) {
    const d = json as { history?: unknown[]; chat_id?: unknown }
    console.log("[Clairvyn:api] Turn response summary", {
      chat_id: d?.chat_id,
      historyLength: Array.isArray(d?.history) ? d.history.length : 0,
    })
  }
  return json
}

