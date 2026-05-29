# Country Car Show — website

This is the website for the **Country Car Show**, hosted each spring in Aldergrove, BC by the Central Fraser Valley Chapter of the Vintage Car Club of Canada (VCCC).

- **Live site:** https://derochian.github.io/car-club-website/
- **Source code:** https://github.com/derochian/car-club-website
- **Future address:** countrycarshow.ca (the QR code already points here; the domain just needs to be pointed at the site — Terry handles that)

There are no build tools. The site is plain HTML/CSS/JS, served as-is by GitHub Pages. Every page shares one stylesheet and one script.

```
Car Club Website/
├── index.html            ← Home (landing page)
├── event-2026.html       ← 2026 show details + online pre-registration form
├── gallery.html          ← Photos from past shows
├── sponsors.html         ← Sponsors who donate prizes (logos + links)
├── winners.html          ← Prize / trophy winners
├── youth-in-trades.html  ← The youth automotive program the show supports
├── print-qr.html         ← A printable flyer page with the QR code
├── thank-you.html        ← Shown after a contact form submission (future)
├── 404.html              ← Shown when a link goes to a missing page
│
├── styles.css            ← ALL styling for every page (colors live at the top in :root)
├── script.js             ← Menu button + year update + form validation
├── assets/               ← Shared images (the QR code)
├── photos/               ← Gallery photos
├── sponsors/             ← Sponsor logos
│
├── LAYOUT.md             ← The shared page template + list of reusable styles (for editors)
└── README.md             ← this file
```

> **Every page shares the same header, navigation, and footer.** That shared block is written out near the top of each `.html` file. If you change the menu (for example, add a page), you must make the same change in **every** page's header. The exact block to copy is in **LAYOUT.md**.

---

## How publishing works

When changes are made in this folder, they are pushed to GitHub and GitHub Pages re-publishes the live site within 1–3 minutes — no upload step, no Netlify dashboard.

To publish changes, run three commands from inside the `Car Club Website` folder:

```
git add .
git commit -m "Short description of the change"
git push
```

If you're editing on your own machine, GitHub Pages doesn't allow drag-and-drop publishing. There are two options for getting changes to the live site:

1. **Edit the file and send it over** — open the file in FrontPage 2003, make your changes, save it, and email the updated file to whoever runs the publish step.
2. **Set up GitHub Desktop on your computer** — a one-time install that lets you click "Commit" and "Push" without the command line, so you can publish directly.

---

## How to edit the most common things

Open any `.html` file in **FrontPage 2003** (or any editor — Notepad works too in a pinch). Each file has helpful comments near the top explaining what it is.

### Update the event date / prices for next year

The show date and prices appear on a few pages. Use **Find & Replace** (Edit menu → Replace, or Ctrl+H) **in each page that mentions them** — mainly `index.html` and `event-2026.html`:

| Find | Replace with |
|---|---|
| `12th Annual` | `13th Annual` (next year's count) |
| `Sunday, April 26, 2026` | the new full date |
| `April 26, 2026` | shortened form of the new date |
| `$20 online` | new online price |
| `$25 at the gate` | new gate price |

When you create next year's show page, the cleanest approach is to **copy `event-2026.html` to `event-2027.html`**, update the contents, and then update the "2026 Show" / "Pre-Register" menu links on **every** page to point at the new file.

### Update the contact person

If the Country Car Show Chairman changes, replace these values **everywhere they appear (all pages)**:

| Find | Replace with |
|---|---|
| `John Lundgren` | new chairman's name |
| `johnlundgren54@hotmail.com` | new email |
| `604-309-8368` | new phone |

### Update a sponsor

Sponsors live on **`sponsors.html`**. Each sponsor is one `<li class="sponsor">` block containing a logo image, the name, and a "Visit website" link. Comments in that file explain how to (a) swap a placeholder logo for a real one and (b) set the sponsor's real website address. Note: `&amp;` is the way to write an ampersand (`&`) inside HTML.

---

## How to add photos to the gallery

Photos live on **`gallery.html`**. It starts with a few sample tiles plus twelve **placeholder tiles** (the ones with diagonal stripes). To replace a placeholder with a real photo:

1. **Save the photo** as a JPEG, roughly 800 × 600 pixels. (Most phone cameras output much larger files — resizing first keeps the site fast to load.)
2. **Put it in the `photos/` folder** next to the pages. Give the photo a short, all-lowercase, no-spaces filename like `2024-mustang-blue.jpg`.
3. **Open `gallery.html`** and find a placeholder line. Each looks like this:
   ```html
   <li class="gallery-item"><span class="gallery-placeholder-label">[PHOTO_1]</span></li>
   ```
4. **Replace** that single line with (note `loading="lazy"` keeps the page fast, and `alt` describes the photo for screen readers):
   ```html
   <li class="gallery-item gallery-item-photo">
     <img src="photos/2024-mustang-blue.jpg" alt="Short description of the photo"
          loading="lazy" width="800" height="600">
   </li>
   ```
5. **Save** the file. That photo will appear in the gallery.

Remaining placeholders keep showing the dashed-stripe pattern so it's clear which slots are still empty. To **remove** an empty placeholder, just delete its `<li>` line.

---

## The QR code

`assets/qr-countrycarshow.svg` (and a `.png` copy) is a QR code that points to **https://countrycarshow.ca**. It appears on the home page and on `print-qr.html` (a clean page made for printing a flyer). If the show's web address ever changes, the QR code must be regenerated to match — ask whoever maintains the site.

---

## How to wire up the pre-registration form (when ready)

The pre-registration form is on **`event-2026.html`**. Right now it **collects values and validates them, but does not actually send the data anywhere** — when a visitor submits, they see a "please email John directly" message instead.

To make the form really send, open `event-2026.html`, find the big `TODO` comment above the `<form>` tag (it's marked **"THIS IS THE FORM INTEGRATION POINT"**), and follow the options listed there, simplest first:

1. **Formspree** — sign up at https://formspree.io, get a form ID, change the form's `action` attribute. Free for 50 submissions/month.
2. **Netlify** — move site hosting from GitHub Pages back to Netlify; re-add `data-netlify="true"` and the honeypot field.
3. **Google Forms** — build the form in Google Forms, embed the iframe in place of the existing form block.

After wiring, also update `script.js` — the `showPlaceholder()` call in the submit handler should be replaced with the real fetch / submit logic. **The club still needs to choose one of these options.**

---

## For whoever maintains the styling

All styling is in **`styles.css`**, and the shared page template + the full list of reusable style names is documented in **`LAYOUT.md`**. A few things to know:

- The stylesheet is **mobile-first**: the plain rules describe phones, and three `@media (min-width: …)` blocks at the bottom enhance the layout for tablet (48em), desktop (64em — where the full menu bar appears instead of the Menu button), and large screens (90em).
- The design is calibrated for an **older audience**: body text 18–20 px, line height 1.6, high contrast (no light grey on white), buttons at least 48 px tall, and visible focus rings. Please don't regress these. Form inputs are 19 px on purpose so iPhones don't zoom in when you tap a field.
- The color palette is set in the `:root` block at the top of `styles.css` — change those tokens to retheme the whole site without touching the rest. Colors are pulled from the 2026 event poster: deep navy `#1A2A5C` (identity), warm gold `#F2B705` (accents), red `#C8102E` (the primary call-to-action button only).
- **Don't add page-specific styling inside the individual pages.** Reuse the style names listed in `LAYOUT.md`. The only exception is `print-qr.html`, which has a small style block of its own because it's a special printable page.
