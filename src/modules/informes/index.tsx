import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Informe Proyectos y EO
 * Owner: Marcela Duarte
 * Repo: marceladuartesilva-design/executive-reporting-framework
 *
 * Carga el dashboard desplegado en GitHub Pages via iframe.
 * URL pendiente de configurar cuando el deploy esté listo.
 */
const DEPLOY_URL = '';

export default function InformesModule() {
  if (!DEPLOY_URL) {
    return (
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-content-primary">
            Informe Proyectos y EO
          </h1>
          <p className="text-sm text-content-secondary mt-1">
            Reportes ejecutivos de proyectos y estado operativo
          </p>
        </header>
        <div className="card flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-content-secondary">
              Deploy pendiente de configurar
            </p>
            <p className="text-xs text-content-tertiary mt-2">
              Repo: marceladuartesilva-design/executive-reporting-framework
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ModuleIframe
      title="Informe Proyectos y EO"
      src={DEPLOY_URL}
      owner="Marcela Duarte"
    />
  );
}
