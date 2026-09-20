/* =====================================================
   XYAAL 365 — PRODUCT DATA & LOCALSTORAGE ENGINE
   ---------------------------------------------------
   Manages the fragrance catalog with client-side localStorage
   persistence. Used across the storefront and Admin Dashboard.
===================================================== */

// Storage key for products persistence
const STORAGE_KEY = 'xyaal_products';

// Default XYAAL 365 Signature Fragrances (Haider, Aabnoos, Crush)
const DEFAULT_PRODUCTS = [
  {
    id: "haider",
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
    id: "product-2",
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
    id: "product-3",
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

// Classic Haute Trio Alternative Preset (Velvet Noir, Saffron Mist, Amber Oud)
const CLASSIC_TRIO = [
  {
    id: "velvet-noir",
    slug: "haider",
    name: "Velvet Noir",
    tagline: "Dark, smoky and seductive",
    description: "Velvet Noir wraps the senses in an opulent veil of smoked oud, velvety dark iris, and dark roasted vanilla. Intense and unforgettable.",
    price: 4500,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Cardamom, Italian Bergamot",
      heart: "Dark Rose, Smoky Incense",
      base: "Cambodian Oud, Bourbon Vanilla, Amber"
    },
    images: [
      "assets/products/haider/main.jpg",
      "assets/products/haider/angle.jpg",
      "assets/products/haider/lifestyle.jpg",
      "assets/products/haider/packaging.jpg"
    ]
  },
  {
    id: "saffron-mist",
    slug: "product-2",
    name: "Saffron Mist",
    tagline: "Radiant, spicy and ethereal",
    description: "An airy yet commanding mist infused with golden Kashmiri saffron, crystalline jasmine petals, and dry amberwood.",
    price: 4200,
    salePrice: 3800,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Kashmiri Saffron, Sweet Thyme",
      heart: "Star Jasmine, Crisp Cedar",
      base: "Ambergris, Clean Musk, Fir Resin"
    },
    images: [
      "assets/products/product-2/main.jpg",
      "assets/products/product-2/angle.jpg",
      "assets/products/product-2/lifestyle.jpg",
      "assets/products/product-2/packaging.jpg"
    ]
  },
  {
    id: "amber-oud",
    slug: "product-3",
    name: "Amber Oud",
    tagline: "Deep, balsamic and regal",
    description: "Amber Oud balances warm honeyed amber against rich aged agarwood and spiced tonka bean for a decadent, lingering sillage.",
    price: 4800,
    salePrice: null,
    size: "50ml Eau de Parfum",
    available: true,
    notes: {
      top: "Pink Pepper, Bitter Almond",
      heart: "Regal Amber, Bulgarian Rose",
      base: "Aged Oud, Tonka Bean, Sandalwood"
    },
    images: [
      "assets/products/product-3/main.jpg",
      "assets/products/product-3/angle.jpg",
      "assets/products/product-3/packaging.jpg",
      "assets/products/product-3/lifestyle.jpg"
    ]
  }
];

/**
 * Normalizes product object to ensure all required properties are intact.
 */
function normalizeProduct(p, index) {
  const id = p.id || p.slug || ('prod_' + (index + 1));
  const slug = p.slug || id;
  const name = p.name || 'Unnamed Fragrance';
  const tagline = p.tagline || '';
  const description = p.description || '';
  const price = Number(p.price) || 0;
  const salePrice = (p.salePrice !== null && p.salePrice !== undefined && p.salePrice !== '') ? Number(p.salePrice) : null;
  const size = p.size || '50ml Eau de Parfum';
  const available = (p.available === undefined) ? true : Boolean(p.available);
  
  // Format notes object
  let notes = p.notes;
  if (!notes || typeof notes !== 'object') {
    notes = {
      top: p.topNotes || 'Bergamot, Citrus',
      heart: p.heartNotes || 'Floral, Spices',
      base: p.baseNotes || 'Amber, Musk'
    };
  }

  // Format images array
  let activeImage = p.image;
  let images = p.images;
  if (!Array.isArray(images) || images.length === 0) {
    if (activeImage) {
      images = [activeImage];
    } else {
      images = ['assets/logo/xyaal-365-transparent.png'];
    }
  } else if (activeImage && images[0] !== activeImage) {
    images[0] = activeImage;
  } else if (!activeImage && images[0]) {
    activeImage = images[0];
  }

  return {
    id,
    slug,
    name,
    tagline,
    description,
    price,
    salePrice,
    size,
    available,
    notes,
    images,
    image: activeImage || images[0]
  };
}

/**
 * Retrieves products from localStorage or seeds with default list if empty.
 */
function getXyaalProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with DEFAULT_PRODUCTS
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS.map(normalizeProduct);
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS.map(normalizeProduct);
    }
    return parsed.map(normalizeProduct);
  } catch (err) {
    console.warn('Error reading xyaal_products from localStorage:', err);
    return DEFAULT_PRODUCTS.map(normalizeProduct);
  }
}

/**
 * Saves products list to localStorage and refreshes PRODUCTS global.
 */
function saveXyaalProducts(productsList) {
  try {
    const cleanList = (Array.isArray(productsList) ? productsList : []).map(normalizeProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanList));
    if (typeof window !== 'undefined') {
      window.PRODUCTS = cleanList;
    }
    return cleanList;
  } catch (err) {
    console.error('Failed to save xyaal_products:', err);
    return [];
  }
}

/**
 * Resets products to a chosen default preset.
 * @param {'signature'|'classic'} preset
 */
function resetXyaalProducts(preset) {
  const chosen = (preset === 'classic') ? CLASSIC_TRIO : DEFAULT_PRODUCTS;
  return saveXyaalProducts(chosen);
}

// Global PRODUCTS reference initialized from localStorage
var PRODUCTS = getXyaalProducts();

// Export helpers to window
if (typeof window !== 'undefined') {
  window.PRODUCTS = PRODUCTS;
  window.getXyaalProducts = getXyaalProducts;
  window.saveXyaalProducts = saveXyaalProducts;
  window.resetXyaalProducts = resetXyaalProducts;
  window.DEFAULT_PRODUCTS = DEFAULT_PRODUCTS;
  window.CLASSIC_TRIO = CLASSIC_TRIO;
}

// Site-wide WhatsApp contact
const WHATSAPP_NUMBER = "923281959312";
