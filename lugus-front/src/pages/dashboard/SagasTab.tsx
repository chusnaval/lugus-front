import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import Tab from "../../components/ui/Tab"
import { Stars } from "lucide-react"

interface Saga {
  id: number
  name: string
  cover: string
  movieCount: number
}

interface SagaPage {
  content: Saga[]
  page: number
  size: number
  totalPages: number
  totalElements: number
}

export default function SagasTab() {
  const [data, setData] = useState<SagaPage | null>(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const pageSize = 24 

  useEffect(() => {
    loadSagas(page)
  }, [page])

  const loadSagas = async (page: number) => {
    setLoading(true)
    const res = await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/groups/page?page=${page}&size=${pageSize}`
    )
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  const handlePrev = () => {
    if (!data) return
    if (page > 0) setPage(page - 1)
  }

  const handleNext = () => {
    if (!data) return
    if (page < data.totalPages - 1) setPage(page + 1)
  }

  if (loading || !data) {
    return <div className="text-gray-400">Cargando sagas…</div>
  }

  return (
         
    <div className="p-4">
           <div className="flex gap-6 border-b border-[#333] mb-6">
          <Tab to="/films">Resumen</Tab>
          <Tab to="/films/all">Todas</Tab>
          <Tab to="/films/bought">Compradas</Tab>
          <Tab to="/films/pending">Pendientes</Tab>
          <Tab to="/films/sagas" icon={<Stars />}>Sagas</Tab>
        </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#d4af37]">Sagas</h2>
        <div className="text-sm text-gray-400">
          Página {data.page + 1} de {data.totalPages} · {data.totalElements} sagas
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {data.content.map(saga => (
          <div
            key={saga.id}
            onClick={() => navigate(`/films/sagas/${saga.id}`)}
            className="cursor-pointer bg-[#111] border border-[#333] rounded-lg overflow-hidden hover:bg-[#1a1a1a] transition"
          >
            <img
              src={saga.cover}
              alt={saga.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#d4af37]">
                {saga.name}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {saga.movieCount} elemento{saga.movieCount !== 1 && "s"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de paginación */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className={`px-3 py-1 rounded ${
            page === 0
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#111] border border-[#333] hover:bg-[#1a1a1a]"
          }`}
        >
          ← Anterior
        </button>

        <span className="text-gray-300 text-sm">
          Página {data.page + 1} de {data.totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= data.totalPages - 1}
          className={`px-3 py-1 rounded ${
            page >= data.totalPages - 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-[#111] border border-[#333] hover:bg-[#1a1a1a]"
          }`}
        >
          Siguiente →
        </button>
      </div>
    </div>
  )
}
