import { useAuth } from "../context/AuthContext"

export function useLogout() {
 const user = useAuth()

  const logout = async () => {
    try {
       const API_URL = import.meta.env.VITE_API_URL;    
      await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      })
    } catch (e) {
      console.error("Error en logout:", e)
    }

    user.refreshSession() // actualizar estado de autenticación

    // redirigir
    window.location.href = "/login"
  }

  return logout
}
