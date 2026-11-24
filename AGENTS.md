<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository notes

## Verify

- `npm run lint` (ESLint), `npm run typecheck` (`tsc --noEmit`), `npm run build`. There is no test suite, CI workflow, or pre-commit hook.
- `npm run format` rewrites only `*.ts`/`*.tsx`; CSS and Markdown are not covered. Prettier: no semicolons, double quotes, 80 columns, sorted Tailwind classes.
- Delete `.next` before `typecheck`/`build` after moving routes or changing `next.config.ts` loaders: stale `.next/types` and Turbopack loader caches cause false `Cannot find module` errors.
- `reactCompiler: true` and the custom Tailwind Turbopack rule need `babel-plugin-react-compiler` and `@tailwindcss/turbopack`; Next/Tailwind list them only as optional peers, so keep them in devDependencies.

## Setup

- `.env.local` is gitignored and no example is committed. Keys: `NEXT_PUBLIC_API_URL`, `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_IMGBB_KEY`.
- Start the separate Express API at `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`) for studios and bookings. Home/featured falls back to an empty state when it is down, but `/studios`, studio details, dashboard/listings/bookings, and CRUD calls need it reachable. `/api/auth/jwks` needs a reachable MongoDB.
- `src/lib/auth.ts` opens the Mongo client at import time and uses the hardcoded `studiospace` database. Bad `MONGODB_URI` breaks `dev`/`build` at startup; empty Google keys only produce non-fatal Better Auth warnings.
- Manual login for UI checks: `ava@studiospace.dev` / `Studio2026` (also in `README.md`).

## Wiring

- Next 16.4 App Router with `src/`: routes in `src/app`, shared UI in `src/components`, domain types/constants in `src/lib`. `@/*` maps to `src/*`. `src/proxy.ts` is the Next 16 middleware: it guards `/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/:path*` and redirects to `/login?redirect=<path>`.
- Auth: `src/lib/auth.ts` is the Better Auth server (MongoDB adapter, email/password, Google, `jwt()` plugin); `src/lib/auth-client.ts` is the browser client (`jwtClient()`); the route handler is `src/app/api/auth/[...all]/route.ts`. Keep the plugin sets aligned. Use `getTokenFromClient()` in client components and `getTokenFromServer()` in server components; protected Express calls send `authorization: Bearer <token>`.
- All studio/booking data lives on the Express server, not in Next. Existing endpoints: `/featured-studios`, `/studios?category=&search=`, `/studio/:id` (GET/PATCH/DELETE), `/add-studio`, `/booking`, `/booking/:id/status`, `/my-studios/:email`, `/my-bookings/:email`, `/my-bookings/:id/cancel`, `/host-bookings/:email`. Studio/booking mutation errors return JSON `{ msg }`, which the UI toasts.
- Server components fetch the API directly with `cache: "no-store"`; a failed studio detail calls `notFound()`, while list pages fall back to `[]`. There is no client-side data/query library.
- shadcn v4 `base-nova` components (`src/components/ui/`, `src/lib/utils.ts`) are generated — add with `npx shadcn@latest add ...` rather than hand-editing. They use `@base-ui/react`, so render links with `render={<Link href="..." />}` plus `nativeButton={false}`, not `asChild`. `cn` comes from the npm `cn` package; generated files may import it from `"cn"` directly.
- Tailwind v4 only: theme tokens live in `src/app/globals.css` (e.g. `--color-brand`); there is no `tailwind.config`. `postcss.config.mjs` uses `@tailwindcss/postcss`, and `next.config.ts` also wires `@tailwindcss/turbopack` for Turbopack.
- `next.config.ts`: React Compiler on; `cacheComponents` and `partialPrefetching` off; all HTTPS image hosts allowed. The root layout defaults `next-themes` to light.
- `CLAUDE.md` just includes `@AGENTS.md`; keep guidance in `AGENTS.md`.
