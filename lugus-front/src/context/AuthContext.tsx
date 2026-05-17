import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  isAuthenticated: boolean | null
  roles: string[]
  isAdmin: boolean
  isUser: boolean
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  roles: [],
  isAdmin: false,
  isUser: false,
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [roles, setRoles] = useState<string[]>([])

  const refreshSession = async () => {
    try {
      const res = await fetch("http://localhost:8080/lugus/api/auth/me", {
        credentials: "include",
      })

      if (res.status === 200) {
        const data = await res.json()

        setIsAuthenticated(true)
        setRoles(data.roles ?? [])
      } else {
        setIsAuthenticated(false)
        setRoles([])
      }
    } catch {
      setIsAuthenticated(false)
      setRoles([])
    }
  }

  useEffect(() => {
    refreshSession()
  }, [])

  const isAdmin = roles.includes("ROLE_ADMIN")
  const isUser = roles.includes("ROLE_USER")

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        roles,
        isAdmin,
        isUser,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
