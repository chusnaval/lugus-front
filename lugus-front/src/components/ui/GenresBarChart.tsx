import { ResponsiveBar } from "@nivo/bar"
import type { FilmStats } from "../../types/FilmStats"

const categoryColors = {
  arteEntretenimiento: "#f1c40f",
  literaturaNarrativa: "#3498db",
  cienciaFiccion: "#bdc3c7",
  accion: "#e74c3c",
  misterio: "#8e44ad",
  terror: "#000000",
  conflicto: "#e67e22",
  documental: "#2ecc71",
}

export default function GenresBarChart({ stats }: { stats: FilmStats }) {
  const data = Object.entries(stats.generosPorCategoria).map(([cat, value]) => ({
    categoria: cat,
    valor: value,
    color: categoryColors[cat as keyof typeof categoryColors],
  }))

  return (
    <div>
      {/* Gráfico */}
      <div className="h-[350px]">
        <ResponsiveBar
          data={data}
          keys={["valor"]}
          indexBy="categoria"
          margin={{ top: 20, right: 20, bottom: 60, left: 50 }}
          padding={0.3}
          colors={(bar) => bar.data.color}   // ✔ colores correctos
          borderColor="#111"
          axisBottom={{
            tickRotation: -30,
            tickPadding: 5,
          }}
          axisLeft={{
            legendOffset: -40,
            legendPosition: "middle",
          }}
          legends={[]}   // ✔ sin leyenda interna
          labelSkipWidth={1000} // ✔ sin números encima
        />
      </div>

    
    </div>
  )
}
