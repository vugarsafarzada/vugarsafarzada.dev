# vugarsafarzada.dev

Portfolio website monorepo built with Next.js (frontend) and Nest.js (backend), managed with Nx and pnpm. Includes Docker workflows for dev and build.

## Tech Stack
- Frontend: Next.js, Tailwind CSS, Redux
- Backend: Nest.js, MySQL, Prisma
- Tooling: Nx, pnpm, Docker

## Project Structure
- `frontend/` Next.js app
- `backend/` Nest.js API
- `docker-compose.dev.yml` Development compose
- `docker-compose.build.yml` Production build compose

## Requirements
- Node.js 20+
- pnpm 10+
- Docker (for containerized workflows)

## Local Development (without Docker)
Install dependencies once at the repo root:

```bash
pnpm install
```

Run the apps:

```bash
pnpm -w --filter backend start:dev
pnpm -w --filter frontend dev
```

## Docker Development
Start all services in the background:

```bash
pnpm run docker-run:dev
```

Follow logs:

```bash
pnpm run docker-logs:dev
```

Stop containers:

```bash
pnpm run docker-down:dev
```

## Docker Build (Prod-like)
Start production containers in the background:

```bash
pnpm run docker-run:build
```

Follow logs:

```bash
pnpm run docker-logs:build
```

Stop containers:

```bash
pnpm run docker-down:build
```

## Environment Variables
The root `.env` file is used by Docker Compose for credentials and ports. Example values:

```env
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_HOST=...
MYSQL_PORT=...
DATABASE_URL=...

BACKEND_PORT=5555
FRONTEND_PORT=3333
```

The app-level env files are in:
- `backend/.env`
- `frontend/.env`

## Ports
- Frontend: `http://localhost:3333`
- Backend: `http://localhost:5555`
- MySQL (dev compose): `localhost:3307`

## Notes
- This repo uses a single root `node_modules` via pnpm workspaces.
- Prisma client is generated during Docker builds.
