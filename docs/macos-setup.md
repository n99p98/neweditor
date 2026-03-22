# macOS setup

This repository ships with Docker-oriented backend defaults, so the sample Laravel env uses container hostnames like `mysql` and `redis`.
If you are running the stack directly on macOS with Homebrew services, change those hostnames to `127.0.0.1` before running migrations.

## Backend `.env`

Start by copying the example file:

```bash
cp backend/.env.example backend/.env
```

Then update these values for local macOS development:

```env
APP_URL=http://127.0.0.1:9000
FRONTEND_URL=http://127.0.0.1:3000
DB_HOST=127.0.0.1
REDIS_HOST=127.0.0.1
GOOGLE_REDIRECT_URI=http://127.0.0.1:9000/api/auth/social/google/callback
```

## Create the database

```bash
mysql -u root -p
```

```sql
CREATE DATABASE printfold CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'printfold'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON printfold.* TO 'printfold'@'localhost';
FLUSH PRIVILEGES;
```

## Run the backend

```bash
cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=9000
```

## Run the frontend

```bash
cp frontend/.env.example frontend/.env.local
cd frontend
npm install
npm run dev
```
