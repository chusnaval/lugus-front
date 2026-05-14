import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DashboardVisual from "./pages/dashboard/DashboardVisual"
import Projects from "./pages/Projects"
import Settings from "./pages/Settings"
import MovieDetail from "./pages/movie/MovieDetail"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardVisual />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/movie/:id" element={<MovieDetail />} />

      </Route>
    </Routes>
  )
}
