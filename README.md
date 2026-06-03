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
| Mock API (Next route handlers) | ✅ Built — stands in for the backend |
| Backend (Spring Boot) | ⏳ Planned — next milestone |
| Admin dashboard | ⏳ Planned |
| Docker / CI-CD | ⏳ Planned |
| Real AI (OpenAI) chat | ⏳ Interface ready, provider stubbed |

Production build: **34 routes** generate cleanly; routes + APIs smoke-tested green.

---

## Tech stack

**Frontend (active)**
- Next.js 16 (App Router) · React 19 · TypeScript
- TailwindCSS v4 (CSS-first tokens) · shadcn-style UI primitives (Radix)
- Framer Motion · GSAP · Three.js via `@react-three/fiber` + `drei` (lazy, hero only)
- React Hook Form + Zod · `next-themes` · lucide-react

**Backend (planned)**
- Java 21 · Spring Boot 3.5 · Spring Security (JWT) · Spring Data JPA
- PostgreSQL · Redis · Docker

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
# backend/  (added in the next milestone)
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

**Backend (Spring Boot)** — Controller/Service/Repository layers, DTO pattern,
JWT auth, global exception handling, OpenAPI/Swagger. Tables: `users`,
`contacts`, `consultations`, `services`, `case_studies`, `testimonials`,
`chat_leads`, `blog_posts`, `site_statistics`.

**Also planned:** Admin dashboard (role-based: ADMIN/EDITOR), Docker +
docker-compose, GitHub Actions CI/CD, real OpenAI chat wiring.

**Prerequisites to start backend locally:** install **Java 21** (currently 17)
and **Docker** (not yet installed).
