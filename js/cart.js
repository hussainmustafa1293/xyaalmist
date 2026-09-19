/* =====================================================
   XYAAL MIST — Shopping Cart Drawer & WhatsApp Checkout
   Handles cart state, localStorage persistence, UI drawer,
   and dynamic formatted WhatsApp order messages.
===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'xyaal_cart_v1';
  const WA_DEFAULT = '923281959312';

  function getWaNumber() {
    return (typeof WHATSAPP_NUMBER !== 'undefined' && WHATSAPP_NUMBER) ? WHATSAPP_NUMBER : WA_DEFAULT;
  }

  function getRoot() {
    return window.ROOT || './';
  }

  // Cart state
  let cart = [];

  function loadCart() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      cart = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(cart)) cart = [];
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e);
      cart = [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }

  function getCartSubtotal() {
    return cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 1), 0);
  }

  function getCartItemCount() {
    return cart.reduce((count, item) => count + (Number(item.qty) || 1), 0);
  }

  function formatPKR(num) {
    return 'PKR ' + (Number(num) || 0).toLocaleString();
  }

  // Inject Cart Drawer and Floating Bag Icon
  function injectCartUI() {
    if (document.getElementById('cartDrawer')) return;

    // Floating Bag Button
    const floatBtn = document.createElement('button');
    floatBtn.id = 'cartFloatBtn';
    floatBtn.className = 'cart-float';
    floatBtn.setAttribute('aria-label', 'Open shopping bag');
    floatBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span class="cart-badge" id="cartFloatBadge">0</span>
    `;
    document.body.appendChild(floatBtn);

    // Cart Drawer Overlay & Container
    const drawerWrapper = document.createElement('div');
    drawerWrapper.id = 'cartDrawerWrapper';
    drawerWrapper.className = 'cart-drawer-wrapper';
    drawerWrapper.innerHTML = `
      <div class="cart-backdrop" id="cartBackdrop"></div>
      <aside class="cart-drawer" id="cartDrawer" aria-label="Shopping Bag">
        <div class="cart-header">
          <div class="cart-title-row">
            <svg class="cart-title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <h3>Your Bag (<span id="cartCountTitle">0</span>)</h3>
          </div>
          <button class="cart-close-btn" id="cartCloseBtn" aria-label="Close bag">&times;</button>
        </div>

        <div class="cart-body" id="cartBody">
          <!-- Dynamically populated -->
        </div>

        <div class="cart-footer" id="cartFooter">
          <div class="cart-subtotal-row">
            <span class="subtotal-label">Subtotal</span>
            <span class="subtotal-value" id="cartSubtotal">PKR 0</span>
          </div>
          <p class="cart-shipping-note">Free standard delivery across Pakistan</p>

          <!-- Customer Checkout Info Form -->
          <div class="cart-checkout-form" id="cartCheckoutForm">
            <div class="form-heading">Delivery Details</div>
            <div class="form-group">
              <input type="text" id="custName" class="cart-input" placeholder="Full Name *" autocomplete="name" required />
            </div>
            <div class="form-group">
              <input type="text" id="custCity" class="cart-input" placeholder="City (e.g. Lahore, Karachi, Islamabad) *" autocomplete="address-level2" required />
            </div>
            <div class="form-group">
              <textarea id="custAddress" class="cart-input cart-textarea" rows="2" placeholder="Complete Delivery Address *" autocomplete="street-address" required></textarea>
            </div>
            <div id="cartFormError" class="cart-form-error" style="display:none;"></div>
            <button type="button" class="btn btn-wa btn-block checkout-btn" id="btnConfirmWhatsApp">
              <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style="width:18px;height:18px;margin-right:8px;vertical-align:-3px;"><path d="M16.001 3C9.107 3 3.5 8.607 3.5 15.5c0 2.42.687 4.68 1.878 6.6L3 29l7.09-2.34a12.44 12.44 0 0 0 5.911 1.5h.005c6.893 0 12.5-5.607 12.5-12.5S22.894 3 16.001 3Zm0 22.7h-.004a10.36 10.36 0 0 1-5.28-1.45l-.379-.225-3.943 1.3 1.32-3.84-.247-.395a10.34 10.34 0 0 1-1.588-5.59c0-5.73 4.665-10.4 10.397-10.4 2.777 0 5.386 1.082 7.35 3.048A10.33 10.33 0 0 1 26.62 15.5c0 5.73-4.665 10.4-10.62 10.4Zm5.706-7.79c-.312-.156-1.846-.911-2.132-1.015-.286-.104-.494-.156-.702.156-.208.312-.806 1.015-.988 1.223-.182.208-.364.234-.676.078-.312-.156-1.317-.485-2.508-1.546-.927-.826-1.553-1.847-1.735-2.159-.182-.312-.02-.48.137-.636.14-.14.312-.364.468-.546.156-.182.208-.312.312-.52.104-.208.052-.39-.026-.546-.078-.156-.702-1.69-.962-2.314-.253-.608-.51-.526-.702-.536l-.598-.01c-.208 0-.546.078-.832.39-.286.312-1.09 1.066-1.09 2.6 0 1.534 1.116 3.016 1.272 3.224.156.208 2.196 3.353 5.32 4.7.743.321 1.323.513 1.775.657.746.237 1.424.204 1.96.124.598-.089 1.846-.755 2.106-1.484.26-.729.26-1.354.182-1.484-.078-.13-.286-.208-.598-.364Z"/></svg>
              Confirm Order on WhatsApp
            </button>
          </div>
        </div>
      </aside>
    `;
    document.body.appendChild(drawerWrapper);

    // Event listeners for Drawer toggle
    floatBtn.addEventListener('click', openCart);
    document.getElementById('cartCloseBtn').addEventListener('click', closeCart);
    document.getElementById('cartBackdrop').addEventListener('click', closeCart);
    document.getElementById('btnConfirmWhatsApp').addEventListener('click', handleWhatsAppCheckout);

    // Add Esc key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isCartOpen()) {
        closeCart();
      }
    });
  }

  function isCartOpen() {
    const wrapper = document.getElementById('cartDrawerWrapper');
    return wrapper && wrapper.classList.contains('active');
  }

  function openCart() {
    const wrapper = document.getElementById('cartDrawerWrapper');
    if (wrapper) {
      renderCart();
      wrapper.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    const wrapper = document.getElementById('cartDrawerWrapper');
    if (wrapper) {
      wrapper.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function updateBadge() {
    const count = getCartItemCount();
    const badge = document.getElementById('cartFloatBadge');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
    // Update any header badge if present
    document.querySelectorAll('.nav-cart-badge').forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
    const titleCount = document.getElementById('cartCountTitle');
    if (titleCount) titleCount.textContent = count;
  }

  function renderCart() {
    const body = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    const subtotalEl = document.getElementById('cartSubtotal');
    if (!body) return;

    updateBadge();

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <h4>Your bag is empty</h4>
          <p>Discover our signature fragrance collection and select a scent that speaks to you.</p>
          <a href="${getRoot()}collection.html" class="btn btn-primary" id="btnExploreCollection">Explore Collection</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      const btnExplore = document.getElementById('btnExploreCollection');
      if (btnExplore) {
        btnExplore.addEventListener('click', () => closeCart());
      }
      return;
    }

    if (footer) footer.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = formatPKR(getCartSubtotal());

    const root = getRoot();

    body.innerHTML = `
      <div class="cart-items-list">
        ${cart
          .map((item, index) => {
            const imgSrc = (item.image && (item.image.startsWith('http') || item.image.startsWith('data:')))
              ? item.image
              : root + (item.image ? item.image.replace(/^\.?\/?/, '') : 'assets/logo/xyaal-365-transparent.png');
            const itemSubtotal = (Number(item.price) || 0) * (Number(item.qty) || 1);
            return `
            <div class="cart-item" data-id="${item.id}">
              <div class="cart-item-thumb">
                <img src="${imgSrc}" alt="${item.name}" onerror="this.src='${root}assets/logo/xyaal-365-transparent.png'; this.style.objectFit='contain';" />
              </div>
              <div class="cart-item-info">
                <div class="cart-item-header">
                  <h4 class="cart-item-name">${item.name}</h4>
                  <button class="cart-item-remove" data-action="remove" data-id="${item.id}" aria-label="Remove ${item.name}">&times;</button>
                </div>
                <div class="cart-item-price">${formatPKR(item.price)}</div>
                <div class="cart-item-bottom">
                  <div class="cart-qty-ctrl">
                    <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
                    <span class="qty-num">${item.qty}</span>
                    <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Increase quantity">&plus;</button>
                  </div>
                  <span class="cart-item-line-total">${formatPKR(itemSubtotal)}</span>
                </div>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
    `;

    // Bind quantity and remove buttons
    body.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        if (action === 'remove') {
          removeFromCart(id);
        } else if (action === 'inc') {
          updateQuantity(id, 1);
        } else if (action === 'dec') {
          updateQuantity(id, -1);
        }
      });
    });
  }

  function addToCart(product, qty) {
    const quantity = Number(qty) || 1;
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.qty = (Number(existing.qty) || 1) + quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || 'assets/logo/xyaal-365-transparent.png',
        qty: quantity,
      });
    }

    saveCart();
    renderCart();
    openCart();
  }

  function updateQuantity(id, delta) {
    const item = cart.find((x) => x.id === id);
    if (!item) return;

    item.qty = (Number(item.qty) || 1) + delta;
    if (item.qty <= 0) {
      cart = cart.filter((x) => x.id !== id);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter((x) => x.id !== id);
    saveCart();
    renderCart();
  }

  // Handle WhatsApp Checkout
  function handleWhatsAppCheckout() {
    const errEl = document.getElementById('cartFormError');
    if (errEl) {
      errEl.style.display = 'none';
      errEl.textContent = '';
    }

    if (cart.length === 0) {
      if (errEl) {
        errEl.textContent = 'Your bag is empty. Please add a fragrance first.';
        errEl.style.display = 'block';
      }
      return;
    }

    const nameInput = document.getElementById('custName');
    const cityInput = document.getElementById('custCity');
    const addrInput = document.getElementById('custAddress');

    const name = (nameInput ? nameInput.value : '').trim();
    const city = (cityInput ? cityInput.value : '').trim();
    const address = (addrInput ? addrInput.value : '').trim();

    // Validation
    const missing = [];
    if (!name) missing.push('Full Name');
    if (!city) missing.push('City');
    if (!address) missing.push('Delivery Address');

    if (missing.length > 0) {
      if (errEl) {
        errEl.textContent = `Please fill in: ${missing.join(', ')}.`;
        errEl.style.display = 'block';
      }
      // Highlight invalid inputs
      if (!name && nameInput) nameInput.focus();
      else if (!city && cityInput) cityInput.focus();
      else if (!address && addrInput) addrInput.focus();
      return;
    }

    // Build Items List
    const itemsLines = cart.map((item) => {
      const lineSubtotal = (Number(item.price) || 0) * (Number(item.qty) || 1);
      return `• ${item.name} (x${item.qty}) - PKR ${lineSubtotal.toLocaleString()}`;
    }).join('\n');

    const totalAmount = getCartSubtotal().toLocaleString();

    // Required Format:
    // *NEW ORDER - XYAAL MIST*
    // ---------------------------
    // *Customer Details:*
    // Name: [Customer Name]
    // City: [City]
    // Address: [Address]
    // ---------------------------
    // *Items Ordered:*
    // • [Perfume Name] (x[Qty]) - PKR [Subtotal]
    // ---------------------------
    // *Total Amount:* PKR [Total]
    const message = [
      `*NEW ORDER - XYAAL 365*`,
      `---------------------------`,
      `*Customer Details:*`,
      `Name: ${name}`,
      `City: ${city}`,
      `Address: ${address}`,
      `---------------------------`,
      `*Items Ordered:*`,
      itemsLines,
      `---------------------------`,
      `*Total Amount:* PKR ${totalAmount}`
    ].join('\n');

    const waNum = getWaNumber();
    const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  // Global event delegation for "Add to Bag" buttons across all pages
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-action="add-to-bag"]');
    if (!btn) return;

    e.preventDefault();
    const id = btn.dataset.id || 'custom-item';
    const name = btn.dataset.name || 'Perfume';
    const price = Number(btn.dataset.price) || 0;
    const image = btn.dataset.image || 'assets/logo/xyaal-365-transparent.png';
    const qty = Number(btn.dataset.qty) || 1;
    // Trigger micro-feedback "Added ✓"
    if (!btn.classList.contains('is-added')) {
      const origHtml = btn.innerHTML;
      btn.classList.add('is-added');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;margin-right:6px;display:inline-block;vertical-align:-2px;">
          <path d="M20 6 9 17l-5-5"/>
        </svg> Added ✓
      `;
      setTimeout(() => {
        btn.classList.remove('is-added');
        btn.innerHTML = origHtml;
      }, 1400);
    }

    addToCart({ id, name, price, image }, qty);
  });

  // Header bag buttons click event
  document.addEventListener('click', function (e) {
    const headerBagBtn = e.target.closest('.nav-bag-btn');
    if (headerBagBtn) {
      e.preventDefault();
      openCart();
    }
  });

  // Initialize on DOM ready
  function init() {
    loadCart();
    injectCartUI();
    updateBadge();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global API
  window.XyaalCart = {
    open: openCart,
    close: closeCart,
    add: addToCart,
    remove: removeFromCart,
    updateQty: updateQuantity,
    getItems: () => cart,
    getSubtotal: getCartSubtotal,
    getCount: getCartItemCount,
  };
})();
