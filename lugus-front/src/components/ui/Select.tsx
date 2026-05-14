interface Option {
  label: string
  value: string
}

interface SelectProps {
  label?: string
  value: string
  onChange: (value: string) => void
  options: Option[]
  className?: string
}

export default function Select({
  label,
  value,
  onChange,
  options,
  className = "",
}: SelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm text-lugus-muted">{label}</label>
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-lugus-bgAlt border border-lugus-bgAlt rounded-md px-3 py-2 text-lugus-text focus:outline-none focus:ring-2 focus:ring-lugus-blue"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
