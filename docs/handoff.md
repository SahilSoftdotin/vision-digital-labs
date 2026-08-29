# Handoff — VisionOne insertion

Date: 29 August 2026 · Branch: `main` · Companion doc: [`claims.md`](./claims.md)

A surgical insertion into the live site: two new pages, three home edits, a services extension and
a nav change. No redesign, no re-platform, no existing URL touched.

---

## 1. What changed

### New files (8)

| File | What it is |
|---|---|
| `frontend/src/app/visionone/page.tsx` | The product page. Problem → dashboard → five modules → what you see → freshness → onboarding journey → how it fits → CTA |
| `frontend/src/app/security/page.tsx` | Seven numbered sections, document-shaped rather than marketing-shaped, because its reader is filling in a questionnaire |
| `frontend/src/components/visionone/dashboard-demo.tsx` | The demo dashboard. `full` and `compact` variants from one design |
| `frontend/src/components/visionone/trend-chart.tsx` | Animated multi-series line chart + the row sparklines |
| `frontend/src/components/visionone/journey.tsx` | The five-step onboarding → growth timeline |
| `frontend/src/components/visionone/demo-data.ts` | All synthetic numbers, isolated in one file with a header explaining that they are invented |
| `frontend/src/components/sections/visionone-teaser.tsx` | The home-page section |
| `frontend/src/app/services/growth-package.tsx` | The five growth offerings as one package |

### Modified files (9, each small)

| File | Change |
|---|---|
| `src/lib/site.config.ts` | `VisionOne` added as the **first** nav item |
| `src/components/layout/navbar.tsx` | Desktop nav `md:flex` → `lg:flex`, drawer `md:hidden` → `lg:hidden` (see §3) |
| `src/components/layout/footer.tsx` | `Security` added to the Company column |
| `src/components/sections/hero.tsx` | **Subline only.** Headline, typing animation, buttons and the three floating chips untouched |
| `src/app/page.tsx` | `<VisionOneTeaser />` inserted after `<AiPlugins />` — position 3 of 14 |
| `src/components/sections/services-overview.tsx` | One line under "Explore all services" linking to `/security`. This component renders only on the home page (verified by grep) — the third and final home edit |
| `src/app/services/page.tsx` | `<GrowthPackage />` inserted above the existing grid |
| `src/app/sitemap.ts` | `/visionone` (priority 1) and `/security` added |
| `src/app/globals.css` | Added `--chart-1`…`--chart-5`. In dark they are plain aliases of the existing brand tokens; in `.light` they are the **same tokens** mixed darker with `color-mix()` — the neon values are unreadable on white. No new hue is introduced, and `color-mix` is already used in this file (`.glass`, `::selection`) |

No new dependency. No change to `package.json`, `next.config.ts`, the backend, the CMS, the admin
panel or the deploy pipeline.

### Two decisions worth knowing

**The growth package is a static page section, not a `Service` record.** Services are CMS-backed
(`src/lib/content.ts` fetches from the API with a 4s timeout and falls back to `src/data/*.ts`).
Whether production reads fixtures or the database depends on `NEXT_PUBLIC_API_URL` in Vercel — so a
record added to the fixtures alone would vanish the moment the backend answered. A page section is
immune to that, and it keeps the CMS structure untouched as the brief required.

**The demo dashboard is hand-built, not a chart library.** Inline SVG and semantic tables — no new
dependency. Freshness maps to `--primary` (live) / `--accent` (recent) / `--fg-subtle` (stale).

**The chart draws and walks itself.** Lines animate in on first view, the highlight cycles through
the five channels every 3.2s, and the KPI numbers count up via the existing
`interactive/count-up.tsx`. The cycling is auto-updating motion, so it has a real pause control
(WCAG 2.2.2), pauses on hover and on keyboard focus, and — unlike the rest of the site, see §3 —
**never starts under `prefers-reduced-motion`**, where every line is instead shown at equal weight.

**The chart measures its container instead of scaling a viewBox.** A fixed viewBox scaled to width
would have shrunk the axis labels to about 5px on a phone. `useChartSize` in `trend-chart.tsx`
uses a `ResizeObserver` so the SVG draws 1:1 and text stays exactly 11px at every width.

### Second round of changes (29 August 2026)

Requested after the first build, and worth calling out because two of them change what the site
*claims*, not just how it looks.

1. **Bar charts → line charts.** The channel breakdown is now a six-month multi-series line chart
   with social media as one of the five series, plus a sparkline per table row. The underlying
   figures moved from a single month to a six-month series in `demo-data.ts`; current-month leads
   are derived from the last point of each series (`leadsThisMonth`), so the chart and the table
   cannot drift apart.
2. **Motion, in the manner of getweave.com.** See the note above — draw-on lines, counting KPIs,
   and a highlight that walks the channels.
3. **All pilot language removed.** Every "In private pilot" badge and the whole "Where VisionOne
   actually is" callout are gone, on the owner's statement that VisionOne is a shipped, integrated
   product rather than a pilot. **This materially raises the risk on `claims.md` items V4–V7** —
   the hedge that made those capability claims safe no longer exists, so each now needs to be
   true on its own. They are the top of the open-items list for that reason.
4. **New tagline: "Run the growth. See the return."** The suggested line was "Supercharge business,
   supercharge growth". *Supercharge* is on the brief's banned-word list, and getweave.com leads
   with "Supercharge your practice growth" — so the line would have echoed a direct comparator.
   Alternatives offered, if the chosen one is not right: "Every channel, one screen, one honest
   number." · "The whole growth engine, on one screen." · "Growth you can actually trace."
5. **New onboarding → growth journey.** Five steps, week 1 through "every month after", in
   `components/visionone/journey.tsx`. Every step is a delivery commitment — logged as J1–J5 in
   `claims.md`.
6. **Copy realigned throughout** so the page reads as one integrated product rather than a
   dashboard with services attached: a new "Five modules, one system" section, and "What it shows"
   reframed as "What you see".

---

## 2. What was deliberately left alone

### The credibility problem on the existing site

This was raised before building and the decision was **leave everything, build new pages only**.
Recording it here in full, because `/security` now ships alongside it.

| Location | What's there |
|---|---|
| `src/data/testimonials.ts` | 5 invented testimonials — named people, quoted, at fictional companies (Sarah Chen / NovaPay, Emily Roberts / MedFlow Health…) |
| `src/data/case-studies.ts` | 6 invented case studies with invented outcomes — "$12M in recovered revenue", "cut no-shows by 41%", "40k shipments/day" |
| `src/components/sections/client-logos.tsx` | Real third-party logos — Aspen Dental, **Envision Healthcare**, AutoNation, Compass, Mr. Rooter — under the heading **"Trusted by leading brands across industries"** |
| `src/data/stats.ts` + hero chips in `sections/hero.tsx` | "127+ projects", "$180M+ client revenue impact", "15+ countries", "98% client satisfaction", "9 years", "Lighthouse 98" |
| `src/components/sections/compliance.tsx` | **"HIPAA-ready"** and "SOC 2–aligned" badges |

Why it matters here specifically: `/security` exists to be believed by whoever fills in a security
questionnaire, and that person scrolls the homepage. A "Trusted by leading brands" row of borrowed
*healthcare* logos two scrolls above "patient data never leaves your systems" undercuts the page it
sits above. The logos are the sharpest item — an implied client relationship with named healthcare
companies, on a site now selling to healthcare buyers.

`compliance.tsx`'s **"HIPAA-ready"** also contradicts `/security`, which states in section 1 that no
body certifies HIPAA compliance and that the company therefore describes practice rather than
status. Two pages of the same site now say different things.

Smallest useful fix, if it is ever revisited: delete the logo marquee and reword the "HIPAA-ready"
badge. Both are sub-30-minute changes and together remove most of the exposure. Everything new
written in this work avoids the problem — no new copy borrows credibility from any of the above.

### Everything else untouched

Existing page layouts, all copy outside the three home edits, every existing URL, the `data/*.ts`
fixtures, the CMS, the admin panel, the blog (none exists), and the deployment pipeline.

---

## 3. Found but not fixed

**Pre-existing lint errors — 13 errors, 1 warning, all `react-hooks/set-state-in-effect`.**
In `theme-toggle.tsx`, `auth-context.tsx`, `navbar.tsx` (line 26, `useEffect(() => setOpen(false), [pathname])`),
`count-up.tsx`, `typing-headline.tsx`, `booking-form.tsx`, `admin-shell.tsx` and four admin pages.
All present before this work; none in any new file. Confirmed unchanged in count and location.

**Framer Motion reveals ignore `prefers-reduced-motion` — everywhere except the new chart.** `globals.css` disables CSS animations
and transitions under the media query — twice — but Framer animates via inline JS styles, which CSS
cannot override. Every scroll reveal on the site (`fadeUp` + `whileInView`) still animates for users
who have asked for reduced motion. The new sections use the same `lib/motion.ts` helpers as every
existing section, so this is consistent rather than a regression, but it is a real accessibility gap.
`trend-chart.tsx` is the exception: it calls `useReducedMotion()` and disables both the draw-on and
the cycling, which is the pattern the rest of the site should adopt. The site-wide fix is the same
call in `lib/motion.ts` — out of scope here, and worth doing as its own change.

**The nav breakpoint had to move.** Five items plus logo, theme toggle and CTA already filled 768px;
a sixth overflowed. Rather than squeeze VisionOne into a dropdown — it is the core product now —
the desktop nav starts at `lg` and the mobile drawer covers 768–1023px. All six items fit
comfortably at 1024px and above.

**The Sienna accessibility widget is a third party on every page.** `footer.tsx` loads
`sienna-accessibility` from jsDelivr with `strategy="afterInteractive"`. It is not an ad or
remarketing pixel, so claim S6 on `/security` holds — but it is a third-party script that executes
on `/security` itself, and it belongs on the subprocessor list that S7 promises.

**The backend is unreachable locally**, so builds log two `TypeError: fetch failed` / `ECONNREFUSED`
lines and fall back to fixtures. Pre-existing and by design — see the comment in `lib/content.ts`.

---

## 4. Verification — what was actually run

**Done and passing:**

- **Build** — baseline 43 routes → **45 routes**, both new pages prerendered static (`○`). No new
  warnings. Type check passes.
- **Lint** — 13 errors / 1 warning, identical to baseline. No new file appears.
- **Copy audit** — grepped all new copy for the banned word list and for HIPAA claims. One hit:
  the sentence in `/security` that explicitly disclaims the phrase. Clean.
- **SEO** — both pages have unique `<title>`, meta description, canonical, OG and Twitter tags.
  JSON-LD renders **into the static HTML** (not client-injected): `Organization` + `Service` +
  `BreadcrumbList` on `/visionone`, `Organization` + `BreadcrumbList` on `/security`.
  **`MedicalBusiness` appears nowhere in the build** — checked across all output.
- **Sitemap** — `/visionone` and `/security` both present in the generated `sitemap.xml`.
- **No pixels** — the prerendered HTML for `/`, `/visionone` and `/security` contains no external
  script tags at all. (Sienna loads client-side; see §3.)
- **Both themes** — checked dark and light on `/visionone`, `/security` and `/services`. Two fixes
  came out of this: the bar tracks were `bg-white/[0.07]`, invisible on the light theme, and now use
  the `--border` token; and the chart's neon series colours were unreadable on white, which produced
  the `--chart-*` tokens described in §1.
- **Chart behaviour** — confirmed the lines draw in, the highlight cycles through all five channels,
  the pause control works, the legend selects a channel, and the SVG measures 1182×280 at a 1512px
  viewport (i.e. drawing 1:1, not scaling).
- **Keyboard** — tabbed through the nav; the focus ring is clearly visible on the new VisionOne item
  and on the new in-page links. Computed outline confirmed at 2px solid.
- **No horizontal overflow** — measured at 1280px: `scrollWidth === clientWidth`, and a DOM sweep
  for elements extending past the viewport returned empty.

**Not verified — please check before or after deploy:**

- **375px and the 768–1023px band.** The browser extension would not resize the window
  (`innerWidth` stayed pinned at 1280 through every attempt), so no genuinely narrow viewport was
  rendered.
  The layout is safe by construction — the only fixed width introduced is the channel table's
  `min-w-[30rem]`, which sits inside an `overflow-x-auto` container, and everything else collapses
  to a single column below `sm`. But the nav breakpoint change in particular deserves a real look on
  a phone and at ~800px.
- **`prefers-reduced-motion`.** Not emulated — see the Framer finding in §3.
- **Lighthouse before/after.** Not run. The new pages add no dependency, no image and no
  client-side data fetching; the heaviest new component is a static table. A regression is unlikely
  but unmeasured.

**After deploy:** verify the property in Search Console and submit `sitemap.xml`. This is the
dependency for the Google Ads API application, not a nicety.

---

## 5. Open items, carried from `claims.md`

Two of these are promises currently on a live page with nothing behind them yet:

1. **Voice-agent partner name** (`G5`) — `/services` says the AI receptionist "runs on a vetted,
   HIPAA-eligible partner platform, named on request". The name was not invented. Get it, and
   confirm the platform is HIPAA-eligible and will sign a BAA.
2. **Subprocessor list** (`S7`) — `/security` promises the list on request. It must exist.
3. **The three security controls and the BAA flow-down** (`S8`, `S10`) — confirm, then add
   specifics only once confirmed. No key lengths, TLS versions, retention periods, MFA or
   device-management claims were invented.
4. **Pilot scope** (`V4`, `V5`, `V7`, `G6`) — all six VisionOne capabilities are marked "In private
   pilot", which cannot overclaim beyond the product's overall status, but confirm what is actually
   built and downgrade anything that is not. The freshness behaviour and the four AI-receptionist
   promises are all things a buyer can test in one click.
5. **Roadmap section** — deliberately omitted from `/visionone` rather than invented. If there is a
   real roadmap beyond the pilot, it can be added with proper markers.
6. **`LAST_REVIEWED`** in `src/app/security/page.tsx` — update it whenever the page changes.
