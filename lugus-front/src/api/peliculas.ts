import type { Pelicula } from "../types/Pelicula"

export async function getUltimasPeliculas(): Promise<Pelicula[]> {
  const res = await fetch("http://localhost:8080/lugus/v1/api/films/ultimas", {
    credentials: "include", // MUY IMPORTANTE
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas películas");
  }

  return res.json();
}
