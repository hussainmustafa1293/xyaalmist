/* =====================================================
   XYAAL MIST — Shared site behavior
   ROOT is defined inline in each page (e.g. "./" or "../../")
   so the same file works at any folder depth.
===================================================== */

const ROOT = window.ROOT || "./";

/* ---------- Icons ---------- */
const WA_ICON = `<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.09-2.34a12.44 12.44 0 0 0 5.911 1.5h.005c6.893 0 12.5-5.607 12.5-12.5S22.894 3 16.001 3Zm0 22.7h-.004a10.36 10.36 0 0 1-5.28-1.45l-.379-.225-3.943 1.3 1.32-3.84-.247-.395a10.34 10.34 0 0 1-1.588-5.59c0-5.73 4.665-10.4 10.397-10.4 2.777 0 5.386 1.082 7.35 3.048A10.33 10.33 0 0 1 26.62 15.5c0 5.73-4.665 10.4-10.62 10.4Zm5.706-7.79c-.312-.156-1.846-.911-2.132-1.015-.286-.104-.494-.156-.702.156-.208.312-.806 1.015-.988 1.223-.182.208-.364.234-.676.078-.312-.156-1.317-.485-2.508-1.546-.927-.826-1.553-1.847-1.735-2.159-.182-.312-.02-.48.137-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.702-1.69-.962-2.314-.253-.608-.51-.526-.702-.536l-.598-.01c-.208 0-.546.078-.832.39-.286.312-1.09 1.066-1.09 2.6 0 1.534 1.116 3.016 1.272 3.224.156.208 2.196 3.353 5.32 4.7.743.321 1.323.513 1.775.657.746.237 1.424.204 1.96.124.598-.089 1.846-.755 2.106-1.484.26-.729.26-1.354.182-1.484-.078-.13-.286-.208-.598-.364Z"/></svg>`;
const WA_BTN_ICON = `<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:14px;height:14px;min-width:14px;max-width:14px;min-height:14px;max-height:14px;flex-shrink:0;vertical-align:-2px;margin-right:5px;"><path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.09-2.34a12.44 12.44 0 0 0 5.911 1.5h.005c6.893 0 12.5-5.607 12.5-12.5S22.894 3 16.001 3Zm0 22.7h-.004a10.36 10.36 0 0 1-5.28-1.45l-.379-.225-3.943 1.3 1.32-3.84-.247-.395a10.34 10.34 0 0 1-1.588-5.59c0-5.73 4.665-10.4 10.397-10.4 2.777 0 5.386 1.082 7.35 3.048A10.33 10.33 0 0 1 26.62 15.5c0 5.73-4.665 10.4-10.62 10.4Zm5.706-7.79c-.312-.156-1.846-.911-2.132-1.015-.286-.104-.494-.156-.702.156-.208.312-.806 1.015-.988 1.223-.182.208-.364.234-.676.078-.312-.156-1.317-.485-2.508-1.546-.927-.826-1.553-1.847-1.735-2.159-.182-.312-.02-.48.137-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.702-1.69-.962-2.314-.253-.608-.51-.526-.702-.536l-.598-.01c-.208 0-.546.078-.832.39-.286.312-1.09 1.066-1.09 2.6 0 1.534 1.116 3.016 1.272 3.224.156.208 2.196 3.353 5.32 4.7.743.321 1.323.513 1.775.657.746.237 1.424.204 1.96.124.598-.089 1.846-.755 2.106-1.484.26-.729.26-1.354.182-1.484-.078-.13-.286-.208-.598-.364Z"/></svg>`;
const BACK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6"/></svg>`;
const BAG_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;

/* ---------- Floating WhatsApp button ---------- */
(function injectFloatingWhatsApp(){
  const num = typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923281959312";
  const a = document.createElement("a");
  a.className = "wa-float";
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.href = `https://wa.me/${num}`;
  a.innerHTML = WA_ICON;
  document.body.appendChild(a);
})();

/* ---------- WhatsApp link builder ---------- */
function waLink(message){
  const num = typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923281959312";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
function waOrderMessage(productName){
  return `Hi, I am interested in ordering ${productName} from XYAAL 365.`;
}

/* ---------- Navbar scroll state ---------- */
const header = document.getElementById("siteHeader");
if (header){
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive:true });
  onScroll();
}

/* ---------- Mobile menu ---------- */
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const menuClose = document.getElementById("menuClose");
menuToggle?.addEventListener("click", () => mobileMenu.classList.add("open"));
menuClose?.addEventListener("click", () => mobileMenu.classList.remove("open"));
mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

/* ---------- Story Image Handler ---------- */
function applyStoryImage(){
  const storyImgs = document.querySelectorAll('.editorial-img, #storySectionImg');
  storyImgs.forEach(img => {
    img.src = `${ROOT}assets/images/story.png`;
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyStoryImage);
} else {
  applyStoryImage();
}

function productImgOrPlaceholder(src, label){
  const resolved = (src && (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')))
    ? src
    : `${ROOT}${src || ''}`;
  return `<img src="${resolved}" alt="${label}" onerror="this.onerror=null; this.src='${ROOT}assets/products/haider/main.jpg';">`;
}

/* Specific Cut / Discounted Pricing Rules */
function getPriceDetails(p) {
  let selling = 2999;
  let original = "PKR 3,499";

  const key = (p.id || p.slug || p.name || "").toLowerCase();

  if (key.includes("aura")) {
    selling = 3699;
    original = "PKR 4,299";
  } else if (key.includes("vibe")) {
    selling = 2999;
    original = "PKR 3,499";
  } else if (key.includes("crush")) {
    selling = 3499;
    original = "PKR 3,999";
  } else {
    selling = p.salePrice || p.price || 2999;
    original = p.originalPrice || `PKR ${(selling + 500).toLocaleString()}`;
  }

  return { selling, original };
}

/* =====================================================
   COLLECTION GRID (used on index.html + collection.html)
===================================================== */
function renderProductGrid(containerId, limit){
  const el = document.getElementById(containerId);
  if (!el) return;

  const currentProducts = (typeof getXyaalProducts === "function") 
    ? getXyaalProducts() 
    : (window.PRODUCTS || (typeof PRODUCTS !== "undefined" ? PRODUCTS : []));

  const list = limit ? currentProducts.slice(0, limit) : currentProducts;

  if (!list || !list.length) {
    el.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px 20px; color:var(--ivory-dim);">Loading fragrances...</div>`;
    return;
  }

  el.innerHTML = list.map(p => {
    const prices = getPriceDetails(p);
    const activePrice = prices.selling;
    const isAvailable = (p.available !== false);
    const activeImg = p.image || (p.images && p.images[0]) || "assets/products/haider/main.jpg";
    const detailUrl = `${ROOT}products/${p.slug || p.id}/`;

    return `
    <div class="product-card" style="opacity:1 !important; visibility:visible !important; transform:none !important;">
      <a href="${detailUrl}" class="product-thumb">
        ${productImgOrPlaceholder(activeImg, p.name)}
        ${!isAvailable ? '<span class="badge-stock badge-sold-out">Sold Out</span>' : ''}
      </a>
      <h3><a href="${detailUrl}">${p.name}</a></h3>
      <p class="tagline">${p.tagline || ''}</p>

      <!-- Complete Olfactory Notes Breakdown -->
      <div class="card-notes">
        <div class="note-item">
          <span class="note-tag">Top:</span>
          <span class="note-text">${p.notes && p.notes.top ? p.notes.top : '—'}</span>
        </div>
        <div class="note-item">
          <span class="note-tag">Heart:</span>
          <span class="note-text">${p.notes && p.notes.heart ? p.notes.heart : '—'}</span>
        </div>
        <div class="note-item">
          <span class="note-tag">Base:</span>
          <span class="note-text">${p.notes && p.notes.base ? p.notes.base : '—'}</span>
        </div>
      </div>

      <!-- Visible Discounted Pricing -->
      <div class="price-row" style="display:flex; align-items:center; gap:8px; margin: 12px 0 14px;">
        <span class="price" style="font-weight:700; color:var(--gold, #dfba73); font-size:1.15rem;">PKR ${activePrice.toLocaleString()}</span>
        <span class="old-price" style="text-decoration:line-through; color:#ff5252; opacity:0.85; font-size:0.9rem; font-weight:600;">${prices.original}</span>
      </div>

      <div class="card-actions">
        ${isAvailable ? `
          <button type="button" class="btn btn-add-bag" data-action="add-to-bag" data-id="${p.id \vert{}\vert{} p.slug}" data-name="${p.name}" data-price="${activePrice}" data-image="${activeImg}">
            ${BAG_ICON} Add to Bag
          </button>
        ` : `
          <button type="button" class="btn btn-add-bag" disabled style="opacity:0.5; cursor:not-allowed; border-color:rgba(255,255,255,0.2); background:rgba(255,255,255,0.05); color:var(--ivory-dim);">
            Sold Out
          </button>
        `}
        <div class="card-actions-row">
          <a class="btn btn-ghost" href="${detailUrl}">View Details</a>
          <a class="btn btn-wa btn-wa-compact" target="_blank" rel="noopener" href="${waLink(isAvailable ? `Hi, I want to order ${p.name} for PKR${activePrice.toLocaleString()}` : `Hi, I would like to inquire when ${p.name} will be back in stock at XYAAL 365.`)}" title="Order on WhatsApp">
            ${WA_BTN_ICON}<span>${isAvailable ? 'Order' : 'Inquire'}</span>
          </a>
        </div>
      </div>
    </div>
  `}).join("");
}

/* =====================================================
   PRODUCT DETAIL PAGE (used inside /products/<slug>/index.html)
===================================================== */
function renderProductDetail(slug){
  const currentProducts = (typeof getXyaalProducts === "function") 
    ? getXyaalProducts() 
    : (window.PRODUCTS || (typeof PRODUCTS !== "undefined" ? PRODUCTS : []));

  const p = currentProducts.find(x => x.slug === slug || x.id === slug);
  const root = document.getElementById("productDetail");
  if (!p || !root) return;

  document.title = `${p.name} | XYAAL 365`;
  const prices = getPriceDetails(p);
  const activePrice = prices.selling;

  root.innerHTML = `
    <a class="back-link" href="${ROOT}collection.html">${BACK_ICON} Back to Collection</a>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="gallery-main" id="galleryMain">
          ${productImgOrPlaceholder(p.images ? p.images[0] : p.image, p.name)}
        </div>
        <div class="gallery-thumbs" id="galleryThumbs">
          ${(p.images || [p.image]).map((img,i) => `
            <button class="${i===0?'active':''}" data-index="${i}">
              ${productImgOrPlaceholder(img, p.name + ' ' + (i+1))}
            </button>`).join("")}
        </div>
      </div>
      <div class="pd-info">
        <span class="eyebrow">XYAAL 365</span>
        <h1>${p.name}</h1>
        <p class="tagline">${p.tagline}</p>

        <div class="pd-price" style="display:flex; align-items:center; gap:12px; margin: 15px 0;">
          <span class="price" style="font-weight:700; color:var(--gold, #dfba73); font-size:1.4rem;">PKR ${activePrice.toLocaleString()}</span>
          <span class="old-price" style="text-decoration:line-through; color:#ff5252; opacity:0.85; font-size:1rem; font-weight:600;">${prices.original}</span>
        </div>
        <span class="pd-badge ${p.available ? '' : 'is-sold-out'}" style="${p.available ? '' : 'border-color:rgba(239,68,68,0.3); color:#fca5a5;'}">${p.available ? 'In Stock' : 'Currently Unavailable'} · ${p.size || '50ml Eau de Parfum'}</span>

        <p class="pd-desc">${p.description}</p>

        <div class="notes-table">
          <div><b>Top Notes</b><span>${p.notes && p.notes.top ? p.notes.top : '—'}</span></div>
          <div><b>Heart Notes</b><span>${p.notes && p.notes.heart ? p.notes.heart : '—'}</span></div>
          <div><b>Base Notes</b><span>${p.notes && p.notes.base ? p.notes.base : '—'}</span></div>
        </div>

        <div class="qty-row">
          <div class="qty-box">
            <button id="qtyMinus" aria-label="Decrease quantity">&minus;</button>
            <span id="qtyValue">1</span>
            <button id="qtyPlus" aria-label="Increase quantity">&plus;</button>
          </div>
        </div>

        <div class="pd-cta-row">
          ${p.available ? `
            <button type="button" class="btn btn-add-bag" id="pdAddToBagBtn" style="padding:14px 24px; font-size:.88rem; flex:1;">
              ${BAG_ICON} Add to Bag
            </button>
            <a class="btn btn-wa" style="flex:1; justify-content:center; padding:14px 20px; font-size:.88rem;" target="_blank" rel="noopener" id="waOrderBtn"
               href="${waLink(`Hi, I am interested in ordering ${p.name} from XYAAL 365.`)}">
              ${WA_BTN_ICON} Order on WhatsApp
            </a>
          ` : `
            <button type="button" class="btn btn-add-bag" disabled style="padding:14px 24px; font-size:.88rem; flex:1; opacity:0.5; cursor:not-allowed;">
              Sold Out
            </button>
            <a class="btn btn-wa" style="flex:1; justify-content:center; padding:14px 20px; font-size:.88rem;" target="_blank" rel="noopener" id="waOrderBtn"
               href="${waLink(`Hi, I would like to inquire when ${p.name} will be back in stock at XYAAL 365.`)}">
              ${WA_BTN_ICON} Inquire Availability
            </a>
          `}
        </div>
      </div>
    </div>
  `;

  // Gallery interaction
  const mainEl = document.getElementById("galleryMain");
  document.querySelectorAll("#galleryThumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = +btn.dataset.index;
      mainEl.innerHTML = productImgOrPlaceholder(p.images[i], p.name);
      document.querySelectorAll("#galleryThumbs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Quantity selector
  let qty = 1;
  const qtyValue = document.getElementById("qtyValue");
  const waBtn = document.getElementById("waOrderBtn");
  function updateWaLink(){
    const msg = qty > 1
      ? `Hi, I am interested in ordering ${qty} x ${p.name} from XYAAL 365.`
      : `Hi, I am interested in ordering ${p.name} from XYAAL 365.`;
    if (waBtn) waBtn.href = waLink(msg);
  }
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    qty = Math.max(1, qty - 1); qtyValue.textContent = qty; updateWaLink();
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    qty += 1; qtyValue.textContent = qty; updateWaLink();
  });

  // Add to Bag
  const addToBagBtn = document.getElementById("pdAddToBagBtn");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      if (!addToBagBtn.classList.contains('is-added')) {
        const origContent = addToBagBtn.innerHTML;
        addToBagBtn.classList.add('is-added');
        addToBagBtn.innerHTML = `Added ✓`;
        setTimeout(() => {
          addToBagBtn.classList.remove('is-added');
          addToBagBtn.innerHTML = origContent;
        }, 1400);
      }
      if (window.XyaalCart) {
        window.XyaalCart.add({
          id: p.slug || p.id,
          name: p.name,
          price: activePrice,
          image: p.images ? p.images[0] : p.image
        }, qty);
      }
    });
  }
}

/* Auto-run render grid if container is ready on page load */
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("collectionGrid")) {
    renderProductGrid("collectionGrid");
  }
});

/* Promo Video Mute toggle */
(function initPromoVideoControl() {
  function setup() {
    const vid = document.getElementById('heroPromoVideo');
    const btn = document.getElementById('promoMuteBtn');
    const iconMuted = document.getElementById('soundMutedIcon');
    const iconActive = document.getElementById('soundActiveIcon');

    if (!vid || !btn) return;

    btn.addEventListener('click', () => {
      vid.muted = !vid.muted;
      if (vid.muted) {
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconActive) iconActive.style.display = 'none';
        btn.title = "Sound Muted";
      } else {
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconActive) iconActive.style.display = 'block';
        btn.title = "Sound Active";
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
