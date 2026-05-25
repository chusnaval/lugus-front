interface InputProps {
  label: string
  value: string | number | null | undefined
  type?: string
  onChange: (value: string) => void
}

export default function Input({ label, value, onChange, type = "text" }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        className="w-full bg-[#111] border border-[#333] p-2 rounded"
        value={value ?? ""}               // ← evita el warning de React
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
