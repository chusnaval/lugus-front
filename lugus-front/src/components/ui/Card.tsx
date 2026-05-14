interface CardProps {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-lugus-bgAlt border border-lugus-bgAlt rounded-lg p-4 ${className}`}>
      {children}
    </div>
  )
}
