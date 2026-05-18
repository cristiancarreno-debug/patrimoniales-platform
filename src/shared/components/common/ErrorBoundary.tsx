import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary para capturar errores en módulos lazy-loaded.
 * Muestra un mensaje genérico sin exponer detalles internos.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
            <h2 className="text-lg font-semibold text-content-primary mb-2">
              Error al cargar el módulo
            </h2>
            <p className="text-sm text-content-secondary mb-4">
              {this.props.fallbackMessage || 'Ocurrió un error inesperado. Intente recargar la página.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
