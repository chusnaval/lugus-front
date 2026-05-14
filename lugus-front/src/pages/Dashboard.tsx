import { useState } from "react"
import Toggle from "../components/ui/Toggle"
import DashboardText from "./dashboard/DashboardText"
import DashboardVisual from "./dashboard/DashboardVisual"

export default function Dashboard() {
  const [mode, setMode] = useState<"text" | "visual">("text")

  return (
    <div className="space-y-6">
      {/* Header del dashboard */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Toggle
          label={mode === "text" ? "Vista analítica" : "Vista visual"}
          checked={mode === "visual"}
          onChange={(v) => setMode(v ? "visual" : "text")}
        />
      </div>

      {/* Render según el modo */}
      {mode === "text" && <DashboardText />}
      {mode === "visual" && <DashboardVisual />}
    </div>
  )
}
