# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start dev server with watch mode (port 3000)
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
```

## Database Commands

```bash
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Apply migrations to database
npm run db:studio    # Open Drizzle Studio GUI
```

Requires `DATABASE_URL` in `.env` (see `.env.example`). Uses Neon PostgreSQL (serverless).

## Architecture

Express.js REST API with layered architecture:

```
routes → controllers → services → models
```

**Request flow:**
1. **Routes** (`src/routes/`) - Define endpoints, delegate to controllers
2. **Controllers** (`src/controllers/`) - Handle HTTP req/res, validate input with Zod schemas, call services
3. **Services** (`src/services/`) - Business logic, database operations via Drizzle ORM
4. **Models** (`src/models/`) - Drizzle schema definitions (PostgreSQL tables)

**Key patterns:**
- Validation schemas in `src/validations/` using Zod - controllers call `schema.safeParse(req.body)`
- JWT tokens signed and verified via `src/utils/jwt.js`, stored in HTTP-only cookies via `src/utils/cookies.js`
- Winston logger (`src/config/logger.js`) - logs to `logs/` directory and console in dev
- Database connection in `src/config/database.js` exports `db` (Drizzle instance)

## Code Style

- ESM modules (`"type": "module"`)
- 2-space indentation, single quotes, semicolons required
- Unused function args prefixed with `_` (e.g., `_req`)
- Use `const`/`let`, no `var`; prefer arrow functions
