import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Projects from "./pages/Projects"
import Settings from "./pages/Settings"
import MovieDetail from "./pages/movie/MovieDetail"
import Dashboard from "./pages/Dashboard"

import { useEffect, useState, type ReactNode } from "react"
import Login from "./pages/Login"
import { useAuth } from "./context/AuthContext"

interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated === null) {
    return <div>Cargando...</div> // evita parpadeos
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={  <PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

      </Route>
    </Routes>
  )
}
