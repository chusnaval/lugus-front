import type { Condition } from "./Condition"
import type { Format } from "./Format"

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

  pack?: Pack | null
  steelbook: boolean
  slipcover: boolean
  owned: boolean
  watched: boolean
  mine: boolean
  favorite: boolean

  imdbId?: string | null
  rating?: number | null
  votes?: number | null

  situation?: string | null

  // Relaciones que NO están @JsonIgnore
  condition?: Condition | null
  father?: Pelicula | null

  director: Director[] | []
  casting: Cast[] |  []
  trailerUrl?: string | null

  coverSrc?: string | ''
  synopsis?: string | null
  imdbUrl?: string | undefined
  lastSeen?: string | null
  location?: string | ''
  group?: Group | null
  country: string | ''
  duration: number
}

export interface Pack {
  id: number
  title: string
}

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
  order: number
  name: string
  character: string
}



