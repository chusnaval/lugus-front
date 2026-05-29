interface ChipProps {
  icon: React.ReactNode
  label: React.ReactNode
  color?: "default" | "blue" | "gold" | "grey" | "green" | "red" | "silver" | "muted"
  className?: string
  title?: string
}

export default function Chip({
  icon,
  label,
  color = "default",
  className = "",
  title
}: ChipProps) {
  const colors = {
    default: "bg-lugus-bgAlt text-lugus-text",
    blue: "bg-lugus-blue text-white",
    gold: "bg-lugus-gold text-black",
    grey: "bg-lugus-silver text-black",
    green: "bg-lugus-green text-white",
    red: "bg-lugus-red text-white",
    silver: "bg-lugus-silver text-black",
    muted: "bg-lugus-muted text-white"
  }

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${colors[color]} ${className}`}>
      <span className="text-lg" title={title}>
        {icon}
      </span>
      {label}
    </span>
  )

}
