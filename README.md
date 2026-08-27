# User Management

PHP API (Caddy + PHP-FPM) with PostgreSQL. The UI is served at `http://localhost:8080`.

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Composer](https://getcomposer.org/) (for PHP packages)

## Setup

1. Clone the repo and open the folder:

```bash
git clone https://github.com/TrainTrainee/UserManagement.git
cd UserManagement
```

2. Create a .env file:

OPENWEATHER_API_KEY=
DB_HOST=postgres
DB_PORT=5432
DB_NAME=users
DB_USER=app
DB_PASSWORD=
STORAGE_DRIVER=postgres

3. Install PHP 8.4 dependecies using:
   composer install
   docker compose up -d --build

4. Create the users table (Postgres starts empty):

docker compose exec postgres psql -U app -d users -c "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT UNIQUE, phone_number TEXT UNIQUE, dob DATE, age INT, gender TEXT);"

5. Useful commands:

docker compose ps
docker compose logs -f
docker compose down

6. For Vite + Typescript:

! Vite runs on port 5173 and proxies /api to http://localhost:8080 (Docker must already be up).

cd frontend
npm install
npm run dev

### Troubleshooting

- relation "users" does not exist / "Database error", run the CREATE TABLE command in step 4.

- password authentication failed, .env password does not match Postgres. Recreate PHP after fixing .env:
  docker compose up -d --force-recreate php.

- Port 8080 or 5432 already in use, stop the other app, or change the ports in docker-compose.yml.
