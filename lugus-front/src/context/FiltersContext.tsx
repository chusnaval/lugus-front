import { createContext, useContext } from "react"
import type { FiltersState } from "../hooks/useFilters"

export const FiltersContext = createContext<FiltersState | null>(null)

export function useFiltersContext() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error("useFiltersContext must be used inside FiltersProvider")
  return ctx
}
