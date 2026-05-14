import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <aside className="w-56 bg-lugus-bgAlt text-lugus-text h-full border-r border-lugus-bgAlt p-4">
      <nav className="space-y-3">
        <Link
          to="/"
          className="block hover:text-lugus-gold transition-colors"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="block hover:text-lugus-gold transition-colors"
        >
          Proyectos
        </Link>

        <Link
          to="/settings"
          className="block hover:text-lugus-gold transition-colors"
        >
          Ajustes
        </Link>
      </nav>
    </aside>
  )
}
