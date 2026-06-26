import type { Condition } from "./Condition"
import type { Format } from "./Format"

export interface Edition {
  id: number
  format: Format| null
  location?: string
  mgmtCode: string
  notes?: string 
  pack?: Pack | null
  steelbook: boolean
  slipcover: boolean
  owned: boolean
  condition?: Condition | null
}

export interface Pack {
  id: number
  title: string
}