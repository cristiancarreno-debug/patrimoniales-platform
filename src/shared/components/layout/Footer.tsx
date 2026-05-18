/**
 * Footer de la plataforma con branding Seguros Bolívar.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="w-full px-6 py-4">
        <p className="text-center text-xs text-content-tertiary">
          Centro de Mando — Gerencia Portafolio — Seguros Bolívar © {currentYear}
        </p>
      </div>
    </footer>
  );
}
