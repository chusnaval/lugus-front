import Select from "../ui/Select"
import Button from "../ui/Button"
import type { Filters } from "../../hooks/useFilters"


interface FilterBarProps {
  filters: Filters
  onChange: (key: keyof Filters, value: string) => void
  onReset: () => void
}

export default function FilterBar({ filters, onChange, onReset }: FilterBarProps) {
  return (
    <div className="bg-lugus-bgAlt p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">

      <Select
        label="Año"
        value={filters.year}
        onChange={(v) => onChange("year", v)}
        options={[
          { label: "Todos", value: "" },
          { label: "2020s", value: "2020" },
          { label: "2010s", value: "2010" },
          { label: "2000s", value: "2000" },
          { label: "90s", value: "1990" },
          { label: "80s", value: "1980" },
        ]}
      />

      <Select
        label="Formato"
        value={filters.format}
        onChange={(v) => onChange("format", v)}
        options={[
          { label: "Todos", value: "" },
          { label: "DVD", value: "DVD" },
          { label: "Blu-ray", value: "BD" },
          { label: "4K UHD", value: "4K" },
          { label: "VHS", value: "VHS" },
          { label: "Digital", value: "Digital" },
        ]}
      />

      <Select
        label="Género"
        value={filters.genre}
        onChange={(v) => onChange("genre", v)}
        options={[
          { label: "Todos", value: "" },
          { label: "Animación", value: "ANI" },
          { label: "Anime", value: "ANM" },
          { label: "Infantil", value: "INF" },
          { label: "Musical", value: "MUS" },
          { label: "Navidad", value: "NAV" },
          { label: "Drama", value: "DRA" },
          { label: "Romance", value: "ROM" },
          { label: "Comedia", value: "COM" },
          { label: "Sci-Fi", value: "CIF" },
          { label: "Acción", value: "ACC" },
          { label: "Aventura", value: "AVE" },
          { label: "Fantasía", value: "FAN" },
          { label: "Thriller", value: "THR" },
          { label: "Misterio", value: "MIS" },
          { label: "Crimen", value: "CRI" },
          { label: "Terror", value: "TER" },
          { label: "Bélico", value: "BEL" },
          { label: "Western", value: "WES" },
          { label: "Documental", value: "DOC" },
          { label: "Deportivo", value: "DEP" },
        ]}
      />

      <Select
        label="Comprado"
        value={filters.bought}
        onChange={(v) => onChange("bought", v)}
        options={[
          { label: "Todos", value: "" },
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <Select
        label="Pack"
        value={filters.pack}
        onChange={(v) => onChange("pack", v)}
        options={[
          { label: "Todos", value: "" },
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <Select
        label="Completa (series)"
        value={filters.complete}
        onChange={(v) => onChange("complete", v)}
        options={[
          { label: "Todas", value: "" },
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" },
        ]}
      />

      <Select
        label="Ordenar por"
        value={filters.sort}
        onChange={(v) => onChange("sort", v)}
        options={[
          { label: "Título", value: "title" },
          { label: "Año", value: "year" },
          { label: "Formato", value: "format" },
          { label: "Género", value: "genre" },
        ]}
      />

      <Button variant="secondary" onClick={onReset}>
        Resetear filtros
      </Button>
    </div>
  )
}
