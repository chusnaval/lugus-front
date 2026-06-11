import { useState } from "react"

export function useToggleFavorite() {
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async (filmId: number) => {
    setLoading(true)

    try {
       const API_URL = import.meta.env.VITE_API_URL;
      const res = await fetch(`${API_URL}/v1/api/films/${filmId}/fav`, {
        method: "POST",
        credentials: "include"
      })

      if (!res.ok) {
        console.error("Error al marcar como favorita")
        return false
      }

      return true
    } catch (err) {
      console.error("Error en toggleFavorite:", err)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { toggleFavorite, loading }
}
