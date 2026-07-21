# SMP Food Products

A responsive e-commerce storefront for SMP Food Products, focused on traditional South Indian nutrition products such as malt drinks, millet blends, health mixes, instant mixes, and family nutrition products.

The website includes a complete product catalogue, product details, cart and checkout flows, WhatsApp ordering, invoice generation, product videos, a gallery, and responsive layouts for phones, tablets, laptops, and large displays.

## Live features

- Responsive product catalogue with search and category filters
- Product variants, pricing, discounts, ratings, and nutrition details
- Persistent shopping cart using browser storage
- Responsive checkout and WhatsApp order generation
- Downloadable PDF invoice generation
- Product video and gallery experiences
- SMP branding and website metadata
- Pointer-following specular card animation on supported desktop devices
- Reduced-motion and touch-device fallbacks
- Accessible navigation, buttons, labels, and image descriptions
- Google OAuth customer sign-in and sign-out through Auth.js

## Technology stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OGL](https://github.com/oframe/ogl) for the specular card effect
- [Auth.js](https://authjs.dev/) for Google authentication
- [Lucide React](https://lucide.dev/) for icons
- [jsPDF](https://github.com/parallax/jsPDF) for invoices

## Getting started

### Requirements

- Node.js 20 or newer
- npm 10 or newer

### Installation

```bash
git clone https://github.com/harish-offl/SMP-FOOD-PRODUCTS.git
cd SMP-FOOD-PRODUCTS
npm install
```

### Development server

Copy the authentication environment template before starting:

```bash
copy .env.example .env.local
```

Set `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` in `.env.local`.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

### Production build

```bash
npm run build
npm run start
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates and validates the production build |
| `npm run start` | Serves the completed production build |
| `npm run lint` | Runs the Next.js lint checks |

## Project structure

```text
app/                     Application routes and global styles
  products/              Product catalogue and detail pages
components/              Shared navigation, footer, cards, and effects
data/products.ts         Product catalogue, categories, and reviews
public/images/           Logo and local website artwork
store/CartContext.tsx    Cart state and browser persistence
types/                   Shared TypeScript definitions
utils/                   WhatsApp ordering and invoice helpers
```

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Storefront homepage |
| `/products` | Searchable and filterable product catalogue |
| `/products/[slug]` | Product information, variants, and nutrition details |
| `/cart` | Shopping cart and totals |
| `/checkout` | Delivery details and order placement |
| `/shop-by-videos` | Product and recipe videos |
| `/gallery` | Product and ingredient gallery |
| `/about` | Brand story and manufacturing process |
| `/contact` | Contact information and enquiry form |
| `/login` | Google customer authentication |

## Google login configuration

1. Create an OAuth 2.0 Client in Google Cloud and choose **Web application**.
2. Add `http://localhost:3000` as an authorized JavaScript origin.
3. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
4. Generate a secure Auth.js secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```

   Copy the output into `AUTH_SECRET` in `.env.local`.
5. Place the generated values in `.env.local` using `.env.example` as the template.

For production, add the production origin and this callback URL in Google Cloud:

```text
https://your-domain.com/api/auth/callback/google
```

Set the same authentication environment variables in the deployment platform. Never commit `.env.local` or Google client secrets.

## Responsive design

The interface is mobile-first and adapts across these practical ranges:

- Small phones: 320px and wider
- Standard phones: 375px and wider
- Tablets: 640px–1023px
- Laptops: 1024px–1279px
- Desktop and wide displays: 1280px and wider

Responsive behavior includes stacked checkout and cart layouts, touch-friendly controls, scrollable product tabs and nutrition tables, collapsible product filters, safe-area-aware mobile navigation, and device-aware animation fallbacks.

Before publishing layout changes, check at least these viewport sizes:

```text
320 × 568
375 × 812
768 × 1024
1024 × 768
1366 × 768
1440 × 900
```

## Product and business configuration

- Edit the catalogue in `data/products.ts`.
- Update the WhatsApp number in `utils/whatsapp.ts`.
- Update contact details in `app/contact/page.tsx` and `components/Footer.tsx`.
- Replace local artwork in `public/images/` while retaining the referenced filenames, or update the relevant image paths.

## Deployment

The project can be deployed to any platform that supports Next.js, including Vercel, Netlify, or a Node.js server.

For Vercel:

1. Import this GitHub repository into Vercel.
2. Keep the detected framework as Next.js.
3. Use `npm run build` as the build command.
4. Deploy the `main` branch.

## Verification

Run a production build before committing or deploying:

```bash
npm run build
```

A successful build validates compilation, TypeScript, page generation, and production bundles for all application routes.

## License

This project and its SMP Food Products branding are intended for the repository owner and SMP Food Products. Contact the owner before reusing brand assets or commercial content.
