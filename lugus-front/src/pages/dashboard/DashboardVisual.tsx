import { useEffect, useState } from "react"
import { useFiltersContext } from "../../context/FiltersContext"
import { peliculas } from "../../data/peliculasMock" // tu mock real
import ActiveFiltersChips from "../../components/filters/ActiveFiltersChips"
import { Link } from "react-router-dom"
import SkeletonCard from "../../components/SkeletonCard"
import Card from "../../components/ui/Card"
import Chip from "../../components/ui/Chip"
import { getUltimasPeliculas } from "../../api/peliculas"
import type { Pelicula } from "../../types/Pelicula"

export default function DashboardVisual() {
  const { filters } = useFiltersContext()
  const [ultimas, setUltimas] = useState<Pelicula[]>([])


  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
     getUltimasPeliculas().then(setUltimas).catch(console.error)
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

  // Datos mock por ahora
  const stats = {
    total: 1240,
    nuevasSemana: 12,
    sagasCompletas: 34,
    sagasIncompletas: 9,
    duplicados: 7,
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
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Últimas añadidas</h3>
            <p className="text-3xl font-bold mt-2">{stats.nuevasSemana}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Sagas</h3>
            <p className="mt-2">
              <Chip icon='' label='{stats.sagasCompletas} completas' color="blue" />
              <Chip icon='' label='{stats.sagasIncompletas} incompletas' color="gold" className="ml-2" />

            </p>
          </Card>
        </div>

        {/* Últimas añadidas */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Últimas añadidas</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ultimas.map((p) => (
              <Link key={p.id} to={`/movie/${p.id}`}>
                <div className="relative bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform group">
                  {p.cover ? (
                    <img
                      src={p.cover}
                      alt={p.titulo}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="h-48 bg-gray-700 flex items-center justify-center text-white">
                      {p.titulo}
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
                    <p className="text-white font-semibold text-sm">{p.titulo}</p>
                    <p className="text-gray-300 text-xs">{p.anyo} · {p.formato}</p>
                    <p className="text-gray-400 text-xs">{p.genero}</p>
                  </div>

                  {/* TÍTULO DEBAJO */}
                  <p className="p-2 text-center text-sm">{p.titulo}</p>
                </div>

              </Link>
            ))}
          </div>
        </Card>
      </div>


    </>
  )
}
