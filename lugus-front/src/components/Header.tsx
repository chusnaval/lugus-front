export default function Header({ onOpenFilters }: { onOpenFilters: () => void }) {
  return (
    <header className="bg-lugus-bg text-lugus-text h-14 flex items-center justify-between px-4 border-b border-lugus-bgAlt">
      
      {/* Logo / Nombre */}
      <h1 className="text-xl font-semibold tracking-wide">
        LUGUS
      </h1>

   
      

      <div className="flex items-center gap-4">
         <button onClick={onOpenFilters} className="text-lugus-text hover:text-lugus-gold transition-colors text-2xl">
        🔍
       </button>
        <button className="hover:text-lugus-gold transition-colors">
          🔔
        </button>
        <button className="hover:text-lugus-gold transition-colors">
          ⚙️
        </button>
      </div>

    </header>
  )
}
