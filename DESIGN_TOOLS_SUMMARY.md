# Design Tools Summary
## Read this file at the start of every design session

---

## 1. UI/UX Pro Max Skill

**Location:** `.claude/skills/ui-ux-pro-max/`  
**What it is:** A design intelligence database with 67 UI styles, 96 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types — covering React, Next.js, Flutter, Tailwind, shadcn/ui, and 9 other stacks.

### How to use it
- Read `.claude/skills/ui-ux-pro-max/SKILL.md` before designing any component or section.
- Consult the CSV data files in `.claude/skills/ui-ux-pro-max/data/` when you need specifics:

| File | Contains |
|------|----------|
| `styles.csv` | 67 UI styles (glassmorphism, brutalism, bento, etc.) with implementation checklists |
| `colors.csv` | 96 palettes matched to product types |
| `typography.csv` | 57 font pairings with mood/stack compatibility |
| `ux-guidelines.csv` | 99 rules ranked by priority |
| `ui-reasoning.csv` | Decision logic for choosing styles |
| `charts.csv` | 25 chart types with best-use rules |
| `react-performance.csv` | React/Next.js performance patterns |

### Non-negotiable rules (apply to every component)

**CRITICAL — Accessibility**
- Color contrast minimum 4.5:1 for normal text
- Every interactive element needs a visible focus ring
- All icon-only buttons need `aria-label`
- Keyboard navigation must follow visual tab order

**CRITICAL — Touch & Interaction**
- All tap targets minimum 44×44 px
- Add `cursor-pointer` to every clickable element
- Disable buttons during async operations

**HIGH — Performance**
- Animate only `transform` and `opacity` — never `width`, `height`, `top`, `left`
- Always add `will-change-transform` to elements with CSS/Framer Motion transforms
- Respect `prefers-reduced-motion` in every animation

**HIGH — Layout**
- Body text minimum 16px on mobile
- Line length 65–75 characters max
- Line height 1.5–1.75 for body copy

**MEDIUM — Animation**
- Micro-interactions: 150–300ms duration
- Page transitions / reveals: 600–900ms with easing like `[0.22, 1, 0.36, 1]`
- Use `opacity` + `transform` only — no layout-triggering props

**MEDIUM — Style consistency**
- This portfolio uses: **Dark Glassmorphism** style — black base, violet/purple/fuchsia accent, subtle blur on cards, gradient text for headings
- Do not mix styles across sections

### This project's design system
```
Background:   #000000 (pure black)
Accent 1:     violet-500 (#8b5cf6) → primary brand color
Accent 2:     purple-400 (#a78bfa) → secondary
Accent 3:     fuchsia-400 (#e879f9) → highlight
Text body:    zinc-400 (#a1a1aa)
Text muted:   zinc-500/600
Cards:        bg-white/3 or bg-white/5 + border-white/8 + backdrop-blur-sm
Border hover: border-white/15 or border-violet-500/30
Gradient text: from-violet-300 via-purple-200 to-fuchsia-300
Animation lib: Framer Motion (already installed)
Easing:       [0.22, 1, 0.36, 1] for reveals, [0.25, 1, 0.5, 1] for micro
```

---

## 2. 21st.dev Magic MCP

**What it is:** An MCP server that gives Claude access to thousands of pre-built, production-ready UI components — searchable by description, style, or function.

**Status:** ✅ Installed and configured. If tools are not available, restart Claude Code.

**API Key:** `21st_sk_37042a6e71bc9ce7b775305c95da184250afc773428aaf6384c8b155b42062d3`

### Available MCP tools (auto-loaded after restart)

| Tool | Tier | What it does |
|------|------|-------------|
| `search_components` | Free | Semantic search — finds components matching a description |
| `search_icons` | Free | Searches SVG icons via svgl |
| `generate_component` | Pro | Generates multiple component variants |

### How to use it
When building or improving any UI component, **first search 21st.dev** before writing from scratch:

```
Search query examples:
- "animated hero section dark mode"
- "glassmorphism card with hover effect"
- "skill badge ticker marquee"
- "contact form with validation"
- "timeline experience section"
- "floating navbar blur"
```

Then adapt the returned component to match this project's design system (dark theme, violet accent, Tailwind + Framer Motion).

### What NOT to do
- Do not install Three.js — it was removed because it caused lag. Use CSS animations and Framer Motion only.
- Do not add `useScroll` + `useTransform` scroll-storytelling in the Hero — the simple entrance animation approach is the correct one.
- Do not use `position: sticky` inside elements whose parent has `overflow-x: hidden` — it breaks. Use `position: fixed` if needed.

---

## 3. Animation approach for this project

**Hero section:** Framer Motion `initial` → `animate` with staggered delays. No scroll storytelling.  
**All other sections:** Framer Motion `whileInView` + `viewport={{ once: true }}` on individual elements.  
**Background:** CSS `@keyframes` animated gradient orbs (3 divs in `page.tsx`, styles in `globals.css`). No WebGL.

### Standard reveal pattern for section content
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>
  {/* content */}
</motion.div>
```

### Standard stagger pattern for grids/lists
```tsx
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
>
```

---

## 4. Project quick reference

```
Stack:        Next.js 16 (App Router, output: export) + React 19 + TypeScript
Styling:      Tailwind CSS v4 + shadcn/ui
Animation:    Framer Motion + Anime.js v4 (named imports: animate, stagger)
Scroll:       Lenis smooth scroll (via useLenis hook)
Icons:        Lucide React
Images:       next/image with unoptimized: true (static export)
Key sections: Hero, About, Skills, Projects, Experience, Testimonials, Contact
Data file:    constants/data.ts  (PERSONAL_INFO, SKILLS, PROJECTS, etc.)
```
# 5. Creative Direction & Motion Philosophy (CRITICAL)

This portfolio is NOT a normal developer portfolio.

The experience should feel like:

* a premium digital product launch
* a cinematic SaaS landing page
* a high-end creative agency website
* an Awwwards-level interactive experience

The user should feel:

* smoothness
* depth
* polish
* intentional motion
* premium craftsmanship

Every section must feel alive through subtle motion and layered interactions.

====================================================
OVERALL VISUAL DIRECTION
========================

The website aesthetic should combine:

* Apple-level smoothness
* Linear.app minimalism
* Vercel typography
* Stripe gradient treatment
* Framer motion design language
* modern AI startup visuals

Design mood:

* futuristic
* elegant
* cinematic
* atmospheric
* minimal but visually rich

Avoid:

* generic Tailwind look
* template appearance
* overly bright colors
* cluttered layouts
* excessive motion spam

====================================================
MOTION DESIGN PRINCIPLES
========================

Animation should NEVER feel random.

Every motion must:

* guide attention
* improve hierarchy
* create depth
* improve perceived quality

Animations should feel:

* soft
* smooth
* slightly delayed
* organic
* premium

Use:

* staggered entrances
* layered reveals
* parallax depth
* floating motion
* magnetic hover interactions
* subtle scale transitions
* animated gradients
* blur transitions
* opacity fades

====================================================
PREMIUM INTERACTION RULES
=========================

Every interactive element should have feedback.

Buttons:

* subtle scale on hover
* glow increase on hover
* smooth easing
* slight depth illusion

Cards:

* soft tilt interaction
* border glow animation
* gradient movement
* smooth hover lift

Images:

* slow zoom on hover
* reveal masking
* layered overlays

Navigation:

* translucent blurred navbar
* hide/show on scroll
* active section indicator
* smooth anchor scrolling

====================================================
DEPTH & LAYERING
================

The interface must feel multi-layered.

Use:

* blurred gradient orbs
* radial glows
* layered shadows
* background grid overlays
* noise texture
* transparency
* floating elements
* depth via opacity and blur

Do NOT make sections feel flat.

Every section should contain:

* foreground
* midground
* background

====================================================
SCROLL EXPERIENCE
=================

Scrolling should feel cinematic and effortless.

Use:

* Lenis smooth scrolling
* subtle parallax motion
* delayed reveal timing
* staggered content appearance
* floating background movement

Avoid:

* aggressive scroll hijacking
* heavy pinned storytelling
* overcomplicated GSAP timelines
* laggy transforms

Scrolling must remain smooth on mobile devices.

====================================================
TYPOGRAPHY PHILOSOPHY
=====================

Typography is a major visual element.

Use:

* oversized hero headings
* tight headline tracking
* strong hierarchy
* spacious layout rhythm
* large whitespace

Headings should feel:

* bold
* cinematic
* premium
* editorial

Gradient text should be used selectively for emphasis only.

====================================================
HERO SECTION DIRECTION
======================

The hero section is the emotional hook.

It should immediately communicate:

* premium quality
* modern frontend engineering
* animation expertise
* strong visual identity

Hero should include:

* cinematic headline reveal
* animated gradient typography
* layered background glow
* floating UI particles/orbs
* subtle mouse-reactive effects
* staggered CTA entrance
* premium profile presentation

The hero must feel immersive without being cluttered.

====================================================
SECTION TRANSITIONS
===================

Sections should visually flow together.

Avoid:

* abrupt spacing changes
* disconnected layouts
* inconsistent animation timing

Use:

* visual rhythm
* spacing continuity
* background glow carry-over
* gradual opacity blending

====================================================
MOBILE EXPERIENCE
=================

Mobile experience is equally important.

Animations on mobile must:

* remain smooth
* reduce heavy transforms
* preserve readability
* avoid FPS drops

Prioritize:

* touch comfort
* clean spacing
* performant animation

====================================================
FINAL QUALITY BAR
=================

The final result should NOT look like:

* a beginner React portfolio
* a cloned Tailwind template
* a generic AI-generated website

The final result SHOULD look like:

* a premium creative developer portfolio
* a high-budget SaaS marketing site
* a modern motion-first digital experience
* an agency-crafted frontend showcase

Every section should feel polished enough to appear in:

* Awwwards
* Framer showcase
* modern startup landing pages
* premium frontend inspiration galleries

