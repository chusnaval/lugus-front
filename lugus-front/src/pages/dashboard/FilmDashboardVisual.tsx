import { useEffect, useState } from "react"
import { useFiltersContext } from "../../context/FiltersContext"
import ActiveFiltersChips from "../../components/filters/ActiveFiltersChips"
import { Link } from "react-router-dom"
import SkeletonCard from "../../components/SkeletonCard"
import Card from "../../components/ui/Card"
import Chip from "../../components/ui/Chip"
import { getUltimasPeliculas } from "../../api/filmService"
import type { Pelicula } from "../../types/Pelicula"
import { getStats } from "../../api/statsService"
import type { FilmStats } from "../../types/FilmStats"
import { useAuth } from "../../context/AuthContext"
import { LucideUser } from "lucide-react"

export default function FilmDashboardVisual() {
  const { filters } = useFiltersContext()
  const [ultimas, setUltimas] = useState<Pelicula[]>([])
  const [stats, setStats] = useState<FilmStats>({
    totalFilms: 0,
    recentFilms: 0,
    completeGroups: 0,
    incompleteGroups: 0
  })


  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuth()

  const isAdmin = user?.roles?.includes("ROLE_ADMIN")
  useEffect(() => {
    getUltimasPeliculas().then(setUltimas).catch(console.error)
    getStats().then(setStats).catch(console.error)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])


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
      <div className="space-y-8">

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold">Total películas</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalFilms}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Nuevas último mes</h3>
            <p className="text-3xl font-bold mt-2">{stats.recentFilms}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Sagas</h3>
            <p className="mt-2">
              <Chip icon="" label={`${stats.completeGroups} completas`} color="blue" />
              <Chip icon="" label={`${stats.incompleteGroups} incompletas`} color="gold" className="ml-2" />

            </p>
          </Card>
        </div>

        {/* Últimas añadidas */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Últimas añadidas</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ultimas.map((p) => (
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
                    <p className="text-gray-300 text-xs">{p.year} · {p.format}</p>
                    <p className="text-gray-400 text-xs">{p.genreDesc}</p>
                  </div>

                  {/* TÍTULO DEBAJO */}
                  <p className="p-2 text-center text-sm">{p.title}</p>
                </div>

              </Link>
            ))}
          </div>
        </Card>

         <div className="flex items-center space-x-4">

        {isAdmin && (
          <Link
            to="/films/new"
            className="px-3 py-1 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition-colors"
          >
            + Añadir
          </Link>
        )}

      
      </div>
      </div>


    </>
  )
}
