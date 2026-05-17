import { useParams, useNavigate } from "react-router-dom"
import { getFilmById } from "../../api/filmService"
import { formatIconsFormat, formatIconsGenero } from "../../utils/formatIcons"
import Chip from "../../components/ui/Chip"
import { PencilLine, Undo2, Bot } from "lucide-react"
import { countries } from "../../utils/countries"
import { useEffect, useState } from "react"
import type { Pelicula } from "../../types/Pelicula"
import Rating from "../../components/ui/Rating"

export default function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [movie, setMovie] = useState<Pelicula | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        getFilmById(Number(id))
            .then((data) => setMovie(data))
            .catch(() => navigate("/"))
            .finally(() => setLoading(false))
    }, [id, navigate])
    
    if (loading) return <div>Cargando...</div>
    if (!movie) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl">Película no encontrada</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-lugus-gray text-black rounded">
                    Volver
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-[1600px] mx-auto px-8">

            <div className="flex flex-col md:flex-row gap-10">

                {/* Portada */}
                <div className="w-full md:w-1/5 flex-shrink-0">
                    {movie.coverSrc ? (
                        <img
                            src={movie.coverSrc}
                            alt={movie.title}
                            className="rounded-lg shadow-xl w-full object-cover border-4 border-lugus-gray"
                        />
                    ) : (
                        <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white border-4 border-lugus-gray">
                            {movie.title}
                        </div>
                    )}

                    {/* TRAILER PLACEHOLDER */}
                    <div className="flex items-center justify-center mt-8 mb-8">
                        <div className="w-full aspect-video bg-[#1f1f1f] border border-lugus-red rounded-lg 
                    flex items-center justify-center text-lugus-gray text-sm">
                            Tráiler próximamente
                        </div>
                    </div>
                </div>

                <div className="flex-1">

                    {/* Título */}
                    <h1 className="text-xl font-bold mb-1">
                        {movie.title} ({movie.year})
                    </h1>
                    <div className="w-full h-[1px] bg-[#2e303a]"></div>

                    {/* Rating + Género + Estado */}
                    <div className="flex text-lugus-gray text-sm mt-2 mb-2">
                        <Rating value={movie.rating} /><div className="w-px text-lugus-muted/50">|</div><span className="text-lg ml-3 mr-3">{formatIconsGenero[movie.genreCode] ?? "💿"}</span> <span className="mr-2">{movie.genreDesc}</span><div className="w-px text-lugus-muted/50">|</div><span className="ml-3">País: {countries[movie.country]?.flag}  {countries[movie.country]?.name}</span>
                    </div>

                    <div className="w-full h-[2px] bg-[#2e303a]"></div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1">



                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm mt-2 mb-2">
                                <p><strong>Director:</strong> {movie.director?.map(d => d.name).join(", ")}</p>
                            </div>

                            <div className="w-full h-[2px] bg-[#2e303a]"></div>

                            {/* Reparto */}
                            {movie.casting && movie.casting.length > 0 && (
                                <div className="mb-8 mt-2">
                                    <ul className="space-y-1 text-sm">
                                        {movie.casting.map((a, i) => (
                                            <li key={i}>
                                                <strong>{a.name}</strong> – {a.character}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="w-full h-[2px] bg-[#2e303a]"></div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
                                {/* Sinopsis */}
                                {movie.synopsis && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold mb-3">Sinopsis:</h2>
                                        <p className="text-sm leading-relaxed">{movie.synopsis}</p>
                                    </div>
                                )}

                            </div>


                            <div className="w-full h-[2px] bg-[#2e303a]"></div>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
                                {/* Notas */}
                                {movie.notes && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold mb-3">Notas:</h2>
                                        <p className="text-sm leading-relaxed">{movie.notes}</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        {/* TARJETA DE INFORMACIÓN ADICIONAL */}
                        <div className="bg-[#1f1f1f] border border-lugus-gray rounded-lg p-6 h-fit">

                            <h2 className="text-xl font-semibold mb-3">Información adicional</h2>
                            <div className="w-full h-px bg-lugus-gray mb-4"></div>

                            <ul className="text-sm space-y-2">
                                <li> <Chip icon={formatIconsFormat[movie.format] ?? "💿"} label={movie.format} color="blue" /></li>
                                <li><strong>Código:</strong> {movie.mgmtCode}</li>
                                <li><strong>Comprado:</strong> {movie.owned ? "Sí" : "No"}</li>
                                <li><strong>Estantería:</strong> {movie.location ?? "–"}</li>
                                <li><strong>Grupo:</strong> {movie.group? movie.group.name : '-'}</li>
                                <li><strong>Estado:</strong> {movie.condition?.desc}</li>
                                <li><strong>Visto:</strong> {movie.watched ? "Sí" : "No"}</li>
                                <li><strong>Steelbook:</strong> {movie.steelbook ? "Sí" : "No"}</li>
                                <li><strong>Funda:</strong> {movie.slipcover ? "Sí" : "No"}</li>
                                <li><strong>Última revisión:</strong> {movie.lastSeen ?? "–"}</li>
                                <li><a href={movie.imdbUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 mt-4 rounded bg-[#1f1f1f] 
                                     border border-lugus-gray text-lugus-gray text-sm hover:bg-[#2a2a2a]">
                                    <span><img src="/icons/IMDb_square.svg" alt="Ver en IMDb"  className="w-6 h-6 inline-block" /></span> Ver en IMDb
                                </a>
                                </li>
                                <li>
                                    <a
                                        href={movie.faUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#1f1f1f] 
                                         border border-lugus-gray text-lugus-gray text-sm hover:bg-[#2a2a2a]">
                                        <img src="/icons/filmaff.png" alt="Ver en Filmaffinity"  className="w-6 h-6 inline-block" /> Ver en Filmaffinity
                                    </a>

                                </li>
                            </ul>

                        </div>
                    </div>
                </div>


            </div>
            <div className="flex gap-4 mt-2">
                <button className="flex gap-2 px-4 py-2 bg-lugus-bgAlt border border-lugus-gray text-lugus-gray rounded"> <PencilLine className="w-4 h-4 text-lugus-gray" /> Editar</button>
                <button
                    onClick={() => navigate(-1)}
                    className="flex gap-2 px-4 py-2 bg-lugus-bgAlt border border-lugus-gray text-lugus-gray rounded">
                    <Undo2 className="w-4 h-4 text-lugus-gray" />Volver
                </button>
            </div>
        </div>
    )
}
