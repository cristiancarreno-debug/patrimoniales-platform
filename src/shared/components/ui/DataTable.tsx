import { useState, useMemo, useCallback } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

/** Definición de una columna para DataTable. */
export interface ColumnDef<T> {
  /** Clave del campo en el objeto de datos. */
  key: keyof T & string;
  /** Etiqueta visible en el header. */
  label: string;
  /** Función de renderizado personalizada para la celda. */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  /** Indica si la columna es ordenable. Por defecto `true`. */
  sortable?: boolean;
  /** Alineación del contenido. Por defecto `'left'`. */
  align?: 'left' | 'center' | 'right';
}

/** Props del componente DataTable. */
export interface DataTableProps<T> {
  /** Definición de columnas a mostrar. */
  columns: ColumnDef<T>[];
  /** Array de datos a renderizar. */
  data: T[];
  /** Cantidad de filas por página. Por defecto `10`. */
  pageSize?: number;
  /** Mensaje cuando no hay datos. */
  emptyMessage?: string;
}

type SortDir = 'asc' | 'desc';

const ALIGN_CLASSES: Record<string, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Componente genérico de tabla con ordenamiento por columna y paginación.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'name', label: 'Nombre' },
 *     { key: 'age', label: 'Edad', align: 'right' },
 *   ]}
 *   data={users}
 *   pageSize={5}
 * />
 * ```
 */
export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  pageSize = 10,
  emptyMessage = 'No hay datos disponibles',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<(keyof T & string) | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [page, setPage] = useState(0);

  const toggleSort = useCallback(
    (key: keyof T & string) => {
      if (sortKey === key) {
        setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
      setPage(0);
    },
    [sortKey],
  );

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return sortDir === 'asc' ? -1 : 1;
      if (bVal == null) return sortDir === 'asc' ? 1 : -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal);
      const bStr = String(bVal);
      return sortDir === 'asc'
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-content-secondary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-surface-tertiary">
            <tr>
              {columns.map((col) => {
                const isSortable = col.sortable !== false;
                const align = col.align ?? 'left';
                return (
                  <th
                    key={col.key}
                    className={cn(
                      'px-4 py-3 font-medium text-content-secondary',
                      ALIGN_CLASSES[align],
                      isSortable && 'cursor-pointer select-none hover:bg-surface-secondary',
                    )}
                    onClick={isSortable ? () => toggleSort(col.key) : undefined}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        align === 'center' && 'justify-center',
                        align === 'right' && 'justify-end',
                      )}
                    >
                      {col.label}
                      {isSortable && (
                        <ArrowUpDown
                          className={cn(
                            'h-3 w-3',
                            sortKey === col.key
                              ? 'text-content-primary'
                              : 'text-content-tertiary',
                          )}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paged.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="border-b border-border hover:bg-surface-secondary transition-colors"
              >
                {columns.map((col) => {
                  const align = col.align ?? 'left';
                  const value = row[col.key];
                  return (
                    <td
                      key={col.key}
                      className={cn('px-4 py-3 text-content-primary', ALIGN_CLASSES[align])}
                    >
                      {col.render ? col.render(value, row) : String(value ?? '—')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-content-secondary">
            Mostrando {page * pageSize + 1} a{' '}
            {Math.min((page + 1) * pageSize, sorted.length)} de {sorted.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="p-1.5 rounded border border-border hover:bg-surface-tertiary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-content-secondary">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded border border-border hover:bg-surface-tertiary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
