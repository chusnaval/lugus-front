interface ToggleProps {
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
  className?: string
}

export default function Toggle({
  checked,
  onChange,
  label,
  className = "",
}: ToggleProps) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      {label && <span className="text-lugus-text">{label}</span>}

      <div
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 rounded-full transition-colors ${
          checked ? "bg-lugus-blue" : "bg-lugus-bgAlt"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition-transform mt-0.5 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </div>
    </label>
  )
}
