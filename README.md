# LSA Mining Mechanical Service

A bilingual English/French corporate website built with React, TypeScript, Vite, and Lucide icons.

## Development

Requires Node.js 22.12+ or 24+ and npm.

```sh
npm install
npm run dev
```

## Validation And Deployment

```sh
npm run lint
npm run build
npm run preview
```

Deploy the generated `dist` directory to a static web host. No backend or environment variables are required. The site assumes deployment at the domain root.

## Content

- Edit both language dictionaries and the shared email address in `src/content.ts`.
- The EN/FR preference is saved locally; page language, title, and description update with it.
- Service capabilities expand using native, keyboard-accessible disclosures.
- Applications and inquiries open the visitor's email app. There is no server-side form or resume upload.
- The mobile navigation closes on selection or Escape. Reduced-motion preferences are respected.

## Before Launch

- Replace the custom shield placeholder in `src/App.tsx` and `public/lsa-mark.svg` with approved company logo artwork.
- Confirm the supplied email spelling: `Lsaservicemecanqueminiers@gmail.com`.
- Add the company's verified emergency phone number. Emergency support currently links to the contact section and a pre-addressed email; no response-time promise is made.
- Confirm credentials, recruiting copy, and the Instagram profile with the company.
- Replace illustrative photography with approved LSA job-site/team photography when available.

## Assets

Locally served WebP photography from Unsplash, under the [Unsplash License](https://unsplash.com/license):

- Mining photo: [Dominik Vanyi](https://unsplash.com/photos/Mk2ls9UBO2E), with desktop and mobile-sized versions.
- Industrial maintenance photo: https://images.unsplash.com/photo-1581092918056-0c4c3acd3789

Manrope and DM Sans are loaded from Google Fonts. System sans-serif is the offline fallback.
