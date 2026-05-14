import { useParams, useNavigate } from "react-router-dom"
import { peliculas } from "../../data/peliculasMock"
import { formatIcons } from "../../utils/formatIcons"
import Chip from "../../components/ui/Chip"

export default function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const movie = peliculas.find((p) => p.id === Number(id))

    if (!movie) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl">Película no encontrada</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-lugus-gold text-black rounded"
                >
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
                    {movie.cover ? (
                        <img
                            src={movie.cover}
                            alt={movie.titulo}
                            className="rounded-lg shadow-xl w-full object-cover border-4 border-lugus-gold"
                        />
                    ) : (
                        <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white border-4 border-lugus-gold">
                            {movie.titulo}
                        </div>
                    )}

                    {/* TRAILER PLACEHOLDER */}
                    <div className="flex items-center justify-center mt-8 mb-8">
                        <div className="w-full aspect-video bg-[#1f1f1f] border border-lugus-gold rounded-lg 
                    flex items-center justify-center text-lugus-gold text-sm">
                            Tráiler próximamente
                        </div>
                    </div>
                </div>

                <div className="flex-1">

                    {/* Título */}
                    <h1 className="text-xl font-bold mb-1">
                        {movie.titulo}
                    </h1>
                    <div className="w-full h-[1px] bg-[#2e303a]"></div>

                    {/* Rating + Género + Estado */}
                    <div className="text-lugus-gray text-sm mt-2 mb-2">
                        <Chip icon={formatIcons[movie.formato] ?? "💿"} label={movie.formato} color="blue" /> ⭐ {movie.rating ?? "–"} | {movie.genero} | Año Lanzamiento: {movie.anyo}
                    </div>

                    <div className="w-full h-[2px] bg-[#2e303a]"></div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1">



                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-sm mt-2 mb-2">
                                <p><strong>Director:</strong> {movie.directores?.map(d => d.nombre).join(", ")}</p>
                            </div>

                            <div className="w-full h-[2px] bg-[#2e303a]"></div>

                            {/* Reparto */}
                            {movie.actores && movie.actores.length > 0 && (
                                <div className="mb-8 mt-2">
                                    <ul className="space-y-1 text-sm">
                                        {movie.actores.map((a, i) => (
                                            <li key={i}>
                                                <strong>{a.nombre}</strong> – {a.personaje}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="w-full h-[2px] bg-[#2e303a]"></div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
                                {/* Sinopsis */}
                                {movie.sinopsis && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold mb-3">Sinopsis</h2>
                                        <p className="text-sm leading-relaxed">{movie.sinopsis}</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        {/* TARJETA DE INFORMACIÓN ADICIONAL */}
                        <div className="bg-[#1f1f1f] border border-lugus-gold rounded-lg p-6 h-fit">

                            <h2 className="text-xl font-semibold mb-3">Información adicional</h2>
                            <div className="w-full h-px bg-lugus-gold mb-4"></div>

                            <ul className="text-sm space-y-2">
                                <li><strong>Código:</strong> {movie.codigo}</li>
                                <li><strong>Estantería:</strong> {movie.location ?? "–"}</li>
                                <li><strong>Grupo:</strong> {movie.group ?? "–"}</li>
                                <li><strong>Estado:</strong> {movie.estado ?? "–"}</li>
                                <li><strong>Visto:</strong> {movie.visto ? "Sí" : "No"}</li>
                                <li><strong>Última revisión:</strong> {movie.ultimaRevision ?? "–"}</li>
                                <li><a
                                    href={movie.imdbUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-3 py-2 mt-4 rounded bg-[#1f1f1f] 
                                     border border-lugus-gold text-lugus-gold text-sm hover:bg-[#2a2a2a]"
                                >
                                    <span>🎬</span>
                                    Ver en IMDb
                                </a>
                                </li>
                                <li>
                                    <a
                                        href={movie.faUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-3 py-2 rounded bg-[#1f1f1f] 
             border border-lugus-gold text-lugus-gold text-sm hover:bg-[#2a2a2a]"
                                    >
                                        ⭐ Filmaffinity
                                    </a>

                                </li>
                            </ul>

                        </div>
                    </div>
                </div>


            </div>
            <div className="flex gap-4 mt-2">
                <button className="px-4 py-2 bg-lugus-gold text-black rounded">Editar</button>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-lugus-bgAlt border border-lugus-gold text-lugus-gold rounded"
                >
                    Volver
                </button>
            </div>
        </div>
    )
}
