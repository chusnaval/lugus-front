import Input from "../../components/ui/Input"
import type { Season } from "../../types/Serie"

interface SeasonsEditorProps {
  seasons: Season[]
  onChange: (updated: Season[]) => void
}

export default function SeasonsEditor({ seasons, onChange }: SeasonsEditorProps) {

  const update = (index: number, key: keyof Season, value: any) => {
    const updated = seasons.map((s, i) =>
      i === index ? { ...s, [key]: value } : s
    )
    onChange(updated)
  }

  const addSeason = () => {
    const nextOrdinal =
      (seasons.length > 0 ? seasons[seasons.length - 1].ordinal : 0) + 1

    const newSeason: Season = {
      ordinal: nextOrdinal,
      desc: "",
      purchased: false,
      wanted: false
    }

    onChange([...seasons, newSeason])
  }

  const removeSeason = (index: number) => {
    // 1) Eliminar
    const filtered = seasons.filter((_, i) => i !== index)

    // 2) Reordenar ordinales
    const reordered = filtered.map((s, i) => ({
      ...s,
      ordinal: i + 1
    }))

    onChange(reordered)
  }

  return (
    <div className="space-y-4">

      {seasons.map((s, i) => (
        <div
          key={i}
          className="border border-[#333] p-4 rounded-md bg-[#111] space-y-3"
        >
          <div className="flex items-center justify-between">
            <strong className="text-[#d4af37]">
              Temporada {s.ordinal}
            </strong>

            <button
              onClick={() => removeSeason(i)}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Eliminar
            </button>
          </div>

          <Input
            label="Descripción (opcional)"
            value={s.desc ?? ""}
            onChange={(v) => update(i, "desc", v)}
          />

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={s.purchased}
                onChange={(e) => update(i, "purchased", e.target.checked)}
              />
              <span>Comprada</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={s.wanted}
                onChange={(e) => update(i, "wanted", e.target.checked)}
              />
              <span>Buscada</span>
            </label>
          </div>
        </div>
      ))}

      <button
        onClick={addSeason}
        className="px-4 py-2 bg-[#d4af37] text-black rounded hover:bg-[#b8962f]"
      >
        Añadir temporada
      </button>
    </div>
  )
}
