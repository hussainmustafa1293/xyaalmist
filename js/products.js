/* =====================================================
   XYAAL 365 — SIGNATURE FRAGRANCE CATALOG
   ---------------------------------------------------
   Static product catalog for XYAAL 365.
===================================================== */

const PRODUCTS = [
  {
    id: "aura",
    slug: "aura",
    name: "Aura",
    gender: "For Men",
    tagline: "Bold, masculine, magnetic — For Men",
    description: "Aura is a commanding luxury fragrance crafted for men. Notes of crisp bergamot, pepper, smoked cedarwood, and rich amber create a bold, magnetic sillage built for distinction.",
    price: 2999,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Crisp Bergamot, Pepper",
      heart: "Smoked Cedarwood",
      base: "Rich Amber"
    },
    images: [
      "assets/products/haider/main.jpg",
      "assets/products/haider/lifestyle.jpg",
      "assets/products/haider/packaging.jpg",
      "assets/products/haider/angle.jpg"
    ],
    image: "assets/products/haider/main.jpg"
  },
  {
    id: "vibe",
    slug: "vibe",
    name: "Vibe",
    gender: "Unisex",
    tagline: "Fresh, versatile, sophisticated — Unisex",
    description: "Vibe is a quiet, sophisticated scent built for everyone. Fresh and versatile, it harmonizes crisp cardamom, light citrus, and velvet iris with a clean white musk drydown.",
    price: 2999,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Light Citrus, Cardamom",
      heart: "Iris",
      base: "Clean White Musk"
    },
    images: [
      "assets/products/product-2/main.jpg",
      "assets/products/product-2/lifestyle.jpg",
      "assets/products/product-2/packaging.jpg",
      "assets/products/product-2/angle.jpg"
    ],
    image: "assets/products/product-2/main.jpg"
  },
  {
    id: "crush",
    slug: "crush",
    name: "Crush",
    gender: "For Women",
    tagline: "Sensual, floral, enchanting — For Women",
    description: "Crush is an enchanting luxury fragrance crafted specially for women. Blending blooming rose petals with soft vanilla, sweet jasmine, and warm sandalwood, it captures effortless romantic allure.",
    price: 2999,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Soft Vanilla, Jasmine",
      heart: "Blooming Rose",
      base: "Warm Sandalwood"
    },
    images: [
      "assets/products/product-3/main.jpg",
      "assets/products/product-3/lifestyle.jpg",
      "assets/products/product-3/packaging.jpg",
      "assets/products/product-3/angle.jpg"
    ],
    image: "assets/products/product-3/main.jpg"
  }
];

function getXyaalProducts() {
  return PRODUCTS;
}

if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.getXyaalProducts = getXyaalProducts;
}

// Site-wide WhatsApp contact
const WHATSAPP_NUMBER = "923281959312";


