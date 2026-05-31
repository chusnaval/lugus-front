import { useEffect, useState } from "react"
import { useUserPreferences } from "../../api/useUserPreferences"
import { fetchWithAuth } from "../../api/fetchWithAuth"
import type { Genre } from "../../types/Genre"
import Card from "../../components/ui/Card"
import ChangePasswordForm from "./ChangePasswordForm"




export default function PreferencesPage() {
    const { favoritos, save } = useUserPreferences()
    const [selected, setSelected] = useState<Genre[]>(favoritos)
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        const load = async () => {
            const genRes = await
                fetchWithAuth("${API_URL}/v1/api/genres")

            setGenres(await genRes.json())

        }

        load()
    }, [])

    const toggle = (g: Genre) => {
        if (selected.includes(g)) {
            setSelected(selected.filter(x => x !== g))
        } else {
            if (selected.length >= 4) return
            setSelected([...selected, g])
        }
    }

    const handleSave = () => save(selected)

    return (

        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Preferencias del usuario</h1>

            <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Cambiar contraseña</h3>
                <ChangePasswordForm />
            </Card>


            <p className="text-gray-400">Selecciona tus 4 géneros favoritos</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {Object.values(genres).map((g) => (
                    <button
                        key={g.codigo}
                        onClick={() => toggle(g)}
                        className={`px-3 py-2 rounded border transition 
              ${selected.includes(g)
                                ? "bg-lugus-gold text-black border-lugus-gold"
                                : "bg-lugus-bgAlt text-gray-300 border-gray-700 hover:border-lugus-gold"
                            }`}
                    >
                        {g.descripcion}
                    </button>
                ))}
            </div>

            <button
                onClick={handleSave}
                className="px-4 py-2 bg-lugus-green text-white rounded hover:bg-green-600"
            >
                Guardar preferencias
            </button>
        </div>
    )
}
