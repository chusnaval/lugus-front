import { useState } from "react"
import Header from "./Header"

import FilterDrawer from "./filters/FilterDrawer"
import { useFilters } from "../hooks/useFilters"
import { FiltersContext } from "../context/FiltersContext"
import { Outlet } from "react-router-dom"

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const filtersState = useFilters()

  return (
    <FiltersContext.Provider value={filtersState}>
      <div className="bg-lugus-bg text-lugus-text min-h-screen flex flex-col">

        <Header onOpenFilters={() => setDrawerOpen(true)} />

        <div className="w-full h-[2px] bg-[#2e303a]"></div>

        <div className="flex flex-1">
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>

        <FilterDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          filters={filtersState.filters}
          onChange={filtersState.updateFilter}
          onReset={filtersState.resetFilters}
        />
      </div>
    </FiltersContext.Provider>
  )
}
