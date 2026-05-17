import { useEffect, useState } from "react"
import { useFiltersContext } from "../../context/FiltersContext"

import SkeletonCard from "../../components/SkeletonCard"

import { getUltimasPeliculasForHome } from "../../api/peliculas"

import { getSeriesStats, getStats } from "../../api/stats"
import type { FilmStats } from "../../types/FilmStats"
import type { SeriesStats } from "../../types/SeriesStats"
import MediaSection, { type MediaItem } from "../../components/MediaSection"
import { getUltimasSeriesForHome } from "../../api/series"

export default function HomeDashboardVisual() {
    const { filters } = useFiltersContext()
    const [lastFilms, setLastFilms] = useState<MediaItem[]>([])
    const [lastSeries, setLastSeries] = useState<MediaItem[]>([])
    const [stats, setStats] = useState<FilmStats>({
        totalFilms: 0,
        recentFilms: 0,
        completeGroups: 0,
        incompleteGroups: 0
    })
    const [serieStats, setSerieStats] = useState<SeriesStats>({
        total: 0,
        recent: 0,
        completeGroups: 0,
        incompleteGroups: 0
    })

    // Simulación de carga (cuando conectemos backend, esto vendrá del fetch)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUltimasPeliculasForHome().then(setLastFilms).catch(console.error)
        getUltimasSeriesForHome().then(setLastSeries).catch(console.error)
        getStats().then(setStats).catch(console.error)
        getSeriesStats().then(setSerieStats).catch(console.error)
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
            <MediaSection
                title="Películas"
                total={stats.totalFilms}
                novedades={stats.recentFilms}
                items={lastFilms}
                linkTo="/films" />

            <MediaSection
                title="Series"
                total={serieStats.total}
                novedades={serieStats.recent}
                items={lastSeries}
                linkTo="/series" />
        </>
    )
}
