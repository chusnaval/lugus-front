// src/components/home/MediaSection.tsx
import { Link } from "react-router-dom"
import Card from "./ui/Card"


export interface MediaItem {
  id: number | string
  title: string
  coverSrc: string | null
}

interface MediaSectionProps {
  title: string
  total: number
  novedades: number
  items: MediaItem[]
  linkTo: string
}

export default function MediaSection({
  title,
  total,
  novedades,
  items,
  linkTo
}: MediaSectionProps) {
  return (
    <Card className="p-6 bg-[#0d0d0d] border border-[#1f1f1f]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#d4af37] tracking-wide">
          {title}
        </h2>

        <div className="flex space-x-4 text-sm text-gray-300">
          <span>Total: <strong className="text-white">{total}</strong></span>
          <span>Novedades: <strong className="text-white">{novedades}</strong></span>
        </div>
      </div>

      {/* Últimas añadidas */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {items.slice(0, 5).map((item) => (
          <Link key={item.id} to={`${linkTo}/${item.id}`}>
            <div className="relative bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md hover:scale-[1.02] transition-transform group">
              {item.coverSrc ? (
                <img
                  src={item.coverSrc}
                  alt={item.title}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-700 flex items-center justify-center text-white text-sm p-2 text-center">
                  {item.title}
                </div>
              )}

              {/* Overlay hover */}
              <div className="
                absolute inset-0 
                bg-black/70 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                flex items-end p-2
              ">
                <p className="text-white text-xs font-semibold">{item.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

 
      <div className="text-right">
        <Link
          to={linkTo}
          className="px-4 py-2 border border-[#d4af37] text-[#d4af37] rounded-md hover:bg-[#d4af37] hover:text-black transition-colors">
          Ver Todo
        </Link>
      </div>
    </Card>
  )
}
