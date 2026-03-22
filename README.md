# PrintFold Studio

PrintFold Studio is a SaaS web application for building printable templates, brochures, folded cards, invitations, funeral programs, certificates, and other paper-based designs.

## Architecture

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn-style UI primitives, Zustand, React Hook Form, Zod, Framer Motion, Konva.
- **Backend:** Laravel 12, PHP 8.3, Sanctum, Socialite, Stripe SDK, Redis queues, Intervention Image.
- **Rendering:** Queue-based PDF rendering pipeline using Browsershot/Chromium for print-accurate HTML-to-PDF output.
- **Storage:** Laravel filesystem disks for originals, previews, thumbnails, and exports.
- **Infra:** Docker Compose for local development, Nginx + PHP-FPM + Supervisor deployment for Ubuntu.

## Monorepo layout

- `backend/` Laravel API, admin APIs, queue jobs, PDF export services.
- `frontend/` Next.js marketing site, template browser, editor, dashboard, modal auth.
- `deploy/` Nginx and Supervisor examples.
- `docs/` deployment, architecture, and data format notes.
- `scripts/` bootstrap and install helpers.

See `docs/architecture.md` and each app's README/config for full setup.
