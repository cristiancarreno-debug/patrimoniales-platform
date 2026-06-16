import { ExternalLink } from 'lucide-react';

/**
 * Módulo: Informe Proyectos y EO
 * Repo: marceladuartesilva-design/executive-reporting-framework
 *
 * Se abre en pestaña nueva porque el servidor Railway bloquea iframes (X-Frame-Options: SAMEORIGIN).
 */
const DEPLOY_URL = 'https://web-production-42a26.up.railway.app/';

export default function InformesModule() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-content-primary">
          Informe Proyectos y EO
        </h1>
      </header>
      <div className="card flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <p className="text-content-secondary">
            El informe se abre en una pestaña independiente.
          </p>
          <a
            href={DEPLOY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-bolivar-500 text-white font-medium rounded-lg hover:bg-bolivar-600 transition-colors"
          >
            <ExternalLink size={18} />
            Abrir Informe Proyectos y EO
          </a>
          <p className="text-xs text-content-tertiary mt-2">
            Repo: marceladuartesilva-design/executive-reporting-framework
          </p>
        </div>
      </div>
    </div>
  );
}
