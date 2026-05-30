import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "./components/Layout"
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
import PetitionFilmPage from "./pages/movie/PetitionFilmPage"
import AdminConfigPage from "./pages/config/AdminConfigPage"
import LocationsPage from "./pages/config/LocationsPage"
import TypeLocationsPage from "./pages/config/TypeLocationsPage"
import SagasTab from "./pages/dashboard/SagasTab"
import SagaDetailPage from "./pages/dashboard/SagaDetailPage"
import AdminSagasPage from "./pages/config/AdminSagasPage"
import AdminSagaTitlesPage from "./pages/config/AdminSagaTitlesPage"

import AllFilmsTab from "./pages/dashboard/AllFilmsTab"
import OwnedFilmsTab from "./pages/dashboard/OwnedFilmsTab"
import PendingFilmsTab from "./pages/dashboard/PendingFilmsTab"
import AllSeriesTab from "./pages/dashboard/AllSeriesTab"
import PendingSeriesTab from "./pages/dashboard/PendingSeriesTab"
import OwnedSeriesTab from "./pages/dashboard/OwnedSeriesTab"
import CoversPage from "./pages/config/CoversPage"
import SeriesCreatePage from "./pages/series/SeriesCreatePage"
import SeriesEditPage from "./pages/series/SeriesEditPage"
import AdminPeliculaEditPage from "./pages/movie/AdminPeliculaEditPage"
import AdminTitlesPage from "./pages/config/AdminTitlesPage"
import PreferencesPage from "./pages/config/PreferencesPage"


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
        <Route path="/login" element={<Login />} />
        <Route path="/preferences" element={<PrivateRoute><PreferencesPage /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><HomeDashboardVisual /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminConfigPage /></PrivateRoute>} />
        <Route path="/admin/covers" element={<PrivateRoute><CoversPage /></PrivateRoute>} />
        <Route path="/admin/location-types" element={<PrivateRoute><TypeLocationsPage /></PrivateRoute>} />
        <Route path="/admin/locations" element={<PrivateRoute><LocationsPage /></PrivateRoute>} />
        <Route path="/admin/sagas" element={<PrivateRoute>   <AdminSagasPage /></PrivateRoute>} />
        <Route path="/admin/sagas/:id/titles" element={<PrivateRoute><AdminSagaTitlesPage/></PrivateRoute>} />
        <Route path="/admin/titles/" element={<PrivateRoute><AdminTitlesPage/></PrivateRoute>} />
        <Route path="/filmography/:id" element={<PrivateRoute><FilmographyPage /></PrivateRoute>} />
        <Route path="/films" element={<PrivateRoute><FilmDashboardVisual /></PrivateRoute>} />
        <Route path="/films/:id" element={<PrivateRoute><MovieDetail /></PrivateRoute>} />
        <Route path="/films/all" element={<PrivateRoute><AllFilmsTab /></PrivateRoute>} />
        <Route path="/films/bought" element={<PrivateRoute><OwnedFilmsTab /></PrivateRoute>} />
        <Route path="/films/edit/:id" element={<PrivateRoute><AdminPeliculaEditPage/></PrivateRoute>} />
        <Route path="/films/new" element={<PrivateRoute><AddMoviePage /></PrivateRoute>} />
        <Route path="/films/pending" element={<PrivateRoute><PendingFilmsTab /></PrivateRoute>} />
        <Route path="/films/sagas" element={<PrivateRoute><SagasTab /></PrivateRoute>} />
        <Route path="/films/sagas/:id" element={<PrivateRoute><SagaDetailPage /></PrivateRoute>} />
        <Route path="/petition" element={<PrivateRoute><PetitionFilmPage /></PrivateRoute>} />
        <Route path="/petition/:id" element={<PrivateRoute><PetitionFilmPage /></PrivateRoute>} />
        <Route path="/series" element={<PrivateRoute><SeriesDashboardVisual /></PrivateRoute>} />
        <Route path="/series/:id" element={<PrivateRoute><SerieDetail /></PrivateRoute>} />
        <Route path="/series/all" element={<PrivateRoute><AllSeriesTab /></PrivateRoute>} />
        <Route path="/series/bought" element={<PrivateRoute><OwnedSeriesTab /></PrivateRoute>} />
        <Route path="/series/edit/:id" element={<PrivateRoute><SeriesEditPage /></PrivateRoute>} />
        <Route path="/series/new" element={<PrivateRoute><SeriesCreatePage /></PrivateRoute>} />
        <Route path="/series/pending" element={<PrivateRoute><PendingSeriesTab /></PrivateRoute>} />
        <Route path="/series/sagas" element={<PrivateRoute><SagasTab /></PrivateRoute>} />
        <Route path="/series/sagas/:id" element={<PrivateRoute><SagaDetailPage /></PrivateRoute>} />
		    <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />

      </Route>
    </Routes>
  )
}
