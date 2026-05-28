import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { LucideSearch } from "lucide-react"

import { FilterDrawer } from "../../components/filters/FilterDrawer"
import Select from "../../components/ui/Select"
import Input from "../../components/ui/Input"



import type { Pelicula } from "../../types/Pelicula"
import { getCoversPage } from "../../api/covers"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { Source } from "../../types/Source"

interface FilmPage {
  content: Pelicula[]
  number: number
  size: number
  totalPages: number
  totalElements: number
}

export default function CoversPage() {
  const [data, setData] = useState<FilmPage | null>(null)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [sources, setSources] = useState<Source[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    missing: "yes", // por defecto: sin carátula
    source: "",
    title: ""
  })
  const [appliedFilters, setAppliedFilters] = useState({})

  const pageSize = 24

  const effectiveFilters = {
    ...filters
  }


  const loadTypes = async () => {
    const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/sources")
    const data = await res.json()
    setSources(data)
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    loadTypes()
    getCoversPage(page, pageSize, {
      ...effectiveFilters,
      ...appliedFilters
    })
      .then((res) => setData(res))
      .finally(() => setLoading(false))

  }, [page, appliedFilters])

  const handlePrev = () => {
    if (!data) return
    if (page > 0) setPage(page - 1)
  }

  const handleNext = () => {
    if (!data) return
    if (page < data.totalPages - 1) setPage(page + 1)
  }

  if (loading || !data) {
    return <div className="text-gray-400">Cargando películas…</div>
  }

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex gap-6 border-b border-[#333] mb-6">
        <h2 className="text-xl font-semibold text-[#d4af37]">Carátulas</h2>

        <button
          onClick={() => setFiltersOpen(true)}
          className="ml-auto text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Buscar"
        >
          <LucideSearch size={18} />
        </button>
      </div>

      {/* INFO */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#d4af37]">Gestión de Carátulas</h2>
        <div className="text-sm text-gray-400">
          Página {data.number + 1} de {data.totalPages} · {data.totalElements} películas
        </div>
      </div>

      {/* GRID */}
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
                  Sin carátula
                </div>
              )}

              <div className="
                absolute inset-0 bg-black/70 opacity-0 
                group-hover:opacity-100 transition-opacity 
                flex flex-col justify-end p-3">
                <p className="text-white font-semibold text-sm">{p.title}</p>
                <p className="text-gray-300 text-xs">{p.year}</p>
                {p.coverSrc && (
                  <p className="text-gray-400 text-xs">Source: {p.coverSrc}</p>
                )}
              </div>

              <p className="p-2 text-center text-sm">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* PAGINACIÓN */}
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

      {/* DRAWER */}
      <FilterDrawer open={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <h2 className="text-xl font-semibold text-[#d4af37] mb-6">Filtros</h2>

        <div className="space-y-6">

          <Select
            label="Sin carátula"
            value={filters.missing}
            onChange={(v) => setFilters(f => ({ ...f, missing: v }))}
            options={[
              { label: "Sí", value: "yes" },
              { label: "No", value: "no" }
            ]}
          />

          <Select
            label="Source"
            value={filters.source}
            onChange={(v) => setFilters(f => ({ ...f, source: v }))}
            options={sources.map(f => ({
              label: f.description,
              value: '' + f.id
            }))}

          />

          <Input
            label="Título"
            value={filters.title}
            onChange={(v) => setFilters(f => ({ ...f, title: v }))}
          />

        </div>

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
