import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Gestión de Equipos
 * Repo: cristiancarreno-debug/dashboard-incidencias
 */
const DEPLOY_URL = 'https://cristiancarreno-debug.github.io/dashboard-incidencias/';

export default function EquiposModule() {
  return <ModuleIframe title="Gestión de Tablero de Jira" src={DEPLOY_URL} />;
}
