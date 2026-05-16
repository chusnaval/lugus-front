import Card from "../../components/ui/Card"
import Table from "../../components/ui/Table"
import Chip from "../../components/ui/Chip"

export default function DashboardText() {
  // Datos mock por ahora
  const stats = {
    total: 1240,
    nuevasSemana: 12,
    sagasCompletas: 34,
    sagasIncompletas: 9,
    duplicados: 7,
  }

  const ultimas = [
    { title: "Heat", year: 1995, format: "Blu-ray", genre: "Thriller" },
    { title: "Alien 3", year: 1992, format: "4K" , genre: "Acción"},
    { title: "The Thing", year: 1982, format: "Blu-ray", genre: "Terror" },
  ]

  const sagasIncompletas = [
    "Mad Max",
    "Terminator",
    "Alien",
    "Indiana Jones",
  ]

  const duplicados = [
    "Jurassic Park",
    "Grease",
    "Batman (1989)",
  ]

  return (
    <div className="space-y-8">

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold">Total películas</h3>
          <p className="text-3xl font-bold mt-2">{stats.total}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Nuevas esta semana</h3>
          <p className="text-3xl font-bold mt-2">{stats.nuevasSemana}</p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Sagas</h3>
          <p className="mt-2">
               <Chip icon='' label='{stats.sagasCompletas} completas' color="blue"/>
               <Chip icon='' label='{stats.sagasIncompletas} incompletas' color="gold" className="ml-2"/>
          </p>
        </Card>
      </div>

      {/* Últimas añadidas */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">Últimas añadidas</h3>

        <Table
          columns={[
            { key: "title", label: "Título" },
            { key: "year", label: "Año" },
            { key: "format", label: "Formato" },
            { key: "genre", label: "Genero" },
          ]}
          data={ultimas}
        />
      </Card>

      {/* Sagas incompletas */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">Sagas incompletas</h3>
        <ul className="list-disc pl-6 space-y-1">
          {sagasIncompletas.map((saga) => (
            <li key={saga}>{saga}</li>
          ))}
        </ul>
      </Card>

      {/* Duplicados */}
      <Card>
        <h3 className="text-xl font-semibold mb-4">Duplicados detectados</h3>
        <ul className="list-disc pl-6 space-y-1">
          {duplicados.map((title) => (
            <li key={title}>{title}</li>
          ))}
        </ul>
      </Card>

    </div>
  )
}
