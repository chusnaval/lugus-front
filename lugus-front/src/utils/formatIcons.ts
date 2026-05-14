import { createElement } from "react"
import { Videotape, Disc, Film, MonitorPlay, Smartphone, Bot } from "lucide-react"
import type { ReactElement } from "react"

export const formatIconsFormat: Record<string, ReactElement> = {
  DVD: createElement(Disc, { className: "w-4 h-4" }),
  "Blu-ray": createElement(Film, { className: "w-4 h-4" }),
  Bluray: createElement(Film, { className: "w-4 h-4" }),
  "4K": createElement(MonitorPlay, { className: "w-4 h-4" }),
  "4K UHD": createElement(MonitorPlay, { className: "w-4 h-4" }),
  Digital: createElement(Smartphone, { className: "w-4 h-4" }),
  VHS: createElement(Videotape, { className: "w-4 h-4" }),
}

export const formatIconsGenero: Record<string, ReactElement> = {
  ANI: createElement(Bot, { className: "w-4 h-4" }),
  ANM: createElement(Bot, { className: "w-4 h-4" }),
  INF: createElement(Bot, { className: "w-4 h-4" }),
  MUS: createElement(Bot, { className: "w-4 h-4" }),
  NAV: createElement(Bot, { className: "w-4 h-4" }),
  DRA: createElement(Bot, { className: "w-4 h-4" }),
  ROM: createElement(Bot, { className: "w-4 h-4" }),
  COM: createElement(Bot, { className: "w-4 h-4" }),
  CIF: createElement(Bot, { className: "w-4 h-4" }),
  ACC: createElement(Bot, { className: "w-4 h-4" }),
  AVE: createElement(Bot, { className: "w-4 h-4" }),
  FAN: createElement(Bot, { className: "w-4 h-4" }),
  THR: createElement(Bot, { className: "w-4 h-4" }),
  MIS: createElement(Bot, { className: "w-4 h-4" }),
  CRI: createElement(Bot, { className: "w-4 h-4" }),
  TER: createElement(Bot, { className: "w-4 h-4" }),
  DOC: createElement(Bot, { className: "w-4 h-4" }),
  DEP: createElement(Bot, { className: "w-4 h-4" })
}