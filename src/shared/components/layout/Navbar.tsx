import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Users,
  AlertTriangle,
  DollarSign,
  Home,
  ExternalLink,
} from 'lucide-react';

const INFORMES_EXTERNAL_URL = 'https://web-production-42a26.up.railway.app/';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio', icon: Home, exact: true, external: false },
  { to: INFORMES_EXTERNAL_URL, label: 'Informes', icon: BarChart3, exact: false, external: true },
  { to: '/equipos', label: 'Tablero Jira', icon: Users, exact: false, external: false },
  { to: '/incidencias', label: 'Incidencias', icon: AlertTriangle, exact: false, external: false },
  { to: '/costos-aws', label: 'Costos AWS', icon: DollarSign, exact: false, external: false },
  { to: '/equipo', label: 'Equipo', icon: Users, exact: false, external: false },
] as const;

/**
 * Barra de navegación principal con identidad Seguros Bolívar.
 * Tabs horizontales con iconos y estado activo en verde corporativo.
 */
export function Navbar() {
  return (
    <header className="bg-white border-b border-border shadow-navbar sticky top-0 z-50">
        <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bolivar-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SB</span>
            </div>
            <div>
              <h1 className="text-base font-semibold text-content-primary leading-tight">
                Gerencia Portafolio
              </h1>
              <p className="text-xs text-content-secondary leading-tight">
                Seguros Bolívar
              </p>
            </div>
          </div>

          {/* Navegación por tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon, exact, external }) =>
              external ? (
                <a
                  key={to}
                  href={to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-content-secondary hover:text-content-primary hover:bg-surface-tertiary"
                >
                  <Icon size={16} />
                  {label}
                  <ExternalLink size={12} className="opacity-50" />
                </a>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-bolivar-50 text-bolivar-700'
                        : 'text-content-secondary hover:text-content-primary hover:bg-surface-tertiary'
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              )
            )}
          </nav>

          {/* Mobile menu placeholder */}
          <button className="md:hidden p-2 rounded-lg hover:bg-surface-tertiary">
            <BarChart3 size={20} className="text-content-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
