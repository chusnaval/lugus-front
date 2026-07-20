import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import Tab from "../../components/ui/Tab"
import { FileSpreadsheet, FileText, FileType, LucideSearch, Stars } from "lucide-react"
import type { Pelicula } from "../../types/Pelicula"
import { FilterDrawer } from "../../components/filters/FilterDrawer"
import FiltersFilms from "../filters/FiltersFilms"
import type { Genre } from "../../types/Genre"
import type { Format } from "../../types/Format"
import { getPeliculasPage } from "../../api/filmService"

interface FilmPage {
  content: Pelicula[]
  number: number
  size: number
  totalPages: number
  totalElements: number
}

export default function OwnedFilmsTab() {
  const [data, setData] = useState<FilmPage | null>(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [formats, setFormats] = useState<Format[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const pageSize = 24
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState({})
  const [filters, setFilters] = useState({})
  const effectiveFilters = {
    owned: "true",
    ...filters
  }
   const API_URL = import.meta.env.VITE_API_URL;  

  useEffect(() => {
    setLoading(true)
    fetchWithAuth(`${API_URL}/v1/api/locations`).then(res => res.json()).then(setFormats).catch(console.error)
    fetchWithAuth(`${API_URL}/v1/api/genres`).then(res => res.json()).then(setGenres).catch(console.error)
    getPeliculasPage(page, pageSize, {
      ...effectiveFilters,
      ...appliedFilters
    })
      .then((res) => setData(res))
      .finally(() => setLoading(false))

  }, [page, appliedFilters])

  const exportFile = async (type: "ods" | "md" | "pdf") => {
    const params = new URLSearchParams()

    Object.entries(appliedFilters).forEach(([k, v]) => {
      if (v !== "" && v !== null && v !== undefined) {
        params.set(k, v.toString())
      }
    })

    const res = await fetchWithAuth(
      `${API_URL}/v1/api/films/export/${type}?page=0&size=-1&${params.toString()}`
    )

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `peliculas.${type}`
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
    return <div className="text-gray-400">Cargando peliculas</div>
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
          aria-label="Exportar ODS"
        >
          <FileSpreadsheet size={18} />
        </button>

        {/* Export Markdown */}
        <button
          onClick={() => exportFile("md")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Exportar Markdown"
        >
          <FileText size={18} />
        </button>

        {/* Export PDF */}
        <button
          onClick={() => exportFile("pdf")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Exportar PDF"
        >
          <FileType size={18} />
        </button>

        <button onClick={() => setFiltersOpen(true)}
          className="ml-auto text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Buscar">
          <LucideSearch size={18} />
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#d4af37]">Películas</h2>
        <div className="text-sm text-gray-400">
          Página {data.number + 1} de {data.totalPages} · {data.totalElements} películas
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
        {data.content.map(p => (
          <Link key={p.id} to={`/films/${p.id}`}>
            <div className="relative bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform group">
              {p.coverSrc ? (
                <img
                  src={p.coverSrc}
                  alt={p.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="h-48 bg-gray-700 flex items-center justify-center text-white">
                  {p.title}
                </div>
              )}

              {/* OVERLAY HOVER */}
              <div className="
                        absolute inset-0 
                        bg-black/70 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-opacity                         
                        flex flex-col justify-end p-3">
                <p className="text-white font-semibold text-sm">{p.title}</p>
                <p className="text-gray-300 text-xs">{p.year} · {p.editions?.[0]?.format?.descripcion ?? "—"}</p>
                <p className="text-gray-400 text-xs">{p.genreDesc}</p>
              </div>

              {/* TÍTULO DEBAJO */}
              <p className="p-2 text-center text-sm">{p.title}</p>
            </div>

          </Link>
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
            }`}
        >
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
            }`}
        >
          Siguiente →
        </button>
      </div>

      <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <h2 className="text-xl font-semibold text-[#d4af37] mb-6">Filtros</h2>

        <FiltersFilms
          filters={filters}
          setFilters={setFilters}
          formats={formats.map(f => ({ label: f.descripcion, value: f.codigo }))}
          genres={genres.map(f => ({ label: f.descripcion, value: f.codigo }))}
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