export interface Pelicula {
  id: number
  titulo: string
  tituloGest: string
  formato: Formato
  anyo: number
  genero: Genero
  codigo: string
  notas?: string | null

  pack: boolean
  steelbook: boolean
  funda: boolean
  comprado: boolean

  usrAlta?: string | null
  tsAlta: string // Instant → string ISO
  usrModif?: string | null
  tsModif?: string | null
  tsBaja?: string | null

  imdbId?: string | null
  rating?: number | null
  votes?: number | null

  situacion?: string | null

  // Relaciones que NO están @JsonIgnore
  estado?: Estado | null
  padre?: Pelicula | null
}

// Si tus enums vienen como string desde el backend:
export type Formato = 
  | "VHS"
  | "DVD"
  | "BLURAY"
  | "ULTRAHD"
  | "DIGITAL"

export type Genero =
  | "ANIMACION"
  | "ANIME"
  | "INFANTIL"
  | "MUSICAL"
  | "NAVIDENA"
  | "DRAMA"
  | "ROMANTICA"
  | "COMEDIA"
  | "CIENCIA_FICCION"
  | "ACCION"
  | "AVENTURA"
  | "FANTASIA"
  | "THRILLER"
  | "MISTERIO"
  | "CRIMEN"
  | "TERROR"
  | "BELICO"
  | "WESTERN"
  | "DOCUMENTAL"
  | "DEPORTES"

// Si Estado tiene más campos, los añadimos
export interface Estado {
  id: number
  nombre: string
}
