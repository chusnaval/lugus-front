export async function getCoversPage(page: number, size: number, filters: any) {
  const params = new URLSearchParams()
  const API_URL = import.meta.env.VITE_API_URL
  params.set("page", page.toString())
  params.set("size", size.toString())

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      params.set(key, value.toString())
    }
  })

  const res = await fetch(
    `${API_URL}/v1/api/covers/page?${params.toString()}`,
    { credentials: "include" }
  )

  if (!res.ok) throw new Error("Error al cargar covers")

  return res.json()
}
