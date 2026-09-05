# XYAAL MIST — Website

Static, multi-page site. No backend, no build step — just HTML/CSS/JS you can edit directly or push to GitHub Pages.

## Pages
- `index.html` — Home
- `collection.html` — Collection / Shop (all 3 products)
- `products/haider/index.html` — Product page for **Haider**
- `products/product-2/index.html` — Product page (placeholder, rename slug/folder when you have the real name)
- `products/product-3/index.html` — Product page (placeholder)
- `about.html` — Our Story
- `contact.html` — Contact

Clean URLs like `/products/haider/` work automatically on GitHub Pages because each product has its own folder.

## What to edit, and where

| What | File |
|---|---|
| Product names, prices, descriptions, notes, discounts, stock status | `js/products.js` |
| Product photos | `assets/products/<slug>/main.jpg` (+ `angle.jpg`, `lifestyle.jpg`, `packaging.jpg`) — paths are already wired in `js/products.js` |
| WhatsApp number | `js/products.js` → `WHATSAPP_NUMBER` (one place, used site-wide) |
| Logo | `assets/logo/xyaal-mist-logo.png` |
| Colors / fonts | `css/style.css` → the `:root` block at the top |
| Social links / address on Contact page | `contact.html` (search for `[Social media accounts to be added]`) |

## Adding real product photos
1. Put your images in `assets/products/<slug>/` using the filenames already referenced in `js/products.js` (`main.jpg`, `angle.jpg`, `lifestyle.jpg`, `packaging.jpg`).
2. Until real photos are added, the site shows a clean "Replace with product photo" placeholder automatically — nothing breaks.

## Renaming product-2 / product-3
Only **Haider** was a confirmed product name. The other two are placeholders (`[Product Name 2]`, `[Product Name 3]`). Once you have the real names:
1. Rename the folders `products/product-2` and `products/product-3` to your real slugs (e.g. `products/faisal`).
2. Update the matching `slug` and `images` paths in `js/products.js`.
3. Update the `renderProductDetail("product-2")` line at the bottom of that page's `index.html` to match.

## Reviews
No fake reviews are included. Product pages show "No reviews yet" with a "Write a Review" link that currently points to the Contact page — this is intentionally left as a placeholder for a future review system, with no backend required for this version.

## Deploying
This is a static site — it can be pushed to GitHub Pages as-is (root of the repo, or a `/docs` folder if you prefer) with no build step.
