import { ModuleIframe } from '@/shared/components/common/ModuleIframe';

/**
 * Módulo: Costos AWS
 * Repo: estefhaniaosorio-boop/aws-cost-dashboard-libertador
 */
const DEPLOY_URL = 'https://estefhaniaosorio-boop.github.io/aws-cost-dashboard-libertador/';

export default function CostosAwsModule() {
  return <ModuleIframe title="Costos AWS" src={DEPLOY_URL} />;
}
