import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean | null
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  // ESTA ES TU checkSession REAL
  const refreshSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/lugus/api/auth/me", {
        credentials: "include",
      })
      setIsAuthenticated(res.ok)
    } catch {
      setIsAuthenticated(false)
    }
  }

  // Se ejecuta UNA VEZ al arrancar la app
  useEffect(() => {
    refreshSession()
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
