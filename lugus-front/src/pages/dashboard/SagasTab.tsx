import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import Tab from "../../components/ui/Tab"
import { FileSpreadsheet, FileText, FileType, LucideSearch, Stars } from "lucide-react"
import { FilterDrawer } from "../../components/filters/FilterDrawer"
import FiltersSagas from "../filters/FiltersSagas"
import type { Format } from "../../types/Format"
const API_URL = import.meta.env.VITE_API_URL;
interface Saga {
  id: number
  name: string
  cover: string
  movieCount: number
  percentageOwned?: number
}

interface SagaPage {
  content: Saga[]
  number: number
  size: number
  totalPages: number
  totalElements: number
}

export async function getSagasPage(
  page: number,
  size: number,
  filters: Record<string, any> = {}
) {
  const params = new URLSearchParams()
  const API_URL = import.meta.env.VITE_API_URL;
  params.set("page", page.toString())
  params.set("size", size.toString())

  // Añadir solo filtros que tengan valor
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value.toString())
    }
  })

  const res = await fetch(
    `${API_URL}/v1/api/groups/page?${params.toString()}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

  if (!res.ok) {
    throw new Error("Error al cargar sagas")
  }

  return res.json()
}


export default function SagasTab() {
  const [data, setData] = useState<SagaPage | null>(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [formats] = useState<Format[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({})
  const [filters, setFilters] = useState({})
  const navigate = useNavigate()
  const pageSize = 24
  const effectiveFilters = {
    ...filters
  }
  useEffect(() => {
    setLoading(true)

    getSagasPage(page, pageSize, {
      ...effectiveFilters,
      ...appliedFilters
    })
      .then((res) => setData(res))
      .finally(() => setLoading(false))
  }, [page, appliedFilters])




  const exportFile = async (type: "ods" | "md" | "pdf") => {
    const params = new URLSearchParams()

    const res = await fetchWithAuth(
      `${API_URL}/v1/api/sagas/export/${type}?page=0&size=-1&${params.toString()}`
    )

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `sagas.${type}`
    a.click()

    window.URL.revokeObjectURL(url)
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

        {/* Export ODS */}
        <button
          onClick={() => exportFile("ods")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Exportar ODS">
          <FileSpreadsheet size={18} />
        </button>

        {/* Export Markdown */}
        <button
          onClick={() => exportFile("md")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Exportar Markdown">
          <FileText size={18} />
        </button>

        {/* Export PDF */}
        <button
          onClick={() => exportFile("pdf")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Exportar PDF">
          <FileType size={18} />
        </button>

        <button onClick={() => setFiltersOpen(true)}
          className="ml-auto text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Buscar">
          <LucideSearch size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#d4af37]">Sagas</h2>
        <div className="text-sm text-gray-400">
          Página {data.number + 1} de {data.totalPages} · {data.totalElements} sagas
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
                {saga.movieCount} elemento{saga.movieCount !== 1 && "s"} de los que tenemos el {saga.movieCount > 0 && saga.percentageOwned !== undefined ? `${saga.percentageOwned.toFixed(2)}%` : ""}
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
          className={`px-3 py-1 rounded ${page === 0
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-[#111] border border-[#333] hover:bg-[#1a1a1a]"
            }`}>
          ← Anterior
        </button>

        <span className="text-gray-300 text-sm">
          Página {data.number + 1} de {data.totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page >= data.totalPages - 1}
          className={`px-3 py-1 rounded ${page >= data.totalPages - 1
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-[#111] border border-[#333] hover:bg-[#1a1a1a]"
            }`}>
          Siguiente →
        </button>
      </div>

      <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <h2 className="text-xl font-semibold text-[#d4af37] mb-6">Filtros</h2>

        <FiltersSagas
          filters={filters}
          setFilters={setFilters}
          formats={formats.map(f => ({ label: f.descripcion, value: f.codigo }))}
        />

        <button
          className="w-full mt-6 px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
          onClick={() => {
            setAppliedFilters(filters)
            setFiltersOpen(false)
          }}
        >
          Aplicar filtros
        </button>
      </FilterDrawer>

    </div>
  )
}
