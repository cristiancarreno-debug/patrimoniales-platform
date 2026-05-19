import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Layout } from '@/shared/components/layout/Layout';
import { LoadingSpinner } from '@/shared/components/common/LoadingSpinner';

/** Módulos cargados con lazy loading (code-splitting automático) */
const Home = lazy(() => import('@/pages/Home'));
const Informes = lazy(() => import('@/modules/informes'));
const Equipos = lazy(() => import('@/modules/equipos'));
const Incidencias = lazy(() => import('@/modules/incidencias'));
const CostosAws = lazy(() => import('@/modules/costos-aws'));
const Equipo = lazy(() => import('@/modules/equipo'));

/**
 * Aplicación principal — Plataforma Unificada Patrimoniales.
 * Usa HashRouter para compatibilidad con GitHub Pages.
 * Cada módulo carga su dashboard externo via iframe.
 */
export function App() {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/informes" element={<Informes />} />
            <Route path="/equipos" element={<Equipos />} />
            <Route path="/incidencias" element={<Incidencias />} />
            <Route path="/costos-aws" element={<CostosAws />} />
            <Route path="/equipo" element={<Equipo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster position="top-right" richColors />
    </HashRouter>
  );
}
