# Orders Dashboard

🚧 Work in progress

A shop management dashboard built with Laravel, extending a user management
system (started during my internship at Tomorrow Services) to handle orders.

## Features

- User management
- Orders dashboard (in progress)

## Requirements

- Docker Desktop

## Setup

1. Copy the env file:

copy backend\.env.example backend\.env

2. Start the stack:

```bash
docker compose up -d --build
```

3. Install PHP packages, generate the app key, migrate:

```bash
docker compose exec -e COMPOSER_PROCESS_TIMEOUT=0 backend composer install
docker compose exec backend php artisan key:generate
docker compose exec backend php artisan migrate --seed
```

4. Open http://localhost:8080

Frontend `npm install` runs inside the container on start.

## Useful commands

```bash
docker compose ps
docker compose logs -f
docker compose down
docker compose down -v
```
