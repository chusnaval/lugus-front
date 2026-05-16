export interface Pelicula {
  id: number
  titulo: string
  tituloGest: string
  formato: Formato
  anyo: number
  generoCode: string | ''
  genero: Genero
  codigo: string
  notas?: string | null
  
  pack: boolean
  steelbook: boolean
  funda: boolean
  comprado: boolean
  visto : boolean
  
  imdbId?: string | null
  rating?: number | null
  votes?: number | null

  situacion?: string | null

  // Relaciones que NO están @JsonIgnore
  estado?: Estado | null
  padre?: Pelicula | null

  directores?: Director[] | null
  actores?: Inteprete[] | null


  cover?: string | null
  sinopsis?: string | null
  imdbUrl?: string | undefined
  faUrl?: string | undefined
  ultimaRevision?: string | null
  location?: string | null
  group?: string | null
  pais: string | ''
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

export interface Director {
  id: number
  nombre: string
}

export interface Inteprete {
  id: number
  nombre: string
  personaje: string
}


// Si Estado tiene más campos, los añadimos
export interface Estado {
  id: number
  nombre: string
}
