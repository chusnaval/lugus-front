import { useState } from "react"
import { useToggleOwned } from "../hooks/useToggleOwned"
import type { Pelicula } from "../types/Pelicula"

export function OwnedButton({ film }: { film: Pelicula }) {
  const { toggleOwned } = useToggleOwned()
  const [isMine, setIsMine] = useState(film.mine)

  const handleClick = async () => {
    const ok = await toggleOwned(film.id)
    if (ok) {
      setIsMine(prev => !prev)   // 👈 refresca el botón
    }
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3 py-2 mt-4 rounded bg-[#1f1f1f] border border-lugus-gray text-lugus-gray text-sm hover:bg-[#2a2a2a]">
      {isMine ? "✔" : "+"}
    </button>
  )
}
