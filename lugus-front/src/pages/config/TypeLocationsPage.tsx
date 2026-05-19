import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { LocationType } from "../../types/Location"

export default function LocationTypesPage() {
  const [types, setTypes] = useState<LocationType[]>([])
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState<LocationType | null>(null)
  const [form, setForm] = useState({
    id: "",
    description: ""
  })

  // Cargar lista
  useEffect(() => {
    loadTypes()
  }, [])

  const loadTypes = async () => {
    const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/locationTypes")
    const data = await res.json()
    setTypes(data)
    setLoading(false)
  }

  // Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Crear / Editar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      id: Number(form.id),
      description: form.description
    }

    if (editing) {
      await fetchWithAuth(
        `http://localhost:8080/lugus/v1/api/locationTypes/${editing.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
    } else {
      await fetchWithAuth("http://localhost:8080/lugus/v1/api/locationTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    }

    resetForm()
    loadTypes()
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ id: "", description: "" })
  }

  // Borrar
  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar tipo de ubicación?")) return

    await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/locationTypes/${id}`,
      { method: "DELETE" }
    )

    loadTypes()
  }

  // Editar
  const startEdit = (t: LocationType) => {
    setEditing(t)
    setForm({
      id: String(t.id),
      description: t.description
    })
  }

  return (
    <div className="p-8 text-gray-200">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Tipos de ubicación</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-[#111] p-4 rounded border border-[#333] mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Editar tipo" : "Nuevo tipo"}
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
          <label className="block mb-1">Descripción</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
        >
          {editing ? "Guardar cambios" : "Crear tipo"}
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
              <th className="py-2">Descripción</th>
              <th className="py-2">Usos</th>
              <th className="py-2 w-32">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {types.map(t => (
              <tr key={t.id} className="border-b border-[#222]">
                <td className="py-2">{t.id}</td>
                <td className="py-2">{t.description}</td>
                <td className="py-2">{t.count}</td>
                <td className="py-2 flex gap-2">
                  <button
                    onClick={() => startEdit(t)}
                    className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500">
                    Editar
                  </button>
                {t.count === 0 && (  <button
                    onClick={() => handleDelete(t.id)}
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-500">
                    Borrar
                  </button>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
