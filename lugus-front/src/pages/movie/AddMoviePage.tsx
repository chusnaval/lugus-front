import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createMovie } from "../../api/filmService"



export default function AddMoviePage() {
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        titleMgmt: "",
        year: "",
        format: "",
        genre: "",
        coverSrc: "",
        imdbId: "",
        faId: "",
        pack: false,
        steelbook: false,
        slipcover: false,
        owned: false,
        location: "",
        mngtCode: "",
        notes: ""
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
                    <input
                        name="format"
                        value={form.format}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Género */}
                <div>
                    <label className="block mb-1">Género</label>
                    <input
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
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
                        <input type="checkbox" name="pack" checked={form.pack} onChange={handleChange} />
                        <span>Pack</span>
                    </label>

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
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Estantería 3, balda 2"
                        className="w-full bg-[#111] border border-[#333] p-2 rounded"
                    />
                </div>

                {/* Código gestión */}
                <div>
                    <label className="block mb-1">Código gestión</label>
                    <input
                        name="mngtCode"
                        value={form.mngtCode}
                        onChange={handleChange}
                        placeholder="LUG-00123"
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
