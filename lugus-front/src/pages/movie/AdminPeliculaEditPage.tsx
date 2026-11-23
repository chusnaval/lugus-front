import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { update } from "../../api/filmService"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { Location } from "../../types/Location"
import type { Format } from "../../types/Format"
import type { Genre } from "../../types/Genre"
import type { Pelicula } from "../../types/Pelicula"

const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPeliculaEditPage() {
    const { id } = useParams()
    const [locations, setLocations] = useState<Location[]>([])
    const [formats, setFormats] = useState<Format[]>([])
    const [genres, setGenres] = useState<Genre[]>([])

    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        titleMgmt: "",
        year: "",
        genreCode: "",
        coverSrc: "",
        imdbId: "",
        faId: "",
        trailerUrl: "",
        duration: 0,

        editions: [] as {
            condition: any
            id: number
            formatCode: string
            steelbook: boolean
            slipcover: boolean
            owned: boolean
            location: string
            mngtCode: string
            notes: string
        }[]
    })



    useEffect(() => {
        if (id) loadFilm()
    }, [id])

    const loadFilm = async () => {
        const res = await fetch(`${API_URL}/v1/api/films/${id}`, {
            credentials: "include",
            headers: { "Content-Type": "application/json" }
        })

        const data: Pelicula = await res.json()

        setForm({
            title: data.title,
            titleMgmt: data.titleMgmt,
            year: '' + data.year,
            genreCode: data.genreCode,
            coverSrc: data.coverSrc ?? "",
            imdbId: data.imdbId ?? "",
            faId: "",
            trailerUrl: data.trailerUrl ?? "",
            duration: data.duration ?? 0,

            editions: data.editions.map(ed => ({
                condition: ed.condition ?? "",
                id: ed.id,
                formatCode: ed.format?.codigo ?? "",
                steelbook: ed.steelbook,
                slipcover: ed.slipcover,
                owned: ed.owned,
                location: ed.locationCode ?? "",
                mngtCode: ed.mgmtCode,
                notes: ed.notes ?? ""
            }))
        })
    }

    const updateEdition = (index: number, field: string, value: any) => {
        const updated = [...form.editions]
        updated[index] = { ...updated[index], [field]: value }
        setForm({ ...form, editions: updated })
    }

    const addEdition = () => {
        setForm({
            ...form,
            editions: [
                ...form.editions,
                {
                    condition: "",
                    id: 0,
                    formatCode: "",
                    steelbook: false,
                    slipcover: false,
                    owned: false,
                    location: "",
                    mngtCode: "",
                    notes: ""
                }
            ]
        })
    }

    const removeEdition = (index: number) => {
        setForm({
            ...form,
            editions: form.editions.filter((_, i) => i !== index)
        })
    }


    useEffect(() => {
        const load = async () => {
            const [locRes, fmtRes, genRes] = await Promise.all([
                fetchWithAuth(`${API_URL}/v1/api/locations`),
                fetchWithAuth(`${API_URL}/v1/api/formats`),
                fetchWithAuth(`${API_URL}/v1/api/genres`)
            ])
            setLocations(await locRes.json())
            setFormats(await fmtRes.json())
            setGenres(await genRes.json())

        }

        load()
    }, [])


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target

        setForm({
            ...form,
            [target.name]:
                target instanceof HTMLInputElement && target.type === "checkbox"
                    ? target.checked
                    : target.value
        })
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data: Pelicula = {
            id: Number(id),
            title: form.title,
            titleMgmt: form.titleMgmt,
            year: Number(form.year),
            genreCode: form.genreCode,
            coverSrc: form.coverSrc,
            imdbId: form.imdbId,
            trailerUrl: form.trailerUrl,
            duration: form.duration,

            editions: form.editions.map(ed => ({
                id: ed.id,

                formatCode: ed.formatCode,
                format: null,
                steelbook: ed.steelbook,
                slipcover: ed.slipcover,
                owned: ed.owned,

                location: ed.location,
                mgmtCode: ed.mngtCode,
                notes: ed.notes,

                condition: ed.condition
                    ? {
                         id: ed.condition.id,
                         desc:  ed.condition.desc 
                    }
                    : null
            })),

            genreDesc: "",
            director: [],
            casting: [],
            country: "",
            mine: false,
            favorite: false,
            watched: false,
            notes: ""
        }



        await update(data)
        navigate(-1)
    }


    return (
        <div className="p-8 text-gray-200">
            <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Editar película</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

                {/* Título */}
                <div>
                    <label htmlFor="title" className="block mb-1">Título</label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Título gestión */}
                <div>
                    <label htmlFor="titleMgmt" className="block mb-1">Título (gestión)</label>
                    <input
                        id="titleMgmt"
                        name="titleMgmt"
                        value={form.titleMgmt}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Año */}
                <div>
                    <label htmlFor="year" className="block mb-1">Año</label>
                    <input
                        id="year"
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>
                <div>
                    <label htmlFor="duration" className="block mb-1">Duración</label>
                    <input
                        id="duration"
                        name="duration"
                        value={form.duration}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Género */}
                <div>
                    <label htmlFor="genreCode" className="block mb-1">Género</label>
                    <select
                        id="genreCode"
                        name="genreCode"
                        value={form.genreCode}
                        onChange={handleChange}
                        className="bg-[#111] border border-[#333] p-2 rounded w-full"
                    >
                        <option value="">Selecciona género</option>
                        {genres.map(g => (
                            <option key={g.codigo} value={g.codigo}>{g.descripcion}</option>
                        ))}
                    </select>
                </div>

                {/* Portada */}
                <div>
                    <label htmlFor="coverSrc" className="block mb-1">Portada (URL)</label>
                    <input
                        id="coverSrc"
                        name="coverSrc"
                        value={form.coverSrc}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* IMDb ID */}
                <div>
                    <label htmlFor="imdbId" className="block mb-1">IMDb ID</label>
                    <input
                        id="imdbId"
                        name="imdbId"
                        value={form.imdbId}
                        onChange={handleChange}
                        placeholder="tt1234567"
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="trailerUrl" className="block mb-1">Trailer oficial (YouTube)</label>
                    <input
                        id="trailerUrl"
                        name="trailerUrl"
                        value={form.trailerUrl}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                <h2 className="text-xl font-bold text-[#d4af37] mt-10">Ediciones</h2>

                {form.editions.map((ed, idx) => (
                    <div key={idx} className="border border-[#333] p-4 rounded mt-4">

                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold">Edición {idx + 1}</h3>

                            {form.editions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeEdition(idx)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    Eliminar
                                </button>
                            )}
                        </div>

                        {/* Formato */}
                        <label htmlFor={`edition-format-${idx}`} className="block mb-1">Formato</label>
                        <select
                            id={`edition-format-${idx}`}
                            value={ed.formatCode}
                            onChange={(e) => updateEdition(idx, "formatCode", e.target.value)}
                            className="bg-[#111] border border-[#333] p-2 rounded w-full"
                        >
                            <option value="">Selecciona formato</option>
                            {formats.map(fmt => (
                                <option key={fmt.codigo} value={fmt.codigo}>{fmt.descripcion}</option>
                            ))}
                        </select>

                        {/* Flags */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={ed.steelbook}
                                    onChange={(e) => updateEdition(idx, "steelbook", e.target.checked)}
                                />
                                <span>Steelbook</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={ed.slipcover}
                                    onChange={(e) => updateEdition(idx, "slipcover", e.target.checked)}
                                />
                                <span>Slipcover</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={ed.owned}
                                    onChange={(e) => updateEdition(idx, "owned", e.target.checked)}
                                />
                                <span>Comprada</span>
                            </label>
                        </div>

                        {/* Ubicación */}
                        <label htmlFor={`edition-location-${idx}`} className="block mt-4 mb-1">Ubicación</label>
                        <select
                            id={`edition-location-${idx}`}
                            value={ed.location}
                            onChange={(e) => updateEdition(idx, "location", e.target.value)}
                            className="bg-[#111] border border-[#333] p-2 rounded w-full">
                            <option value="">Selecciona ubicación</option>
                            {locations.map(loc => (
                                <option key={loc.codigo} value={loc.codigo}>{loc.descripcion}</option>
                            ))}
                        </select>

                        {/* Código gestión */}
                        <label htmlFor={`edition-mngt-code-${idx}`} className="block mt-4 mb-1">Código gestión</label>
                        <input
                            id={`edition-mngt-code-${idx}`}
                            value={ed.mngtCode}
                            onChange={(e) => updateEdition(idx, "mngtCode", e.target.value)}
                            className="w-full bg-[#111] border border-[#333] p-2 rounded"
                        />

                        {/* Notas */}
                        <label htmlFor={`edition-notes-${idx}`} className="block mt-4 mb-1">Notas</label>
                        <textarea
                            id={`edition-notes-${idx}`}
                            value={ed.notes}
                            onChange={(e) => updateEdition(idx, "notes", e.target.value)}
                            className="w-full bg-[#111] border border-[#333] p-2 rounded h-20"
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addEdition}
                    className="mt-4 px-3 py-2 bg-[#444] rounded hover:bg-[#555]"
                >
                    + Añadir otra edición
                </button>




                {/* Botón */}
                <button
                    type="submit"
                    className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
                >
                    Guardar película
                </button>
            </form>
        </div>
    )
}
