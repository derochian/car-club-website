# Central Fraser Valley Chapter — Website

This is the source code for the **Central Fraser Valley Chapter** website
(Vintage Car Club of Canada — Fraser Valley). It is a single-page, plain
HTML site designed to be inexpensive, fast, and very simple to maintain by
someone who is not a web developer. There is no database, no login, and no
software to install — everything is just plain files in a folder.

The most important feature is the **event registration form**. When someone
fills it out, the submission is saved in the Netlify dashboard *and* emailed
to the club contact you specify.

---

## What's in this folder

| File             | What it does                                                       |
|------------------|--------------------------------------------------------------------|
| `index.html`     | The home page (and the only page). All visible content lives here. |
| `thank-you.html` | The "thank you" page shown after the form is submitted.            |
| `404.html`       | Friendly "page not found" page.                                    |
| `styles.css`     | Visual styling (colors, fonts, spacing, layout).                   |
| `script.js`      | A small amount of JavaScript for the form and the year in footers. |
| `README.md`      | This file.                                                         |
| `photos/`        | (Optional) Folder you create yourself when you start adding photos.|

You do not need to edit `styles.css`, `script.js`, `404.html`, or
`thank-you.html` for normal content updates. **Almost all routine changes
happen in `index.html`.**

---

## ⚠️ Before the first deploy — the one thing left to fill in

The site has been pre-filled with the chapter's real information, **except
for the email address**. In `index.html` you'll see two places that still
say `[CLUB_EMAIL]`. Choose a contact email for the club (a free shared
inbox like `cfvc.vccc@gmail.com` is recommended so it isn't tied to any
single person), then in `index.html` do **Find & Replace**:

- **Find:** `[CLUB_EMAIL]`
- **Replace:** the chosen address (e.g. `cfvc.vccc@gmail.com`)
- Click **Replace All**, save the file.

That's the last thing standing between this folder and your first deploy.

---

## 1. Updating content

Most everyday changes are find-and-replace in `index.html`. Open it in any
text editor — Notepad on Windows works, but see the tip below if you're on
Windows 11 and don't see Notepad in the right-click menu.

### Opening `index.html` in Notepad on Windows 11

In recent Windows 11 builds, Notepad isn't in the default right-click menu:

1. Right-click `index.html` → **Open with** → **Choose another app**.
2. If Notepad isn't listed, click **More apps**, scroll down, and select
   **Notepad**.
3. (Optional but recommended) Tick **Always use this app to open .html files**
   if you want double-clicking to open Notepad in future. *Don't tick this*
   if you also want to keep using your web browser to preview the page —
   in that case leave it unticked and use Open with each time.

> **Tip:** in Notepad, turn **word wrap OFF** (Format → Word Wrap, untick
> it) before you start editing. With word wrap on, lines wrap visually and
> selecting a block of HTML is fiddly. With it off, each `<li>` block is
> on its own clearly visible line.

### The simplest way to change a value: Find & Replace

1. Open `index.html` in Notepad.
2. Press `Ctrl+H`. This opens **Find and Replace**.
3. In **Find what**, type the value you want to change.
4. In **Replace with**, type the new value.
5. Click **Replace All** (NOT just "Replace" — that only does one at a time).
6. Save: **File → Save** (or `Ctrl+S`).
7. Double-click `index.html` to open it in your web browser and check that
   the change looks right.
8. When you're happy, deploy to Netlify (Section 3).

### About `[SQUARE_BRACKET]` placeholders

A few placeholders are still in the file for things you may set later
(currently only `[CLUB_EMAIL]` and the photo gallery captions like
`[EVENT_1_PHOTO_1]`). The CONFIG comment at the top of `index.html` lists
exactly which placeholders remain and what each one is for.

### "Second-time edits" — important

When you first replace a placeholder like `[CLUB_PHONE]` with `604-856-1949`,
the placeholder itself is **gone** from the file afterward.

Next time the phone number changes, **don't** search for `[CLUB_PHONE]` —
it isn't there anymore. Instead:

- **Find:** the *current* value (e.g. `604-856-1949`)
- **Replace:** the new value
- Click **Replace All**.

The same applies to club name, mailing address, event names, executive
names, etc. The square-brackets pattern is a *one-time fill-in helper*,
not a permanent label.

### Save a backup before any big edit

Before doing several Find & Replace operations in a row, **save a copy of
the whole folder first** (File Explorer → right-click the folder → Copy,
then paste somewhere else like Documents → "Website backup 2026-06-15").
If a Find & Replace goes badly, you can restore from the backup.

---

## 2. Adding a new event

Events appear in **two places** in `index.html`:

1. The **Upcoming Events** list (where they're displayed)
2. The **registration form's dropdown** (so people can register for them)

Each event also has a matching **photo gallery section** further down the
page. The gallery's subheading is just the event's name — it stays in sync
automatically as long as you Find & Replace the event name across both
spots (see below).

### To rename an existing event

Use Find & Replace on the **current** event name. For example, to rename
"Bevan Lodge Car Show" to "Spring Tour 2027":

- **Find:** `Bevan Lodge Car Show`
- **Replace:** `Spring Tour 2027`
- Click **Replace All**.

This updates the event listing, the dropdown option, the "Register for this
event" button, and the photo gallery subheading — all in one go.

### To add a brand-new sixth event

This is more involved than renaming, so go slowly. **Do not use Find &
Replace for the renumbering steps below** — typing `5` and replacing with
`6` would corrupt every executive number, gallery slot, etc.

1. Open `index.html` in Notepad.
2. Press `Ctrl+F` and search for `<!-- EVENT 5`.
3. **Highlight the entire EVENT 5 block** — from `<li class="event">` down
   to and including the matching `</li>` (about 12 lines). Copy it
   (`Ctrl+C`).
4. Paste (`Ctrl+V`) immediately below the block you copied. You now have
   two identical "EVENT 5" blocks.
5. In the **new (lower) copy only**, rewrite the placeholder values to be
   the real details of the new sixth event. The fields to change are:
   - The event name (appears in `<h3 class="event-name">`, in the `data-event="…"` attribute, AND should also be added as a new line in the dropdown — see step 6)
   - The date (in the `<strong>Date:</strong>` line)
   - The location (in the `<strong>Location:</strong>` line)
   - The description (in `<p class="event-description">`)
6. Find the registration dropdown by searching for `<select id="event"`.
   Add a new line right after the `Christmas Party` option:
   ```html
   <option value="Your New Event Name">Your New Event Name</option>
   ```
   The `value="…"` and the visible text must match each other and must
   match the new event's `<h3 class="event-name">` exactly.
7. (Optional) Find the `<!-- GALLERY EVENT 5` comment and copy that whole
   `<section class="gallery-event">…</section>` block, paste below it,
   change `gallery-event-5-heading` to `gallery-event-6-heading`, change
   the heading text to the new event name, and change the photo
   placeholders from `[EVENT_5_PHOTO_*]` to `[EVENT_6_PHOTO_*]`. Skip this
   step entirely if you don't have photos to add for the new event yet.
8. Save. Double-click `index.html` to preview in a browser.
9. Deploy (Section 3).

### To remove an event

1. Delete the entire `<li class="event">…</li>` block in the events list.
2. Delete the matching `<option value="…">` line in the form's dropdown.
3. (Optional) Delete the matching `<section class="gallery-event">…</section>`
   in the photos section.
4. Save and re-deploy.

You don't need to renumber the remaining events. `EVENT_1`, `EVENT_2`, etc.
are just slot labels — gaps don't matter.

---

## 2a. Removing or changing an executive

Executives are in `index.html` inside `<ul class="executives">`. Each one
is a single `<li>` line.

### To remove an executive

1. Find the line for the executive you want to remove (search for their name).
2. Delete that whole `<li>…</li>` line.
3. Save and re-deploy.

You don't need to renumber the others.

### To change an executive's name or role

Use Find & Replace on the current name (or current role). The same
technique as renaming an event.

---

## 3. Deploying to Netlify

Netlify is a free hosting service that this site is designed to work with.
You only need to do the initial setup once. After that, updates take about
a minute.

### Option A — Drag and drop (easiest)

This is the recommended method for non-technical maintainers.

1. Go to <https://app.netlify.com> and sign in (or create a free account).
2. From the dashboard, look for the **"Sites"** section. There's a large
   dashed-outline drop area; current Netlify wording is roughly *"Want to
   deploy a new site without connecting to Git? Drag and drop your site
   output folder here."* (Wording may vary year to year.)
3. Open this website folder (the folder this README lives in) in **File
   Explorer**.
4. Inside the folder, press `Ctrl+A` to select **everything** — the
   files (`index.html`, `styles.css`, etc.) **and** the `photos` folder
   if you've created one.
5. Drag the selection onto the dashed Netlify drop area in your web browser.

   > **Important:** drag the **selected files**, not the *folder* itself.
   > If you drag the outer folder, Netlify will treat the folder name as
   > a sub-path and links will break. Selecting all the files first and
   > dragging the selection (which can include the `photos/` subfolder
   > inside it — that's fine) is the right move.

6. Wait a few seconds. Netlify uploads the files and gives the site a
   temporary address like `random-name-123456.netlify.app`.
7. **Click that address.** Don't skip this. Open the live site in your
   browser and verify your changes show up correctly. If a photo doesn't
   appear, that's almost always a typo in the file name — see Section 7.
8. To replace the site later (after editing), drag the updated files onto
   the same drop area. Netlify replaces the old version automatically.

### Option B — Git deploy (only if you're comfortable with Git)

1. Push this folder to a GitHub repository.
2. In Netlify, click **Add new site → Import an existing project**.
3. Choose GitHub and select the repository.
4. Leave the build settings empty (this is a static site — no build step).
5. Click **Deploy**.

After this, every push to the main branch automatically re-deploys the site.

---

## 4. Setting up form notifications (so registrations get emailed)

When someone fills out the registration form, two things happen:

1. The submission appears in the Netlify dashboard under
   **Forms → event-registration**.
2. *If you set it up*, Netlify also emails the submission to a club contact.

You **must do this once** to receive emails. Until you do, submissions only
appear in the dashboard.

### Steps

1. Sign in to <https://app.netlify.com>.
2. Click on your site.
3. In the left sidebar, click **Forms**.
4. You should see a form named **event-registration**. Click it.
5. Click **Settings & usage** (top right of the form page).
6. Scroll to **Form notifications** and click
   **Add notification → Email notification**.
7. In **Email to notify**, enter the email address that should receive
   registration emails. This is typically the same address as `[CLUB_EMAIL]`
   in `index.html`, but it doesn't have to be — Netlify only uses it for
   form notifications.
8. Optional: under **Subject**, type something like
   `New event registration — {{ form.event }}` so the subject line shows
   the event name.
9. Click **Save**.

That's it. The next form submission will both show up in the dashboard
**and** arrive in the contact's inbox.

> **Note:** if the form name "event-registration" isn't visible after your
> first deploy, submit the form once on the live site (with test data) to
> register it with Netlify, then return to the Forms page. **Tip:** delete
> that test submission afterwards from
> *Forms → event-registration → Submissions* so it doesn't clutter the list.

### Where to view past registrations

All registrations are stored permanently in Netlify under
**Forms → event-registration → Submissions**. You can also export them as
a CSV file for record-keeping.

---

## 5. Pointing a custom domain at the site

If the club has its own domain name (e.g. `cfvc-vccc.org`), you can point
it at the Netlify site so visitors see your address instead of `…netlify.app`.

### Steps

1. In the Netlify dashboard, click on your site.
2. Click **Domain management** (left sidebar).
3. Under **Custom domains**, click **Add custom domain**.
4. Type the domain name and click **Verify**.
5. Netlify will give you instructions specific to your domain registrar.
   In most cases:
   - For an *apex domain* like `cfvc-vccc.org`, add an `A` record at your
     registrar pointing to the Netlify IP address Netlify gives you.
   - For a *www subdomain* like `www.cfvc-vccc.org`, add a `CNAME` record
     pointing to your Netlify site address (e.g.
     `random-name-123456.netlify.app`).
6. Wait for DNS to update (anywhere from a few minutes to 24 hours).
7. Once Netlify shows the domain as "Netlify DNS — Active", visit the
   address to confirm.
8. Netlify will automatically issue a free HTTPS certificate (Let's Encrypt)
   once the domain resolves.

---

## 6. Where registration emails go

To recap, after a visitor submits the form:

1. **The submission is saved** at
   `https://app.netlify.com → your site → Forms → event-registration → Submissions`.
2. **An email is sent** to whichever address you configured in
   *Settings & usage → Form notifications* (Section 4 above).

If emails aren't arriving:

- Check the spam folder.
- Confirm the recipient email in *Form notifications* is correct.
- Confirm the form name in the email notification settings matches
  **`event-registration`**.

---

## 7. Common questions

**Q: I changed `index.html` but the live site still shows the old version.**
A: You need to re-deploy. Use Section 3 — drag the updated files onto the
Netlify drop area. Then open the Netlify URL and confirm.

---

**Q: How do I add photos to an event gallery?**
A: The Photos section is split into **five mini-galleries**, one per event.
Each event has up to **six photo slots** that start out as labelled
placeholder tiles (you'll see them as dashed-border boxes with diagonal
stripes). Replacing a placeholder with a real photo takes about a minute
per photo. Here is the full procedure — Notepad on Windows is enough.

**Step 1 — Create a `photos` folder (only needed once)**

1. Open the website folder (the folder this README lives in) in File Explorer.
2. Right-click in the empty space inside the folder → **New → Folder**.
3. Name the new folder exactly: `photos` (all lowercase, no spaces).

You should now have a `photos` folder sitting next to `index.html`.

**Step 2 — Put your photo files into `/photos/`**

1. Save each photo as a `.jpg` file. If your camera or phone gave it a long
   name like `IMG_4827.JPG`, that's fine — but a short, descriptive name
   makes things easier later. For example:
   - `bevan-lodge-lineup.jpg`
   - `picnic-bbq.jpg`
2. Resize photos to about **800 × 600 pixels** so the website stays fast.
   On Windows: right-click a photo → **Open with → Photos**, then click the
   **three-dot menu** (the `…` button at the top of the Photos window) →
   **Resize image → Define custom dimensions**.
3. Drag the `.jpg` files into the `photos` folder.

**Step 3 — Tell `index.html` to show the photo**

1. Open `index.html` in Notepad. (Section 1 above explains how on Windows 11.)
2. **Turn word wrap OFF** (Format → Word Wrap — make sure it's *not* ticked).
   Each `<li>` block will then sit on its own line, which makes the next
   step much easier.
3. Press `Ctrl+F` to open Find. Search for the **subheading of the event**
   you want to add photos to (the event's name, e.g. `Bevan Lodge Car Show`).
4. Just below that subheading you will see six lines that look like this
   (one per photo slot):

   ```html
   <li class="gallery-item"><span class="gallery-placeholder-label">[EVENT_1_PHOTO_1]</span></li>
   ```

5. To replace photo slot 1 with a real photo, **select that entire line**
   (triple-click it to select the line in Notepad) and replace it with
   this snippet — type it in directly rather than copy-pasting from this
   README, to avoid hidden formatting characters:

   ```html
   <li class="gallery-item gallery-item-photo"><img src="photos/bevan-lodge-lineup.jpg" alt="Members lined up at Bevan Lodge"></li>
   ```

   - The bit after `photos/` must match the file name in the `photos`
     folder **exactly**, including upper/lower case and the `.jpg` ending.
   - The `alt="…"` text describes what is in the photo. Keep it short
     (a single sentence). This is read aloud by screen readers and shown
     if the photo ever fails to load.

6. Repeat step 5 for each remaining photo you want to add. Slots you
   leave alone keep showing as labelled placeholders, which is fine.
7. Save the file: **File → Save** (or `Ctrl+S`).
8. Double-click `index.html` to open it in your web browser and check
   that the photos appear in the right places.
9. Re-deploy by dragging the updated files onto Netlify (Section 3).
   Then click the Netlify URL to confirm the live site shows the photos.

**Tips and common questions for photos**

- **Want fewer than six photos for an event?** Delete the placeholder
  `<li>…</li>` lines you don't need. The remaining tiles automatically
  rearrange themselves.
- **Want to change just the caption text on a placeholder** (without
  adding a photo yet)? Use Find & Replace: search for, say,
  `[EVENT_1_PHOTO_1]` and replace it with descriptive caption
  text like `Lineup at the gate`.
- **Photo looks stretched or squashed?** That's normal — the photo is
  cropped to fit the tile. If it crops out the important part, re-save
  the photo so the subject is closer to the center, then drop it back in
  `photos/`.
- **The photo doesn't appear after re-deploying?** The most common cause
  is a typo in the file name. Open the `photos` folder, copy the exact
  file name, paste it after `photos/` in the `<img src=…>` line.
- **The photo doesn't appear at all on Netlify?** When you re-deployed,
  did you remember to include the `photos` folder in the selection?
  Re-do Section 3 step 4 making sure `Ctrl+A` selected the `photos`
  folder along with the html files.

---

**Q: One meeting (e.g. August) is at a different venue than usual. How do I show that?**
A: The "When We Meet" block is intended for the **standing** monthly
meeting — it shows one location, one time, one day. For one-off venue
changes, the simplest approach is to add a temporary entry to the
**Upcoming Events** list (Section 2 of this README) describing the
specific date and venue. After that meeting passes, remove the entry.

---

**Q: How much does this cost?**
A: Netlify's free tier (as of writing) includes 100 GB of traffic per
month and 100 form submissions per month. The chapter is unlikely to
come close to either limit. The only paid item is custom domain
registration (typically CAD $15–25/year, paid to the domain registrar,
not Netlify).

---

**Q: How do I change the colours or fonts?**
A: Open `styles.css`. Near the top there's a section labeled
`/* 1. Custom properties */` containing `--color-accent`, `--font-heading`,
etc. Editing these values changes the look across the whole site.
This requires a small amount of comfort with CSS — if you're not sure,
ask another member or a freelance web developer.

---

**Q: A club member can't see the form / the page looks weird in their browser.**
A: The site needs a reasonably modern browser (anything from the last
5–10 years). On Windows, ask them to use **Microsoft Edge**, **Chrome**,
or **Firefox** rather than Internet Explorer (which is no longer
supported by anyone).

---

## 8. Who built this and when

This site was built by a club volunteer as a one-time project. It is
intended to run for years without maintenance other than periodic content
updates (events, executive list, photos). If something goes seriously wrong
that isn't covered here, the most likely solution is to ask another club
member who has built websites before, or contact a freelance web developer
for an hour or two of help — there is no proprietary code in this site.
