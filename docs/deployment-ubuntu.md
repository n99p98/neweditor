# Ubuntu deployment

1. Install PHP 8.3, Composer, Node 22, MySQL 8+, Redis, Nginx, Supervisor, Chromium.
2. Clone repo into `/var/www/printfold`.
3. Copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env.local`.
4. Run `composer install` in `backend/` and `npm install && npm run build` in `frontend/`.
5. Run `php artisan key:generate`, `php artisan migrate --seed`, and `php artisan storage:link`.
6. Configure Nginx using `deploy/nginx.conf` as a base and point PHP requests to PHP-FPM.
7. Install Supervisor program using `deploy/supervisor-worker.conf`.
8. Set up a systemd service for Next.js or run behind PM2.
9. Configure Stripe webhooks to `/api/checkout/webhook`.
10. Set S3 credentials if moving assets off local disk.
