import { useParams, useNavigate } from "react-router-dom"

import { formatIconsFormat, formatIconsGenero } from "../../utils/formatIcons"
import Chip from "../../components/ui/Chip"
import { PencilLine, Undo2, Bot } from "lucide-react"
import { countries } from "../../utils/countries"
import { useEffect, useState } from "react"

import type { Serie } from "../../types/Serie"
import { getSerieById } from "../../api/seriesService"

export default function MovieDetail() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [serie, setSerie] = useState<Serie | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return

        getSerieById(Number(id))
            .then((data) => setSerie(data))
            .catch(() => navigate("/"))
            .finally(() => setLoading(false))
    }, [id, navigate])
    
    if (loading) return <div>Cargando...</div>
    if (!serie) {
        return (
            <div className="text-center mt-20">
                <p className="text-xl">Serie no encontrada</p>
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
SERIE
            <div className="flex flex-col md:flex-row gap-10">

                {/* Portada */}
                <div className="w-full md:w-1/5 flex-shrink-0">
                    {serie.coverSrc ? (
                        <img
                            src={serie.coverSrc}
                            alt={serie.title}
                            className="rounded-lg shadow-xl w-full object-cover border-4 border-lugus-gray"
                        />
                    ) : (
                        <div className="h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white border-4 border-lugus-gray">
                            {serie.title}
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
                        {serie.title} ({serie.startYear} - {serie.finishYear})
                    </h1>
                    <div className="w-full h-[1px] bg-[#2e303a]"></div>

                    {/* Rating + Género + Estado */}
                    <div className="flex text-lugus-gray text-sm mt-2 mb-2">
                        <span className="mr-2">⭐ "–" </span><div className="w-px text-lugus-muted/50">|</div><span className="text-lg ml-3 mr-3">{formatIconsGenero[serie.genreCode] ?? "💿"}</span> <span className="mr-2">{serie.genreDesc}</span><div className="w-px text-lugus-muted/50">|</div>
                    </div>

                    <div className="w-full h-[2px] bg-[#2e303a]"></div>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1">



            

                            <div className="w-full h-[2px] bg-[#2e303a]"></div>

                            <div className="grid grid-cols-1 md:grid-cols-1 gap-10 mb-10">
                                {/* Sinopsis */}
                                {serie.notes && (
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold mb-3">Sinopsis:</h2>
                                        <p className="text-sm leading-relaxed">{serie.notes}</p>
                                    </div>
                                )}

                            </div>
                        </div>
                        {/* TARJETA DE INFORMACIÓN ADICIONAL */}
                        <div className="bg-[#1f1f1f] border border-lugus-gray rounded-lg p-6 h-fit">

                            <h2 className="text-xl font-semibold mb-3">Información adicional</h2>
                            <div className="w-full h-px bg-lugus-gray mb-4"></div>

                            <ul className="text-sm space-y-2">
                                <li> <Chip icon={formatIconsFormat[serie.format] ?? "💿"} label={serie.format} color="blue" /></li>
                                <li><strong>Código:</strong> {serie.mgmtCode}</li>
                                <li><strong>Estantería:</strong> {serie.location ?? "–"}</li>
                                
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
