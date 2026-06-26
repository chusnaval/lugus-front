import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Edition } from "../../types/Edition";
import Chip from "../../components/ui/Chip";
import { formatIconsFormat } from "../../utils/formatIcons";


interface EditionCardProps {
  ediciones: Edition[];
  index: number;
  onChangeIndex: (newIndex: number) => void;
}

export function EditionCard({ ediciones, index, onChangeIndex }: EditionCardProps) {
  const e = ediciones[index];

  const prev = () => onChangeIndex((index - 1 + ediciones.length) % ediciones.length);
  const next = () => onChangeIndex((index + 1) % ediciones.length);

  return (
    <div className="bg-[#1f1f1f] border border-lugus-gray rounded-lg p-6 h-fit">

      {/* Navegación entre ediciones */}
      {ediciones.length > 1 && (
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="p-2 hover:bg-[#2a2a2a] rounded">
            <ChevronLeft className="w-5 h-5 text-lugus-gray" />
          </button>

          <span className="text-sm text-lugus-gray">
            Edición {index + 1} / {ediciones.length}
          </span>

          <button onClick={next} className="p-2 hover:bg-[#2a2a2a] rounded">
            <ChevronRight className="w-5 h-5 text-lugus-gray" />
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-3">Edición</h2>
      <div className="w-full h-px bg-lugus-gray mb-4"></div>

      <ul className="text-sm space-y-2">

        {/* Formato */}
        <li>
          <span className="inline-flex items-center gap-2">
            <span>
              <Chip
                icon={formatIconsFormat[e.format?.descripcion ?? ""] ?? "💿"}
                label={e.format?.descripcion ?? "-"}
                color="blue"
              />
            </span>
          </span>
        </li>

        <li><strong>Código:</strong> {e.mgmtCode}</li>
        <li><strong>Localización:</strong> {e.location?? "–"}</li>
        <li><strong>Pack:</strong> {e.pack?.title ?? "-"}</li>
        <li><strong>Estado:</strong> {e.condition?.desc ?? "-"}</li>

        <li><strong>Steelbook:</strong> {e.steelbook ? "Sí" : "No"}</li>
        <li><strong>Funda:</strong> {e.slipcover ? "Sí" : "No"}</li>

        <li><strong>Comprado:</strong> {e.owned ? "Sí" : "No"}</li>

        {e.notes && (
          <li><strong>Notas:</strong> {e.notes}</li>
        )}

      </ul>
    </div>
  );
}
