export default function SkeletonCard() {
  return (
    <div className="bg-lugus-bgAlt rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="h-48 bg-gray-700" />
      <div className="p-2">
        <div className="h-4 bg-gray-600 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  )
}
