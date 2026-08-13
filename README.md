# Yaadab — Lok Sewa Master Class website

A plain HTML/CSS/JS site — no build step, no framework, no Node.js
required. Every file here is the actual file the browser reads, so you
(or anyone) can open any `.html` file in a text editor and change the
text directly. This guide walks through putting it on Cloudflare and
editing it afterwards.

## What's in this folder

```
index.html          → Home page
blog.html            → Blog listing (with tier filters)
about.html           → About page
contact.html         → Contact page
post-template.html   → Duplicate this to write a new blog post
404.html             → Shown automatically for broken links
favicon.svg          → Browser-tab icon
css/style.css        → All styling, colors, fonts (one file)
js/main.js           → Mobile menu, scroll animation, contact form
```

## 1. Put it on Cloudflare Pages (5 minutes, no coding)

This is the "Direct Upload" method — you don't need GitHub or the
command line.

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com) and
   log in with the account where your domain is already set up.
2. In the left sidebar choose **Workers & Pages** → **Create** →
   **Pages** → **Upload assets**.
3. Give the project a name, e.g. `yaadab` (this becomes a free
   `yaadab.pages.dev` address you can preview immediately).
4. Drag this entire folder in when prompted (or click to browse and
   select the folder). Cloudflare uploads all the files as-is — no
   build command needed, leave the framework preset as **None**.
5. Click **Deploy site**. In under a minute you'll get a working
   `https://yaadab.pages.dev` link — open it and click through Home,
   Blog, About, and Contact to check everything.

## 2. Connect your existing domain (yaadab.com.np)

Since your domain is already using Cloudflare (registered through
Mercantile Nepal, DNS on Cloudflare), pointing it at this new site is
a couple of clicks — you don't need to touch your registrar at all:

1. Open your new Pages project → **Custom domains** tab.
2. Click **Set up a custom domain**, type `yaadab.com.np` (and
   `www.yaadab.com.np` if you use it), and confirm.
3. Cloudflare will add the required DNS record automatically since
   the domain is already on your Cloudflare account. Wait a few
   minutes for it to become active.
4. If you had an older site pointing at a different host, remove or
   update that old DNS record so it doesn't conflict — Cloudflare
   will flag this for you if it's an issue.

Your live site will then load at `yaadab.com.np` with free HTTPS.

## 3. Making edits after launch

Every time you want to change something:

1. Edit the relevant `.html` (or `css/style.css`) file on your
   computer in any text editor (Notepad, VS Code, etc.). Nepali text
   is typed directly as regular text — no special encoding needed,
   the files are already set to UTF-8.
2. Go back to your Pages project in Cloudflare → **Create deployment**
   → **Upload assets**, and drag the whole folder in again.
3. Cloudflare publishes the new version in under a minute. Your old
   version is kept in **Deployments** history, so you can roll back
   any time with one click if something looks wrong.

*(If this back-and-forth feels repetitive, ask about connecting a
GitHub repo instead — Cloudflare Pages can then redeploy automatically
every time you save changes to GitHub. Not necessary to start.)*

## 4. Update the YouTube video

Open `index.html` and find the `<!-- Replace VIDEO_ID_HERE -->` comment
inside the `#videos` section. Replace it with a real video:

**Single video:**
```html
<iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ...>
```
`YOUR_VIDEO_ID` is the part after `v=` in a normal YouTube URL, e.g.
for `youtube.com/watch?v=abc123XYZ` it's `abc123XYZ`.

**Whole channel's latest uploads instead of one video:**
```html
<iframe src="https://www.youtube.com/embed/videoseries?list=YOUR_UPLOADS_PLAYLIST_ID" ...>
```
Your uploads playlist ID is your channel ID with `UC` swapped for `UU`
(find your channel ID in YouTube Studio → Settings → Channel →
Advanced settings).

Also update the two `https://www.youtube.com/` placeholder links
(header CTA and footer) across all pages to your real channel URL.

## 5. Make the contact form work

Cloudflare Pages hosts static files only — it doesn't process form
submissions by itself, so the form needs a small free backend. The
fastest option is **Web3Forms** (no account/backend code needed):

1. Go to [web3forms.com](https://web3forms.com) and enter your email
   to get a free **Access Key** (arrives instantly, no signup wall).
2. Open `contact.html` and find the `<form>` tag near the top of the
   form card. Replace:
   - `REPLACE_WITH_WEB3FORMS_ENDPOINT` → `https://api.web3forms.com/submit`
   - `REPLACE_WITH_ACCESS_KEY` → the key Web3Forms emailed you
3. Re-upload the folder (step 3 above). Submissions will now land in
   your inbox.

Until you do this, the form shows a friendly "not connected yet"
message instead of failing silently.

## 6. Add a new blog post

1. Duplicate `post-template.html`, rename it (e.g. `gk-strategy.html`).
2. Edit its title, meta description, and body text.
3. Open `blog.html`, copy one `<article class="post-card">...</article>`
   block, edit its text/tag/date, and point its link at your new file.
4. Re-upload the folder.

## Brand reference (for future tweaks)

All colors and fonts live at the top of `css/style.css` under
`:root { ... }` — change a value there once and it updates everywhere.

| Token | Color | Used for |
|---|---|---|
| `--cover-800` | deep booklet-green | page background, header, footer |
| `--paper` | cream | content panels, cards |
| `--stamp-red` | red | buttons, links, accents |
| `--seal-gold` | gold | Sakha Adhikrit tier, eyebrows on dark sections |
| `--tier-1/2/3` | green/blue/gold | Kharidar / Nayab Subba / Sakha Adhikrit |

Fonts: **Yatra One** + **Bebas Neue** for headings, **Noto Serif
Devanagari** + **Noto Serif** for body text, **IBM Plex Mono** for
labels/meta text — all loaded free from Google Fonts in `style.css`.
