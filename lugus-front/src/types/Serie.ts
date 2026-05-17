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
