/* =====================================================
   XYAAL MIST — PRODUCT DATA
   ---------------------------------------------------
   EDIT PRODUCT INFORMATION HERE.
   This is the ONLY file you need to touch to change
   product names, prices, descriptions, notes or images.

   For each product:
   - slug        → must match its folder name in /products/
   - images[]    → REPLACE PRODUCT IMAGES HERE (put real
                    photos in /assets/products/<slug>/ and
                    update the paths below)
   - price/salePrice → set salePrice to null if there is no discount
   - available   → set to false to show "Currently Unavailable"
===================================================== */

const PRODUCTS = [
  {
    slug: "haider",
    name: "Haider",
    tagline: "[Short tagline for Haider]",
    description: "[Product description for Haider goes here. Replace with a few sentences describing the fragrance, its character and how it feels to wear.]",
    price: null,        // e.g. 4500
    salePrice: null,    // e.g. 3900, or null if no discount
    size: "[e.g. 50ml Eau de Parfum]",
    available: true,
    notes: {
      top: "[Top Notes]",
      heart: "[Heart Notes]",
      base: "[Base Notes]"
    },
    images: [
      "assets/products/haider/main.jpg",
      "assets/products/haider/angle.jpg",
      "assets/products/haider/lifestyle.jpg",
      "assets/products/haider/packaging.jpg"
    ]
  },
  {
    slug: "product-2",
    name: "[Product Name 2]",
    tagline: "[Short tagline]",
    description: "[Product description goes here.]",
    price: null,
    salePrice: null,
    size: "[Size]",
    available: true,
    notes: {
      top: "[Top Notes]",
      heart: "[Heart Notes]",
      base: "[Base Notes]"
    },
    images: [
      "assets/products/product-2/main.jpg",
      "assets/products/product-2/angle.jpg",
      "assets/products/product-2/lifestyle.jpg",
      "assets/products/product-2/packaging.jpg"
    ]
  },
  {
    slug: "product-3",
    name: "[Product Name 3]",
    tagline: "[Short tagline]",
    description: "[Product description goes here.]",
    price: null,
    salePrice: null,
    size: "[Size]",
    available: true,
    notes: {
      top: "[Top Notes]",
      heart: "[Heart Notes]",
      base: "[Base Notes]"
    },
    images: [
      "assets/products/product-3/main.jpg",
      "assets/products/product-3/angle.jpg",
      "assets/products/product-3/lifestyle.jpg",
      "assets/products/product-3/packaging.jpg"
    ]
  }
];

// EDIT WHATSAPP NUMBER HERE (used site-wide by js/main.js)
const WHATSAPP_NUMBER = "923281959312"; // country code + number, no + or spaces
