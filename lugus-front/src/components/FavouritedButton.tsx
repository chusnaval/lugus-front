import { useState } from "react"
import { useToggleFavorite } from "../hooks/useToggleFavorite"
import type { Pelicula } from "../types/Pelicula"
import { Star } from "lucide-react"

export function FavouritedButton({ film }: { film: Pelicula }) {
    const { toggleFavorite } = useToggleFavorite()
    const [isFavorite, setIsFavorite] = useState(film.favorite)

    const handleClick = async () => {
        const ok = await toggleFavorite(film.id)
        if (ok) {
            setIsFavorite(prev => !prev)   // 👈 refresca el botón
        }
    }

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-3 py-2 mt-4 transition hover:scale-110"
        >
            <Star
                className="w-6 h-6"
                fill={isFavorite ? "#d4af37" : "none"}
                stroke="#d4af37"
            />
        </button>
    )
}
