import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"


interface Option {
  label: string
  value: string
}

interface FiltersFilmsProps {
  filters: any
  setFilters: (f: any) => void
  formats: Option[]
  genres: Option[]
}

export default function FiltersFilms({ filters, setFilters, formats, genres }: FiltersFilmsProps) {

  const update = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">

      <Input
        label="Título"
        value={filters.title ?? ""}
        onChange={(v) => update("title", v)}
      />

      <Input
        label="Personal"
        value={filters.casting ?? ""}
        onChange={(v) => update("casting", v)}
      />

      <Input
        label="Año de estreno (desde)"
        type="number"
        value={filters.fromYear ?? ""}
        onChange={(v) => update("fromYear", Number(v))}
      />

      <Input
        label="Año de estreno (hasta)"
        type="number"
        value={filters.toYear ?? ""}
        onChange={(v) => update("toYear", Number(v))}
      />

      <Select
        label="Formato"
        value={filters.format ?? ""}
        options={formats}
        onChange={(v) => update("format", v)}
      />

      <Select
        label="Género"
        value={filters.genre ?? ""}
        options={genres}
        onChange={(v) => update("genre", v)}
      />

      <Select
        label="Ordenar por"
        value={filters.sort ?? ""}
        options={[
          { label: "Título", value: "title" },
          { label: "Año", value: "year" },
          { label: "Formato", value: "format" },
          { label: "Género", value: "genre" },
          { label: "Novedades", value: "new" }
        ]}
        onChange={(v) => update("sort", v)}
      />

      <Select
        label="Sentido del orden"
        value={filters.sortDirection ?? ""}
        options={[
          { label: "Ascendente", value: "asc" },
          { label: "Descendente", value: "desc" }
        ]}
        onChange={(v) => update("sortDirection", v)}
      />
    </div>
  )
}
