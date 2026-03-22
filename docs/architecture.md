# PrintFold Studio Architecture

## System overview

PrintFold Studio separates concerns into a public frontend, a Laravel API backend, and queue-driven asset/export workers.

### Frontend responsibilities
- Landing page, template discovery, pricing, dashboard, and authenticated editor UX.
- Rich canvas editing with Konva, autosave, undo/redo, and non-printing fold/safe/bleed guides.
- Modal-driven auth flows powered by backend session or token endpoints.
- Browser preview and export status polling.

### Backend responsibilities
- Authentication, password reset, social login callback orchestration, and permission checks.
- CRUD for templates, paper sizes, fold types, projects, project pages, uploads, exports, orders, and settings.
- Stripe checkout session creation and webhook processing.
- Queue jobs for generating preview PDFs and print-ready HD PDFs.
- Secure private downloads via signed routes or authorized API responses.

### Data model strategy
- Normalized relational entities for admin-managed taxonomy and commerce objects.
- JSON canvas payloads on `project_pages.canvas_data` for cross-platform editor portability.
- Separate `exports` records to track preview versus HD rendering lifecycle.
- `user_flags` provide payment bypass and premium privileges without coupling to roles.

### Rendering pipeline
1. Frontend saves normalized page JSON.
2. Export request creates `exports` record and dispatches `GenerateProjectExportJob`.
3. Job transforms project pages into print HTML via Blade view.
4. Browsershot/Chromium renders PDF at target DPI.
5. Preview exports apply watermark overlay and reduced quality.
6. Files are stored on configured disk and exposed only through authorized download endpoints.

### Security model
- Sanctum SPA auth or API token auth for frontend app.
- Policies for project, upload, export, order, and admin access.
- Signed download URLs, MIME validation, image sanitization, rate limiting, and queue isolation.
