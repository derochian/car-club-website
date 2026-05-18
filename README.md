# Country Car Show 2026 — website

This is the single-page website for the **Country Car Show**, hosted each spring in Aldergrove, BC by the Central Fraser Valley Chapter of the Vintage Car Club of Canada (VCCC).

- **Live site:** https://derochian.github.io/car-club-website/
- **Source code:** https://github.com/derochian/car-club-website

There are no build tools. The site is six files in this folder, served as plain HTML/CSS/JS by GitHub Pages.

```
Car Club Website/
├── index.html         ← the whole one-page site
├── styles.css         ← all styling (colors live at the top in :root)
├── script.js          ← year update + form validation
├── thank-you.html     ← shown after a contact form submission (future)
├── 404.html           ← shown when a link goes to a missing page
└── README.md          ← this file
```

---

## How publishing works

The website lives in this folder on Lucas's laptop. When changes are made here, they are pushed to GitHub and GitHub Pages re-publishes the live site within 1–3 minutes — no upload step, no Netlify dashboard.

**Lucas publishes changes** by running three commands from inside the `Car Club Website` folder:

```
git add .
git commit -m "Short description of the change"
git push
```

**Richard, if you're editing on your own machine:** GitHub Pages doesn't allow drag-and-drop publishing. There are two options for handing changes off so they reach the live site:

1. **Edit the file and send it to Lucas** — easiest. Open the file in FrontPage 2003, make your changes, save it, and email the updated file to Lucas. Lucas pushes it.
2. **Set up GitHub Desktop on your computer** — a one-time install lets you click "Commit" and "Push" without the command line. We can walk through this together if you'd like to publish directly.

The May 21 meeting is a good time to decide which approach works best.

---

## How to edit the most common things

All content lives in `index.html`. Open it in **FrontPage 2003** (or any editor — Notepad works too in a pinch).

### Update the event date for next year

Use **Find & Replace** (Edit menu → Replace, or Ctrl+H):

| Find | Replace with |
|---|---|
| `12th Annual` | `13th Annual` (next year's count) |
| `Sunday, April 26, 2026` | the new full date |
| `April 26, 2026` | shortened form of the new date |

Save the file. That covers the hero, header, page title, and social-share preview.

### Update ticket prices

Use Find & Replace:

| Find | Replace with |
|---|---|
| `$20 online` | new online price |
| `$25 at the gate` | new gate price |

### Update the contact person

If the Country Car Show Chairman changes, replace these values everywhere they appear:

| Find | Replace with |
|---|---|
| `John Lundgren` | new chairman's name |
| `johnlundgren54@hotmail.com` | new email |
| `604-309-8368` | new phone |

### Update a sponsor name or add/remove a sponsor

Sponsors live in a list block near the bottom of `index.html`. Look for the `<!-- SPONSORS -->` comment. Each sponsor is one line:

```html
<li class="sponsor">K&amp;M Tune-Up Centre</li>
```

To add a sponsor, copy any of these lines and change the name. To remove a sponsor, delete the whole line. To rename one, change just the text between the tags. Note: `&amp;` is the way to write an ampersand (`&`) inside HTML.

---

## How to add photos to the gallery

The gallery starts with twelve **placeholder tiles** (the ones with diagonal stripes). To replace a placeholder with a real photo:

1. **Save the photo** as a JPEG, roughly 800 × 600 pixels. (Most phone cameras output much larger files — resizing first keeps the site fast to load.)
2. **Put it in a `photos/` folder** next to `index.html`. If that folder doesn't exist yet, create it. Give the photo a short, all-lowercase, no-spaces filename like `2024-mustang-blue.jpg`.
3. **Open `index.html`** and find the `<!-- PHOTO GALLERY -->` block. Each placeholder looks like this:
   ```html
   <li class="gallery-item"><span class="gallery-placeholder-label">[PHOTO_1]</span></li>
   ```
4. **Replace** that single line with:
   ```html
   <li class="gallery-item gallery-item-photo">
     <img src="photos/2024-mustang-blue.jpg" alt="Short description of what's in the photo">
   </li>
   ```
5. **Save** the file. That photo will appear in the gallery.

Remaining placeholders (the ones you haven't replaced) keep showing the dashed-stripe pattern so it's clear which slots are still empty.

To **remove an empty placeholder** (so you only show, say, 6 photos), just delete the corresponding `<li>` line.

---

## How to wire up the pre-registration form (when ready)

Right now the form **collects values and validates them, but does not actually send the data anywhere**. When a visitor submits, they see a "please email John directly" message instead.

To make the form really send, open `index.html`, find the `<!-- PRE-REGISTER FORM -->` block, and follow the TODO comment above the `<form>` tag. The three options listed there, simplest first:

1. **Formspree** — sign up at https://formspree.io, get a form ID, change the form's `action` attribute. Free for 50 submissions/month.
2. **Netlify** — move site hosting from GitHub Pages back to Netlify; re-add `data-netlify="true"` and the honeypot field.
3. **Google Forms** — build the form in Google Forms, embed the iframe in place of the existing form block.

After wiring, also update `script.js` — the `showPlaceholder()` call in the submit handler should be replaced with the real fetch / submit logic.

---

## Older-audience design notes (for whoever maintains the styling)

The styling in `styles.css` is deliberately calibrated for an older audience:

- Body text 18–20 px (no smaller)
- Line height 1.6
- High contrast (no light grey on white)
- Buttons at least 48 px tall (56 px for the primary submit)
- Visible focus rings on every interactive element

When touching `styles.css`, keep these in mind. The color palette is set in the `:root` block at the top of the file — change those tokens to retheme the whole site without touching the rest.

The colors are pulled from the 2026 event poster: deep navy `#1A2A5C` (identity), warm gold `#F2B705` (accents), red `#C8102E` (the primary call-to-action button only).
