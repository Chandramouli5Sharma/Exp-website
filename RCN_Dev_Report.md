# Robotics Club Nitte — Website Development Report
### Personal Reference Document · Not Published on Website

**Project:** Robotics Club Nitte Official Website  
**Institute:** NMAM Institute of Technology, Nitte  
**Report Compiled:** May 2026  
**Purpose:** Internal documentation of all design and development decisions made across all sessions.

---

## Overview

The website was built through five iterative development sessions, starting from a basic dark-themed multi-page HTML site and evolving into a fully designed, themed, multi-page web presence. All changes were made across six deliverable files: `index.html`, `style.css`, `achievements.html`, `rules.html`, `leaderboard.html`, and `script.js` (unchanged).

---

## Files Delivered

| File | Created / Modified | Purpose |
|---|---|---|
| `index.html` | Modified | Main homepage |
| `style.css` | Modified | Global styles and design system |
| `script.js` | Unchanged | Original form + scroll logic |
| `achievements.html` | Created | Full achievements record |
| `upcoming.html` | Unchanged | Line Follower Workshop event page |
| `rules.html` | Created | Club Rule Book |
| `leaderboard.html` | Created | Bot Leaderboard |

**Pending (not yet created):**
- `member-login.html`
- `member-dashboard.html`
- `electronics-handbook.pdf` (to be uploaded)

---

## Session 1 — Full Visual Redesign

### Reference Image
A 3D abstract render with iridescent, holographic fluid forms on a deep dark background was provided as the visual direction. The site's colour palette and texture were derived directly from this image.

---

### style.css — Complete Overhaul

**Typography**
- Added Google Fonts import: `Syne` (headings/display) + `DM Sans` (body).
- Applied globally via `--font-display` and `--font-body` CSS variables.

**Colour System (CSS Variables)**

| Variable | Value | Use |
|---|---|---|
| `--void` | `#0a0812` | Page background |
| `--deep` | `#110e1f` | Card backgrounds |
| `--surface` | `#1a1630` | Elevated surfaces |
| `--iris-1` | `#ff3cac` | Hot pink accent |
| `--iris-2` | `#f97316` | Orange accent |
| `--iris-3` | `#fbbf24` | Amber/yellow |
| `--iris-4` | `#7c3aed` | Electric violet |
| `--iris-5` | `#06b6d4` | Cyan |
| `--color-accent` | `#f97316` | Primary CTA orange |
| `--color-skyblue` | `#38bdf8` | Sky blue alias |

**New Reusable Classes**

| Class | What It Does |
|---|---|
| `.grad-text` | Amber → pink → violet gradient text |
| `.grad-text-cyan` | Cyan → violet gradient text |
| `.holo-card` | Dark card with holographic shimmer on hover |
| `.role-badge` | Small uppercase pill label |
| `.avatar-ring` | Circular photo frame with iridescent gradient border |
| `.ach-card` | Left-bordered card for achievement entries |
| `.medal` + `.medal-gold/silver/bronze` | Coloured medal chip tags |
| `.iris-divider` | Full-width iridescent horizontal rule |
| `.fade-in-section` / `.is-visible` | Scroll-triggered fade + slide animation |
| `.nav-link` | Underline-sweep hover for text links |
| `.btn-iris` | Primary CTA button (orange-pink gradient) |
| `.section-eyebrow` | Small uppercase label above section headings |
| `.orb-bg` | Pseudo-element ambient glow orbs behind sections |

**Other Styles**
- Custom thin scrollbar with iridescent gradient thumb.
- 3% opacity SVG grain/noise texture fixed over entire page (`body::before`).

---

### index.html — Structural Redesign

**Navigation (at this stage)**
- Sticky horizontal top bar with logo, nav links, and a mobile hamburger dropdown.

**Hero Section**
- Deep purple gradient background + semi-transparent `Images/hero.jpg`.
- Two absolutely positioned ambient glow orbs.
- Headline: "Robotics Club Nitte" in iridescent gradient text.
- Sub-headline: "Innovate · Build · Inspire" in letter-spaced light text.
- Two CTA buttons: "Explore Club" (orange) + "Our Wins →" (outlined).
- Club logo (`Images/rcn.jpg`) embedded below with rounded border and shadow.

**About + Office Bearers**
- Club description paragraph.
- **Core 4 grid** (President, Secretary, Captain, Treasurer): 88px avatar rings, star badge on President, 2×2 grid layout.
- **Leads & Managers grid**: 10 members in compact cards with 64px avatars, `auto-fit` columns.
- Iridescent divider with "Leads & Managers" text label between the two groups.

**Divisions**
- Three cards: Combat Robotics, Soft Robotics, Aero Division.
- Each has a photo, coloured gradient heading, and description.

**Recent Events & Workshops**
- Wide featured card: Line Follower Workshop 2025 (image left, text right).
- Three smaller cards below: IoT, 3D Modelling, PCB Design.

**Achievements Preview**
- Two zigzag image+text cards: TECHTATVA 2025 (image left) and Technoxian 2023 (image right).
- Four quick-win compact cards below (Sentia 2026, Fastbit 2026, Sambhram 2025, Tiara 2025).

**Contact Section**
- Form: Name, Email, Subject, Message, Submit.
- Google Form submission via `fetch` with `mode: no-cors`.
- Instagram + LinkedIn icon links.
- Email display (obfuscated via Cloudflare at this stage).

**Footer**
- Brand name, institute name, copyright.

---

### achievements.html — New Page Created

- **Year dividers**: Gradient-text year headings (2026, 2025, 2024, 2023, 2022) with fade line.
- **Image cards** (`.ach-img-card`): 200px photo column + text column, for events with photos.
- **Text cards** (`.ach-text-card`): Left iridescent border bar, no photo.
- **Medal tags**: Gold/silver/bronze chips per result.
- **Staggered entry animation**: 60ms delay between each card on scroll.
- **40+ entries** across all years from 2022–2026.

---

## Session 2 — Side Panel Navigation + Rules Page

### Navigation — Top Bar Replaced with Side Panel

**Old behaviour:** Sticky horizontal top nav with mobile dropdown.

**New behaviour:** Collapsible slide-in side panel (280px wide).

| Element | Details |
|---|---|
| Trigger button | Fixed at `top: 18px, right: 18px`, z-index 200 |
| Backdrop | Semi-transparent blur overlay when open |
| Panel width | 280px, slides in from left |
| Panel header | Club logo + brand name |
| Nav sections | Navigation links + Resources section |
| JS functions | `openSidebar()`, `closeSidebar()` |
| Desktop push | Page content shifts right 280px on screens ≥1100px |

**Sidebar links added:**
- About Us, Divisions, Achievements, Contact Us
- Electronics Handbook (PDF link with "PDF" badge)
- Club Rule Book (→ `rules.html`)

---

### rules.html — New Page Created

**Structure:**
- Page header with icon, governance document label, effective date.
- Admin placeholder notice.
- 8 numbered rule sections with sub-items.

**Sections:**
1. Membership — eligibility, registration, renewal, revocation
2. Code of Conduct — respect, harassment, attendance, representation, social media
3. Use of Club Resources & Equipment — access, inventory log, damage, lab safety, cleanliness
4. Projects & Competitions — proposals, team selection, funding, IP, post-event reporting
5. Finance & Transparency — budget, receipts, accounts review
6. Workshops & Internal Events — conduct, fees, kit ownership
7. Disciplinary Process — reporting, hearing, sanctions, appeals
8. Amendments — proposal process, two-thirds majority, notification

**All content is placeholder** — to be replaced with official club rules once finalised.

---

## Session 3 — Font, Brand Colour & Layout Fixes

### Font System Change

| | Before | After |
|---|---|---|
| Display font | `Syne` | `Inter` |
| Body font | `DM Sans` | `Source Sans 3` |
| Reason | More formal, professional appearance |

All inline `font-family: 'Syne'` references updated across all HTML files. Google Fonts import URL updated in `style.css` and all pages.

---

### Brand Colour — Rainbow Gradient → Solid Blue

| Location | Before | After |
|---|---|---|
| Sidebar brand "Nitte" | Gradient `#fbbf24 → #ff3cac` | `color: #3b82f6` |
| Hero H1 | Full iridescent gradient | `color: #3b82f6` |
| Footer brand | `.grad-text` class | `color: #3b82f6` |
| Topbar brand | N/A (new) | `color: #3b82f6` |

New CSS variables added: `--brand-blue: #3b82f6`, `--brand-blue-light: #60a5fa`.

`.role-badge` colour updated from orange/pink to blue scheme.

---

### Layout & Alignment Fixes (based on live screenshots)

| Issue | Fix Applied |
|---|---|
| Hamburger button overlapping sidebar logo | Moved trigger from `left: 18px` → `right: 18px` |
| Hero logo had white box around it | Removed border/shadow box; applied `mix-blend-mode: screen` so logo blends into dark background; max-width 420px |
| Office Bearers leads grid uneven | Changed from `auto-fit minmax(170px)` → `repeat(5, 1fr)` for exact 5+5 split |
| Events bottom row cards unequal width | Wrapped 3 cards in explicit `grid-template-columns: repeat(3,1fr)` div |
| Contact section too narrow with dead space | Max-width: `640px` → `860px`; padding: `80px` → `60px` |
| Email address not showing | Replaced Cloudflare obfuscated link with plain `mailto:roboticsclub@nitte.edu.in` with envelope icon |
| Excessive blank space between sections | All major section padding: `80px` → `56px` |
| Office bearers top margin too large | `margin-top: 80px` → `48px` |

---

## Session 4 — Sticky Topbar, Bot Leaderboard & Orange Buttons

### Unified Sticky Topbar (all pages)

Replaced the floating hamburger-only button with a full-width fixed 56px topbar visible at all times even when scrolling.

| Element | Position | Behaviour |
|---|---|---|
| Back arrow ← | Far left | `history.back()` on inner pages; hidden on homepage |
| Brand name | Centred (absolute) | Links to `index.html` |
| Hamburger ☰ | Far right | Opens side panel |

- `body { padding-top: 56px }` on all pages prevents content hiding behind bar.
- Topbar background: `rgba(10,8,18,0.92)` with `backdrop-filter: blur(16px)`.
- z-index hierarchy: topbar 300, backdrop 310, sidebar 320.
- Close button added inside sidebar panel header.

---

### All Buttons → Orange

All interactive buttons standardised to orange:

| Property | Value |
|---|---|
| Background | `linear-gradient(135deg, #f97316, #ea580c)` |
| Box shadow | `0 4px 18px rgba(249,115,22,0.35)` |
| Border | `1px solid rgba(249,115,22,0.35)` |
| Icon colour | `#f97316` |

Buttons affected: topbar hamburger, back arrow, all `.btn-iris` CTAs, form submit, "Our Wins →" button.

---

### Sidebar Nav Updated (all pages)

- **Bot Leaderboard** link added with bar-chart icon.
- All nav link hover states changed to orange tint.
- Sidebar close button added inside panel header.

---

### leaderboard.html — New Page Created

**Podium block (top 3):**
- 3-column grid: 2nd (silver, left) | 1st (gold + crown, centre, tallest) | 3rd (orange, right).
- Circular avatar slots: `Bots/bot-N.jpg`, fallback to robot SVG icon.
- Medal tally stat pills per bot.

**Filter bar:**
- Tabs: All Bots / Combat / Soft Robotics / Aero.
- JS `filterBots()` shows/hides `.bot-card` elements by `data-division` attribute.

**Bot cards (6 placeholder cards):**

| Element | Details |
|---|---|
| Photo | `aspect-ratio: 4/3` slot, placeholder SVG shown until image provided |
| Rank badge | Absolute top-left; gold (#1), silver (#2), orange (#3), neutral (rest) |
| Division badge | Orange pill (Combat / Soft Robotics / Aero) |
| Stats | Gold/silver/bronze pill counts |
| Win record | List of wins: emoji medal + event + category/venue |

**Image path convention:** `Bots/bot-name.jpg`

**Admin placeholder notice** at top of page explaining what to fill in.

---

## Session 5 — Medal Size, Member Login & Report

### Medal Tags — Increased by Two Sizes

Updated `.medal` class in `style.css`:

| Property | Before | After |
|---|---|---|
| `font-size` | `0.75rem` (12px) | `1rem` (16px) |
| `padding` | `2px 8px` | `5px 14px` |
| `border-radius` | `6px` | `8px` |
| `gap` | `4px` | `6px` |

Applies to all `.medal-gold`, `.medal-silver`, `.medal-bronze` chips everywhere on the site.

---

### Member Login — Added to Sidebar (all pages)

A new "Members" section added to the sidebar navigation on all four HTML pages.

| Property | Value |
|---|---|
| Section label | "MEMBERS" (same uppercase style as "Navigation" / "Resources") |
| Link text | "Member Login" |
| Icon | Person silhouette SVG |
| Link destination | `member-login.html` (not yet created) |
| Visual style | Blue highlight: `rgba(59,130,246,0.08)` bg, `#60a5fa` text |
| Separator | Blue-tinted iris divider above Members section |

---

## Pending Items

Everything below has been scaffolded (links, placeholders, or nav entries exist) but needs real content or pages to be built.

| Item | File | What's Needed |
|---|---|---|
| Bot photos | `leaderboard.html` | Photos in `Bots/` folder, named to match card |
| Bot names, descriptions | `leaderboard.html` | Real bot names, weight class, build notes |
| Bot competition records | `leaderboard.html` | Event, category, venue, year per win |
| Club rules | `rules.html` | Official rules to replace all placeholder text |
| Electronics Handbook | Root folder | Upload `electronics-handbook.pdf` |
| Member Login page | `member-login.html` | Page + authentication logic |
| Member Dashboard | `member-dashboard.html` | Page + member data |
| Email address | `index.html` | Confirm `roboticsclub@nitte.edu.in` is correct or update |

---

## Asset Folder Reference

```
project root/
├── index.html
├── style.css
├── script.js
├── achievements.html
├── rules.html
├── leaderboard.html
├── upcoming.html
├── electronics-handbook.pdf     ← to be uploaded
├── member-login.html            ← to be created
├── member-dashboard.html        ← to be created
│
├── Images/
│   ├── robo.png                 (nav logo)
│   ├── rcn.jpg                  (hero logo — blended)
│   ├── hero.jpg                 (hero background)
│   ├── Combat.jpg               (Combat division card)
│   ├── softrobo.jpg             (Soft Robotics card)
│   ├── Aerodiv.jpg              (Aero division card)
│   └── lfr workshop_2025.jpg   (featured event card)
│
├── Officeb/
│   ├── Sanket_narale_.jpg
│   ├── Aaron Felix Fernandes .jpg
│   ├── Shreyas.JPG
│   ├── Sharan Rai K.jpg
│   ├── Nagendra.jpg
│   ├── Arham.jpg
│   ├── Nikhil.jpg
│   ├── Chandramouli.JPG
│   ├── Savin.jpg
│   ├── Pratham Amin.jpeg
│   ├── Sameeksha D.jpg
│   ├── Ayush.jpg
│   ├── Raghunandan Mayya.jpeg
│   └── Pranav S Salian.jpg
│
├── Achimg/
│   ├── Techtatva25.JPG
│   ├── Technoxian2023.jpg
│   ├── Sambhram25.jpeg
│   ├── Tiara2025.jpg
│   ├── Yensplash2025.jpg
│   ├── Synergia2025.jpg
│   ├── Engineer2025.jpg
│   ├── Quantum2024.jpg
│   ├── Technovanza2024.jpg
│   ├── Sambhram2024.jpg
│   └── Aerophilia2023.jpg
│
└── Bots/                        ← to be created
    ├── bot-1.jpg
    ├── bot-2.jpg
    └── ...
```

---

*Robotics Club Nitte · Internal Development Documentation · May 2026*

---

## Session 6 — Menu Button Refinements

### Menu Button — Multiple Iterations

**Iteration 1 (Session 4):** Large `60×60px` square, `2.5px` solid orange border, orange fill `rgba(249,115,22,0.35)`, large glow, flex-column with "MENU" text label below icon.

**Issue found (screenshot):** Button looked too large, boxy, and the "MENU" label made it feel odd and out of place.

**Iteration 2 (Session 5 attempt):** Changed to `44×44px` circle (`border-radius:50%`), solid orange fill `#f97316`, no border, no label.

**Issue found (screenshot):** Circle shape felt odd next to the square back button. Still too prominent in the wrong way.

**Iteration 3 — Final (Session 6):** 

| Property | Value |
|---|---|
| Size | `46×46px` |
| Shape | Rounded rectangle `border-radius: 12px` |
| Background | `transparent` — no fill |
| Border | `2px solid #f97316` — orange outline only |
| Icon colour | `#f97316` orange |
| Glow | `box-shadow: 0 0 10px rgba(249,115,22,0.4), inset 0 0 10px rgba(249,115,22,0.05)` |
| Hover glow | `0 0 20px rgba(249,115,22,0.75)` + `scale(1.05)` |
| Label | None — icon only |
| Fill on hover | None — only glow intensifies |

Applied to all 4 HTML files.

### Duplicate Button Bug Fixed (rules.html)

`rules.html` had a leftover second `id="sidebar-toggle"` button from an old floating nav block that survived previous injections. The entire stale "SIDE NAVIGATION" comment block was identified and removed. `rules.html` now has exactly 1 sidebar-toggle button, matching all other pages.

