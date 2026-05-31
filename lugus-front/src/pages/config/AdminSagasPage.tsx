import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import { useNavigate } from "react-router-dom"

interface Saga {
  id: number
  name: string
  description: string
  cover: string
  movieCount: number
  filmaffinityId: number
}

export default function AdminSagasPage() {
  const [sagas, setSagas] = useState<Saga[]>([])
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState<Saga | null>(null)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    cover: "",
    filmaffinityId: ""
  })

  useEffect(() => {
    loadSagas()
  }, [])

  const loadSagas = async () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetchWithAuth(`${API_URL}/v1/api/groups`)
    const data = await res.json()
    setSagas(data)
    setLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const API_URL = import.meta.env.VITE_API_URL;
    const payload = {
      id: Number(form.id),
      name: form.name,
      description: form.description,
      cover: form.cover,
      filmaffinityId: Number(form.filmaffinityId)
    }

    if (editing) {
      await fetchWithAuth(
        `${API_URL}/v1/api/groups/${editing.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
    } else {
      await fetchWithAuth(`${API_URL}/v1/api/groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    }

    resetForm()
    loadSagas()
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ id: "", name: "", description: "", cover: "", filmaffinityId: "" })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar saga?")) return
    const API_URL = import.meta.env.VITE_API_URL;
    await fetchWithAuth(
      `${API_URL}/v1/api/groups/${id}`,
      { method: "DELETE" }
    )

    loadSagas()
  }

  const startEdit = (s: Saga) => {
    setEditing(s)
    setForm({
      id: String(s.id),
      name: s.name,
      description: s.description,
      cover: s.cover,
      filmaffinityId: String(s.filmaffinityId)
    })
  }

  return (
    <div className="p-8 text-gray-200">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Sagas</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-[#111] p-4 rounded border border-[#333] mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Editar saga" : "Nueva saga"}
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
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded h-24"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Id FilmAffinity</label>
          <input
            name="filmaffinityId"
            value={form.filmaffinityId}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">URL de portada</label>
          <input
            name="cover"
            value={form.cover}
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
              <th className="py-2">ID</th>
              <th className="py-2">Nombre</th>
              <th className="py-2">Películas</th>
              <th className="py-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {sagas.map(s => (
              <tr key={s.id} className="border-b border-[#222]">
                <td className="py-2">{s.id}</td>
                <td className="py-2">{s.name}</td>
                <td className="py-2 text-gray-400">{s.movieCount}</td>

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
                  <button
                    onClick={() => navigate(`/admin/sagas/${s.id}/titles`)}
                    className="px-2 py-1 bg-purple-600 rounded hover:bg-purple-500">
                    Títulos
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
