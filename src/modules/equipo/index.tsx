import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Equipo — Resumen de asignaciones por integrante.
 * Repo: cristiancarreno-debug/dashboard-incidencias (ruta /equipo)
 */
const DEPLOY_URL = 'https://cristiancarreno-debug.github.io/dashboard-incidencias/#/equipo';

export default function EquipoModule() {
  return <ModuleIframe title="Equipo" src={DEPLOY_URL} />;
}
