interface ChipProps {
  icon: React.ReactNode
  label: React.ReactNode
  color?: "default" | "blue" | "gold"
  className?: string
}

export default function Chip({
  icon,
  label,
  color = "default",
  className = "",
}: ChipProps) {
  const colors = {
    default: "bg-lugus-bgAlt text-lugus-text",
    blue: "bg-lugus-blue text-white",
    gold: "bg-lugus-gold text-black",
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${colors[color]} ${className}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </span>
  )
}
