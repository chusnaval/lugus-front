import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"

interface SagaMovie {
  id: number
  title: string
  year: number
  cover: string
  film: number
  imdbId: string
  status: "OWNED" | "WISHLIST" | "NONE"
}

interface SagaDetail {
  id: number
  name: string
  description: string
  movies: SagaMovie[]
}

export default function SagaDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [saga, setSaga] = useState<SagaDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSaga()
  }, [id])

  const loadSaga = async () => {
    const res = await fetchWithAuth(`http://localhost:8080/lugus/v1/api/groups/${id}`)
    const data = await res.json()
    setSaga(data)
    setLoading(false)
  }

  if (loading || !saga) {
    return <div className="text-gray-400 p-6">Cargando saga…</div>
  }

  return (
    <div className="p-6 text-gray-200">
      {/* Header */}
      <button
        onClick={() => navigate("/films/sagas")}
        className="mb-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
      >
        ← Volver a sagas
      </button>

      <h1 className="text-3xl font-bold text-[#d4af37] mb-2">{saga.name}</h1>

      {saga.description && (
        <p className="text-gray-400 mb-6 max-w-2xl">{saga.description}</p>
      )}

      {/* Lista de películas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {saga.movies.map((movie, index) => (
          <div
            key={movie.id}
            onClick={() =>
                movie.film === -1 
                ? navigate(`/petition/${movie.imdbId}`)
                : navigate(`/films/${movie.film}`)}
                className={`cursor-pointer bg-[#111] border border-[#333] rounded-lg overflow-hidden transition
                ${saga.id === -1 ? "opacity-60 cursor-not-allowed" : "hover:bg-[#1a1a1a]"}`}
          >
            <img
              src={movie.cover}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#d4af37]">
                {index + 1}. {movie.title}
              </h3>

              <p className="text-gray-400 text-sm">{movie.year}</p>

              {/* Estado */}
              <div className="mt-3">
                {movie.status === "OWNED" && (
                  <span className="text-green-400 text-sm">🟢 Comprada</span>
                )}
                {movie.status === "WISHLIST" && (
                  <span className="text-yellow-400 text-sm">🟡 Apuntada</span>
                )}
                {movie.status === "NONE" && (
                  <span className="text-red-400 text-sm">🔴 No la tenemos</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
