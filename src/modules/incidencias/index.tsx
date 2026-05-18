import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Reporte de Incidencias
 * Repo: cristiancarreno-debug/dashboard-incidencias-patrimoniales
 */
const DEPLOY_URL = 'https://cristiancarreno-debug.github.io/dashboard-incidencias-patrimoniales/';

export default function IncidenciasModule() {
  return <ModuleIframe title="Reporte de Incidencias" src={DEPLOY_URL} />;
}
