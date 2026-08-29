# claims.md — every factual assertion on the new pages

Scope: `/visionone`, `/security`, the growth package on `/services`, the VisionOne home section,
and the new hero subline. Written alongside the copy, not reconstructed afterwards.

**Status key**

| Status | Meaning |
|---|---|
| `verified` | Checked directly in this session, against the code or the built output |
| `general` | A statement about the world that is publicly checkable and defensible in a sales call |
| `owner-stated` | Comes from the brief or the business owner. True as far as we were told; we did not independently verify it |
| `CONFIRM` | **Action needed.** Plausible but unverified by us. Confirm before this goes to a buyer, or change the copy |
| `NEEDS INPUT` | **Action needed.** Deliberately left vague on the page because we would have had to invent a specific |

Nothing on the new pages is marked `verified` on the strength of a claim we made up. Where we could
not substantiate something, the copy says less rather than more.

---

## /visionone

> **Status change, 29 August 2026.** The page originally carried private-pilot
> language on every capability, per §2 of the brief. The owner has since confirmed
> VisionOne is a shipped, integrated product rather than a pilot, and asked for that
> language removed. It has been. **The availability of the product is now an
> owner-stated claim carrying no hedge**, which raises the cost of any capability
> that turns out not to be built — see V4 and V5.

| # | Claim | Status | Basis |
|---|---|---|---|
| V0 | Tagline: "Run the growth. See the return." | `general` | A positioning line, not a factual assertion. It promises attribution, which is what the product is for. (Chosen over "Supercharge business, supercharge growth" — see the note at the end of this section.) |
| V1 | "Your ads run in Google Ads. Your patients live in your booking system. Nothing joins the two together." | `general` | Google Ads reports clicks and conversions it can observe; it has no link to a practice management system unless one is built. Standard, uncontroversial. |
| V2 | "When one member is worth thousands of dollars a year…" | `owner-stated` | Cash-pay longevity/functional medicine memberships are typically annual and four-figure. Framed as a conditional ("when"), not as a claim about a specific client. |
| V3 | Every number in the demo dashboard — 160 leads, 217 calls answered, 64 booked, $110,400, the six-month series for all five channels, 23 reviews, 6 posts | **synthetic** | Invented in `src/components/visionone/demo-data.ts`. Labelled "Illustrative — demo data" three times per render: the panel chrome, the table caption (screen readers), and the figcaption. Not a client and not a result. The six-month trend lines are invented too — they are a shape, not a track record. |
| V4 | Six capabilities are presented as things the product does, with no status qualifier | `CONFIRM` | **This is the claim that changed.** With the pilot hedge gone, each of the six now reads as available today. Confirm all six are built and working before this page meets a buyer; anything that is not needs either building or removing from the list. |
| V5 | Every number carries live / recent / stale, and stale data is shown as stale | `CONFIRM` | The page argues this is a credibility feature, which makes it the first thing a sceptical buyer will test — and it is checkable in one click during a demo. Confirm it is implemented. |
| V6 | "Everything that fills your diary… as one system", "They ship as one product" | `CONFIRM` | The integration claim, and the reason the attribution is said to work. Confirm the five modules genuinely ship and report as one system rather than as separate tools. |
| V7 | "It does not replace your booking system, your phone or your ad account… It sits alongside them" | `CONFIRM` | Architecture claim. Confirm which connections exist today. |
| V8 | "We built it first for cash-pay clinics" | `owner-stated` | From the brief and the positioning decision. |

**On the tagline.** The requested line was "Supercharge business, supercharge growth."
Two problems: *supercharge* is on the banned-word list in the brief, and
[getweave.com](https://www.getweave.com/) currently leads with "Supercharge your practice
growth" — so the line would read as a copy of a direct comparator in the same market.
"Run the growth. See the return." is used instead: active, two beats, and it names the
thing the product actually does that Weave's line does not.

## /visionone — the onboarding journey

New section, and every step is a delivery commitment rather than a description. If the
timeline is wrong, it is wrong in a way a client will notice in week two.

| # | Claim | Status | Basis |
|---|---|---|---|
| J1 | Week 1: connect ad account, Business Profile, phone and booking system; "nothing changes for them yet" | `CONFIRM` | Confirm a one-week connection window is realistic across the systems you actually integrate with. |
| J2 | Week 2: lead capture live, receptionist answering, review requests going out | `CONFIRM` | Confirm the modules can be live in week two, including any partner provisioning lead time. |
| J3 | Weeks 3–4: enough bookings to attribute; "the dashboard stops being empty" | `CONFIRM` | Depends on the clinic's volume as much as on the product. Consider whether this should be framed as typical rather than certain. |
| J4 | Month 2: the first budget reallocation. "Usually they are not the same" | `owner-stated` | The claim that busy and booking channels usually differ is a general observation from running these campaigns. Defensible in conversation; not a statistic. |
| J5 | "Every month after": a growth review over the same screen | `owner-stated` | A service commitment. Real only if the review is actually scheduled and held. |

## /security

Every commitment on this page comes from §3.1 of the brief. They are the company's own statements
of practice, and several need a factual check before a security questionnaire lands.

| # | Claim | Status | Basis |
|---|---|---|---|
| S1 | "Before any work starts with a clinic, we sign a BAA." | `owner-stated` | From the brief. Requires a BAA template to exist and the process to be real. |
| S2 | "There is no body that certifies a company as HIPAA compliant, so we do not use the phrase." | `general` | Correct. HHS does not certify, and no accredited HIPAA certification exists — third-party "certifications" are attestations, not regulatory status. |
| S3 | "Patient records live where they already live… We do not copy them into ours." | `owner-stated` | From the brief. Must hold for every integration, including future ones. |
| S4 | "VisionOne stores aggregate numbers… counts and totals, not people." | `owner-stated` | From the brief, and consistent with V3's dashboard: nothing displayed is patient-level. |
| S5 | "Ad platforms and marketing tools… never receive patient identity." | `owner-stated` | From the brief. The claim most easily broken by a future integration; worth a periodic check. |
| S6 | "We do not put advertising or remarketing pixels on this page, on our contact form, or anywhere a visit could reveal a healthcare relationship." | `verified` | Checked in the built output: the prerendered HTML for `/`, `/visionone` and `/security` contains **no external script tags at all**. See the caveat on the Sienna widget in `handoff.md`. |
| S7 | "Any third party involved in delivering your work is disclosed by name on request." | `NEEDS INPUT` | The page promises a list. **The list must exist before this ships**, or the first person who asks gets nothing. |
| S8 | "Data is encrypted in transit and at rest. Access is role-based… Access to client systems is logged." | `CONFIRM` | From the brief. Deliberately kept to these three — no key lengths, TLS versions, retention periods, MFA or device-management claims were invented. Confirm each, and add specifics only once confirmed. |
| S9 | "Our engineering and support teams work from India." | `owner-stated` | From the brief. Volunteered deliberately. |
| S10 | "Everyone working on your account is bound by the same obligations that flow down from the BAA. Access stays role-based and logged wherever the person sits." | `CONFIRM` | Written as a restatement of S1 and S8 applied to location — no new control was invented here. Confirm the flow-down is contractual in practice. |
| S11 | "typically within one business day" | `verified` | Matches the existing `/contact` page, which already states "Within 1 business day". Consistent with what the site already promises. |
| S12 | "Last reviewed 29 August 2026" | `verified` | The date this page was written. `LAST_REVIEWED` in `src/app/security/page.tsx` — **update it whenever the page changes**, or the freshness signal becomes the same lie the VisionOne freshness feature exists to prevent. |

## /services — growth package

| # | Claim | Status | Basis |
|---|---|---|---|
| G1 | "Budgets, keywords and bids are managed weekly, not set once and forgotten." | `owner-stated` | A service commitment. Defensible only if the cadence is real. |
| G2 | "No engagement pods, no bought followers." | `owner-stated` | A negative commitment; easy to keep, easy to check. |
| G3 | **"We do not gate reviews."** Filtering for good reviews "breaks Google's policies and the FTC's rule on suppressed reviews." | `general` | Google's review policies prohibit selectively soliciting positive reviews. The FTC's Rule on the Use of Consumer Reviews and Testimonials (16 CFR Part 465, in force since October 2024) covers review suppression and carries civil penalties. Both publicly checkable. |
| G4 | **"Every published asset is signed off by the physician."** Physician advertising "is regulated by each state's medical board." | `general` (regulation) / `owner-stated` (the practice) | State medical boards do regulate physician advertising, with rules varying by state. That the sign-off actually happens is a process commitment the company must keep. |
| G5 | AI receptionist "runs on a vetted, HIPAA-eligible partner platform, named on request" | `NEEDS INPUT` | **The partner's name was not invented.** Two things are needed: the name, and confirmation the platform is HIPAA-eligible and will sign a BAA. Until both exist, this line is a promise with nothing behind it. |
| G6 | "Says it is an AI assistant at the start of the call" · "Never gives medical advice" · "Never places outbound calls" · "Books straight into your existing scheduling system" | `CONFIRM` | Product behaviour. Each is a specific, testable promise a buyer can check on the first call. Confirm all four are enforced in configuration, not merely intended. |

## Home page

| # | Claim | Status | Basis |
|---|---|---|---|
| H1 | Hero: "We build and run the growth engine behind appointment-based businesses… Most of our work is with clinics." | `owner-stated` | The owner states clinics are roughly half of all clients. **The page deliberately says "most of our work" and gives no figure** — a bare percentage on a marketing page invites a substantiation request, while the qualitative version is defensible in conversation. If you want the number on the page, be ready to evidence it. |
| H2 | VisionOne home section — tagline, module list, demo visual | see V0, V1, V3, V6 | Same claims as `/visionone`; the compact dashboard carries the same three "Illustrative — demo data" labels. The private-pilot sentence has been removed here too. |

---

## Open actions, shortest path

1. **V4, V5, V6, V7** — now the highest-priority items. With the pilot hedge removed,
   every capability on `/visionone` reads as available today. Walk the six metrics, the
   freshness behaviour and the five-module integration, and confirm each one is real.
2. **G5** — get the voice-agent partner's name and HIPAA-eligibility confirmation. Blocks a live claim.
3. **S7** — write the subprocessor list. The page promises it on request.
4. **S8, S10** — confirm the three controls and the BAA flow-down.
5. **J1–J3** — sanity-check the onboarding timeline against a real first client.
6. **G6** — confirm the four AI-receptionist promises are enforced in configuration.
7. **S12** — set a reminder to update the reviewed date whenever `/security` changes.
