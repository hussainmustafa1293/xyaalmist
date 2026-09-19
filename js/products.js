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

   NOTE: Names, prices, notes and descriptions below are SAMPLE
   placeholder data (added on request so the site looks populated
   for preview/demo purposes). Replace with your real product
   details before going fully live.
===================================================== */

const PRODUCTS = [
  {
    slug: "haider",
    name: "Haider",
    tagline: "Bold, woody and warm",
    description: "Haider opens with a sharp, confident freshness before settling into a warm, woody heart. Built for evening wear, it leaves a rich, long-lasting trail without being overpowering.",
    price: 4500,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Bergamot, Black Pepper",
      heart: "Cedarwood, Lavender",
      base: "Amber, Musk, Oud"
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
    name: "Aabnoos",
    tagline: "Cool, clean and understated",
    description: "Aabnoos is a quiet, modern scent built around clean, cool tones. Light enough for daily wear, with a soft musky finish that lingers close to the skin.",
    price: 4200,
    salePrice: 3600,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Sea Salt, Grapefruit",
      heart: "Violet, Iris",
      base: "White Musk, Sandalwood"
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
    name: "Crush",
    tagline: "Sweet, floral and enchanting — For women & girls",
    description: "Crush is an enchanting luxury fragrance crafted specially for women and girls. Blending delicate floral sweetness with a luminous, warm amber and vanilla base, it captures youthful charm, effortless poise, and everyday romantic allure.",
    price: 4800,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Sweet Berry, Pink Peony, Sparkling Mandarin",
      heart: "Romantic Rose, White Jasmine, Peach Blossom",
      base: "Golden Amber, Madagascar Vanilla, Soft Velvet Musk"
    },
    images: [
      "assets/products/product-3/main.jpg",
      "assets/products/product-3/angle.jpg",
      "assets/products/product-3/packaging.jpg",
      "assets/products/product-3/lifestyle.jpg"
    ]
  }
];

// EDIT WHATSAPP NUMBER HERE (used site-wide by js/main.js)
const WHATSAPP_NUMBER = "923281959312"; // country code + number, no + or spaces
