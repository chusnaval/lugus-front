import Modal from "./Modal"
import Button from "./Button"

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  message: string
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  message,
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title="Confirmar acción">
      <p className="text-lugus-text mb-6">{message}</p>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          variant="primary"
          className="bg-red-500 hover:bg-red-600"
          onClick={onConfirm}
        >
          Borrar
        </Button>
      </div>
    </Modal>
  )
}
