
import type { FilmStats } from "../types/FilmStats";
import { fetchWithAuth } from "./fetchWithAuth"

export async function getStats(): Promise<FilmStats> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/stats", {
    credentials: "include", 
  });

  console.log("RAW RESPONSE:", res)

  // Para ver el cuerpo en texto antes de parsearlo
  const text = await res.clone().text()
  console.log("BODY AS TEXT:", text)

  if (!res.ok) {
    throw new Error("No se pudieron cargar las estadisticas de películas");
  }

  return res.json();
}