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
    description: "Aura opens with vibrant Calabrian bergamot leading into a spicy heart of Sichuan pepper, lavender, and star anise, grounded in rich ambroxan and warm vanilla.",
    originalPrice: "Rs. 4,299",
    price: 3699,
    salePrice: 3699,
    badge: "BESTSELLER • SIGNATURE",
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
    description: "Vibe blends a bright burst of grapefruit, lemon, and mint with aromatic ginger, jasmine, and nutmeg, drying down into an exquisite trail of incense, cedar, and amberwood.",
    originalPrice: "Rs. 3,499",
    price: 2999,
    salePrice: 2999,
    badge: "UNDER 3K • BEST BUY",
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
    description: "Crush is an alluring blend of sparkling orange blossom, pink pepper, and juicy pear enveloped in coffee, white flowers, and warm vanilla over cashmere wood.",
    originalPrice: "Rs. 3,999",
    price: 3499,
    salePrice: 3499,
    badge: "FOR CRUSH 🥰",
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
