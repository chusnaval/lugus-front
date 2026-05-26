import { useNavigate } from "react-router-dom"

export default function AdminConfigPage() {
  const navigate = useNavigate()

  const items = [
    { label: "Ubicaciones", path: "/admin/locations" },
    { label: "Tipos de ubicación", path: "/admin/location-types" },
    { label: "Sagas", path: "/admin/sagas" },
    { label: "Carátulas", path: "/admin/covers" }

  ]

  return (
    <div className="p-8 text-gray-200">
      <h1 className="text-2xl font-bold text-[#d4af37] mb-6">Configuración del sistema</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="bg-[#111] border border-[#333] p-6 rounded-lg hover:bg-[#1a1a1a] transition text-left">
            <h2 className="text-xl font-semibold text-[#d4af37] mb-2">{item.label}</h2>
            <p className="text-gray-400 text-sm">
              Gestionar {item.label.toLowerCase()}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
