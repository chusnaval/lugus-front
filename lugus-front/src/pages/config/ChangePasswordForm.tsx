import { useState } from "react"
import { useLogout } from "../../hooks/useLogout"

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const API_URL = import.meta.env.VITE_API_URL;  
    const logout = useLogout()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setSuccess("")

        if (newPassword !== repeatPassword) {
            setError("Las contraseñas nuevas no coinciden")
            return
        }

        if (newPassword.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres")
            return
        }
   
        const res = await fetch(`${API_URL}/api/auth/change-password`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                currentPassword,
                newPassword
            })
        })

        if (!res.ok) {
            const msg = await res.text()
            setError(msg || "Error al cambiar la contraseña")
            return
        }

        setSuccess("Contraseña cambiada correctamente")
        setCurrentPassword("")
        setNewPassword("")
        setRepeatPassword("")
        logout()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm mb-1">Contraseña actual</label>
                <input
                    type="password"
                    className="w-full bg-[#222] border border-[#444] rounded px-3 py-2 text-white"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Nueva contraseña</label>
                <input
                    type="password"
                    className="w-full bg-[#222] border border-[#444] rounded px-3 py-2 text-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Repetir nueva contraseña</label>
                <input
                    type="password"
                    className="w-full bg-[#222] border border-[#444] rounded px-3 py-2 text-white"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    required
                />
            </div>

            {error && (
                <p className="text-red-400 text-sm">{error}</p>
            )}

            {success && (
                <p className="text-green-400 text-sm">{success}</p>
            )}

            <button
                type="submit"
                className="px-4 py-2 bg-lugus-green text-black font-semibold rounded hover:bg-green-500 transition"
            >
                Cambiar contraseña
            </button>
        </form>
    )
}
