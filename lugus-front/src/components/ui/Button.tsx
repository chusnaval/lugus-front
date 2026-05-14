interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary" | "ghost"
  className?: string
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200"

  const variants = {
    primary: "bg-lugus-blue text-white hover:bg-blue-600",
    secondary: "bg-lugus-bgAlt text-lugus-text hover:bg-lugus-bg",
    ghost: "text-lugus-text hover:text-lugus-gold",
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
