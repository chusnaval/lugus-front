import { useNavigate } from "react-router-dom"

export interface FilmographyItem {
  id: number
  imdbId: string
  title: string
  year: number
  role: string
  owned: boolean
  registered: boolean
  type: string
}

export default function FilmographyTable({ items }: { items: FilmographyItem[] }) {
  const navigate = useNavigate()
  const tipos = new Set(['movie', 'tvMovie', 'short', 'tvSpecial'])
  const getStatusColor = (item: FilmographyItem) => {
    if (item.owned) return "bg-green-500"     // comprada
    if (item.registered) return "bg-yellow-500" // apuntada
    return "bg-red-500"                        // no la tengo
  }

  const handleRowClick = (item: FilmographyItem) => {
    if (item.owned || item.registered) {
      if (tipos.has(item.type)) {
        navigate(`/films/${item.id}`)
      } else {
        navigate(`/series/${item.id}`)
      }
    } else {
      if (tipos.has(item.type)) {
        navigate(`/petition/`, {state: { peliculaId: item.imdbId } })
      } else {
        navigate(`/petitionSerie/`, {state: { serieId: item.imdbId } })
      }
    }
  }

    return (
      <div className="bg-[#0d0d0d] p-6 rounded-lg border border-[#222]">
        <h2 className="text-xl font-bold text-[#d4af37] mb-4">Filmografía</h2>

        <table className="w-full text-left text-gray-200">
          <thead className="border-b border-[#333] text-gray-400">
            <tr>
              <th className="py-2 w-10"></th>
              <th className="py-2">Tipo</th>
              <th className="py-2">Título</th>
              <th className="py-2">Año</th>
              <th className="py-2">Rol</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[#222] hover:bg-[#111] cursor-pointer"
                onClick={() => handleRowClick(item)}
              >
                <td className="py-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${getStatusColor(item)}`}
                  ></span>
                </td>

                <td className="py-2 text-gray-300">{item.type}</td>
                <td className="py-2 font-medium">{item.title}</td>
                <td className="py-2 text-gray-400">{item.year}</td>
                <td className="py-2 text-gray-300">{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
