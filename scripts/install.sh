#!/usr/bin/env bash
set -euo pipefail
cp backend/.env.example backend/.env || true
cp frontend/.env.example frontend/.env.local || true
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
cd ../frontend
npm install
