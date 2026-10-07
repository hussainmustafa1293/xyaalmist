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
    price: 4299,
    salePrice: 3699,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Bergamot",
      heart: "Sichuan Pepper, Lavender, Star Anise, Nutmeg",
      base: "Ambroxan, Vanilla"
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
    price: 3499,
    salePrice: 2999,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Grapefruit, Lemon, Mint, Pink Pepper, Bergamot, Aldehydes, Coriander",
      heart: "Ginger, Jasmine, Nutmeg, Melon",
      base: "Incense, Amber, Cedar, Sandalwood, Labdanum, Patchouli, Amberwood"
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
    price: 3999,
    salePrice: 3499,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Orange Blossom, Pink Pepper, Pear",
      heart: "Coffee, White Flowers, Jasmine",
      base: "Vanilla, Patchouli, Cashmere Wood, Cedarwood"
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
