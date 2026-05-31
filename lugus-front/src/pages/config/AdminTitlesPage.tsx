import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../api/fetchWithAuth"

interface Title {
    id: number
    title: string
    year: number
    type: string
    posterUrl: string
    peliculaId: number | null
    seriesId: number | null
    imdbId: string
}

export default function AdminTitlesPage() {
    const [titles, setTitles] = useState<Title[]>([])
    const [loading, setLoading] = useState(true)

    const [editing, setEditing] = useState<Title | null>(null)
  
    const [form, setForm] = useState({
        id: "",
        title: "",
        year: "",
        type: "",
        posterUrl: "",
        peliculaId: "",
        seriesId: "",
        imdbId: ""
    })

    useEffect(() => {
        loadTitles()
    }, [])

    const loadTitles = async () => {
        const res = await fetchWithAuth("${import.meta.env.VITE_API_URL}/v1/api/titles")
        const data = await res.json()
        setTitles(data)
        setLoading(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const payload = {
            id: Number(form.id),
            title: form.title,
            year: form.year,
            type: form.type,
            posterUrl: form.posterUrl,
            peliculaId: form.peliculaId ? Number(form.peliculaId) : null,
            seriesId: form.seriesId ? Number(form.seriesId) : null,
            imdbId: form.imdbId
        }


        if (editing) {
            await fetchWithAuth(
                `${import.meta.env.VITE_API_URL}/v1/api/titles/${editing.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            )
        } else {
            await fetchWithAuth("${import.meta.env.VITE_API_URL}/v1/api/titles", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
        }

        resetForm()
        loadTitles()
    }

    const resetForm = () => {
        setEditing(null)
        setForm({ id: "", title: "", year: "", type: "", posterUrl: "", peliculaId: "", seriesId: "", imdbId: "" })
    }

    const handleDelete = async (id: number) => {
        if (!confirm("¿Eliminar título?")) return

        await fetchWithAuth(
            `${import.meta.env.VITE_API_URL}/v1/api/titles/${id}`,
            { method: "DELETE" }
        )

        loadTitles()
    }

    const startEdit = (s: Title) => {
        setEditing(s)
        setForm({
            id: String(s.id),
            title: s.title,
            year: String(s.year),
            type: s.type,
            posterUrl: s.posterUrl,
            peliculaId: s.peliculaId ? String(s.peliculaId) : "",
            seriesId: s.seriesId ? String(s.seriesId) : "",
            imdbId: s.imdbId
        })
    }

    return (
        <div className="p-8 text-gray-200">
            <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Títulos</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="bg-[#111] p-4 rounded border border-[#333] mb-8">
                <h2 className="text-lg font-semibold mb-4">
                    {editing ? "Editar título" : "Nuevo título"}
                </h2>

                <div className="mb-4">
                    <label className="block mb-1">ID</label>
                    <input
                        name="id"
                        value={form.id}
                        onChange={handleChange}
                        disabled={!!editing}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Nombre</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Año</label>
                    <input
                        name="year"
                        value={form.year}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Tipo</label>
                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    >
                        <option value="MOVIE">Película</option>
                        <option value="SERIES">Serie</option>
                        <option value="EXTERNAL">Externa</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1">URL de portada</label>
                    <input
                        name="posterUrl"
                        value={form.posterUrl}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">ID película (opcional)</label>
                    <input
                        name="peliculaId"
                        value={form.peliculaId}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">ID serie (opcional)</label>
                    <input
                        name="seriesId"
                        value={form.seriesId}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">ID IMDb (opcional)</label>
                    <input
                        name="imdbId"
                        value={form.imdbId}
                        onChange={handleChange}
                        className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
                    />
                </div>


                <button
                    type="submit"
                    className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
                >
                    {editing ? "Guardar cambios" : "Crear saga"}
                </button>

                {editing && (
                    <button
                        type="button"
                        onClick={resetForm}
                        className="ml-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {/* LISTADO */}
            {loading ? (
                <div>Cargando…</div>
            ) : (
                <table className="w-full text-left border-collapse">
                    <thead className="border-b border-[#333] text-gray-400">
                        <tr>
                            <th className="py-2">Nombre</th>
                            <th className="py-2">Tipo</th>
                            <th className="py-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {titles.map(s => (
                            <tr key={s.id} className="border-b border-[#222]">
                                <td className="py-2">{s.title}</td>
                                <td className="py-2 text-gray-400">{s.type}</td>

                                <td className="py-2 flex gap-2">
                                    <button
                                        onClick={() => startEdit(s)}
                                        className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500">
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s.id)}
                                        className="px-2 py-1 bg-red-600 rounded hover:bg-red-500">
                                        Borrar
                                    </button>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
