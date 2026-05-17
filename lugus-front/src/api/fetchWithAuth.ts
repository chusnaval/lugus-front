import { useAuth } from "../context/AuthContext"

export async function fetchWithAuth(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, {
    ...init,
    credentials: "include",
  })

  if (res.status === 401) {
    // sesión caducada → limpiar estado
    const { refreshSession } = useAuth()
    refreshSession()
  }

  return res
}
