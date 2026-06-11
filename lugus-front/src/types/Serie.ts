import type { Format } from "./Format"

export interface Serie {
  id: number
  title: string
  titleMgmt: string
  format: Format
  startYear: number
  finishYear?: number
  genreCode: string
  genreDesc: string
  mgmtCode: string
  notes?: string | ''
  location?: string | null  
  owned: boolean
  completed: boolean
  coverSrc?: string | null
  casting: Cast[] |  []
  seasons: Season[]
}

export interface Season {
  desc? : string | ''
  ordinal: number
  purchased: boolean
  wanted: boolean
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
  name: string
  character: string
}


// Si Estado tiene más campos, los añadimos
export interface Condition {
  id: number
  desc: string
}
