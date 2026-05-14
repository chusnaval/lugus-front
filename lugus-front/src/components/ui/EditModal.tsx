import { useEffect, useState } from "react"
import Modal from "./Modal"
import Button from "./Button"
import TextField from "./TextField"

interface EditModalProps<T> {
  open: boolean
  onClose: () => void
  data: T | null
  onSave: (updated: T) => void
}

export default function EditModal<T>({
  open,
  onClose,
  data,
  onSave,
}: EditModalProps<T>) {
  const [form, setForm] = useState<any>({})

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  if (!open || !data) return null

  const handleChange = (key: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = () => {
    onSave(form)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Editar registro">
      <div className="space-y-4">
        {Object.keys(form).map((key) => (
          <TextField
            key={key}
            label={key}
            value={String(form[key])}
            onChange={(v) => handleChange(key, v)}
          />
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </div>
    </Modal>
  )
}
