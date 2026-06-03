# Vision Digital Labs — Future-Ready Digital Agency

A premium, futuristic, AI-enabled digital-agency website targeting enterprise &
SMB clients in the US, Canada, and Europe.

**Brand:** Vision Digital Labs · **Domain:** https://visiondigitallab.com

> This README is the living source of truth for the project. Keep the
> **Architecture**, **Routes & API**, and **Status** sections updated as the
> codebase evolves.

---

## Table of contents
- [Status](#status)
- [Tech stack](#tech-stack)
- [Monorepo layout](#monorepo-layout)
- [Frontend architecture](#frontend-architecture)
- [Routes (pages)](#routes-pages)
- [API endpoints](#api-endpoints)
- [Data & content](#data--content)
- [Theming & design system](#theming--design-system)
- [Running locally](#running-locally)
- [Git workflow](#git-workflow)
- [Roadmap / next milestone](#roadmap--next-milestone)

---

## Status

| Area | State |
|------|-------|
| Frontend (Next.js) | ✅ Built & verified — all pages, animations, chatbot UI, booking modal, SEO |
| Mock API (Next route handlers) | ✅ Built — frontend runs standalone on it |
| Backend (Spring Boot) | ✅ Built — REST API, JPA, JWT auth, seed data, Swagger. Needs a Postgres connection to run |
| Admin endpoints (JWT, role-based) | ✅ Built — leads + content CRUD |
| Docker | ✅ Dockerfile + docker-compose provided (Docker not yet installed locally) |
| CI-CD | ⏳ Planned |
| Real AI (OpenAI) chat | ⏳ Interface ready (strategy pattern), provider stubbed both sides |

Frontend: **34 routes** build clean. Backend: compiles, packages to a runnable jar, tests green (H2).
Local prerequisites still open: **Java 21** (using 17 for now), **Docker**, and a **managed Postgres** (Neon/Supabase) connection string to boot the backend.

---

## Tech stack

**Frontend (active)**
- Next.js 16 (App Router) · React 19 · TypeScript
- TailwindCSS v4 (CSS-first tokens) · shadcn-style UI primitives (Radix)
- Framer Motion · GSAP · Three.js via `@react-three/fiber` + `drei` (lazy, hero only)
- React Hook Form + Zod · `next-themes` · lucide-react

**Backend (built)**
- Java 17 (spec target 21) · Spring Boot 3.5.14 · Spring Security + JWT (jjwt)
- Spring Data JPA · PostgreSQL · in-memory cache (Redis-ready) · springdoc OpenAPI/Swagger
- Layered: Controller → Service → Repository, DTO pattern, global exception handling

---

## Monorepo layout

```
future-agency/
├─ README.md            # this file — living architecture doc
├─ .gitignore           # root ignores (node_modules, .next, env, logs…)
└─ frontend/            # Next.js app (runs standalone on mock APIs)
   ├─ src/
   │  ├─ app/           # App Router: pages, layouts, route handlers, SEO files
   │  ├─ components/    # UI, layout, sections, cards, interactive, chat, booking, forms
   │  ├─ lib/           # config, api client, schemas, seo, motion, chat provider, utils
   │  └─ data/          # fixtures: services, case studies, testimonials, stats
   ├─ .env.local.example
   └─ package.json
└─ backend/             # Spring Boot API (Java 17, Maven wrapper)
   ├─ src/main/java/com/visiondigitallab/backend/
   │  ├─ domain/        # JPA entities (+ enums, embeddables)
   │  ├─ repository/    # Spring Data repositories
   │  ├─ dto/           # request/response records
   │  ├─ mapper/        # entity → DTO mapping
   │  ├─ service/       # business logic (+ chat/ provider strategy)
   │  ├─ web/           # REST controllers + GlobalExceptionHandler
   │  ├─ security/      # JWT service, filter, user details
   │  └─ config/        # security, CORS, cache, OpenAPI, data seeder
   ├─ src/main/resources/application.yml
   ├─ Dockerfile · .env.example
   └─ pom.xml
```

### Key directories (frontend)

| Path | Responsibility |
|------|----------------|
| `src/app/` | Routing. Each folder = a route; `route.ts` = API handler; `layout.tsx` = shell; `sitemap.ts`/`robots.ts`/`opengraph-image.tsx` = SEO |
| `src/components/layout/` | Navbar, Footer, Logo, ThemeToggle, Section, PageHeader, social icons |
| `src/components/sections/` | Home-page sections (Hero, ServicesOverview, FeaturedWork, Industries, Process, Testimonials, Statistics, CtaBand, ClientLogos) |
| `src/components/cards/` | Reusable ServiceCard, CaseStudyCard |
| `src/components/interactive/` | ParticleField, MouseGlow, Marquee, TypingHeadline, CountUp, LiveVisitors, HeroScene (3D) |
| `src/components/chat/` | Floating AI chat widget |
| `src/components/booking/` | "Book Free Consultation" modal + form |
| `src/components/forms/` | ContactForm |
| `src/components/ui/` | Primitives: button, card, badge, dialog, input/select/textarea, dynamic-icon |
| `src/lib/` | Cross-cutting logic (see below) |
| `src/data/` | In-repo content fixtures (will be replaced by API responses) |

---

## Frontend architecture

**Rendering model.** Server Components by default; islands of interactivity are
explicit `"use client"` components (anything using Framer Motion, hooks, 3D, or
forms). Page shells, metadata, and data shaping stay on the server.

**Data flow (swap-ready).** UI never calls fixtures directly for dynamic data —
it goes through a typed client:

```
Component → lib/api.ts (apiGet/apiPost) → /api/v1/* (Next route handler) → src/data/* fixture
```

`lib/api.ts` builds its base URL from `NEXT_PUBLIC_API_URL`. Leave it empty to
use the built-in mock handlers; point it at the Spring Boot service later and
**no component changes are needed** — the route contracts match the future DTOs.

**Validation is shared.** `lib/schemas.ts` (Zod) is imported by both the client
forms (instant field validation) and the server route handlers (request
validation) — one schema, no drift.

**Chatbot uses a strategy pattern.** `lib/chat/provider.ts` exposes a
`ChatProvider` interface with a rule-based implementation today. Swapping in an
OpenAI provider is a one-line export change; call sites are untouched.

**Central config.** `lib/site.config.ts` holds brand name, domain, contact,
nav, socials, SEO keywords — the single rename point for the whole site.

**SEO.** `lib/seo.ts` builds per-page `Metadata` + JSON-LD (Organization /
Service / Breadcrumb). OG/Twitter images are generated dynamically by
`app/opengraph-image.tsx`. `sitemap.ts` and `robots.ts` are data-driven.

**Key lib modules**

| File | Purpose |
|------|---------|
| `lib/site.config.ts` | Brand/site config — single source of truth |
| `lib/api.ts` | Typed fetch client (`apiGet`, `apiPost`); env-driven base URL |
| `lib/schemas.ts` | Zod schemas (contact, consultation, chat) shared client+server |
| `lib/seo.ts` | Metadata + JSON-LD helpers |
| `lib/motion.ts` | Shared Framer Motion variants |
| `lib/chat/provider.ts` | Chat provider strategy (rule-based now, OpenAI-ready) |
| `lib/types.ts` | Shared TS types mirroring future backend DTOs |
| `lib/utils.ts` | `cn()` class merge, `compact()` number format |

---

## Routes (pages)

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home — hero, services, work, industries, process, stats, testimonials, CTA |
| `/services` | Static | All services grid + process + CTA |
| `/services/[slug]` | SSG | Service detail (overview, deliverables, related case studies) |
| `/casestudies` | Static | Portfolio with live filter + search |
| `/casestudies/[slug]` | SSG | Case study detail (challenge, solution, tech, timeline, results) |
| `/about` | Static | Story, mission/vision, values, timeline, team, why-us, stats |
| `/contact` | Static | Validated contact form + success animation |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Generated | SEO |

Global (mounted in `app/layout.tsx`): floating **Book Free Consultation** modal
and the **AI chat widget**, present on every page.

---

## API endpoints

Mock implementation lives in `frontend/src/app/api/v1/`. Base path: `/api/v1`.
These mirror the planned Spring Boot contract so the backend can replace them
transparently.

| Method | Endpoint | Purpose | Validation |
|--------|----------|---------|------------|
| GET | `/api/v1/services` | List services | — |
| GET | `/api/v1/services/{slug}` | One service | 404 if missing |
| GET | `/api/v1/casestudies` | List case studies (`?industry=`, `?q=`) | — |
| GET | `/api/v1/casestudies/{slug}` | One case study | 404 if missing |
| GET | `/api/v1/testimonials` | List testimonials | — |
| GET | `/api/v1/stats` | Homepage statistics | — |
| GET | `/api/v1/live/visitors` | Demo live-visitor count (no-store) | — |
| POST | `/api/v1/contact` | Contact submission | `contactSchema` → 201 / 422 |
| POST | `/api/v1/consultation` | Booking submission | `consultationSchema` → 201 / 422 |
| POST | `/api/v1/chat/message` | Chatbot reply | `chatMessageSchema` |
| POST | `/api/v1/chat/lead` | Capture chat lead | `chatLeadSchema` |
| POST | `/api/v1/chat/book-call` | Book a call via chatbot | `consultationSchema` |

**Backend-only endpoints (Spring Boot):**

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| POST | `/api/v1/auth/login` | Log in, returns JWT + user | public |
| GET | `/api/v1/auth/me` | Current user | JWT |
| GET | `/api/v1/admin/contacts` · `/consultations` · `/chat-leads` | List leads | JWT |
| POST/PUT | `/api/v1/admin/services` · `/casestudies` · `/testimonials` | Create/update content | JWT |
| DELETE | `/api/v1/admin/{type}/{id}` | Delete content | JWT + **ADMIN** |

Swagger UI (when backend is running): `http://localhost:8080/swagger-ui.html`.
The mock (Next) and real (Spring Boot) APIs share the public `/api/v1` contract,
so the frontend works against either by setting `NEXT_PUBLIC_API_URL`.

**Example**
```bash
curl http://localhost:3000/api/v1/services
curl -X POST http://localhost:3000/api/v1/chat/message \
  -H "Content-Type: application/json" \
  -d '{"message":"How much does a redesign cost?"}'
```

---

## Data & content

Content fixtures live in `frontend/src/data/`:
`services.ts`, `case-studies.ts`, `testimonials.ts`, `stats.ts`.
These are the seed for the future database tables and are currently served by the
mock API. Note: **NovaPay** and other client names in fixtures are fictional
sample clients, not the agency.

---

## Theming & design system

- Tokens defined once in `frontend/src/app/globals.css` (`:root` + `.light`).
- Palette — primary `#00F5D4`/`#00D9FF`, secondary `#7B61FF`/`#6C63FF`,
  accent `#FFB800`, bg `#060B14`/`#0A0F1C`.
- Dark theme is default; light mode via the navbar toggle (`next-themes`).
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code).
- Utility classes: `.text-gradient`, `.glass`, `.card-surface`, `.grid-bg`,
  `.gradient-border`, `.container-x`.
- All motion respects `prefers-reduced-motion`.

---

## Running locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000  (Turbopack)

npm run build      # production build (type-check + 34 routes)
npm run start      # serve the production build
npm run lint
```

Environment: copy `frontend/.env.local.example` → `frontend/.env.local`.
Leave `NEXT_PUBLIC_API_URL` empty to use mock APIs; set it to the backend URL to
switch over.

> Requires Node 18.18+ (developed on Node 26).

### Backend (Spring Boot)

```bash
cd backend
# 1. Configure DB + secrets (copy and edit)
cp .env.example .env        # set SPRING_DATASOURCE_* to your Neon/Supabase URL

# 2. Run (Maven wrapper — no Maven install needed). Pass env vars however you like:
#    PowerShell: $env:SPRING_DATASOURCE_URL="..."; ./mvnw spring-boot:run
./mvnw spring-boot:run        # starts on http://localhost:8080

./mvnw -DskipTests package    # build runnable jar (target/backend-0.0.1-SNAPSHOT.jar)
./mvnw test                   # tests run against in-memory H2 (no DB needed)
```

On first run with `SEED_ENABLED=true`, the DB is auto-created and seeded with the
same content the frontend ships, plus an admin user (`ADMIN_EMAIL`/`ADMIN_PASSWORD`).

**Connect the frontend to the backend:** set `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```
and restart `npm run dev`. The site now reads/writes through Spring Boot.

> Requires Java 17+ (spec target 21) and a reachable Postgres (managed cloud is fine).
> Docker is optional — `docker compose up --build` runs Postgres + Redis + backend.

---

## Git workflow

Single git repo at the monorepo root (`future-agency/`).

```bash
# connect your GitHub repo (create an empty repo first, no README)
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main

# ongoing
git add -A
git commit -m "feat: <what changed>"
git push
```

Suggested commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.

---

## Roadmap / next milestone

**Done:** Spring Boot API (Controller/Service/Repository, DTOs, JWT auth, global
exception handling, OpenAPI/Swagger, seed data). Tables: `users`, `contacts`,
`consultations`, `services`, `case_studies`, `testimonials`, `chat_leads`,
`blog_posts`, `site_statistics`.

**Next:**
- Boot the backend against a managed Postgres (Neon/Supabase) and point the
  frontend at it via `NEXT_PUBLIC_API_URL`.
- Admin dashboard **UI** in the frontend (consuming the existing admin endpoints).
- GitHub Actions CI/CD.
- Real OpenAI chat provider (drop-in via the strategy interface on both sides).
- Optional hardening: bump to **Java 21**, enable **Redis** cache, install
  **Docker** for the full local stack.
