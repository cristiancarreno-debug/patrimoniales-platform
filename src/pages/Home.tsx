import { Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  AlertTriangle,
  DollarSign,
  ArrowRight,
} from 'lucide-react';

const MODULES = [
  {
    to: '/informes',
    title: 'Informe Proyectos y EO',
    description: 'Reportes ejecutivos de proyectos y estado operativo.',
    icon: BarChart3,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    to: '/equipos',
    title: 'Gestión de Tablero de Jira',
    description: 'Seguimiento de capacidad, asignaciones y métricas de equipo.',
    icon: Users,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    to: '/incidencias',
    title: 'Reporte de Incidencias',
    description: 'Dashboard de incidencias por producto, tribu y squad con métricas de resolución.',
    icon: AlertTriangle,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    to: '/costos-aws',
    title: 'Costos AWS',
    description: 'Monitoreo de costos de infraestructura AWS por servicio y ambiente.',
    icon: DollarSign,
    color: 'bg-emerald-50 text-emerald-600',
  },
] as const;

/**
 * Página de inicio — Centro de Mando Portafolio.
 */
export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-8">
        <h1 className="text-3xl font-bold text-content-primary mb-3">
          Centro de Mando Portafolio de Proyectos y Excelencia Operativa
        </h1>
        <p className="text-content-secondary max-w-3xl mx-auto">
          Centro unificado de gestión para los proyectos y excelencia operativa.
          Acceda a informes, métricas de equipo, incidencias y costos de infraestructura.
        </p>
      </section>

      {/* Grid de módulos */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES.map(({ to, title, description, icon: Icon, color }) => (
          <Link
            key={to}
            to={to}
            className="card group hover:border-bolivar-500/30 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-content-primary group-hover:text-bolivar-700 transition-colors">
                  {title}
                </h3>
                <p className="text-sm text-content-secondary mt-1">
                  {description}
                </p>
                <div className="flex items-center justify-end mt-4">
                  <ArrowRight
                    size={16}
                    className="text-content-tertiary group-hover:text-bolivar-500 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Info */}
      <section className="card bg-bolivar-50 border-bolivar-500/20">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-bolivar-500" />
          <p className="text-sm text-bolivar-700">
            Los datos se actualizan automáticamente de lunes a viernes a las 8:00 AM, 12:00 PM y 4:00 PM (hora Colombia).
          </p>
        </div>
      </section>
    </div>
  );
}
