import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
import Projects from "./pages/Projects"
import Settings from "./pages/Settings"
import MovieDetail from "./pages/movie/MovieDetail"


import { useEffect, useState, type ReactNode } from "react"
import Login from "./pages/Login"
import { useAuth } from "./context/AuthContext"
import FilmDashboardVisual from "./pages/dashboard/FilmDashboardVisual"
import HomeDashboardVisual from "./pages/dashboard/HomeDashboardVisual"
import SeriesDashboardVisual from "./pages/dashboard/SeriesDashboardVisual"
import SerieDetail from "./pages/series/SerieDetail"
import AddMoviePage from "./pages/movie/AddMoviePage"
import FilmographyPage from "./pages/filmography/FilmographyPage"


interface PrivateRouteProps {
  children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
   const { isAuthenticated, refreshSession } = useAuth()
  const [checking, setChecking] = useState(true)
useEffect(() => {
    refreshSession().finally(() => setChecking(false))
  }, [])
   if (checking || isAuthenticated === null) {
    return <div>Cargando...</div> // evita parpadeos
  }

  return isAuthenticated ? children : <Navigate to="/login" />
}


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={  <PrivateRoute><HomeDashboardVisual /></PrivateRoute>} />
        <Route path="/films" element={  <PrivateRoute><FilmDashboardVisual /></PrivateRoute>} />
        <Route path="/series" element={  <PrivateRoute><SeriesDashboardVisual /></PrivateRoute>} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/films/:id" element={  <PrivateRoute><MovieDetail /></PrivateRoute>} />
        <Route path="/series/:id" element={  <PrivateRoute><SerieDetail /></PrivateRoute>} />
        <Route path="/films/new" element={<PrivateRoute><AddMoviePage /></PrivateRoute>} />
        <Route path="/filmography/:id" element={<PrivateRoute><FilmographyPage /></PrivateRoute>} />

        

      </Route>
    </Routes>
  )
}
