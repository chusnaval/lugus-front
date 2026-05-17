export interface Pelicula {
  id: number
  title: string
  titleMgmt: string
  format: Format
  year: number
  genreCode: string
  genreDesc: string
  mgmtCode: string
  notes?: string | ''

  pack: boolean
  steelbook: boolean
  slipcover: boolean
  owned: boolean
  watched: boolean

  imdbId?: string | null
  rating?: number | null
  votes?: number | null

  situation?: string | null

  // Relaciones que NO están @JsonIgnore
  condition?: Condition | null
  father?: Pelicula | null

  directores?: Director[] | null
  cast?: Cast[] | null


  coverSrc?: string | null
  synopsis?: string | null
  imdbUrl?: string | undefined
  faUrl?: string | undefined
  lastSeen?: string | null
  location?: string | null
  group?: Group | null
  country: string | ''
}


export type Format =
  | "VHS"
  | "DVD"
  | "BLURAY"
  | "ULTRAHD"
  | "DIGITAL"


export interface Group {
  id: number
  name: string
  faId?: number | null
}

export interface Director {
  id: number
  name: string
}

export interface Cast {
  id: number
  name: string
  character: string
}


// Si Estado tiene más campos, los añadimos
export interface Condition {
  id: number
  desc: string
}
