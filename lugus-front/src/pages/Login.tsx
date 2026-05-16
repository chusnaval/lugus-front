import { useState } from "react"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError("")

    try {
      const res = await fetch("http://localhost:8080/lugus/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // IMPORTANTE para recibir JSESSIONID
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        setError("Usuario o contraseña incorrectos")
        return
      }

      // Login OK → redirigir al dashboard
      window.location.href = "/"
    } catch (err) {
      setError("Error de conexión con el servidor")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-lugus-bg">
      <form
        onSubmit={handleSubmit}
        className="bg-lugus-bgAlt p-6 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-semibold text-center mb-4">Iniciar sesión</h1>

        <label className="block text-sm mb-1">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-3 border border-gray-700 focus:border-gray-500"
        />

        <label className="block text-sm mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white mb-3 border border-gray-700 focus:border-gray-500"
        />

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 transition-colors p-2 rounded text-white font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
