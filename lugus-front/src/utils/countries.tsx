// src/utils/countries.tsx

import type { JSX } from "react"

// Forzamos una fuente que SIEMPRE soporta emojis de bandera
const emojiStyle: React.CSSProperties = {
  fontFamily: `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`,
  fontSize: "1.25rem",
  lineHeight: 1,
}

// Convierte código ISO → bandera emoji
export function getCountryFlag(code: string): JSX.Element {
  const country = (code || "").toUpperCase().trim()

  // Validación: debe ser un código ISO de 2 letras
  if (!/^[A-Z]{2}$/.test(country)) {
    return <span style={emojiStyle}>🏳️</span>
  }

  const flag = country
    .split("")
    .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("")

  return <span style={emojiStyle}>{flag}</span>
}

// Lista de países (puedes ampliarla)
export const countries: Record<
  string,
  { name: string; flag: JSX.Element }
> = {
  ES: { name: "España", flag: getCountryFlag("ES") },
  US: { name: "Estados Unidos", flag: getCountryFlag("US") },
  JP: { name: "Japón", flag: getCountryFlag("JP") },
  FR: { name: "Francia", flag: getCountryFlag("FR") },
  IT: { name: "Italia", flag: getCountryFlag("IT") },
  DE: { name: "Alemania", flag: getCountryFlag("DE") },
}
