import { Link, useNavigate } from "react-router-dom"
import {  LogOut, LucideUser, Settings } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useLogout } from "../hooks/useLogout"


export default function Header() {
  const user = useAuth()
  const navigate = useNavigate()
  const logout = useLogout()
  const isAdmin = user.isAdmin
  const isUser = user.isUser || user.isAdmin 

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-[#0b0b0b] border-b border-[#2a2a2a]">
      {/* Logo */}
      <Link to="/"> <img src={"/icons/logo.png"} className="w-24" /></Link>
      <h1 className="text-grey font-bold text-xl tracking-wide select-none items-left">
        LUGUS
      </h1>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6 text-sm text-gray-300">

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
        {isUser && <button onClick={() => navigate("/preferences")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Perfil">
          <LucideUser size={18} />
        </button>}
        {isUser &&
          <button
            onClick={logout}
            className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-black transition">
            <LogOut size={18} className="inline-block mr-1" />
          </button>
        }
        {isAdmin && (<button onClick={() => navigate("/admin")}
          className="text-gray-400 hover:text-[#d4af37] transition-colors"
          aria-label="Settings">
          <Settings size={18} />
        </button>)}
      </div>
    </header>
  )
}
