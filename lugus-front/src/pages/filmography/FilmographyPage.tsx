import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FilmographyTable from "./FilmographyTable"
import { fetchWithAuth } from "../../api/fetchWithAuth"


interface FilmographyApiItem {
  id: number
  nconst: string
  peliculaId: number
  title: string
  startyear: number
  category: string
  job: string
  tconst: string
  fcharacters: string
  comprado: boolean
  buscado: boolean
}

export default function FilmographyPage() {
  const { id } = useParams()
  const [items, setItems] = useState<FilmographyApiItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {

      const res = await fetchWithAuth(`http://localhost:8080/lugus/v1/api/filmography/` + id, {
        credentials: "include",
      });
      const data = await res.json()
      setItems(data)
      setLoading(false)
    }

    load()
  }, [id])

  if (loading) return <div className="p-6 text-gray-300">Cargando…</div>

  return (
    <FilmographyTable
      items={items.map(item => ({
        id: item.peliculaId,
        title: item.title,
        year: item.startyear,
        role: item.category,
        owned: item.comprado,
        registered: item.buscado
      }))}
    />
  )
}
