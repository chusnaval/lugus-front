import { useState } from "react"

export function useToggleOwned() {
  const [loading, setLoading] = useState(false)

  const toggleOwned = async (filmId: number) => {
    setLoading(true)

    try {
       const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/v1/api/films/${filmId}/toggle`, {
        method: "POST",
        credentials: "include"
      })

      if (!res.ok) {
        console.error("Error al marcar como propia")
        return false
      }

      return true
    } catch (err) {
      console.error("Error en toggleOwned:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { toggleOwned, loading }
}
