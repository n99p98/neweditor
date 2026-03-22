#!/usr/bin/env bash
set -euo pipefail
cp backend/.env.example backend/.env || true
cp frontend/.env.example frontend/.env.local || true
echo "Copied env templates. If you are running locally on macOS, update backend/.env DB_HOST and REDIS_HOST from service names to 127.0.0.1 before migrating."
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
cd ../frontend
npm install
