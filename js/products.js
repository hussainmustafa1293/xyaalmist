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
    tagline: "Mysterious. Bold. Unforgettable.",
    description: "A signature fragrance built for presence. Haider opens with sharp, spicy notes and settles into a deep, woody base of oud and amber. Crafted to leave a lingering trail of sophistication from morning to midnight.",
    price: 4500,        // e.g. 4500
    salePrice: null,    // e.g. 3900, or null if no discount
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Bergamot, Black Pepper",
      heart: "Oud, Rose",
      base: "Amber, Musk"
    },
    images: [
      "assets/products/haider/main.jpg",
      "assets/products/haider/angle.jpg",
      "assets/products/haider/lifestyle.jpg",
      "assets/products/haider/packaging.jpg"
    ]
  },
  {
    slug: "ivory-bloom",
    name: "Ivory Bloom",
    tagline: "Soft. Floral. Radiant.",
    description: "A delicate and radiant floral blend that captures the essence of a fresh morning. Perfect for daily wear and quiet elegance.",
    price: 3800,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Pink Pepper, Citrus",
      heart: "Jasmine, Peony",
      base: "Sandalwood, Vanilla"
    },
    images: [
      "assets/products/ivory-bloom/main.jpg",
      "assets/products/ivory-bloom/angle.jpg",
      "assets/products/ivory-bloom/lifestyle.jpg",
      "assets/products/ivory-bloom/packaging.jpg"
    ]
  },
  {
    slug: "golden-oud",
    name: "Golden Oud",
    tagline: "Rich. Warm. Majestic.",
    description: "A majestic blend of warm spices and rich woods. Golden Oud offers a truly royal fragrance experience for special occasions.",
    price: 5200,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Saffron, Cardamom",
      heart: "Oud Wood, Leather",
      base: "Amber, Tonka Bean"
    },
    images: [
      "assets/products/golden-oud/main.jpg",
      "assets/products/golden-oud/angle.jpg",
      "assets/products/golden-oud/lifestyle.jpg",
      "assets/products/golden-oud/packaging.jpg"
    ]
  }
];

// EDIT WHATSAPP NUMBER HERE (used site-wide by js/main.js)
const WHATSAPP_NUMBER = "923281959312"; // country code + number, no + or spaces
