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
const normalizeCountryCode: Record<string, string> = {
  // Códigos válidos (se dejan igual)
  ES: "ES",
  US: "US",
  JP: "JP",
  FR: "FR",
  DE: "DE",
  IT: "IT",
  GB: "GB",

  // Alias o códigos no ISO → convertir
  UK: "GB",
  USA: "US",
  UNITED_STATES: "US",
  UNITED_KINGDOM: "GB",

  // Países históricos → asignar país moderno
  CSX: "CZ",   // Checoslovaquia → República Checa
  SUN: "RU",   // Unión Soviética → Rusia
  DDE: "DE",   // Alemania del Oeste → Alemania
  YUG: "RS",   // Yugoslavia → Serbia (o "SI" según criterio)
  NA0: "NA",   // NA0 → Namibia (tu enum lo usa así)

  // Otros que ya tienes en tu enum
  HONG_KONG: "HK",
  MACAO: "MO",
}


export function normalizeCountry(code: string): string {
  const c = code.toUpperCase().trim()
  return normalizeCountryCode[c] || c
}

// Lista de países (puedes ampliarla)
export const countries: Record<
  string,
  { name: string; flag?: JSX.Element }
> = {
AL: { name: "Albania", flag: getCountryFlag("AL") },
  AR: { name: "Argentina", flag: getCountryFlag("AR") },
  AM: { name: "Armenia", flag: getCountryFlag("AM") },
  AW: { name: "Aruba", flag: getCountryFlag("AW") },
  AU: { name: "Australia", flag: getCountryFlag("AU") },
  AT: { name: "Austria", flag: getCountryFlag("AT") },
  BS: { name: "Bahamas", flag: getCountryFlag("BS") },
  BH: { name: "Bahréin", flag: getCountryFlag("BH") },
  BE: { name: "Bélgica", flag: getCountryFlag("BE") },
  BR: { name: "Brasil", flag: getCountryFlag("BR") },
  BG: { name: "Bulgaria", flag: getCountryFlag("BG") },
  KH: { name: "Camboya", flag: getCountryFlag("KH") },
  CA: { name: "Canadá", flag: getCountryFlag("CA") },
  CL: { name: "Chile", flag: getCountryFlag("CL") },
  CN: { name: "China", flag: getCountryFlag("CN") },
  CO: { name: "Colombia", flag: getCountryFlag("CO") },
  CZ: { name: "República Checa", flag: getCountryFlag("CZ") },

  // No ISO-2 → sin bandera
  CSX: { name: "Checoslovaquia", flag: undefined },

  DK: { name: "Dinamarca", flag: getCountryFlag("DK") },
  DO: { name: "República Dominicana", flag: getCountryFlag("DO") },
  EG: { name: "Egipto", flag: getCountryFlag("EG") },
  EE: { name: "Estonia", flag: getCountryFlag("EE") },
  FI: { name: "Finlandia", flag: getCountryFlag("FI") },
  FR: { name: "Francia", flag: getCountryFlag("FR") },
  GM: { name: "Gambia", flag: getCountryFlag("GM") },
  GE: { name: "Georgia", flag: getCountryFlag("GE") },
  DE: { name: "Alemania", flag: getCountryFlag("DE") },
  GR: { name: "Grecia", flag: getCountryFlag("GR") },
  GT: { name: "Guatemala", flag: getCountryFlag("GT") },
  HK: { name: "Hong Kong", flag: getCountryFlag("HK") },
  HU: { name: "Hungría", flag: getCountryFlag("HU") },
  IS: { name: "Islandia", flag: getCountryFlag("IS") },
  IN: { name: "India", flag: getCountryFlag("IN") },
  ID: { name: "Indonesia", flag: getCountryFlag("ID") },
  IR: { name: "Irán", flag: getCountryFlag("IR") },
  IE: { name: "Irlanda", flag: getCountryFlag("IE") },
  IL: { name: "Israel", flag: getCountryFlag("IL") },
  IT: { name: "Italia", flag: getCountryFlag("IT") },
  JM: { name: "Jamaica", flag: getCountryFlag("JM") },
  JP: { name: "Japón", flag: getCountryFlag("JP") },
  JO: { name: "Jordania", flag: getCountryFlag("JO") },
  KZ: { name: "Kazajistán", flag: getCountryFlag("KZ") },
  KE: { name: "Kenia", flag: getCountryFlag("KE") },
  LV: { name: "Letonia", flag: getCountryFlag("LV") },
  LT: { name: "Lituania", flag: getCountryFlag("LT") },
  LU: { name: "Luxemburgo", flag: getCountryFlag("LU") },
  MO: { name: "Macao", flag: getCountryFlag("MO") },
  MY: { name: "Malasia", flag: getCountryFlag("MY") },
  MT: { name: "Malta", flag: getCountryFlag("MT") },
  MX: { name: "México", flag: getCountryFlag("MX") },
  MC: { name: "Mónaco", flag: getCountryFlag("MC") },
  MA: { name: "Marruecos", flag: getCountryFlag("MA") },

  // NA0 → no ISO
  NA0: { name: "N/A", flag: undefined },

  NA: { name: "Namibia", flag: getCountryFlag("NA") },
  NP: { name: "Nepal", flag: getCountryFlag("NP") },
  NL: { name: "Países Bajos", flag: getCountryFlag("NL") },
  NZ: { name: "Nueva Zelanda", flag: getCountryFlag("NZ") },
  NO: { name: "Noruega", flag: getCountryFlag("NO") },
  PK: { name: "Pakistán", flag: getCountryFlag("PK") },
  PA: { name: "Panamá", flag: getCountryFlag("PA") },
  PY: { name: "Paraguay", flag: getCountryFlag("PY") },
  PE: { name: "Perú", flag: getCountryFlag("PE") },
  PH: { name: "Filipinas", flag: getCountryFlag("PH") },
  PL: { name: "Polonia", flag: getCountryFlag("PL") },
  PT: { name: "Portugal", flag: getCountryFlag("PT") },
  PR: { name: "Puerto Rico", flag: getCountryFlag("PR") },
  QA: { name: "Catar", flag: getCountryFlag("QA") },
  RO: { name: "Rumanía", flag: getCountryFlag("RO") },
  RU: { name: "Rusia", flag: getCountryFlag("RU") },
  RS: { name: "Serbia", flag: getCountryFlag("RS") },
  SG: { name: "Singapur", flag: getCountryFlag("SG") },
  SK: { name: "Eslovaquia", flag: getCountryFlag("SK") },
  ZA: { name: "Sudáfrica", flag: getCountryFlag("ZA") },
  KR: { name: "Corea del Sur", flag: getCountryFlag("KR") },

  // No ISO
  SUN: { name: "Unión Soviética", flag: undefined },

  ES: { name: "España", flag: getCountryFlag("ES") },
  SE: { name: "Suecia", flag: getCountryFlag("SE") },
  CH: { name: "Suiza", flag: getCountryFlag("CH") },
  SY: { name: "Siria", flag: getCountryFlag("SY") },
  TW: { name: "Taiwán", flag: getCountryFlag("TW") },
  TH: { name: "Tailandia", flag: getCountryFlag("TH") },
  TN: { name: "Túnez", flag: getCountryFlag("TN") },
  TR: { name: "Turquía", flag: getCountryFlag("TR") },
  GB: { name: "Reino Unido", flag: getCountryFlag("GB") },
  US: { name: "Estados Unidos", flag: getCountryFlag("US") },
  UA: { name: "Ucrania", flag: getCountryFlag("UA") },
  AE: { name: "Emiratos Árabes Unidos", flag: getCountryFlag("AE") },
  UY: { name: "Uruguay", flag: getCountryFlag("UY") },
  VE: { name: "Venezuela", flag: getCountryFlag("VE") },
  VN: { name: "Vietnam", flag: getCountryFlag("VN") },

  // No ISO
  DDE: { name: "Alemania Occidental", flag: undefined },
  YUG: { name: "Yugoslavia", flag: undefined },

  YE: { name: "Yemen", flag: getCountryFlag("YE") },
  ZM: { name: "Zambia", flag: getCountryFlag("ZM") },
}
