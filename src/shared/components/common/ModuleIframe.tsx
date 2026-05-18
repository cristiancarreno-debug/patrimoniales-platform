import { useState } from 'react';
import { ExternalLink, RefreshCw, Maximize2, Minimize2 } from 'lucide-react';

interface ModuleIframeProps {
  title: string;
  src: string;
  owner: string;
}

/**
 * Componente reutilizable que carga un dashboard externo via iframe.
 * Incluye controles de recarga, abrir en nueva pestaña y fullscreen.
 */
export function ModuleIframe({ title, src, owner }: ModuleIframeProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className={`flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 bg-surface-secondary p-4' : 'space-y-4'}`}>
      {/* Header del módulo */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-content-primary">{title}</h1>
          <p className="text-xs text-content-tertiary">Owner: {owner}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
            title="Recargar"
          >
            <RefreshCw size={16} className="text-content-secondary" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? (
              <Minimize2 size={16} className="text-content-secondary" />
            ) : (
              <Maximize2 size={16} className="text-content-secondary" />
            )}
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-surface-tertiary transition-colors"
            title="Abrir en nueva pestaña"
          >
            <ExternalLink size={16} className="text-content-secondary" />
          </a>
        </div>
      </div>

      {/* iframe container */}
      <div className={`relative bg-white rounded-lg border border-border overflow-hidden ${isFullscreen ? 'flex-1' : 'min-h-[calc(100vh-220px)]'}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface-secondary z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bolivar-500 mx-auto" />
              <p className="mt-3 text-sm text-content-secondary">Cargando {title}...</p>
            </div>
          </div>
        )}
        <iframe
          key={iframeKey}
          src={src}
          title={title}
          className="w-full h-full min-h-[calc(100vh-220px)] border-0"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
