import { useEffect, useState } from "react"


import { Link } from "react-router-dom"
import SkeletonCard from "../../components/SkeletonCard"
import Card from "../../components/ui/Card"


import { getSeriesStats } from "../../api/statsService"

import type { Serie } from "../../types/Serie"
import type { SeriesStats } from "../../types/SeriesStats"
import { getUltimasSeries } from "../../api/seriesService"
import Chip from "../../components/ui/Chip"
import Tab from "../../components/ui/Tab" 
import { Stars } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function FilmDashboardVisual() {
  const user = useAuth()

  const isAdmin = user?.roles?.includes("ROLE_ADMIN")
  const [last, setLast] = useState<Serie[]>([])
  const [stats, setStats] = useState<SeriesStats>({
    total: 0,
    recent: 0,
    completeGroups: 0,
    incompleteGroups: 0
  })


  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUltimasSeries().then(setLast).catch(console.error)
    getSeriesStats().then(setStats).catch(console.error)
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
      <div className="space-y-8">
        <div className="flex gap-6 border-b border-[#333] mb-6">
          <Tab to="/series">Resumen</Tab>
          <Tab to="/series/all">Todas</Tab>
          <Tab to="/series/bought">Completas</Tab>
          <Tab to="/series/pending">Incompletas</Tab>
          <Tab to="/series/sagas" icon={<Stars />}>Sagas</Tab>
        </div>
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-lg font-semibold">Total series</h3>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold">Nuevas último mes</h3>
            <p className="text-3xl font-bold mt-2">{stats.recent}</p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold">Series</h3>
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
            {last.map((p) => (
              <Link key={p.id} to={`/series/${p.id}`}>
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
                    <p className="text-gray-300 text-xs">{p.startYear} · {p.format.codigo}</p>
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
              to="/series/new"
              className="px-3 py-1 border border-[#d4af37] text-[#d4af37] rounded hover:bg-[#d4af37] hover:text-black transition-colors">
              + Añadir
            </Link>
          )}


        </div>
      </div>

  )
}
