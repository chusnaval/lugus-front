import { useState } from "react"

// Tipos de filtros disponibles
export interface Filters {
  year: string
  format: string
  genre: string
  bought: string
  pack: string
  complete: string
  sort: string
}

// Estado que expone el hook (lo usará el contexto)
export type FiltersState = {
  filters: Filters
  updateFilter: (key: keyof Filters, value: string) => void
  resetFilters: () => void
}

// Hook principal
export function useFilters(): FiltersState {
  const [filters, setFilters] = useState<Filters>({
    year: "",
    format: "",
    genre: "",
    bought: "",
    pack: "",
    complete: "",
    sort: "",
  })

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      year: "",
      format: "",
      genre: "",
      bought: "",
      pack: "",
      complete: "",
      sort: "",
    })
  }

  return { filters, updateFilter, resetFilters }
}
