import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Reporte de Incidencias
 * Owner: Cristian Carreño
 * Repo: cristiancarreno-debug/dashboard-incidencias-patrimoniales
 * Deploy: https://cristiancarreno-debug.github.io/dashboard-incidencias-patrimoniales/
 */
const DEPLOY_URL = 'https://cristiancarreno-debug.github.io/dashboard-incidencias-patrimoniales/';

export default function IncidenciasModule() {
  return (
    <ModuleIframe
      title="Reporte de Incidencias"
      src={DEPLOY_URL}
      owner="Cristian Carreño"
    />
  );
}
