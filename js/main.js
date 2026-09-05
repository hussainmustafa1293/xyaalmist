/* =====================================================
   XYAAL MIST — Shared site behavior
   ROOT is defined inline in each page (e.g. "./" or "../../")
   so the same file works at any folder depth.
===================================================== */

const ROOT = window.ROOT || "./";

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
          Order on WhatsApp
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
            Order on WhatsApp
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
