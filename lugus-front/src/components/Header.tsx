import { Link } from "react-router-dom"
import { LucideSearch, LucideUser } from "lucide-react"


export default function Header({ onOpenFilters }: { onOpenFilters: () => void }) {


  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#0b0b0b] border-b border-[#2a2a2a]">
      {/* Logo */}
      <h1 className="text-grey font-bold text-xl tracking-wide select-none">
        LUGUS
      </h1>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6 text-sm text-gray-300">
        <Link to="/" className="hover:text-[#d4af37] transition-colors">
          Inicio
        </Link>
        <Link to="/films" className="hover:text-[#d4af37] transition-colors">
          Películas
        </Link>
        <Link to="/series" className="hover:text-[#d4af37] transition-colors">
          Series
        </Link>
        <Link to="/libros" className="hover:text-[#d4af37] transition-colors">
          Libros
        </Link>
        <Link to="/musica" className="hover:text-[#d4af37] transition-colors">
          Música
        </Link>
      </nav>

      {/* Acciones */}
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Buscar"
        >
          <LucideSearch size={18} />
        </button>
        <button
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Perfil"
        >
          <LucideUser size={18} />
        </button>
      </div>
    </header>
  )
}
