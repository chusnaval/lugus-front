import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMovie } from "../../api/filmService"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { Location } from "../../types/Location"
import type { Format } from "../../types/Format"
import type { Genre } from "../../types/Genre"
 const API_URL = import.meta.env.VITE_API_URL;  

export default function AddMoviePage() {
    const [locations, setLocations] = useState<Location[]>([])
    const [formats, setFormats] = useState<Format[]>([])
    const [genres, setGenres] = useState<Genre[]>([])

    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        titleMgmt: "",
        year: "",
        format: null as Format | null,
        genreCode: "",
        coverSrc: "",
        imdbId: "",
        faId: "",
        steelbook: false,
        slipcover: false,
        owned: false,
        location: "",
        mngtCode: "",
        notes: ""
    })

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
        await createMovie(form)
        navigate("/films")
    }


    return (
        <div className="p-8 text-gray-200">
            <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Añadir película</h1>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">

                {/* Título */}
                <div>
                    <label className="block mb-1">Título</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Título gestión */}
                <div>
                    <label className="block mb-1">Título (gestión)</label>
                    <input
                        name="titleMgmt"
                        value={form.titleMgmt}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Año */}
                <div>
                    <label className="block mb-1">Año</label>
                    <input
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Formato */}
                <div>
                    <label className="block mb-1">Formato</label>
                    <select
                        name="format"
                        value={form.format?.codigo ?? ""}
                        onChange={(e) => {
                            const fmt = formats.find(f => f.codigo === e.target.value)
                            setForm({ ...form, format: fmt || null })
                        }}
                        className="bg-[#111] border border-[#333] p-2 rounded w-full"
                    >
                        <option value="">Selecciona formato</option>
                        {formats.map(fmt => (
                            <option key={fmt.codigo} value={fmt.codigo}>{fmt.descripcion}</option>
                        ))}
                    </select>
                </div>

                {/* Género */}
                <div>
                    <label className="block mb-1">Género</label>
                    <select
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
                    <label className="block mb-1">Portada (URL)</label>
                    <input
                        name="coverSrc"
                        value={form.coverSrc}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* IMDb ID */}
                <div>
                    <label className="block mb-1">IMDb ID</label>
                    <input
                        name="imdbId"
                        value={form.imdbId}
                        onChange={handleChange}
                        placeholder="tt1234567"
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Filmaffinity ID */}
                <div>
                    <label className="block mb-1">Filmaffinity ID</label>
                    <input
                        name="faId"
                        value={form.faId}
                        onChange={handleChange}
                        placeholder="123456"
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Flags */}
                <div className="grid grid-cols-2 gap-4">

                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="steelbook" checked={form.steelbook} onChange={handleChange} />
                        <span>Steelbook</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="slipcover" checked={form.slipcover} onChange={handleChange} />
                        <span>Slipcover</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input type="checkbox" name="owned" checked={form.owned} onChange={handleChange} />
                        <span>Comprada</span>
                    </label>
                </div>

                {/* Ubicación */}
                <div>
                    <label className="block mb-1">Ubicación</label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="bg-[#111] border border-[#333] p-2 rounded w-full">
                        <option value="">Selecciona ubicación</option>
                        {locations.map(loc => (
                            <option key={loc.codigo} value={loc.codigo}>{loc.descripcion}</option>
                        ))}
                    </select>
                </div>

                {/* Código gestión */}
                <div>
                    <label className="block mb-1">Código gestión</label>
                    <input
                        name="mngtCode"
                        value={form.mngtCode}
                        onChange={handleChange}
                        placeholder="GEN-TIT-YYY-1"
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Notas */}
                <div>
                    <label className="block mb-1">Notas</label>
                    <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded h-24"
                    />
                </div>

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
