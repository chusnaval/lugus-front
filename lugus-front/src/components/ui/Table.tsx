interface Column<T> {
  key: keyof T
  label: string
  className?: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (row: T) => void
  onDelete?: (row: T) => void
  className?: string
}

export default function Table<T>({
  columns,
  data,
  onEdit,
  onDelete,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-lugus-bgAlt ${className}`}>
      <table className="w-full border-collapse">
        <thead className="bg-lugus-bgAlt text-lugus-text">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`text-left px-4 py-3 font-semibold border-b border-lugus-bgAlt ${col.className || ""}`}
              >
                {col.label}
              </th>
            ))}

            {(onEdit || onDelete) && (
              <th className="px-4 py-3 font-semibold border-b border-lugus-bgAlt text-left">
                Acciones
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-lugus-bgAlt transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-4 py-3 border-b border-lugus-bgAlt text-lugus-text"
                >
                  {String(row[col.key])}
                </td>
              ))}

              {(onEdit || onDelete) && (
                <td className="px-4 py-3 border-b border-lugus-bgAlt flex gap-3">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-lugus-blue hover:text-blue-400 transition-colors"
                    >
                      ✏️
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
