# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto adhiere a [Versionamiento Semántico](https://semver.org/lang/es/).

## [No publicado]

### Agregado
- Se configuró URL de deploy para módulo "Informe Proyectos y EO" (`src/modules/informes/index.tsx`) apuntando a Railway
- Se creó preset corporativo Tailwind (`src/shared/config/tailwind.preset.ts`) con paleta Seguros Bolívar, tipografía Inter, border-radius y sombras estándar
- Se creó componente genérico `DataTable<T>` (`src/shared/components/ui/DataTable.tsx`) con ordenamiento por columna, paginación y soporte responsive
- Se creó componente `StatCard` y `StatCardGrid` (`src/shared/components/ui/StatCard.tsx`) con soporte de colores, iconos y tendencias

### Cambiado
- Se refactorizó `tailwind.config.ts` para importar el tema desde el preset corporativo reutilizable
