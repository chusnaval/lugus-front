import { useFiltersContext } from "../../context/FiltersContext"

export default function ActiveFiltersChips() {
  const { filters, updateFilter } = useFiltersContext()

  const chips = [
    filters.year && { key: "year", label: `Año: ${filters.year}` },
    filters.format && { key: "format", label: `Formato: ${filters.format}` },
    filters.genre && { key: "genre", label: `Género: ${filters.genre}` },
    filters.bought && { key: "bought", label: filters.bought === "yes" ? "Comprado" : "No comprado" },
    filters.pack && { key: "pack", label: filters.pack === "yes" ? "Pack" : "No pack" },
    filters.sort && { key: "sort", label: `Orden: ${filters.sort}` },
  ].filter(Boolean) as { key: keyof typeof filters; label: string }[]

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {chips.map((chip) => (
        <div
          key={chip.key}
          className="flex items-center bg-lugus-bgAlt border border-lugus-gold text-lugus-gold px-3 py-1 rounded-full text-sm"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => updateFilter(chip.key, "")}
            className="ml-2 text-lugus-gold hover:text-white"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
