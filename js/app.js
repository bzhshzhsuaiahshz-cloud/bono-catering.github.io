/* =========================================================
   BONO CATERING — app.js
   Shared namespace, menu data, and general site behavior:
   sticky header, mobile nav, scroll-reveal animations, hero
   stat counters, and menu card rendering used by search/filter.
========================================================= */

/* ===================================
   Shared namespace
   Other scripts (cart.js, search.js, filter.js, faq.js,
   darkmode.js, whatsapp.js) attach to window.BONO instead of
   using ES module imports, so the site can run with plain
   <script> tags and no build step.
=================================== */
window.BONO = {
  state: {
    activeCategory: 'all',
    searchTerm: '',
    sortBy: 'default',
  },
  cart: null,        // set up by cart.js
  menuData: [],       // populated below
  els: {},             // shared DOM references
};

/* ===================================
   Menu data
   NOTE: the "Paket Ayam Bakar" items below use the exact
   packages and prices supplied by BONO CATERING. Items in the
   other categories are sample placeholders using common
   Indonesian catering dishes — swap in the real lineup and
   prices here whenever they're ready.
=================================== */
(function defineMenuData() {
  const rupiah = (n) => n; // stored as plain numbers, formatted at render time

  window.BONO.menuData = [
    /* ---------- Ayam Bakar ---------- */
    {
      id: 'ayam-1',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 1',
      desc: 'Ayam bakar, nasi, lalapan, sambal.',
      price: rupiah(19000),
      popular: false,
    },
    {
      id: 'ayam-2',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 2',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan.',
      price: rupiah(22000),
      popular: true,
    },
    {
      id: 'ayam-3',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 3',
      desc: 'Ayam bakar, nasi, tahu atau tempe, sambal, lalapan.',
      price: rupiah(21000),
      popular: false,
    },
    {
      id: 'ayam-4',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 4',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan, kerupuk.',
      price: rupiah(24000),
      popular: false,
    },
    {
      id: 'ayam-5',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 5',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan, kerupuk, buah.',
      price: rupiah(26000),
      popular: true,
    },
    {
      id: 'ayam-6',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 6',
      desc: 'Ayam bakar, nasi, sambal, lalapan, buah.',
      price: rupiah(21000),
      popular: false,
    },

    /* ---------- Prasmanan (sample placeholder lineup) ---------- */
    {
      id: 'prasmanan-1',
      category: 'prasmanan',
      name: 'Paket Prasmanan Hemat',
      desc: 'Nasi putih, ayam goreng lengkuas, tumis sayur, kerupuk, sambal.',
      price: rupiah(28000),
      popular: false,
    },
    {
      id: 'prasmanan-2',
      category: 'prasmanan',
      name: 'Paket Prasmanan Komplet',
      desc: 'Nasi putih, rendang daging, ayam bakar, tumis sayur, sambal, kerupuk.',
      price: rupiah(38000),
      popular: true,
    },
    {
      id: 'prasmanan-3',
      category: 'prasmanan',
      name: 'Paket Prasmanan Spesial',
      desc: 'Nasi putih, sate ayam, ikan goreng, cah kangkung, sambal, buah, kerupuk.',
      price: rupiah(42000),
      popular: false,
    },

    /* ---------- Snack Box (sample placeholder lineup) ---------- */
    {
      id: 'snack-1',
      category: 'snack-box',
      name: 'Snack Box Isi 3',
      desc: 'Risoles, pastel, air mineral gelas.',
      price: rupiah(12000),
      popular: false,
    },
    {
      id: 'snack-2',
      category: 'snack-box',
      name: 'Snack Box Isi 5',
      desc: 'Risoles, pastel, kue lapis, roti kelapa, air mineral gelas.',
      price: rupiah(17000),
      popular: true,
    },
    {
      id: 'snack-3',
      category: 'snack-box',
      name: 'Snack Box Premium',
      desc: 'Sandwich, puding, kue kering, buah potong, air mineral botol.',
      price: rupiah(23000),
      popular: false,
    },

    /* ---------- Menu Harian (sample placeholder lineup) ---------- */
    {
      id: 'harian-1',
      category: 'menu-harian',
      name: 'Nasi Kotak Harian A',
      desc: 'Nasi, ayam suwir, tempe orek, tumis sayur, sambal.',
      price: rupiah(16000),
      popular: true,
    },
    {
      id: 'harian-2',
      category: 'menu-harian',
      name: 'Nasi Kotak Harian B',
      desc: 'Nasi, telur balado, tahu goreng, sayur asem, sambal.',
      price: rupiah(15000),
      popular: false,
    },
    {
      id: 'harian-3',
      category: 'menu-harian',
      name: 'Nasi Kotak Harian C',
      desc: 'Nasi, ikan nila goreng, tumis buncis, sambal, lalapan.',
      price: rupiah(18000),
      popular: false,
    },

    /* ---------- Kue Tradisional (sample placeholder lineup) ---------- */
    {
      id: 'kue-1',
      category: 'kue-tradisional',
      name: 'Klepon (isi 10)',
      desc: 'Kue klepon isi gula merah, balut kelapa parut segar.',
      price: rupiah(10000),
      popular: false,
    },
    {
      id: 'kue-2',
      category: 'kue-tradisional',
      name: 'Onde-onde (isi 10)',
      desc: 'Onde-onde isi kacang hijau, taburan wijen renyah.',
      price: rupiah(12000),
      popular: false,
    },
    {
      id: 'kue-3',
      category: 'kue-tradisional',
      name: 'Kue Lapis Legit (potong)',
      desc: 'Kue lapis legit lembut dengan lapisan rempah khas.',
      price: rupiah(9000),
      popular: true,
    },
  ];
})();

/* ===================================
   Category metadata (labels + icons for menu cards)
=================================== */
window.BONO.categoryMeta = {
  'ayam-bakar': {
    label: 'Ayam Bakar',
    icon: '<div class="menu-category-parallax" style="background-image: url(\'assets/images/ayam_bakar.png\');"></div>',
  },
  'prasmanan': {
    label: 'Prasmanan',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="4" rx="1"/><path d="M5 14v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3M9 10V7a3 3 0 0 1 6 0v3"/></svg>',
  },
  'snack-box': {
    label: 'Snack Box',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8 12 3 3 8m18 0-9 5m9-5v9l-9 5m0-9L3 8m9 5v9M3 8v9l9 5"/></svg>',
  },
  'menu-harian': {
    label: 'Menu Harian',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 0 16 0Z"/><path d="M4 12a8 8 0 0 1 16 0"/><path d="M2 12h20M8 8v0M16 8v0"/></svg>',
  },
  'kue-tradisional': {
    label: 'Kue Tradisional',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7"/><path d="M4 17h16M8 11V8a4 4 0 0 1 8 0v3"/><path d="M12 4v0"/></svg>',
  },
};

/* ===================================
   Helpers
=================================== */
window.BONO.formatRupiah = function formatRupiah(n) {
  return 'Rp' + n.toLocaleString('id-ID');
};

/* ===================================
   Menu rendering
   Called on load, and again by search.js / filter.js whenever
   the active category, search term, or sort order changes.
=================================== */
window.BONO.renderMenu = function renderMenu() {
  const { state, menuData, categoryMeta } = window.BONO;
  const grid = document.getElementById('menuGrid');
  const emptyState = document.getElementById('menuEmptyState');
  const resultCount = document.getElementById('menuResultCount');
  if (!grid) return;

  // 1. Filter by category
  let items = state.activeCategory === 'all'
    ? menuData.slice()
    : menuData.filter((item) => item.category === state.activeCategory);

  // 2. Filter by search term (matches name or description)
  const term = state.searchTerm.trim().toLowerCase();
  if (term) {
    items = items.filter((item) =>
      item.name.toLowerCase().includes(term) ||
      item.desc.toLowerCase().includes(term)
    );
  }

  // 3. Sort
  if (state.sortBy === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (state.sortBy === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (state.sortBy === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name));

  // 4. Render
  grid.innerHTML = items.map((item) => {
    const meta = categoryMeta[item.category];
    const qty = window.BONO.cart ? window.BONO.cart.getQty(item.id) : 0;
    return `
      <article class="menu-card" data-id="${item.id}">
        <div class="menu-card-media">
          ${item.popular ? '<span class="menu-card-badge">Favorit</span>' : ''}
          ${meta.icon}
        </div>
        <h3 class="menu-card-title">${item.name}</h3>
        <p class="menu-card-desc">${item.desc}</p>
        <div class="menu-card-footer">
          <span class="menu-card-price">${window.BONO.formatRupiah(item.price)}</span>
          <div class="qty-stepper" data-id="${item.id}">
            <button type="button" class="qty-minus" aria-label="Kurangi jumlah ${item.name}">−</button>
            <span class="qty-value">${qty}</span>
            <button type="button" class="qty-plus" aria-label="Tambah jumlah ${item.name}">+</button>
          </div>
        </div>
        <button type="button" class="add-to-cart-btn" data-id="${item.id}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6"/></svg>
          Tambah ke Keranjang
        </button>
      </article>`;
  }).join('');

  emptyState.hidden = items.length !== 0;
  resultCount.textContent = term || state.activeCategory !== 'all'
    ? `Menampilkan ${items.length} menu`
    : '';

  // Wire up qty steppers + add-to-cart for the freshly rendered cards
  if (window.BONO.cart) window.BONO.cart.bindMenuGridControls();
};

/* ===================================
   Header: scroll shadow + mobile nav toggle
=================================== */
(function headerBehavior() {
  const header = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile nav after choosing a link
  mainNav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ===================================
   Image Modal functionality
=================================== */
(function imageModalBehavior() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('imageModalImg');
  const overlay = document.getElementById('imageModalOverlay');
  const closeBtn = document.getElementById('imageModalClose');

  if (!modal || !modalImg) return;

  const openModal = (src) => {
    modalImg.src = src;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Optional: clear src after transition to avoid flicker
    setTimeout(() => { modalImg.src = ''; }, 240);
  };

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Listen for clicks on menu card media
  document.addEventListener('click', (e) => {
    const media = e.target.closest('.menu-card-media');
    if (!media) return;

    // Check if it has a parallax div with background-image
    const parallax = media.querySelector('.menu-category-parallax');
    let src = null;

    if (parallax) {
      const bg = parallax.style.backgroundImage;
      // Extract URL from 'url("path/to/image.jpg")'
      if (bg) {
        src = bg.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
      }
    } else {
      // Or check if it has a direct image tag
      const img = media.querySelector('img:not(.menu-card-badge)');
      if (img) src = img.src;
    }

    if (src) openModal(src);
  });
})();

/* ===================================
   Scroll-reveal animations (Intersection Observer API)
=================================== */
(function revealOnScroll() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach((el) => observer.observe(el));
})();

/* ===================================
   Hero stat counters — animate numbers up once visible
=================================== */
(function statCounters() {
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length === 0) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (!('IntersectionObserver' in window)) {
    stats.forEach(animate);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  stats.forEach((el) => observer.observe(el));
})();

/* ===================================
   Footer year + initial menu render
=================================== */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Initial render happens after cart.js has attached window.BONO.cart
  // (see bottom of cart.js), so this is safe even though app.js loads first.
  window.BONO.renderMenu();
});
