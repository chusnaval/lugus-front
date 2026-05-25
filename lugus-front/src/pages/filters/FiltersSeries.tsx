import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"


interface Option {
  label: string
  value: string
}

interface FiltersSeriesProps {
  filters: any
  setFilters: (f: any) => void
  formats: Option[]
  genres: Option[]
}

export default function FiltersSeries({ filters, setFilters, formats, genres }: FiltersSeriesProps) {

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
        value={filters.titleMgmt ?? ""}
        onChange={(v) => update("titleMgmt", v)}
      />

      <Input
        label="Año de estreno"
        type="number"
        value={filters.year ?? ""}
        onChange={(v) => update("year", Number(v))}
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
        label="Completa"
        value={filters.complete ?? ""}
        options={[
          { label: "Sí", value: "yes" },
          { label: "No", value: "no" }
        ]}
        onChange={(v) => update("complete", v)}
      />

      <Select
        label="Ordenar por"
        value={filters.sort ?? ""}
        options={[
          { label: "Título", value: "title" },
          { label: "Año", value: "year" },
          { label: "Formato", value: "format" },
          { label: "Género", value: "genre" }
        ]}
        onChange={(v) => update("sort", v)}
      />

    </div>
  )
}
