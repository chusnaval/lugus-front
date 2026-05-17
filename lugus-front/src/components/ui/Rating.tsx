// src/components/ui/Rating.tsx
interface RatingProps {
  value?: number | null
  className?: string
}

const formatRating = (n?: number | null) => {
  if (n == null) return "–"
  return (Math.ceil(n * 100) / 100).toFixed(2)
}

export default function Rating({ value, className = "" }: RatingProps) {
  return (
    <span className={`mr-2 text-sm text-gray-200 ${className}`}>
      ⭐ {formatRating(value)}
    </span>
  )
}
