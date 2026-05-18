/**
 * Spinner de carga reutilizable con colores corporativos.
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-bolivar-500 mx-auto" />
        <p className="mt-4 text-sm text-content-secondary">Cargando módulo...</p>
      </div>
    </div>
  );
}
