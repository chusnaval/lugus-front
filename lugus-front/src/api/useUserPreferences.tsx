import { useEffect, useState } from "react"


export function useUserPreferences() {
  const [favoritos, setFavoritos] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/lugus/api/user/preferences", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => setFavoritos(data.favoritos))
  }, [])

  const save = async (newFavs : any) => {
    await fetch("http://localhost:8080/lugus/api/user/preferences", {
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
