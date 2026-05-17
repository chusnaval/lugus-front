import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import Chip from "../../components/ui/Chip"
import { useEffect, useState } from "react"
import type { Pelicula } from "../../types/Pelicula"
import type { FilmStats } from "../../types/FilmStats"
import { getUltimasPeliculas } from "../../api/filmService"
import { getStats } from "../../api/statsService"
import SkeletonCard from "../../components/SkeletonCard"

export default function DashboardText() {
  const [ultimas, setUltimas] = useState<Pelicula[]>([])
  const [stats, setStats] = useState<FilmStats>({
    totalFilms: 0,
    recentFilms: 0,
    completeGroups: 0,
    incompleteGroups: 0
  })


  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUltimasPeliculas().then(setUltimas).catch(console.error)
    getStats().then(setStats).catch(console.error)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
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

        <Table
          columns={[
            { key: "title", label: "Título" },
            { key: "year", label: "Año" },
            { key: "format", label: "Formato" },
            { key: "genreDesc", label: "Genero" },
          ]}
          data={ultimas}
        />
      </Card>



    </div>
  )
}
