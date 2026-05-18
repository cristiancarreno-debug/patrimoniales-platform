import type { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout principal de la plataforma.
 * Envuelve todas las páginas con Navbar y Footer.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-secondary">
      <Navbar />
      <main className="flex-1 w-full px-6 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
