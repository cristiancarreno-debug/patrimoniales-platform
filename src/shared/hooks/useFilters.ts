import { useState, useMemo, useCallback } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Tipo de filtro soportado por el hook */
type FilterType = 'multi' | 'single' | 'dateRange';

/** Configuración de un filtro individual */
interface FilterDefinition<T> {
  /** Tipo de filtro: multi-select, single-select o rango de fechas */
  type: FilterType;
  /** Campo del objeto T sobre el cual se aplica el filtro */
  field: keyof T & string;
  /** Filtros que se limpian automáticamente al cambiar este filtro (cascada) */
  cascadeTo?: string[];
  /** Para dateRange: comparación a aplicar ('gte' = desde, 'lte' = hasta) */
  comparison?: 'gte' | 'lte';
}

/** Configuración completa de filtros: mapa de nombre → definición */
type FilterConfig<T> = Record<string, FilterDefinition<T>>;

/** Valor posible de un filtro según su tipo */
type FilterValue = string[] | string | undefined;

/** Estado de todos los filtros activos */
type FilterState = Record<string, FilterValue>;

/** Resultado retornado por el hook useFilters */
interface UseFiltersReturn<T> {
  /** Datos filtrados según los filtros activos */
  filtered: T[];
  /** Estado actual de todos los filtros */
  filters: FilterState;
  /** Establece el valor de un filtro por su key */
  setFilter: (key: string, value: FilterValue) => void;
  /** Limpia un filtro específico y sus dependientes (cascada) */
  clearFilter: (key: string) => void;
  /** Limpia todos los filtros */
  clearAll: () => void;
  /** Retorna las opciones disponibles para un filtro multi/single, considerando cascada */
  getOptions: (key: string) => string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Obtiene recursivamente todas las keys dependientes de un filtro dado.
 * @param key - Key del filtro origen
 * @param config - Configuración de filtros
 * @returns Array de keys que deben limpiarse en cascada
 */
function getCascadeKeys<T>(key: string, config: FilterConfig<T>): string[] {
  const definition = config[key];
  if (!definition?.cascadeTo) return [];

  const result: string[] = [];
  for (const dep of definition.cascadeTo) {
    result.push(dep);
    result.push(...getCascadeKeys(dep, config));
  }
  return [...new Set(result)];
}

/**
 * Determina el orden de cascada: qué filtros están "por encima" de un filtro dado.
 * Un filtro A está por encima de B si A tiene cascadeTo que incluye B (directa o transitivamente).
 * @param key - Key del filtro objetivo
 * @param config - Configuración de filtros
 * @returns Array de keys de filtros superiores en la jerarquía
 */
function getParentKeys<T>(key: string, config: FilterConfig<T>): string[] {
  const parents: string[] = [];
  for (const k of Object.keys(config)) {
    if (k === key) continue;
    const cascades = getCascadeKeys(k, config);
    if (cascades.includes(key)) {
      parents.push(k);
    }
  }
  return parents;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Hook genérico para filtrado de datos con soporte de cascada, multi-select,
 * single-select y rangos de fecha.
 *
 * @typeParam T - Tipo de los objetos a filtrar (debe ser un Record)
 * @param data - Array de datos a filtrar
 * @param config - Configuración de filtros con tipos, campos y cascada
 * @returns Objeto con datos filtrados, estado de filtros y funciones de control
 *
 * @example
 * ```tsx
 * const { filtered, filters, setFilter, clearAll, getOptions } = useFilters(incidencias, {
 *   tribu: { type: 'multi', field: 'tribu', cascadeTo: ['squad', 'producto'] },
 *   squad: { type: 'multi', field: 'squad', cascadeTo: ['producto'] },
 *   producto: { type: 'multi', field: 'producto' },
 *   plataforma: { type: 'multi', field: 'plataforma' },
 *   fechaDesde: { type: 'dateRange', field: 'createdDate', comparison: 'gte' },
 *   fechaHasta: { type: 'dateRange', field: 'createdDate', comparison: 'lte' },
 * });
 * ```
 */
export function useFilters<T extends Record<string, unknown>>(
  data: T[],
  config: FilterConfig<T>,
): UseFiltersReturn<T> {
  const [filters, setFilters] = useState<FilterState>({});

  /**
   * Aplica los filtros activos sobre los datos y retorna el subconjunto filtrado.
   */
  const filtered = useMemo(() => {
    return data.filter((item) => {
      for (const [key, definition] of Object.entries(config)) {
        const value = filters[key];
        if (value === undefined || (Array.isArray(value) && value.length === 0)) {
          continue;
        }

        const fieldValue = item[definition.field];

        if (definition.type === 'multi') {
          const selected = value as string[];
          if (!selected.includes(String(fieldValue))) return false;
        }

        if (definition.type === 'single') {
          const selected = value as string;
          if (String(fieldValue) !== selected) return false;
        }

        if (definition.type === 'dateRange') {
          const dateStr = String(fieldValue).slice(0, 10);
          const compareStr = String(value).slice(0, 10);
          if (definition.comparison === 'gte' && dateStr < compareStr) return false;
          if (definition.comparison === 'lte' && dateStr > compareStr) return false;
        }
      }
      return true;
    });
  }, [data, config, filters]);

  /**
   * Establece el valor de un filtro y limpia los filtros dependientes (cascada).
   * @param key - Key del filtro a establecer
   * @param value - Nuevo valor del filtro
   */
  const setFilter = useCallback(
    (key: string, value: FilterValue) => {
      setFilters((prev) => {
        const next = { ...prev };

        // Establecer el valor del filtro
        if (value === undefined || (Array.isArray(value) && value.length === 0)) {
          delete next[key];
        } else {
          next[key] = value;
        }

        // Limpiar filtros dependientes (cascada)
        const cascadeKeys = getCascadeKeys(key, config);
        for (const cascadeKey of cascadeKeys) {
          delete next[cascadeKey];
        }

        return next;
      });
    },
    [config],
  );

  /**
   * Limpia un filtro específico y sus dependientes en cascada.
   * @param key - Key del filtro a limpiar
   */
  const clearFilter = useCallback(
    (key: string) => {
      setFilters((prev) => {
        const next = { ...prev };
        delete next[key];

        const cascadeKeys = getCascadeKeys(key, config);
        for (const cascadeKey of cascadeKeys) {
          delete next[cascadeKey];
        }

        return next;
      });
    },
    [config],
  );

  /**
   * Limpia todos los filtros activos.
   */
  const clearAll = useCallback(() => {
    setFilters({});
  }, []);

  /**
   * Retorna las opciones únicas disponibles para un filtro dado,
   * considerando los filtros activos de niveles superiores (cascada).
   * Solo aplica para filtros de tipo 'multi' o 'single'.
   * @param key - Key del filtro para obtener opciones
   * @returns Array de strings con las opciones disponibles, ordenadas alfabéticamente
   */
  const getOptions = useCallback(
    (key: string): string[] => {
      const definition = config[key];
      if (!definition || definition.type === 'dateRange') return [];

      // Obtener los filtros "padres" (superiores en la jerarquía de cascada)
      const parentKeys = getParentKeys(key, config);

      // Filtrar datos aplicando solo los filtros de niveles superiores
      const constrainedData = data.filter((item) => {
        for (const parentKey of parentKeys) {
          const parentDef = config[parentKey];
          const parentValue = filters[parentKey];

          if (parentValue === undefined || (Array.isArray(parentValue) && parentValue.length === 0)) {
            continue;
          }

          const fieldValue = item[parentDef.field];

          if (parentDef.type === 'multi') {
            const selected = parentValue as string[];
            if (!selected.includes(String(fieldValue))) return false;
          }

          if (parentDef.type === 'single') {
            if (String(fieldValue) !== String(parentValue)) return false;
          }

          if (parentDef.type === 'dateRange') {
            const dateStr = String(fieldValue).slice(0, 10);
            const compareStr = String(parentValue).slice(0, 10);
            if (parentDef.comparison === 'gte' && dateStr < compareStr) return false;
            if (parentDef.comparison === 'lte' && dateStr > compareStr) return false;
          }
        }
        return true;
      });

      // Extraer valores únicos del campo
      const values = new Set<string>();
      for (const item of constrainedData) {
        const val = item[definition.field];
        if (val !== null && val !== undefined && val !== '') {
          values.add(String(val));
        }
      }

      return Array.from(values).sort();
    },
    [data, config, filters],
  );

  return { filtered, filters, setFilter, clearFilter, clearAll, getOptions };
}
