# allanfeidplumbing.com

Static marketing site for Allan Feid Jr, LLC built with Astro and deployed on Vercel. Every page is prerendered; the only server function is the contact form endpoint at `/api/contact/`, which sends mail over SMTP through the domain's Google Workspace account.

## Develop

```sh
npm install
npm run dev
```

## Deploy to Vercel

1. Push this directory to a Git repository and import it in Vercel. The Astro preset is detected automatically.
2. Add these environment variables in the Vercel project (see `.env.example`):
   - `SMTP_USER` – the Google Workspace mailbox the form sends from, e.g. `website@allanfeidplumbing.com` (any mailbox on the domain works, including linda@)
   - `SMTP_PASS` – a Google App Password for that mailbox, not the normal login password
   - `FORM_TO_EMAIL` – where submissions go (defaults to linda@allanfeidplumbing.com)
3. To create the App Password: sign in to the sending mailbox, turn on 2-Step Verification at https://myaccount.google.com/security, then go to https://myaccount.google.com/apppasswords and create one named "Website form". Paste the 16-character value into `SMTP_PASS`.
4. Point the `allanfeidplumbing.com` DNS at Vercel and set it as the production domain.

## Editing business details

All name, address, phone, hours, license, service list and town list data lives in `src/data/business.ts`. Things to confirm there:

- `address.showStreet` is `false` to match the Google Business Profile, which hides the street address. Set it to `true` if you decide to show it.
- `rating` and `reviewCount` are empty. Fill them in with the current Google numbers to show the rating on the site and in structured data, and keep them updated.
- `towns` matches the four towns on the Google Business Profile. Each town gets its own page under `/service-area/`. Add to the list if the profile service area grows.
- Add a Facebook page URL to `sameAs` once one exists.

## SEO checklist after launch

- Verify the site in Google Search Console and submit `https://allanfeidplumbing.com/sitemap-index.xml`.
- Set the website on the Google Business Profile to `https://allanfeidplumbing.com/`.
- Validate structured data with https://search.google.com/test/rich-results on the home page and a service page.
