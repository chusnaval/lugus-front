import type { Pelicula } from "../types/Pelicula"
import { fetchWithAuth } from "./fetchWithAuth"

export async function getUltimasPeliculas(): Promise<Pelicula[]> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/ultimas", {
    credentials: "include", // MUY IMPORTANTE
  });

  console.log("RAW RESPONSE:", res)

  // Para ver el cuerpo en texto antes de parsearlo
  const text = await res.clone().text()
  console.log("BODY AS TEXT:", text)

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas películas");
  }

  return res.json();
}

export async function getFilmById(id: number): Promise<Pelicula> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/" + id, {
    credentials: "include", // MUY IMPORTANTE
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar la pelicula");
  }

  return res.json();
}