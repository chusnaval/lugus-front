import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"

interface Option {
  label: string
  value: string
}

interface FiltersSagasProps {
  filters: any
  setFilters: (f: any) => void
  formats: Option[]
}

export default function FiltersSagas({ filters, setFilters, formats }: FiltersSagasProps) {

  const update = (key: string, value: any) => {
    setFilters((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="space-y-6">

      <Input
        label="Nombre de la saga"
        value={filters.title ?? ""}
        onChange={(v) => update("title", v)}
      />

      <Input
        label="Año mínimo"
        type="number"
        value={filters.yearMin ?? ""}
        onChange={(v) => update("yearMin", Number(v))}
      />

      <Input
        label="Año máximo"
        type="number"
        value={filters.yearMax ?? ""}
        onChange={(v) => update("yearMax", Number(v))}
      />

      <Input
        label="Películas mínimas"
        type="number"
        value={filters.countMin ?? ""}
        onChange={(v) => update("countMin", Number(v))}
      />

      <Input
        label="Películas máximas"
        type="number"
        value={filters.countMax ?? ""}
        onChange={(v) => update("countMax", Number(v))}
      />

      <Select
        label="Formato dominante"
        value={filters.format ?? ""}
        options={formats}
        onChange={(v) => update("format", v)}
      />

      <Select
        label="Ordenar por"
        value={filters.sort ?? ""}
        options={[
          { label: "Nombre", value: "name" },
          { label: "Año mínimo", value: "yearMin" },
          { label: "Año máximo", value: "yearMax" },
          { label: "Nº Películas", value: "count" }
        ]}
        onChange={(v) => update("sort", v)}
      />

    </div>
  )
}
