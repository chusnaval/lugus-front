import { useAuth } from "../context/AuthContext"

export async function fetchWithAuth(input: RequestInfo, options: RequestInit = {}) {
  const token = localStorage.getItem("token")
  const res = await fetch(input, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 401) {
    // sesión caducada → limpiar estado
    const { refreshSession } = useAuth()
    refreshSession()
  }

  return res
}
