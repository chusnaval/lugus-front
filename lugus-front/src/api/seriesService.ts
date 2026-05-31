import type { MediaItem } from "../components/MediaSection";
import type { Serie } from "../types/Serie";

import { fetchWithAuth } from "./fetchWithAuth"

export async function getUltimasSeries(): Promise<Serie[]> {
   const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetchWithAuth(`${API_URL}/v1/api/series/ultimas`, {
    credentials: "include", // MUY IMPORTANTE
  });

  console.log("RAW RESPONSE:", res)

  // Para ver el cuerpo en texto antes de parsearlo
  const text = await res.clone().text()
  console.log("BODY AS TEXT:", text)

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas series");
  }

  return res.json();
}

export async function getSeriesPage(
  page: number,
  size: number,
  filters: Record<string, any> = {}
) {
  const params = new URLSearchParams()
 const API_URL = import.meta.env.VITE_API_URL;
  params.set("page", page.toString())
  params.set("size", size.toString())

  // Añadir solo filtros que tengan valor
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.set(key, value.toString())
    }
  })

  const res = await fetch(
    `${API_URL}/v1/api/series/page?${params.toString()}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    }
  )

  if (!res.ok) {
    throw new Error("Error al cargar series")
  }

  return res.json()
}


export async function getUltimasSeriesForHome(): Promise<MediaItem[]> {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetchWithAuth(`${API_URL}/v1/api/series/ultimas`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("No se pudieron cargar las últimas series ");
  }

  const data: Serie[] = await res.json();

  // Transformación Serie → MediaItem
  return data.map((p) => ({
    id: p.id,
    title: p.title ?? p.title,   // según tu DTO
    coverSrc: p.coverSrc ?? null,
  }));
}

export async function getSerieById(id: number): Promise<Serie> {
  const API_URL = import.meta.env.VITE_API_URL;
  const res = await fetchWithAuth(`${API_URL}/v1/api/series/${id}`, {
    credentials: "include", // MUY IMPORTANTE
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar la serie");
  }

  return res.json();
}