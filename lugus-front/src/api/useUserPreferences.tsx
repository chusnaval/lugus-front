import { useEffect, useState } from "react"
import type { Genre } from "../types/Genre"


export function useUserPreferences() {
  // lista de generos favoritos del usuario
  const [favoritos, setFavoritos] = useState<Genre[]>([])
 const API_URL = import.meta.env.VITE_API_URL;  

  useEffect(() => {
    fetch(`${API_URL}/api/user/preferences`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setFavoritos(data.favoritos))
  }, [])

  const save = async (newFavs : Genre[]) => {
    await fetch(`${API_URL}/api/user/preferences`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ favoritos: newFavs })
    })

    setFavoritos(newFavs)
  }

  return { favoritos, save }
}
