interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-lugus-bgAlt text-lugus-text rounded-lg shadow-xl w-full max-w-md p-6 relative">
        
        {/* Título */}
        {title && (
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
        )}

        {/* Contenido */}
        <div className="mb-6">
          {children}
        </div>

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-lugus-muted hover:text-lugus-gold"
        >
          ✖
        </button>
      </div>
    </div>
  )
}
