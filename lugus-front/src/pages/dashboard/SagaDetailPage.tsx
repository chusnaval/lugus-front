import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"
const API_URL = import.meta.env.VITE_API_URL;
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
  movieCount: number
  cover: string | null
  filmaffinityId: number | null
  titles: GroupTitle[]
}

export default function SagaDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [group, setGroup] = useState<GroupDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id === "-1") {
      navigate("/films/petition")
      return
    }
    loadGroup()
  }, [id])

  const loadGroup = async () => {
    const res = await fetchWithAuth(
      `${API_URL}/v1/api/groups/${id}`
    )
    const data = await res.json()
    setGroup(data)
    setLoading(false)
  }

  const goToTitle = (t: Title) => {
    if (t.type === "MOVIE" && t.peliculaId) {
      navigate(`/films/${t.peliculaId}`)
      return
    }
    if (t.type === "SERIES" && t.serieId) {
      navigate(`/series/${t.serieId}`)
      return
    }
    if (t.type === "EXTERNAL" && t.imdbId) {
      navigate(`/external/${t.imdbId}`)
  
    }
  }

  if (loading || !group) {
    return <div className="text-gray-400 p-6">Cargando saga…</div>
  }

  return (
    <div className="p-6 text-gray-200">
      <button
        onClick={() => navigate("/films/sagas")}
        className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        ← Volver a sagas
      </button>

      {group.filmaffinityId && (
        <a
          href={`https://www.filmaffinity.com/es/movie-group.php?group-id=${group.filmaffinityId}&orderby=pos&chv=list`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#1f1f1f] 
                                         border border-lugus-gray text-lugus-gray text-sm hover:bg-[#2a2a2a]">
          <img src="/icons/filmaff.png" alt="Ver en Filmaffinity" className="w-6 h-6 inline-block" /> Ver en Filmaffinity
        </a>)}

      <h1 className="text-3xl font-bold text-[#d4af37] mb-2">
        {group.name}
      </h1>

      {/* Si quieres usar cover como hero */}
      {group.cover && (
        <div className="mb-6">
          <img
            src={group.cover}
            alt={group.name}
            className="w-full max-w-xl rounded border border-[#333]"
          />
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {group.titles
          .slice()
          .sort((a, b) => a.orden - b.orden)
          .map((gt) => (
            <div
              key={gt.id}
              onClick={() => goToTitle(gt.title)}
              className="cursor-pointer bg-[#111] border border-[#333] rounded-lg overflow-hidden hover:bg-[#1a1a1a] transition"
            >
              <img
                src={gt.title.posterUrl || "/covers/placeholder.png"}
                alt={gt.title.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#d4af37]">
                  {gt.orden}. {gt.title.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {gt.title.year ?? "Año desconocido"}
                </p>

                <p className="text-gray-500 text-xs mt-1">
                  {gt.title.type === "MOVIE" && "Película"}
                  {gt.title.type === "SERIES" && "Serie"}
                  {gt.title.type === "EXTERNAL" && "Externo"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
