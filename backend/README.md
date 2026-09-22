# Express Starter

Scaffolded with `create-node-express-starter`.

## Getting started

```
npm install
cp .env.example .env
npm run dev
```

Server starts on the port set in `.env` (default `5000`). Health check: `GET /api/health`.

## Structure

- `src/config` — env/config loading
- `src/routes` — route definitions
- `src/controllers` — request handlers
- `src/services` — business logic
- `src/models` — data models
- `src/middlewares` — Express middleware
- `src/validators` — request validation
- `src/utils` — shared helpers
- `src/errors` — custom error classes
- `src/constants` — shared constants/enums
- `src/data` — static/seed data
- `src/scripts` — one-off/maintenance scripts
- `src/templates` — email/document templates
- `tests` — test suite
