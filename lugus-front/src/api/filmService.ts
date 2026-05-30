import type { MediaItem } from "../components/MediaSection";
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
export async function getUltimasPeliculasPorGenero(genero: string): Promise<Pelicula[]> {
  const res = await fetchWithAuth(`http://localhost:8080/lugus/v1/api/films/ultimas/${genero}`, {
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
export async function getPeliculasPage(
  page: number,
  size: number,
  filters: Record<string, any> = {}
) {
  const params = new URLSearchParams()

  params.set("page", page.toString())
  params.set("size", size.toString())

  // Añadir solo filtros que tengan valor
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value.toString())
    }
  })

  const res = await fetch(
    `http://localhost:8080/lugus/v1/api/films/page?${params.toString()}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

  if (!res.ok) {
    throw new Error("Error al cargar películas")
  }

  return res.json()
}


export async function getUltimasPeliculasForHome(): Promise<MediaItem[]> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/ultimas", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas películas");
  }

  const data: Pelicula[] = await res.json();

  // Transformación Pelicula → MediaItem
  return data.map((p) => ({
    id: p.id,
    title: p.title ?? p.title,   // según tu DTO
    coverSrc: p.coverSrc ?? null,
  }));
}
 
export async function getFilmById(id: number): Promise<Pelicula> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/" + id, {
    credentials: "include", 
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar la pelicula");
  }

  return res.json();
}

export async function createMovie(movie: any) {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(movie)
  })

  if (!res.ok) throw new Error("Error al crear la película")
}

export async function update(movie: Pelicula) {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/films/" + movie.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(movie)
  })

  if (!res.ok) throw new Error("Error al actualizar la película")
}