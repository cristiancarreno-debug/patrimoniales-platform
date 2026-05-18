# Plataforma Unificada — Tribu Patrimoniales

Portal web que unifica los dashboards de gestión de la Tribu Patrimoniales bajo la identidad visual de Seguros Bolívar. Cada dashboard se carga desde su deploy independiente via iframe — sin migración de código.

## Módulos

| Módulo | Owner | Repo | Deploy |
|--------|-------|------|--------|
| **Informes** | Marcela Duarte | `marceladuartesilva-design/executive-reporting-framework` | Pendiente |
| **Equipos** | Cristian Carreño | `cristiancarreno-debug/dashboard-incidencias` | [GitHub Pages](https://cristiancarreno-debug.github.io/dashboard-incidencias/) |
| **Incidencias** | Cristian Carreño | `cristiancarreno-debug/dashboard-incidencias-patrimoniales` | [GitHub Pages](https://cristiancarreno-debug.github.io/dashboard-incidencias-patrimoniales/) |
| **Costos AWS** | Estefhanía Osorio | `estefhaniaosorio-boop/aws-cost-dashboard-libertador` | [GitHub Pages](https://estefhaniaosorio-boop.github.io/aws-cost-dashboard-libertador/) |

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│  Shell (este repo) — Navbar + Router + Identidad Visual  │
│  ┌───────────────────────────────────────────────────┐   │
│  │  <iframe src="dashboard-externo.github.io/..." /> │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

- **El shell** solo provee navegación, identidad visual y controles (recarga, fullscreen, abrir en nueva pestaña)
- **Cada dashboard** vive en su propio repo con su propio pipeline de CI/CD
- **No hay migración de código** — cada desarrollador mantiene autonomía total

## Stack del Shell

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.3.1 | UI Framework |
| Vite | 5.4.11 | Build tool |
| TypeScript | 5.7.3 | Tipado estricto |
| Tailwind CSS | 3.4.17 | Estilos (identidad Seguros Bolívar) |
| React Router | 6.28.1 | Navegación (HashRouter) |
| Lucide React | 0.468.0 | Iconos |
| Sonner | 1.7.2 | Notificaciones |

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (http://localhost:5173)
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Ejecutar linter
npm run type-check   # Verificar tipos TypeScript
npm run format       # Formatear código con Prettier
```

## Estructura del Proyecto

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Router + Layout
├── index.css                         # Tailwind + tokens corporativos
├── pages/
│   └── Home.tsx                      # Landing con cards de acceso
├── shared/
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer, Layout
│   │   └── common/                   # ModuleIframe, LoadingSpinner, ErrorBoundary
│   └── lib/
│       └── utils.ts                  # cn(), formatDate()
└── modules/
    ├── informes/index.tsx            # iframe → executive-reporting-framework
    ├── equipos/index.tsx             # iframe → dashboard-incidencias
    ├── incidencias/index.tsx         # iframe → dashboard-incidencias-patrimoniales
    └── costos-aws/index.tsx          # iframe → aws-cost-dashboard-libertador
```

## Guía de Estilos — Seguros Bolívar

### Paleta de Colores

| Color | HEX | Clase Tailwind | Uso |
|-------|-----|----------------|-----|
| Verde Bolívar | `#00A651` | `bg-bolivar-500` | Primario, CTAs, nav activo |
| Verde Oscuro | `#007A3D` | `bg-bolivar-700` | Hover |
| Verde Claro | `#E6F7ED` | `bg-bolivar-50` | Backgrounds destacados |
| Fondo página | `#F8FAFB` | `bg-surface-secondary` | Background general |
| Texto principal | `#1F2937` | `text-content-primary` | Headings, body |
| Texto secundario | `#6B7280` | `text-content-secondary` | Descripciones |
| Bordes | `#E5E7EB` | `border-border` | Cards, separadores |

### Tipografía

- **Familia:** Inter (sans-serif)
- **Headings:** font-semibold (600) o font-bold (700)
- **Body:** font-normal (400) o font-medium (500)

## Cómo agregar un nuevo módulo

1. Crear `src/modules/<nombre>/index.tsx`
2. Usar el componente `ModuleIframe` con la URL del deploy:
   ```tsx
   import { ModuleIframe } from '@/shared/components/common/ModuleIframe';
   
   const DEPLOY_URL = 'https://usuario.github.io/mi-dashboard/';
   
   export default function MiModulo() {
     return <ModuleIframe title="Mi Dashboard" src={DEPLOY_URL} owner="Nombre" />;
   }
   ```
3. Agregar la ruta en `App.tsx`
4. Agregar el item en `Navbar.tsx`
5. Agregar la card en `Home.tsx`

## Reglas de Colaboración

### Git Flow

| Rama | Propósito |
|------|-----------|
| `main` | Producción (auto-deploy) |
| `feature/<desc>` | Nuevas funcionalidades del shell |
| `fix/<desc>` | Correcciones del shell |

### Reglas

1. **Nunca push directo a `main`** — siempre via Pull Request
2. **CI debe pasar** (lint + type-check + build) antes de merge
3. **Conventional Commits:** `feat:`, `fix:`, `docs:`, `style:`
4. **Cada owner mantiene su dashboard en su propio repo** — este repo solo es el shell

### Para los owners de dashboards

- Sigue trabajando en tu repo normalmente
- Tus cambios se reflejan automáticamente en la plataforma (el iframe carga tu deploy)
- Si cambias la URL de deploy, avisa para actualizar la constante en tu módulo

## Deploy

- **Plataforma:** GitHub Pages
- **Trigger:** Push a `main`
- **URL:** `https://<org>.github.io/patrimoniales-platform/`

## Autores

- **Marcela Duarte** — Dashboard Informes
- **Cristian Carreño** — Dashboards Equipos e Incidencias
- **Estefhanía Osorio** — Dashboard Costos AWS
