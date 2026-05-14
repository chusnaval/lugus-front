interface TextFieldProps {
  label?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  type?: string
  className?: string
}

export default function TextField({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  type = "text",
  className = "",
}: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm text-lugus-muted">{label}</label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-lugus-bgAlt border border-lugus-bgAlt rounded-md px-3 py-2 text-lugus-text focus:outline-none focus:ring-2 focus:ring-lugus-blue"
      />

      {error && (
        <span className="text-sm text-red-400">{error}</span>
      )}
    </div>
  )
}
