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

const customTheme = {
  axis: {
    ticks: {
      text: {
        fill: "#ffffff", // Color blanco para los textos de los valores (ticks)
        fontSize: 12
      }
    },
    legend: {
      text: {
        fill: "#ffffff", // Color blanco para los títulos principales de los ejes
        fontSize: 14,
        fontWeight: 'bold'
      }
    }
  },
  tooltip: {
    container: {
      background: '#1a1a1a', // Fondo negro/oscuro
      color: '#ffffff',      // Texto blanco
      fontSize: 13,
      borderRadius: '4px',   // Bordes un poco redondeados
      boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)', // Sombra para que resalte
      padding: '12px'
    }
  }
};

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
          colors={(bar) => bar.data.color}
          borderColor="#111"
          labelTextColor="white"
          theme={customTheme}
          axisBottom={{
            tickRotation: -30,
            tickPadding: 5,
            legendOffset: 40,
            legendPosition: "middle"
          }}
          axisLeft={{
            legendOffset: -40,
            legendPosition: "middle"

          }}
          tooltip={({ id, value, color }) => (
            <div
              style={{
                padding: '6px 10px',
                background: '#1a1a1a', // Fondo oscuro (cámbialo a #ffffff si lo quieres blanco)
                color: '#ffffff',      // Texto blanco (cámbialo a #000000 si pusiste fondo blanco)
                fontSize: '13px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 3px 6px rgba(0,0,0,0.3)'
              }}
            >
              {/* El cuadradito de color de la barra */}
              <span style={{ display: 'block', width: '12px', height: '12px', background: color }} />

              {/* El texto limpio: "id: valor" (ej: "Usuarios: 45") */}
              <span>{value}</span>
            </div>
          )}
          legends={[]}   // ✔ sin leyenda interna
        />
      </div>


    </div>
  )
}
