import { useEffect, useState } from "react"
import { useFiltersContext } from "../../context/FiltersContext"
import { peliculas } from "../../data/peliculasMock" // tu mock real
import ActiveFiltersChips from "../../components/filters/ActiveFiltersChips"
import { Link } from "react-router-dom"
import SkeletonCard from "../../components/SkeletonCard"

export default function DashboardVisual() {
  const { filters } = useFiltersContext()

  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // FILTRADO REAL basado en tu entidad Pelicula
  const filteredCollection = peliculas
    .filter((p) => {
      // Año
      if (filters.year && !p.anyo.toString().startsWith(filters.year)) return false

      // Formato
      if (filters.format && p.formato !== filters.format) return false

      // Género
      if (filters.genre && p.genero !== filters.genre) return false

      // Comprado
      if (filters.bought && p.comprado !== (filters.bought === "yes")) return false

      // Pack
      if (filters.pack && p.pack !== (filters.pack === "yes")) return false

      return true
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "title":
          return a.titulo.localeCompare(b.titulo)
        case "year":
          return b.anyo - a.anyo
        case "format":
          return a.formato.localeCompare(b.formato)
        case "genre":
          return a.genero.localeCompare(b.genero)
        default:
          return 0
      }
    })

  // SKELETONS mientras carga
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  // GRID REAL
  return (
    <>
      <ActiveFiltersChips />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {filteredCollection.map((p) => (
          <Link key={p.id} to={`/movie/${p.id}`}>
            <div className="bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform">
              {p.cover ? (
                <img src={p.cover} alt={p.titulo} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 bg-gray-700 flex items-center justify-center text-white">
                  {p.titulo}
                </div>
              )}
              <p className="p-2 text-center text-sm">{p.titulo}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
