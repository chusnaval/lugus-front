
import type { FilmStats } from "../types/FilmStats";
import type { SeriesStats } from "../types/SeriesStats";
import { fetchWithAuth } from "./fetchWithAuth"

export async function getStats(): Promise<FilmStats> {
   const API_URL = import.meta.env.VITE_API_URL;  
  const res = await fetchWithAuth(`${API_URL}/v1/api/films/stats`, {
    credentials: "include", 
  });



  // Para ver el cuerpo en texto antes de parsearlo
  const text = await res.clone().text()
  console.log("BODY AS TEXT:", text)

  if (!res.ok) {
    throw new Error("No se pudieron cargar las estadisticas de películas");
  }

  return res.json();
}

export async function getSeriesStats(): Promise<SeriesStats> {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetchWithAuth(`${API_URL}/v1/api/series/stats`, {
    credentials: "include", 
  });



  // Para ver el cuerpo en texto antes de parsearlo
  const text = await res.clone().text()
  console.log("BODY AS TEXT:", text)

  if (!res.ok) {
    throw new Error("No se pudieron cargar las estadisticas de series");
  }

  return res.json();
}

