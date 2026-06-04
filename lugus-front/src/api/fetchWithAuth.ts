import { useAuth } from "../context/AuthContext"

export async function fetchWithAuth(input: RequestInfo, options: RequestInit = {}) {
  const res = await fetch(input, {
    ...options,
    credentials: "include", // IMPORTANTE
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (res.status === 401) {
    // sesión caducada → refrescar estado global
    const { refreshSession } = useAuth()
    refreshSession()
  }

  return res
}
