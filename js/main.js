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
  if (document.querySelector('.wa-float')) return;
  const a = document.createElement("a");
  a.className = "wa-float";
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.href = `https://wa.me/${typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923281959312"}`;
  a.innerHTML = WA_ICON;
  document.body.appendChild(a);
})();

function waLink(message){
  const num = typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : "923281959312";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
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
menuToggle?.addEventListener("click", () => mobileMenu?.classList.add("open"));
menuClose?.addEventListener("click", () => mobileMenu?.classList.remove("open"));
mobileMenu?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu?.classList.remove("open")));

function productImgOrPlaceholder(src, label){
  const resolved = (src && (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')))
    ? src
    : `${ROOT}${src || ''}`;
  return `<img src="${resolved}" alt="${label}" onerror="this.onerror=null; this.src='${ROOT}assets/products/haider/main.jpg';">`;
}

/* =====================================================
   PRODUCT DETAIL PAGE (used inside /products/<slug>/index.html)
===================================================== */
function renderProductDetail(slug){
  // Slug auto-detect agar pass na ho
  if (!slug) {
    const parts = window.location.pathname.split("/").filter(Boolean);
    slug = parts[parts.length - 1] === "index.html" ? parts[parts.length - 2] : parts[parts.length - 1];
  }

  const currentProducts = (typeof getXyaalProducts === "function") 
    ? getXyaalProducts() 
    : (window.PRODUCTS || (typeof PRODUCTS !== "undefined" ? PRODUCTS : []));

  const p = currentProducts.find(x => x.slug === slug || x.id === slug) || currentProducts[0];
  const root = document.getElementById("productDetail");
  if (!p || !root) return;

  document.title = `${p.name} | XYAAL 365`;

  const activePrice = p.salePrice || p.price;
  const cutPrice = p.originalPrice || (p.id === 'aura' ? 'PKR 4,299' : p.id === 'vibe' ? 'PKR 3,499' : 'PKR 3,999');
  const prodImg = (p.images && p.images[0]) || p.image || 'assets/products/haider/main.jpg';

  root.innerHTML = `
    <a class="back-link" href="${ROOT}collection.html">${BACK_ICON} Back to Collection</a>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="gallery-main" id="galleryMain">
          ${productImgOrPlaceholder(prodImg, p.name)}
        </div>
        <div class="gallery-thumbs" id="galleryThumbs">
          ${(p.images || [prodImg]).map((img,i) => `
            <button class="${i===0?'active':''}" data-index="${i}">
              ${productImgOrPlaceholder(img, p.name + ' ' + (i+1))}
            </button>`).join("")}
        </div>
      </div>
      <div class="pd-info">
        <span class="eyebrow">XYAAL 365</span>
        <h1>${p.name}</h1>
        <p class="tagline">${p.tagline || ''}</p>

        <div class="pd-price" style="display:flex; align-items:baseline; gap:12px; margin: 15px 0;">
          <span class="price" style="font-weight:800; color:#dfba73; font-size:1.45rem;">PKR ${activePrice.toLocaleString()}</span>
          <span class="old-price" style="text-decoration:line-through; color:#ff5252; opacity:0.85; font-size:1rem; font-weight:600;">${cutPrice}</span>
        </div>
        <span class="pd-badge" style="border:1px solid rgba(197,168,128,0.3); color:#c5a880; padding:3px 10px; border-radius:4px; font-size:12px;">In Stock · ${p.size || '50ml Eau de Parfum'}</span>

        <p class="pd-desc" style="margin:16px 0; color:#ccc; line-height:1.6;">${p.description || ''}</p>

        <div class="notes-table" style="background:rgba(255,255,255,0.03); border:1px solid rgba(197,168,128,0.15); border-radius:6px; padding:12px; margin-bottom:20px;">
          <div style="margin-bottom:6px;"><b style="color:#dfba73;">Top Notes:</b> <span style="color:#eee;">${p.notes && p.notes.top ? p.notes.top : '—'}</span></div>
          <div style="margin-bottom:6px;"><b style="color:#dfba73;">Heart Notes:</b> <span style="color:#eee;">${p.notes && p.notes.heart ? p.notes.heart : '—'}</span></div>
          <div><b style="color:#dfba73;">Base Notes:</b> <span style="color:#eee;">${p.notes && p.notes.base ? p.notes.base : '—'}</span></div>
        </div>

        <div class="qty-row" style="margin-bottom:20px;">
          <div class="qty-box" style="display:inline-flex; align-items:center; border:1px solid rgba(255,255,255,0.2); border-radius:4px;">
            <button id="qtyMinus" style="background:transparent; border:none; color:#fff; padding:6px 14px; cursor:pointer; font-size:16px;">&minus;</button>
            <span id="qtyValue" style="padding:0 10px; font-weight:bold;">1</span>
            <button id="qtyPlus" style="background:transparent; border:none; color:#fff; padding:6px 14px; cursor:pointer; font-size:16px;">&plus;</button>
          </div>
        </div>

        <div class="pd-cta-row" style="display:flex; gap:10px;">
          <button type="button" class="btn btn-add-bag" id="pdAddToBagBtn" style="padding:14px 24px; font-size:.88rem; flex:1; background:#dfba73; color:#000; font-weight:bold; border:none; border-radius:4px; cursor:pointer;">
            ${BAG_ICON} Add to Bag
          </button>
          <a class="btn btn-wa" style="flex:1; justify-content:center; padding:14px 20px; font-size:.88rem; background:#1e3a29; border:1px solid #25d366; color:#fff; text-decoration:none; display:flex; align-items:center; border-radius:4px; font-weight:bold;" target="_blank" rel="noopener" id="waOrderBtn"
             href="${waLink(`Hi, I am interested in ordering ${p.name} from XYAAL 365.`)}">
            ${WA_BTN_ICON} Order on WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Gallery click handlers
  const mainEl = document.getElementById("galleryMain");
  document.querySelectorAll("#galleryThumbs button").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = +btn.dataset.index;
      mainEl.innerHTML = productImgOrPlaceholder(p.images[i], p.name);
      document.querySelectorAll("#galleryThumbs button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // Quantity Counter
  let qty = 1;
  const qtyValue = document.getElementById("qtyValue");
  const waBtn = document.getElementById("waOrderBtn");
  function updateWaLink(){
    const msg = qty > 1
      ? `Hi, I am interested in ordering ${qty} x ${p.name} (PKR ${(activePrice * qty).toLocaleString()}) from XYAAL 365.`
      : `Hi, I am interested in ordering ${p.name} (PKR ${activePrice.toLocaleString()}) from XYAAL 365.`;
    if (waBtn) waBtn.href = waLink(msg);
  }
  document.getElementById("qtyMinus")?.addEventListener("click", () => {
    qty = Math.max(1, qty - 1); qtyValue.textContent = qty; updateWaLink();
  });
  document.getElementById("qtyPlus")?.addEventListener("click", () => {
    qty += 1; qtyValue.textContent = qty; updateWaLink();
  });

  // Cart binding
  const addToBagBtn = document.getElementById("pdAddToBagBtn");
  if (addToBagBtn) {
    addToBagBtn.addEventListener("click", () => {
      addToBagBtn.innerHTML = `Added ✓`;
      setTimeout(() => {
        addToBagBtn.innerHTML = `${BAG_ICON} Add to Bag`;
      }, 1500);
      if (window.XyaalCart) {
        window.XyaalCart.add({
          id: p.slug || p.id,
          name: p.name,
          price: activePrice,
          image: prodImg
        }, qty);
      }
    });
  }
}

// Auto run detail page if element exists
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("productDetail")) {
    renderProductDetail();
  }
});
