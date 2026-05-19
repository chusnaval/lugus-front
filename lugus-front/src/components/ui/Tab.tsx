import { Link, useMatch } from "react-router-dom"
interface TabProps {
  to: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export default function Tab({ to, children, icon }: TabProps) {
  const isActive = useMatch(to)

  return (
    <Link
      to={to}
      className={`pb-2 ${isActive ? "text-[#d4af37] border-b-2 border-[#d4af37]" : "text-gray-400 hover:text-gray-200"}
        flex items-center gap-2`}>
      {icon}
      {children}
    </Link>
  )
}
