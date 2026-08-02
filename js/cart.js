/* =========================================================
   BONO CATERING — cart.js
   Cart state (add / update / remove items), persisted to
   Local Storage, plus rendering for the cart badge and the
   off-canvas cart drawer.
========================================================= */

(function cartModule() {
  const STORAGE_KEY = 'bono-cart';

  /* ===================================
     Cart class
  =================================== */
  class Cart {
    constructor() {
      this.items = this.load(); // { id: qty }
    }

    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (err) {
        console.warn('Tidak bisa membaca keranjang tersimpan:', err);
        return {};
      }
    }

    save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (err) {
        console.warn('Tidak bisa menyimpan keranjang:', err);
      }
    }

    getQty(id) {
      return this.items[id] || 0;
    }

    setQty(id, qty) {
      if (qty <= 0) {
        delete this.items[id];
      } else {
        this.items[id] = qty;
      }
      this.save();
      this.renderAll();
    }

    add(id, qty = 1) {
      this.setQty(id, this.getQty(id) + qty);
    }

    remove(id) {
      this.setQty(id, 0);
    }

    clear() {
      this.items = {};
      this.save();
      this.renderAll();
    }

    totalCount() {
      return Object.values(this.items).reduce((sum, qty) => sum + qty, 0);
    }

    lineItems() {
      return Object.entries(this.items)
        .map(([id, qty]) => {
          const product = window.BONO.menuData.find((m) => m.id === id);
          if (!product) return null;
          return { ...product, qty, lineTotal: product.price * qty };
        })
        .filter(Boolean);
    }

    subtotal() {
      return this.lineItems().reduce((sum, item) => sum + item.lineTotal, 0);
    }

    /* Re-render every piece of UI that depends on cart state */
    renderAll() {
      renderCartBadge(this);
      renderCartDrawer(this);
      syncMenuGridQuantities(this);
    }

    /* Wire up qty steppers + add-to-cart buttons inside #menuGrid.
       Called after every renderMenu() since the grid markup is
       regenerated from scratch on filter/search/sort. */
    bindMenuGridControls() {
      const grid = document.getElementById('menuGrid');
      if (!grid) return;

      grid.querySelectorAll('.qty-stepper').forEach((stepper) => {
        const id = stepper.dataset.id;
        stepper.querySelector('.qty-plus').addEventListener('click', () => {
          this.add(id, 1);
        });
        stepper.querySelector('.qty-minus').addEventListener('click', () => {
          this.setQty(id, Math.max(0, this.getQty(id) - 1));
        });
      });

      grid.querySelectorAll('.add-to-cart-btn').forEach((btn) => {
        const originalLabel = btn.innerHTML;
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          this.add(id, 1);
          btn.classList.add('is-added');
          btn.textContent = '✓ Ditambahkan ke Keranjang';
          setTimeout(() => {
            btn.classList.remove('is-added');
            btn.innerHTML = originalLabel;
          }, 1400);
        });
      });
    }
  }

  /* ===================================
     Rendering helpers
  =================================== */
  function renderCartBadge(cart) {
    const count = cart.totalCount();
    const countEl = document.getElementById('cartCount');
    if (countEl) {
      countEl.textContent = count;
      countEl.hidden = count === 0;
    }
    const fabCountEl = document.getElementById('fabCartCount');
    if (fabCountEl) {
      fabCountEl.textContent = count;
      fabCountEl.hidden = count === 0;
    }
  }

  function renderCartDrawer(cart) {
    const itemsEl = document.getElementById('cartItems');
    const emptyEl = document.getElementById('cartEmpty');
    const footerEl = document.getElementById('cartFooter');
    const lines = cart.lineItems();

    if (lines.length === 0) {
      itemsEl.hidden = true;
      footerEl.hidden = true;
      emptyEl.hidden = false;
      return;
    }

    emptyEl.hidden = true;
    itemsEl.hidden = false;
    footerEl.hidden = false;

    itemsEl.innerHTML = lines.map((item) => {
      const meta = window.BONO.categoryMeta[item.category];
      return `
        <li class="cart-item" data-id="${item.id}">
          <div class="cart-item-media">${meta.icon}</div>
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p class="cart-item-price">${window.BONO.formatRupiah(item.price)} &times; ${item.qty} = ${window.BONO.formatRupiah(item.lineTotal)}</p>
            <div class="cart-item-controls">
              <div class="qty-stepper" data-id="${item.id}">
                <button type="button" class="qty-minus" aria-label="Kurangi jumlah ${item.name}">−</button>
                <span class="qty-value">${item.qty}</span>
                <button type="button" class="qty-plus" aria-label="Tambah jumlah ${item.name}">+</button>
              </div>
              <button type="button" class="cart-item-remove" data-id="${item.id}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0-1 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 6"/></svg>
                Hapus
              </button>
            </div>
          </div>
        </li>`;
    }).join('');

    // Bind controls inside the drawer
    itemsEl.querySelectorAll('.qty-stepper').forEach((stepper) => {
      const id = stepper.dataset.id;
      stepper.querySelector('.qty-plus').addEventListener('click', () => cart.add(id, 1));
      stepper.querySelector('.qty-minus').addEventListener('click', () =>
        cart.setQty(id, Math.max(0, cart.getQty(id) - 1))
      );
    });
    itemsEl.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', () => cart.remove(btn.dataset.id));
    });

    document.getElementById('cartSubtotal').textContent = window.BONO.formatRupiah(cart.subtotal());
    document.getElementById('cartTotal').textContent = window.BONO.formatRupiah(cart.subtotal());
  }

  /* Keep the quantity shown on menu cards in sync with the cart,
     without a full re-render of the grid (avoids losing scroll position). */
  function syncMenuGridQuantities(cart) {
    document.querySelectorAll('#menuGrid .qty-stepper').forEach((stepper) => {
      const id = stepper.dataset.id;
      const valueEl = stepper.querySelector('.qty-value');
      if (valueEl) valueEl.textContent = cart.getQty(id);
    });
  }

  /* ===================================
     Drawer open / close
  =================================== */
  function initDrawerToggle() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const openBtn = document.getElementById('cartToggle');
    const fabOpenBtn = document.getElementById('fabCartToggle');
    const closeBtn = document.getElementById('cartClose');
    const emptyCta = document.getElementById('cartEmptyCta');

    const open = () => {
      drawer.classList.add('is-open');
      overlay.classList.add('is-visible');
      drawer.setAttribute('aria-hidden', 'false');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
      if (fabOpenBtn) fabOpenBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      drawer.setAttribute('aria-hidden', 'true');
      if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      if (fabOpenBtn) fabOpenBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    if (openBtn) openBtn.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open());
    if (fabOpenBtn) fabOpenBtn.addEventListener('click', () => drawer.classList.contains('is-open') ? close() : open());
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);
    if (emptyCta) emptyCta.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  /* ===================================
     Bootstrap
  =================================== */
  window.BONO.cart = new Cart();
  document.addEventListener('DOMContentLoaded', () => {
    initDrawerToggle();
    window.BONO.cart.renderAll();
  });
})();
