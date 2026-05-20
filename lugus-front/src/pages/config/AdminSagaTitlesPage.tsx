import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"

interface Title {
  id: number
  title: string
  year: number | null
  type: "MOVIE" | "SERIES" | "EXTERNAL"
  posterUrl: string | null
  peliculaId?: number | null
  serieId?: number | null
  imdbId?: number | null
}

interface GroupTitle {
  id: number
  orden: number
  title: Title
}

interface GroupDetail {
  id: number
  name: string
  titles: GroupTitle[]
}

interface SearchTitleResultDto {
  titleId?: number
  source: "INTERNAL" | "MOVIE" | "SERIES" | "IMDB"
  title: string
  year: number | null
  type: "MOVIE" | "SERIES" | "EXTERNAL"
  posterUrl: string | null
  imdbId: string | null
}


export default function AdminSagaTitlesPage() {
  const { id } = useParams()
   const navigate = useNavigate()

  const [group, setGroup] = useState<GroupDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState("")
  const [results, setResults] = useState<SearchTitleResultDto[]>([])

  useEffect(() => {
    loadGroup()
  }, [id])

  const loadGroup = async () => {
    const res = await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/groups/${id}`
    )
    const data = await res.json()
    setGroup(data)
    setLoading(false)
  }

  const searchTitles = async () => {
    if (search.trim().length < 2) return
    const res = await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/titles/search?query=${search}`
    )
    const data = await res.json()
    setResults(data)
  }

  const addTitle = async (item: SearchTitleResultDto) => {
    await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/groupsTitles/${id}/titles`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( item )
      }
    )
    loadGroup()
  }

  const removeTitle = async (groupTitleId: number) => {
    if (!confirm("¿Eliminar este título de la saga?")) return

    await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/groupsTitles/${id}/titles/${groupTitleId}`,
      { method: "DELETE" }
    )
    loadGroup()
  }

  const move = async (groupTitleId: number, direction: "up" | "down") => {
    await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/groupsTitles/${id}/titles/${groupTitleId}/move?dir=${direction}`,
      { method: "PUT" }
    )
    loadGroup()
  }

  if (loading || !group) {
    return <div className="text-gray-400 p-6">Cargando…</div>
  }

  return (
    <div className="p-8 text-gray-200">
      <button
        onClick={() => navigate("/admin/sagas")}
        className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600">
        ← Volver a sagas
      </button>

      <h1 className="text-2xl font-bold text-[#d4af37] mb-6">
        Gestionar títulos de: {group.name}
      </h1>

      {/* BUSCADOR */}
      <div className="bg-[#111] p-4 rounded border border-[#333] mb-8">
        <h2 className="text-lg font-semibold mb-3">Añadir título</h2>

        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar película, serie o IMDB…"
            className="flex-1 bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
          <button
            onClick={searchTitles}
            className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
          >
            Buscar
          </button>
        </div>

        {results.length > 0 && (
          <div className="mt-4 border-t border-[#333] pt-4">
            <h3 className="text-sm text-gray-400 mb-2">Resultados:</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((t) => (
                <div
                  key={t.imdbId}
                  className="flex items-center gap-3 bg-[#0d0d0d] p-3 rounded border border-[#222]"
                >
                  <img
                    src={t.posterUrl || "./covers/placeholder.png"}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-gray-400 text-sm">
                      {t.year} · {t.type}
                    </div>
                  </div>
                  <button
                    onClick={() => addTitle(t)}
                    className="px-3 py-1 bg-green-600 rounded hover:bg-green-500"
                  >
                    Añadir
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* LISTA DE TITULOS */}
      <h2 className="text-xl font-semibold mb-4">Títulos en la saga</h2>

      <div className="space-y-4">
        {group.titles
          .slice()
          .sort((a, b) => a.orden - b.orden)
          .map((gt, index) => (
            <div
              key={gt.id}
              className="flex items-center gap-4 bg-[#111] p-4 rounded border border-[#333]"
            >
              <img
                src={gt.title.posterUrl || "/no-poster.png"}
                className="w-14 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <div className="font-semibold text-[#d4af37]">
                  {gt.orden}. {gt.title.title}
                </div>
                <div className="text-gray-400 text-sm">
                  {gt.title.year} · {gt.title.type}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => move(gt.id, "up")}
                  disabled={index === 0}
                  className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
                >
                  ↑
                </button>
                <button
                  onClick={() => move(gt.id, "down")}
                  disabled={index === group.titles.length - 1}
                  className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeTitle(gt.id)}
                  className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
