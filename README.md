# Addax Properties – website (v2, new design)

Next.js 16 (App Router) + React 19, plain JavaScript, one stylesheet (`app/globals.css`).

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Public folder
This project uses **the same `public/` folder as the previous site**. Copy your existing `public` folder into the project root. All paths are unchanged:

- `/images/logo.png` (footer logo) and `/images/icon.png` (header icon tile, favicon source)
- `/images/properties/<slug>/cover.png` – project covers (set per project in `lib/projects.js`)
- `/images/developers/<slug>.png` – developer photos, `/images/developers-logo/<slug>.png` – white developer logos
- `/brochures/<slug>.pdf`, `/floorplans/<slug>.pdf` – picked up automatically when the file exists
- `/videos/uae.mp4` – home hero background video

## Where to edit content
| What | File |
| --- | --- |
| Projects (name, price, plan, handover, image, ...) | `lib/projects.js` |
| Phone, email, WhatsApp, hours, socials, exchange rates | `lib/data.js` → `site`, `currencies` |
| Developers, communities, FAQs, services | `lib/data.js` |
| Colours / fonts / spacing | `app/globals.css` (`:root` tokens at the top) |

Adding `type: "Apartments"` (or "Villas", ...) to projects makes a **Property type** filter appear automatically in the hero search and on the Projects page.

## Pages
`/` home · `/properties` projects with filters · `/properties/[slug]` project detail · `/developers` and `/developers/[slug]` · `/communities` · `/calculator` (ROI & payment) · `/advisory` (about, services, FAQ) · `/contact` · legal pages.
Old addresses `/about`, `/services`, `/why-dubai` redirect to `/advisory`.

## Enquiry forms
All forms post to `app/api/inquiry/route.js`. To receive enquiries by email, create `.env.local`:

```
RESEND_API_KEY=re_xxx
INQUIRY_TO=you@yourdomain.com
INQUIRY_FROM="Addax Website <website@yourdomain.com>"
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Without these, enquiries are printed in the server log only.

## Features
- Sticky header that compacts on scroll, developers dropdown, mobile menu
- AED / USD / GBP currency switch (remembered per visitor) applied to every price
- Off-plan payment & Golden Visa estimator (home, project pages, calculator page with rental-yield estimate)
- Sitemap (`/sitemap.xml`) and `robots.txt`
