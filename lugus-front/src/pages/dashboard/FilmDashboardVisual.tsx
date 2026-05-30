import { useEffect, useState } from "react"


import { Link } from "react-router-dom"
import SkeletonCard from "../../components/SkeletonCard"
import Card from "../../components/ui/Card"
import Chip from "../../components/ui/Chip"
import { getUltimasPeliculas, getUltimasPeliculasPorGenero } from "../../api/filmService"
import type { Pelicula } from "../../types/Pelicula"
import { getStats } from "../../api/statsService"
import type { FilmStats } from "../../types/FilmStats"
import { useAuth } from "../../context/AuthContext"
import { LayersMinus, Stars } from "lucide-react"
import Tab from "../../components/ui/Tab"
import { formatIconsFormat } from "../../utils/formatIcons"
import FormatPieChart from "../../components/ui/FormatPieChart"
import GenresBarChart from "../../components/ui/GenresBarChart"
import { useUserPreferences } from "../../api/useUserPreferences"
import { formatText } from "../../utils/textos"

export default function FilmDashboardVisual() {

  const [ultimas, setUltimas] = useState<Pelicula[]>([])
  const [stats, setStats] = useState<FilmStats>({
    totalFilms: 0,
    recentFilms: 0,
    completeGroups: 0,
    incompleteGroups: 0,
    vhs: 0,
    dvd: 0,
    bluray: 0,
    uhd: 0,
    digital: 0,
    notOwned: 0,
    generosPorCategoria: {
      arteEntretenimiento: 0,
      literaturaNarrativa: 0,
      cienciaFiccion: 0,
      accion: 0,
      misterio: 0,
      terror: 0,
      conflicto: 0,
      documental: 0
    }
  })


  // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
  const [isLoading, setIsLoading] = useState(true)
  const user = useAuth()
  const { favoritos } = useUserPreferences()
  const isAdmin = user?.roles?.includes("ROLE_ADMIN")
  const [favFilms, setFavFilms] = useState<Record<string, Pelicula[]>>({})

  useEffect(() => {
    getUltimasPeliculas().then(setUltimas).catch(console.error)
    getStats().then(setStats).catch(console.error)
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

useEffect(() => {
  if (!favoritos || favoritos.length === 0) return

  const load = async () => {
    const result: Record<string, Pelicula[]> = {}

    for (const fav of favoritos) {
      const films = await getUltimasPeliculasPorGenero(fav.codigo)
      result[fav.codigo] = films
    }

    setFavFilms(result)
  }

  load()
}, [favoritos])

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

  const percentTotalFilms = (stats.totalFilms - stats.notOwned) / stats.totalFilms * 100

  // GRID REAL
  return (

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* COLUMNA PRINCIPAL (3/4) */}
      <div className="md:col-span-3 space-y-8">

        {/* Tabs */}
        <div className="flex gap-6 border-b border-[#333] mb-6">
          <Tab to="/films">Resumen</Tab>
          <Tab to="/films/all">Todas</Tab>
          <Tab to="/films/bought">Compradas</Tab>
          <Tab to="/films/pending">Pendientes</Tab>
          <Tab to="/films/sagas" icon={<Stars />}>Sagas</Tab>
        </div>

        {/* Stats 1/3 + 2/3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LayersMinus className="w-5 h-5" />
              {stats.totalFilms} Total películas
            </h3>
          </Card>

          <Card className="md:col-span-2 flex flex-wrap items-center gap-3">
            {/* tus chips */}
            <div className="flex items-center gap-3">
              <Chip icon={formatIconsFormat['DVD']} label="" color="muted" title="DVD" /> {stats.dvd}
            </div>
            <div className="w-px h-5 bg-gray-600 opacity-40"></div>

            <div className="flex items-center gap-3">
              <Chip icon={formatIconsFormat['Blu-ray']} label="" color="blue" title="Blu-ray" /> {stats.bluray}
            </div>
            <div className="w-px h-5 bg-gray-600 opacity-40"></div>

            <div className="flex items-center gap-3">
              <Chip icon={formatIconsFormat['UHD']} label="" color="gold" title="UHD" /> {stats.uhd}
            </div>
            <div className="w-px h-5 bg-gray-600 opacity-40"></div>

            <div className="flex items-center gap-3">
              <Chip icon={formatIconsFormat['Digital']} label="" color="green" title="Digital" /> {stats.digital}
            </div>
            <div className="w-px h-5 bg-gray-600 opacity-40"></div>

            <div className="flex items-center gap-3">
              <Chip icon={formatIconsFormat['None']} label="" color="red" title="No Disponible" /> {stats.notOwned}
            </div>
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

                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    <p className="text-white font-semibold text-sm">{p.title}</p>
                    <p className="text-gray-300 text-xs">{p.year} · {p.format.descripcion}</p>
                    <p className="text-gray-400 text-xs">{p.genreDesc}</p>
                  </div>

                  <p className="p-2 text-center text-sm">{p.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Card>
        {/* cuatro o cinco peliculas por cada uno de los 4 generos favoritos */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {favoritos.map(fav => (
    <Card key={fav.codigo}>
      <h3 className="text-xl font-semibold mb-4">
        Películas de {formatText(fav.descripcion)}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {(favFilms[fav.codigo] || []).map(p => (
          <Link key={p.id} to={`/films/${p.id}`}>
            <div className="relative bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform group">
              {p.coverSrc ? (
                <img src={p.coverSrc} alt={p.title} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 bg-gray-700 flex items-center justify-center text-white">
                  {p.title}
                </div>
              )}

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <p className="text-white font-semibold text-sm">{p.title}</p>
                <p className="text-gray-300 text-xs">{p.year} · {p.format.descripcion}</p>
                <p className="text-gray-400 text-xs">{p.genreDesc}</p>
              </div>

              <p className="p-2 text-center text-sm">{p.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  ))}
</div>
        {/* Botones inferiores */}
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

      {/* COLUMNA DERECHA (1/4) */}
      <div className="md:col-span-1 space-y-6">

        <Card className="h-64">
          <h3 className="text-lg font-semibold mb-2">Distribución formatos</h3>
          <div className="md:col-span-1 space-y-6">
            <FormatPieChart stats={stats} />
          </div>

        </Card>

        <Card className="h-[410px]">
          <h3 className="text-lg font-semibold mb-2">Distribución por categoría</h3>
          <GenresBarChart stats={stats} />
        </Card>


        <Card className="h-64">
          <h3 className="text-lg font-semibold mb-2">Estado de la Colección</h3>
          <h5>Películas conseguidas</h5>
          <div className="relative w-full h-4 bg-gray-700 rounded overflow-hidden">

            <div
              className="h-full bg-lugus-green transition-all duration-500"
              style={{ width: `${percentTotalFilms}%` }}
            ></div>

            <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
              {percentTotalFilms.toFixed(1)}%
            </span>

          </div>
          <br />
          <br />
          <Chip icon="" label={`${stats.completeGroups} Sagas completas`} color="blue" />
          <br />
          <Chip icon="" label={`${stats.recentFilms} Último mes`} color="gold" />

        </Card>
      </div>

    </div >


  )
}
