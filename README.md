# User Management

PHP API (Caddy + PHP-FPM) with PostgreSQL. The API is at `http://localhost:8080`. The UI is the Vite app at `http://localhost:5173`.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Composer](https://getcomposer.org/) (for PHP packages)
- [Node.js](https://nodejs.org/) (for the React UI)

## Setup

1. Clone the repo and open the folder:

```bash
git clone https://github.com/TrainTrainee/UserManagement.git
cd UserManagement
```

2. Create a `.env` file:

```env
OPENWEATHER_API_KEY=
DB_HOST=postgres
DB_PORT=5432
DB_NAME=users
DB_USER=app
DB_PASSWORD=
STORAGE_DRIVER=postgres
```

3. Install PHP dependencies and start Docker:

```bash
composer install
docker compose up -d --build
```

4. Create the users table (Postgres starts empty):

```bash
docker compose exec postgres psql -U app -d users -c "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT UNIQUE, phone_number TEXT UNIQUE, dob DATE, age INT, gender TEXT);"
```

5. Start the React UI (Docker must already be up):

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Useful commands

```bash
docker compose ps
docker compose logs -f
docker compose down
```

### Troubleshooting

- relation "users" does not exist / "Database error": run the CREATE TABLE command in step 4.
- password authentication failed: `.env` password does not match Postgres. Recreate PHP after fixing `.env`: `docker compose up -d --force-recreate php`.
- Port 8080 or 5432 already in use: stop the other app, or change the ports in `docker-compose.yml`.
- `GET /api/... 502`: Docker is not running. Start it, then retry the Vite app.
