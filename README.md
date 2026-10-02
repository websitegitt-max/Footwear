# Solevia Footwear Store

A responsive React + Vite footwear storefront designed for GitHub Pages.

## Requirements

- Node.js 20+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages

1. Create a GitHub repository.
2. Push this project to the `main` branch.
3. GitHub Actions will run `.github/workflows/deploy.yml`.
4. In GitHub, open Settings → Pages and use GitHub Actions as the source.

The Vite configuration uses a relative base path so the project works as a GitHub Pages project site.

## Replace these before client delivery

### Brand
Edit the `SOLEVIA` text in `src/main.jsx`.

### Products
All 20 products are defined in the `products` array in `src/main.jsx`.

### Images
Put real product images in:

`public/images/`

Then update each product's `image` field.

### Business details
Replace placeholder footer and contact information with the real shop details.

### Payments
The checkout is a frontend demo. Do not place payment secrets in frontend code. Connect a secure backend/payment provider before accepting real payments.

## Adding products

Add another object to the `products` array. Keep the same fields:

- id
- name
- category
- price
- salePrice
- rating
- reviews
- sizes
- colors
- stock
- image
- description
