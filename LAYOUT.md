# LAYOUT.md — shared page template & class reference

This is the **canonical layout** for every page of the Country Car Show site.
The site is plain static HTML/CSS/JS on GitHub Pages — no framework, no build
step. Every page shares the same `<head>` boilerplate, sticky `<header>`
(brand + phone + nav + hamburger), and `<footer>`.

**Page authors:** copy the three blocks in Section 1 verbatim into your page.
The only things you change per page are flagged inline with `CHANGE PER PAGE`.

---

## Canonical page set + nav

| File | Nav label | In nav? |
|---|---|---|
| `index.html` | Home | yes |
| `event-2026.html` | 2026 Show | yes (details + Pre-Register `#register`) |
| `gallery.html` | Photos | yes |
| `sponsors.html` | Sponsors | yes |
| `winners.html` | Winners | yes |
| `youth-in-trades.html` | Youth in Trades | yes |
| `print-qr.html` | — | NO (printable QR page) |
| `404.html` | — | no |
| `thank-you.html` | — | no |

**Desktop nav order:** Home · 2026 Show · Photos · Sponsors · Winners · Youth in Trades, plus a gold **Pre-Register** CTA item linking to `event-2026.html#register`.

**Links are RELATIVE everywhere** (`href="gallery.html"`, never `/gallery.html`) — the site is served from a project sub-path on GitHub Pages today and a custom-domain root later.

---

## 1. Copy-paste blocks

### 1a. `<head>` boilerplate

Paste this as the whole `<head>`. **CHANGE PER PAGE:** the `<title>` and the
`<meta name="description">`. Leave everything else identical. Pages that should
not be indexed (`404.html`, `thank-you.html`, `print-qr.html`) should also add
`<meta name="robots" content="noindex">` just after the viewport line.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="description" content="CHANGE PER PAGE — one-sentence description of this page.">
  <meta name="theme-color" content="#1A2A5C">

  <!-- Open Graph (for link previews when the site is shared) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Country Car Show 2026 — Sunday April 26, Aldergrove">
  <meta property="og:description" content="12th Annual Country Car Show — hosted by the Central Fraser Valley Chapter of the VCCC.">
  <meta property="og:locale" content="en_CA">

  <title>CHANGE PER PAGE — Country Car Show 2026</title>

  <!-- Inline-SVG favicon: a simple steering wheel in the show's navy accent.
       No separate file needed. To change it, edit the SVG below. -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><circle cx='32' cy='32' r='26' fill='none' stroke='%231A2A5C' stroke-width='5'/><circle cx='32' cy='32' r='5' fill='%231A2A5C'/><path d='M32 6v20M6 32h20M58 32H38M32 58V38' stroke='%231A2A5C' stroke-width='5' stroke-linecap='round'/></svg>">

  <!-- Google Fonts: Playfair Display (serif headings) + Source Sans 3 (body).
       These are the only external resources the site loads. -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="styles.css">
</head>
```

### 1b. Skip link + `<header>`

Paste this immediately after `<body>`. **CHANGE PER PAGE:** add
`aria-current="page"` to the ONE nav link that matches the current page (see
the per-page guide in Section 3). The hamburger button + `id="primary-nav"` on
the `<ul>` must stay exactly as written — `script.js` looks for them.

```html
<a class="skip-link" href="#main">Skip to main content</a>

<!-- ============================================================== -->
<!-- HEADER — sticky: brand + phone + primary navigation            -->
<!-- The .nav-toggle hamburger is hidden on desktop and shown below  -->
<!-- the desktop breakpoint (script.js wires it up). With JS off the -->
<!-- nav stays visible, so nothing breaks.                           -->
<!-- ============================================================== -->
<header class="site-header" role="banner">
  <div class="header-top">
    <div class="brand">
      <a href="index.html" class="brand-link">
        <span class="brand-name">Country Car Show</span>
        <span class="brand-tagline">12th Annual — Sunday, April 26, 2026 — Aldergrove, BC</span>
      </a>
    </div>

    <!-- Phone link: shown inline here on desktop (see also the mobile band below). -->
    <a class="header-phone" href="tel:604-309-8368" aria-label="Call John Lundgren at 604-309-8368">
      <span class="header-phone-label">Questions? Call John:</span>
      <span class="header-phone-number">604-309-8368</span>
    </a>

    <!-- Hamburger: only visible below the desktop breakpoint (CSS-controlled). -->
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">
      <span class="nav-toggle-bars" aria-hidden="true"></span>
      <span>Menu</span>
    </button>
  </div>

  <!-- Mobile-only phone band: the desktop breakpoint hides this and the inline
       phone link above takes over. Keeps the number big and tappable on phones. -->
  <div class="header-phone-wrap">
    <a class="header-phone" href="tel:604-309-8368" aria-label="Call John Lundgren at 604-309-8368">
      <span class="header-phone-label">Questions? Call John:</span>
      <span class="header-phone-number">604-309-8368</span>
    </a>
  </div>

  <nav class="site-nav" aria-label="Primary">
    <ul id="primary-nav">
      <li><a href="index.html">Home</a></li>
      <li><a href="event-2026.html">2026 Show</a></li>
      <li><a href="gallery.html">Photos</a></li>
      <li><a href="sponsors.html">Sponsors</a></li>
      <li><a href="winners.html">Winners</a></li>
      <li><a href="youth-in-trades.html">Youth in Trades</a></li>
      <li><a href="event-2026.html#register" class="nav-cta">Pre-Register</a></li>
    </ul>
  </nav>
</header>

<main id="main">
  <!-- page content goes here -->
</main>
```

> **Note on the two phone links:** there are intentionally two `.header-phone`
> elements — the one inside `.header-top` is shown on desktop, the one inside
> `.header-phone-wrap` is shown on mobile. Don't delete either. (If you'd
> rather keep one, that's a global change — talk to the layout owner; don't
> edit `styles.css` from a page file.)

### 1c. `<footer>` + script

Paste this just before `</body>`.

```html
<!-- ============================================================== -->
<!-- FOOTER                                                         -->
<!-- ============================================================== -->
<footer class="site-footer" role="contentinfo">
  <div class="container container-wide">
    <p>&copy; <span id="current-year">2026</span> Central Fraser Valley Chapter, Vintage Car Club of Canada. All rights reserved.</p>
    <p>
      Visit our chapter site at
      <a href="https://fraservalley.vccc.com" rel="noopener external">fraservalley.vccc.com</a>
      &middot; National club:
      <a href="https://vccc.com" rel="noopener external">Vintage Car Club of Canada</a>
    </p>
  </div>
</footer>

<script src="script.js" defer></script>
</body>
</html>
```

---

## 2. Class reference

Reuse these classes. **Do NOT add new global CSS to `styles.css`** — if you
think you need a new component, ask the layout owner so it lands in one place.

### Structure / layout

| Class | Purpose | Minimal example |
|---|---|---|
| `.section` | A full-width band of vertical padding. Wrap each page section in one. | `<section class="section">…</section>` |
| `.section-light` | Variant of `.section` with white bg + hairline top/bottom borders. Alternate with plain `.section` for rhythm. | `<section class="section section-light">…</section>` |
| `.section-centered` | Center-aligns text in a short page (e.g. thank-you). | `<section class="section section-centered">…</section>` |
| `.container` | Max-width **prose** wrapper (~720px → ~60–75 char lines), centered, side padding. Put it inside a `.section`. | `<div class="container"><h2>…</h2><p>…</p></div>` |
| `.container.container-wide` | Wider wrapper (~1080px) for grids / wide content. Add alongside `.container`. | `<div class="container container-wide">…</div>` |
| `.feature-grid` | Two-up content layout for text/detail pages so wide screens are used deliberately (no stranded narrow column). One column on phones + tablets; **two equal columns from the desktop breakpoint** up. Put inside `.container.container-wide`. | `<div class="feature-grid"><div>…</div><div>…</div></div>` |
| `.feature-grid.feature-grid--aside` | Same, but the first child is a wider **main** column and the second a narrower **aside** (≈1.5 : 1 on desktop). | `<div class="feature-grid feature-grid--aside"><div>main…</div><aside class="card">aside…</aside></div>` |

### Content blocks

| Class | Purpose | Minimal example |
|---|---|---|
| `.card` | Generic boxed content block (border, subtle shadow). | `<div class="card"><h3>Title</h3><p>…</p></div>` |
| `.section-intro` | Muted lead paragraph under a section `<h2>`. | `<p class="section-intro">Short intro line.</p>` |
| `.meeting-info` + `.meeting-list` | Gold-bordered info panel with a `<dl>` of label/value rows (stacks on mobile, two columns from tablet up). | see below |
| `.contact-grid` + `.contact-block` + `.contact-list` | Contact area: one or more blocks, side-by-side from tablet up. | see below |

```html
<!-- meeting-info panel -->
<div class="meeting-info">
  <h3>When &amp; Where</h3>
  <dl class="meeting-list">
    <dt>Date</dt><dd>Sunday, April 26, 2026</dd>
    <dt>Location</dt><dd>Aldergrove Community Secondary School</dd>
  </dl>
</div>

<!-- contact block -->
<div class="contact-grid">
  <div class="contact-block">
    <h3>Show Chairman</h3>
    <p><strong>John Lundgren</strong></p>
    <dl class="contact-list">
      <dt>Email</dt><dd><a href="mailto:johnlundgren54@hotmail.com">johnlundgren54@hotmail.com</a></dd>
      <dt>Phone</dt><dd><a href="tel:604-309-8368">604-309-8368</a></dd>
    </dl>
  </div>
</div>
```

### Buttons

| Class | Purpose | Minimal example |
|---|---|---|
| `.btn` | Base button/link styling (≥48px tall). Always combine with a variant. | `<a class="btn btn-secondary" href="…">Label</a>` |
| `.btn-primary` | Red CTA — the page's main action. Use sparingly (one per view). | `<a class="btn btn-primary" href="event-2026.html#register">Pre-Register</a>` |
| `.btn-secondary` | Navy outline button for secondary actions. | `<a class="btn btn-secondary" href="gallery.html">See photos</a>` |
| `.btn-large` | Bigger hero/landing CTA (≥56px). Combine with a variant. | `<a class="btn btn-primary btn-large" href="…">…</a>` |
| `.btn-submit` | Form submit styling (full width up to 420px, ≥56px). | `<button type="submit" class="btn btn-primary btn-submit">Submit</button>` |

### Responsive image grid (gallery)

Single column on phones, auto-filling multi-column from tablet up. Tiles
without an `<img>` show the dashed-stripe placeholder; real photos add
`.gallery-item-photo`.

| Class | Purpose |
|---|---|
| `.gallery-event` + `.gallery-event-name` | Optional grouping with a subheading. |
| `.gallery` | The grid `<ul role="list">`. |
| `.gallery-item` | One placeholder tile (4:3, dashed stripes). |
| `.gallery-item.gallery-item-photo` | A tile holding a real `<img>` (drops the placeholder look). |
| `.gallery-placeholder-label` | The `[PHOTO_n]` label text inside a placeholder. |

```html
<ul class="gallery" role="list">
  <li class="gallery-item"><span class="gallery-placeholder-label">[PHOTO_1]</span></li>
  <li class="gallery-item gallery-item-photo">
    <img src="photos/example.jpg" alt="Short description of the photo">
  </li>
</ul>
```

### Sponsors grid

| Class | Purpose | Minimal example |
|---|---|---|
| `.sponsors` | Auto-filling grid (single column on mobile). | `<ul class="sponsors" role="list">…</ul>` |
| `.sponsor` | One sponsor tile (gold top border). | `<li class="sponsor">Business Name</li>` |

### Form (keep working as-is)

`.registration-form`, `.form-row`, `.field-hint`, `.field-error`,
`.form-actions`, `.form-success`, `.form-error`, `.required`, `.optional`.
The pre-register form markup + the `id`s `registration-form`,
`form-placeholder`, `form-error` are wired to `script.js` — copy the existing
form block from the original single-page site into `event-2026.html` and keep
those IDs. Inputs are ≥19px so iOS Safari won't zoom on focus — don't shrink them.

### Accessibility helpers

| Class | Purpose |
|---|---|
| `.skip-link` | The "Skip to main content" link (already in the header block). |
| `.visually-hidden` | Hide text visually but keep it for screen readers. |

---

## 3. Rules for page authors

1. **Reuse the classes above. Do NOT add global CSS to `styles.css`.** If a
   page truly needs new shared styling, ask the layout owner so it lives in one
   place and stays mobile-first. Page-specific one-offs are a smell — flag them.
2. **Use RELATIVE links** everywhere (`gallery.html`, not `/gallery.html`).
3. **Set the active nav item.** On each page, add `aria-current="page"` to the
   ONE matching nav link. Per page:
   - `index.html` → `<a href="index.html" aria-current="page">Home</a>`
   - `event-2026.html` → the `2026 Show` link
   - `gallery.html` → the `Photos` link
   - `sponsors.html` → the `Sponsors` link
   - `winners.html` → the `Winners` link
   - `youth-in-trades.html` → the `Youth in Trades` link
   - `print-qr.html`, `404.html`, `thank-you.html` → none (not in nav)
4. **Change only the `<title>` and `<meta description>`** in the head block;
   leave fonts, favicon, theme-color, and OG tags identical across pages.
5. **Keep markup clean and well-commented** — the maintainer (Richard) edits in
   FrontPage 2003. No fancy tooling, no inline styles, no `<script>` per page
   beyond the shared `script.js` include.
6. **One `.btn-primary` per view.** Red is reserved for the single main action.
7. Wrap real content in a `.section` > `.container` (use `.container-wide` for
   grids). Don't put bare content directly in `<main>`.

---

## 4. Breakpoints (for reference; authors rarely need these)

Authoring is **mobile-first**: base CSS targets phones, three min-width
breakpoints enhance upward.

| Name | Min-width | What changes |
|---|---|---|
| (base) | — | Phone. Single-column grids, stacked nav behind hamburger, full-width phone band. |
| tablet | `48em` (~768px) | Two-column definition lists, multi-column gallery/sponsor grids, side-by-side contact blocks, roomier card padding. |
| desktop | `64em` (~1024px) | **Full horizontal nav (no hamburger)**, phone link inline in the top bar, larger section padding. |
| large | `90em` (~1440px) | Slightly wider prose measure + wider container, larger gallery tiles so big screens don't feel sparse. |

iOS Safari specifics handled in `styles.css`: `viewport-fit=cover` +
`env(safe-area-inset-*)` on the sticky header/footer, fluid `clamp()` type,
and inputs ≥19px (no zoom-on-focus).
