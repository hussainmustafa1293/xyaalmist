/* =====================================================
   XYAAL MIST — Shared site behavior
   ROOT is defined inline in each page (e.g. "./" or "../../")
   so the same file works at any folder depth.
===================================================== */

const ROOT = window.ROOT || "./";

/* ---------- Icons ---------- */
const WA_ICON = `<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.09-2.34a12.44 12.44 0 0 0 5.911 1.5h.005c6.893 0 12.5-5.607 12.5-12.5S22.894 3 16.001 3Zm0 22.7h-.004a10.36 10.36 0 0 1-5.28-1.45l-.379-.225-3.943 1.3 1.32-3.84-.247-.395a10.34 10.34 0 0 1-1.588-5.59c0-5.73 4.665-10.4 10.397-10.4 2.777 0 5.386 1.082 7.35 3.048A10.33 10.33 0 0 1 26.62 15.5c0 5.73-4.665 10.4-10.62 10.4Zm5.706-7.79c-.312-.156-1.846-.911-2.132-1.015-.286-.104-.494-.156-.702.156-.208.312-.806 1.015-.988 1.223-.182.208-.364.234-.676.078-.312-.156-1.317-.485-2.508-1.546-.927-.826-1.553-1.847-1.735-2.159-.182-.312-.02-.48.137-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.702-1.69-.962-2.314-.253-.608-.51-.526-.702-.536l-.598-.01c-.208 0-.546.078-.832.39-.286.312-1.09 1.066-1.09 2.6 0 1.534 1.116 3.016 1.272 3.224.156.208 2.196 3.353 5.32 4.7.743.321 1.323.513 1.775.657.746.237 1.424.204 1.96.124.598-.089 1.846-.755 2.106-1.484.26-.729.26-1.354.182-1.484-.078-.13-.286-.208-.598-.364Z"/></svg>`;
const BACK_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg"><path d="M15 18l-6-6 6-6"/></svg>`;

/* ---------- Floating WhatsApp button (every page) ---------- */
(function injectFloatingWhatsApp(){
  const a = document.createElement("a");
  a.className = "wa-float";
  a.target = "_blank";
  a.rel = "noopener";
  a.setAttribute("aria-label", "Chat on WhatsApp");
  a.href = `https://wa.me/${typeof WHATSAPP_NUMBER !== "undefined" ? WHATSAPP_NUMBER : ""}`;
  a.innerHTML = WA_ICON;
  document.body.appendChild(a);
})();

/* ---------- WhatsApp link builder ---------- */
function waLink(message){
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
function waOrderMessage(productName){
  return `Hi, I am interested in ordering ${productName} from XYAAL MIST.`;
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

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
  }, { threshold:.15 });
  revealEls.forEach(el => io.observe(el));
}

/* ---------- Highlight active nav link ---------- */
(function markActiveNav(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-menu a").forEach(a => {
    const href = a.getAttribute("href");
    if (href && (href === path || (path === "" && href === "index.html"))) {
      a.classList.add("active");
    }
  });
})();

/* ---------- Placeholder image block (used until real photos are added) ---------- */
function placeholderBlock(label){
  return `<div class="ph-label">${label}</div>`;
}
function productImgOrPlaceholder(src, label){
  // Returns an <img> that falls back to a text placeholder if the file isn't there yet.
  return `<img src="${ROOT}${src}" alt="${label}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph-label',innerHTML:'${label}<br><small>Replace with product photo</small>'}))">`;
}

/* =====================================================
   COLLECTION GRID (used on index.html + collection.html)
===================================================== */
function renderProductGrid(containerId, limit){
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;
  el.innerHTML = list.map(p => `
    <div class="product-card reveal">
      <a href="${ROOT}products/${p.slug}/" class="product-thumb">
        ${productImgOrPlaceholder(p.images[0], p.name)}
      </a>
      <h3><a href="${ROOT}products/${p.slug}/">${p.name}</a></h3>
      <p class="tagline">${p.tagline}</p>
      <div class="notes-row">
        <span>${p.notes.top.replace(/^\[|\]$/g,'')}</span>
      </div>
      <div class="price-row">
        ${p.salePrice ? `<span class="price">PKR ${p.salePrice.toLocaleString()}</span><span class="old-price">PKR ${p.price.toLocaleString()}</span>`
          : p.price ? `<span class="price">PKR ${p.price.toLocaleString()}</span>`
          : `<span class="price">[Price]</span>`}
      </div>
      <div class="card-actions">
        <a class="btn btn-ghost" href="${ROOT}products/${p.slug}/">View Details</a>
        <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(waOrderMessage(p.name))}">
          ${WA_ICON} Order on WhatsApp
        </a>
      </div>
    </div>
  `).join("");
  document.querySelectorAll(".reveal").forEach(elm => {
    // re-observe newly injected cards
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold:.15 });
    io.observe(elm);
  });
}

/* =====================================================
   PRODUCT DETAIL PAGE (used inside /products/<slug>/index.html)
===================================================== */
function renderProductDetail(slug){
  const p = PRODUCTS.find(x => x.slug === slug);
  const root = document.getElementById("productDetail");
  if (!p || !root) return;

  document.title = `${p.name} | XYAAL MIST`;

  root.innerHTML = `
    <a class="back-link" href="${ROOT}collection.html">${BACK_ICON} Back to Collection</a>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="gallery-main" id="galleryMain">
          ${productImgOrPlaceholder(p.images[0], p.name)}
        </div>
        <div class="gallery-thumbs" id="galleryThumbs">
          ${p.images.map((img,i) => `
            <button class="${i===0?'active':''}" data-index="${i}">
              ${productImgOrPlaceholder(img, p.name + ' ' + (i+1))}
            </button>`).join("")}
        </div>
      </div>
      <div class="pd-info">
        <span class="eyebrow">XYAAL MIST</span>
        <h1>${p.name}</h1>
        <p class="tagline">${p.tagline}</p>

        <div class="pd-price">
          ${p.salePrice ? `<span class="price">PKR ${p.salePrice.toLocaleString()}</span><span class="old-price">PKR ${p.price.toLocaleString()}</span>`
            : p.price ? `<span class="price">PKR ${p.price.toLocaleString()}</span>`
            : `<span class="price">[Price]</span>`}
        </div>
        <span class="pd-badge">${p.available ? 'In Stock' : 'Currently Unavailable'} · ${p.size}</span>

        <p class="pd-desc">${p.description}</p>

        <div class="notes-table">
          <div><b>Top Notes</b><span>${p.notes.top}</span></div>
          <div><b>Heart Notes</b><span>${p.notes.heart}</span></div>
          <div><b>Base Notes</b><span>${p.notes.base}</span></div>
        </div>

        <div class="qty-row">
          <div class="qty-box">
            <button id="qtyMinus" aria-label="Decrease quantity">&minus;</button>
            <span id="qtyValue">1</span>
            <button id="qtyPlus" aria-label="Increase quantity">&plus;</button>
          </div>
        </div>

        <div class="pd-cta-row">
          <a class="btn btn-wa btn-block" target="_blank" rel="noopener" id="waOrderBtn"
             href="${waLink(waOrderMessage(p.name))}">
            ${WA_ICON} Order on WhatsApp
          </a>
        </div>

        <div class="reviews-empty">
          <span>No reviews yet.</span>
          <a class="btn btn-ghost" href="${ROOT}contact.html">Write a Review</a>
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

  // Quantity selector (reflected in the WhatsApp message)
  let qty = 1;
  const qtyValue = document.getElementById("qtyValue");
  const waBtn = document.getElementById("waOrderBtn");
  function updateWaLink(){
    const msg = qty > 1
      ? `Hi, I am interested in ordering ${qty} x ${p.name} from XYAAL MIST.`
      : waOrderMessage(p.name);
    waBtn.href = waLink(msg);
  }
  document.getElementById("qtyMinus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1); qtyValue.textContent = qty; updateWaLink();
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    qty += 1; qtyValue.textContent = qty; updateWaLink();
  });
}

/* ---------- Conversion tracking hooks (dormant until GA4 / Meta Pixel is added) ---------- */
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="wa.me"]');
  if (!a) return;
  if (typeof gtag === "function") gtag("event", "whatsapp_order_click", { event_category:"conversion" });
  if (typeof fbq === "function") fbq("track", "Contact", { content_name:"XYAAL MIST WhatsApp order" });
});
