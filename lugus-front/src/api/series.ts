import type { MediaItem } from "../components/MediaSection";
import type { Serie } from "../types/Serie";

import { fetchWithAuth } from "./fetchWithAuth"

export async function getUltimasSeries(): Promise<Serie[]> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/series/ultimas", {
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

export async function getUltimasSeriesForHome(): Promise<MediaItem[]> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/series/ultimas", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas películas");
  }

  const data: Serie[] = await res.json();

  // Transformación Pelicula → MediaItem
  return data.map((p) => ({
    id: p.id,
    title: p.title ?? p.title,   // según tu DTO
    coverSrc: p.coverSrc ?? null,
  }));
}

export async function getSerieById(id: number): Promise<Serie> {
  const res = await fetchWithAuth("http://localhost:8080/lugus/v1/api/series/" + id, {
    credentials: "include", // MUY IMPORTANTE
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar la pelicula");
  }

  return res.json();
}