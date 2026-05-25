import type { ReactNode } from "react"


interface FilterDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  width?: number
}

export function FilterDrawer({
  open,
  onClose,
  children,
  width = 320
}: FilterDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#111] border-l border-[#333] z-50 p-6 overflow-y-auto
          transition-transform duration-300`}
        style={{
          width,
          transform: open ? "translateX(0)" : `translateX(${width}px)`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  )
}
