import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"
import { fetchWithAuth } from "../../api/fetchWithAuth"

import type { Format } from "../../types/Format"
import type { Genre } from "../../types/Genre"
import type { Location } from "../../types/Location"
import type { Serie, Season } from "../../types/Serie"
import SeasonsEditor from "./SeasonsEditor"
const API_URL = import.meta.env.VITE_API_URL;

export default function SeriesEditPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formats, setFormats] = useState<Format[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [locations, setLocations] = useState<Location[]>([])

    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState<{
        title: string
        titleMgmt: string
        format: string
        location: string
        startYear: string
        finishYear: string
        genreCode: string
        mgmtCode: string
        notes: string
        owned: boolean
        completed: boolean
        seasons: Season[]
    }>({
        title: "",
        titleMgmt: "",
        format: "",
        location: "",
        startYear: "",
        finishYear: "",
        genreCode: "",
        mgmtCode: "",
        notes: "",
        owned: false,
        completed: false,
        seasons: []
    })

    const update = (key: string, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    useEffect(() => {
        if (id) loadSerie()
    }, [id])
    const loadSerie = async () => {
        const res = await fetchWithAuth(
            `${API_URL}/v1/api/series/${id}`
        )
        const data: Serie = await res.json()
        setForm({
            title: data.title,
            titleMgmt: data.titleMgmt,
            startYear: '' + data.startYear,
            finishYear: data.finishYear ? '' + data.finishYear : "",
            format: data.format.codigo,
            genreCode: data.genreCode,
            owned: data.owned,
            completed: data.completed,
            location: data.location ?? "",
            mgmtCode: data.mgmtCode,
            notes: data.notes ?? "",
            seasons: data.seasons ?? []   // ← AQUÍ VIENE LA MAGIA
        })

    }
    useEffect(() => {
        fetchWithAuth(`${API_URL}/v1/api/formats`)
            .then(res => res.json())
            .then(setFormats)
            .catch(console.error)

        fetchWithAuth(`${API_URL}/v1/api/genres`)
            .then(res => res.json())
            .then(setGenres)
            .catch(console.error)

        fetchWithAuth(`${API_URL}/v1/api/locations`)
            .then(res => res.json())
            .then(setLocations)
            .catch(console.error)
    }, [])


    const handleSave = async () => {
        setSaving(true)

        const payload = {
            ...form,
            startYear: Number(form.startYear),
            finishYear: form.finishYear ? Number(form.finishYear) : null
        }

        try {
            const res = await fetchWithAuth(
                `${API_URL}/v1/api/series/${id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload)
                }
            )

            if (!res.ok) throw new Error("Error al guardar la serie")

            navigate("/series/all")
        } catch (err) {
            console.error(err)
            alert("Error al guardar la serie")
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="p-6 space-y-8">

            <h1 className="text-2xl font-semibold text-[#d4af37]">
                Editar Serie
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Input
                    label="Título"
                    value={form.title}
                    onChange={v => update("title", v)}
                />

                <Input
                    label="Título Personal"
                    value={form.titleMgmt}
                    onChange={v => update("titleMgmt", v)}
                />

                <Select
                    label="Formato"
                    value={form.format}
                    onChange={v => update("format", v)}
                    options={formats.map(f => ({
                        label: f.descripcion,
                        value: f.codigo
                    }))}
                />

                <Select
                    label="Ubicación"
                    value={form.location}
                    onChange={v => update("location", v)}
                    options={locations.map(f => ({
                        label: f.descripcion,
                        value: f.codigo
                    }))}
                />

                <Input
                    label="Año inicio"
                    type="number"
                    value={form.startYear}
                    onChange={v => update("startYear", v)}
                />

                <Input
                    label="Año fin"
                    type="number"
                    value={form.finishYear}
                    onChange={v => update("finishYear", v)}
                />

                <Select
                    label="Género"
                    value={form.genreCode}
                    onChange={v => update("genreCode", v)}
                    options={genres.map(g => ({
                        label: g.descripcion,
                        value: g.codigo
                    }))}
                />

                <Input
                    label="Código Gestión"
                    value={form.mgmtCode}
                    onChange={v => update("mgmtCode", v)}
                />

                <SeasonsEditor
                    seasons={form.seasons ?? []}
                    onChange={v => update("seasons", v)}
                />


                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={form.owned}
                        onChange={e => update("owned", e.target.checked)}
                    />
                    <label className="text-sm text-gray-300">Comprada</label>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={form.completed}
                        onChange={e => update("completed", e.target.checked)}
                    />
                    <label className="text-sm text-gray-300">Completada</label>
                </div>

                <Input
                    label="Notas"
                    value={form.notes}
                    onChange={v => update("notes", v)}
                />
            </div>

            <button
                onClick={handleSave}
                disabled={saving}
                className={`px-6 py-2 rounded bg-[#d4af37] text-black hover:bg-[#b8962f] transition ${saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
            >
                {saving ? "Guardando..." : "Guardar Serie"}
            </button>

        </div>
    )
}
