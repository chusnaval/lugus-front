
import type { FilmStats } from "../types/FilmStats";
import type { SeriesStats } from "../types/SeriesStats";
import { fetchWithAuth } from "./fetchWithAuth"

export async function getStats(): Promise<FilmStats> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/stats", {
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
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/series/stats", {
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