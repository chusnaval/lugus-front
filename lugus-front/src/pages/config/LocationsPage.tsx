import { useEffect, useState } from "react"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { Location, LocationType } from "../../types/Location"

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([])
  const [locationTypes, setLocationTypes] = useState<LocationType[]>([])
  const [loading, setLoading] = useState(true)

  const [editing, setEditing] = useState<Location | null>(null)
  const [form, setForm] = useState({
    codigo: "",
    descripcion: "",
    locationTypeId: ""
  })

  // Cargar datos
  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    const [locRes, typeRes] = await Promise.all([
      fetchWithAuth("http://localhost:8080/lugus/v1/api/locations"),
      fetchWithAuth("http://localhost:8080/lugus/v1/api/locationTypes")
    ])

    setLocations(await locRes.json())
    setLocationTypes(await typeRes.json())
    setLoading(false)
  }

  // Form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Crear / Editar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      codigo: form.codigo,
      descripcion: form.descripcion,
      locationType: { id: Number(form.locationTypeId) }
    }

    if (editing) {
      await fetchWithAuth(
        `http://localhost:8080/lugus/v1/api/locations/${editing.codigo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      )
    } else {
      await fetchWithAuth("http://localhost:8080/lugus/v1/api/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
    }

    resetForm()
    loadAll()
  }

  const resetForm = () => {
    setEditing(null)
    setForm({ codigo: "", descripcion: "", locationTypeId: "" })
  }

  // Borrar
  const handleDelete = async (codigo: string) => {
    if (!confirm("¿Eliminar ubicación?")) return

    await fetchWithAuth(
      `http://localhost:8080/lugus/v1/api/locations/${codigo}`,
      { method: "DELETE" }
    )

    loadAll()
  }

  // Editar
  const startEdit = (loc: Location) => {
    setEditing(loc)
    setForm({
      codigo: loc.codigo,
      descripcion: loc.descripcion,
      locationTypeId: String(loc.locationType?.id ?? "")
    })
  }

  return (
    <div className="p-8 text-gray-200">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Gestión de ubicaciones</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="bg-[#111] p-4 rounded border border-[#333] mb-8">
        <h2 className="text-lg font-semibold mb-4">
          {editing ? "Editar ubicación" : "Nueva ubicación"}
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Código</label>
          <input
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
            disabled={!!editing}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Descripción</label>
          <input
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Tipo de ubicación</label>
          <select
            name="locationTypeId"
            value={form.locationTypeId}
            onChange={handleChange}
            className="w-full bg-[#0d0d0d] border border-[#333] p-2 rounded"
          >
            <option value="">Selecciona tipo</option>
            {locationTypes.map(t => (
              <option key={t.id} value={t.id}>
                {t.description}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
        >
          {editing ? "Guardar cambios" : "Crear ubicación"}
        </button>

        {editing && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-4 px-4 py-2 bg-gray-600 rounded hover:bg-gray-500">
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
              <th className="py-2">Código</th>
              <th className="py-2">Descripción</th>
              <th className="py-2">Usos</th>
              <th className="py-2">Tipo</th>
              <th className="py-2 w-32">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {locations.map(loc => (
              <tr key={loc.codigo} className="border-b border-[#222]">
                <td className="py-2">{loc.codigo}</td>
                <td className="py-2">{loc.descripcion}</td>
                <td className="py-2 text-gray-400">{loc.count}</td>
                <td className="py-2">{loc.locationType?.description}</td>
                

                <td className="py-2 flex gap-2">
                  <button
                    onClick={() => startEdit(loc)}
                    className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-500">
                    Editar
                  </button>
                 {loc.count === 0 && ( <button
                    onClick={() => handleDelete(loc.codigo)}
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
