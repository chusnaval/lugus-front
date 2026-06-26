import type { Edition } from "./Edition"


export interface Pelicula {
  id: number
  title: string
  titleMgmt: string
  year: number
  genreCode: string
  genreDesc: string
  imdbId?: string | null
  rating?: number | null
  votes?: number | null

  director: Director[] | []
  casting: Cast[] |  []
  editions: Edition[] | []

  coverSrc?: string 
  synopsis?: string | null
  imdbUrl?: string 
  lastSeen?: string | null
  lbRating?: number 
  group?: Group | null
  country: string 
  trailerUrl?: string | null
  mine: boolean
  favorite: boolean
  duration: number
  watched: boolean
  notes: string 
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



