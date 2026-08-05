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
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 1.png',
    },
    {
      id: 'ayam-2',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 2',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan.',
      price: rupiah(22000),
      popular: true,
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 2.png',
    },
    {
      id: 'ayam-3',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 3',
      desc: 'Ayam bakar, nasi, tahu atau tempe, sambal, lalapan.',
      price: rupiah(21000),
      popular: false,
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 3.png',
    },
    {
      id: 'ayam-4',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 4',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan, kerupuk.',
      price: rupiah(24000),
      popular: false,
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 4.png',
    },
    {
      id: 'ayam-5',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 5',
      desc: 'Ayam bakar, nasi, tahu, tempe, sambal, lalapan, kerupuk, buah.',
      price: rupiah(26000),
      popular: true,
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 5.png',
    },
    {
      id: 'ayam-6',
      category: 'ayam-bakar',
      name: 'Paket Ayam Bakar 6',
      desc: 'Ayam bakar, nasi, sambal, lalapan, buah.',
      price: rupiah(21000),
      popular: false,
      image: 'assets/images/ayam_bakar/Paket Ayam Bakar 6.png',
    },

    /* ---------- Prasmanan ---------- */
    {
      id: 'prasmanan-1',
      category: 'prasmanan',
      name: 'Paket Prasmanan Hemat 1',
      desc: 'Sop Bakso, Kentang Ati, Rendang, Sambal, Kerupuk, Nasi',
      price: rupiah(1800000),
      popular: false,
      image: 'assets/images/prasmanan/Paket Prasmanan Hemat 1.png',
    },
    {
      id: 'prasmanan-2',
      category: 'prasmanan',
      name: 'Paket Prasmanan Komplet 1',
      desc: 'Nasi, Ayam Goreng, Kentang Mustofa, Sayur Asem, Ikan Asin, Sambal, Kerupuk',
      price: rupiah(1500000),
      popular: true,
      image: 'assets/images/prasmanan/Paket Prasmanan Komplet 1.png',
    },
    {
      id: 'prasmanan-3',
      category: 'prasmanan',
      name: 'Paket Prasmanan Spesial 1',
      desc: 'Nasi, Capcay, Beef Teriyaki, Kentang Ati, Sambal, Kerupuk',
      price: rupiah(1500000),
      popular: false,
      image: 'assets/images/prasmanan/Paket Prasmanan Spesial 1.png',
    },
    {
      id: 'prasmanan-4',
      category: 'prasmanan',
      name: 'Paket Prasmanan Hemat 2',
      desc: 'Sop Bakso, Kentang Ati, Rendang, Sambal, Kerupuk, Nasi, Es Campur, Melon/Semangka',
      price: rupiah(2100000),
      popular: false,
      image: 'assets/images/prasmanan/Paket Prasmanan Hemat 2.png',
    },
    {
      id: 'prasmanan-5',
      category: 'prasmanan',
      name: 'Paket Prasmanan Komplet 2',
      desc: 'Nasi, Ayam Goreng, Kentang Mustofa, Sayur Asem, Ikan Asin, Sambal, Kerupuk, Es Kuwut, Melon/Semangka',
      price: rupiah(1800000),
      popular: false,
      image: 'assets/images/prasmanan/Paket Prasmanan Komplet 2.png',
    }, 
    {
      id: 'prasmanan-6',
      category: 'prasmanan',
      name: 'Paket Prasmanan Spesial 2',
      desc: 'Nasi, Capcay, Beef Teriyaki, Kentang Ati, Sambal, Kerupuk, Es Cendol, Melon/Semangka',
      price: rupiah(1800000),
      popular: false,
      image: 'assets/images/prasmanan/Paket Prasmanan Spesial 2.png',
    },

    /* ---------- Snack Box (sample placeholder lineup) ---------- */
    {
      id: 'snack-1',
      category: 'snack-box',
      name: 'Snack Box 1',
      desc: 'Pie, Pastel, Bolu Pisang, Cleo Botol Kecil',
      price: rupiah(12500),
      popular: false,
      image: 'assets/images/snack_box/Snack Box 1.png',
    },
    {
      id: 'snack-2',
      category: 'snack-box',
      name: 'Snack Box 2',
      desc: 'Sosis Solo, Lapis Pepe, Bolu Tape, Cleo Botol Kecil',
      price: rupiah(12500),
      popular: true,
      image: 'assets/images/snack_box/Snack Box 2.png',
    },
    {
      id: 'snack-3',
      category: 'snack-box',
      name: 'Snack Box 3',
      desc: 'Risol Mayo, Puding Buah, Kroket, Cleo Botol Kecil',
      price: rupiah(12500),
      popular: false,
      image: 'assets/images/snack_box/Snack Box 3 .png',
    },
    {
      id: 'snack-4',
      category: 'snack-box',
      name: 'Snack Box 4',
      desc: 'Lemper, Lumpur Kentang, Soes, Cleo Botol Kecil',
      price: rupiah(12500),
      popular: false,
      image: 'assets/images/snack_box/Snack Box 4.png',
    },
    {
      id: 'snack-5',
      category: 'snack-box',
      name: 'Snack Box 5',
      desc: 'Dadar Gulung, Tahu Telur Puyuh, Bolu Marmer, Cleo Botol Kecil',
      price: rupiah(12500),
      popular: false,
      image: 'assets/images/snack_box/Snack Box 5.png',
    },

    /* ---------- Menu Harian ---------- */
    {
      id: 'harian-1',
      category: 'menu-harian',
      name: 'Menu 1',
      desc: 'Nasi, Ayam mentega, Bergedel, Capcay, Sambal, Krupuk, Buah',
      price: rupiah(27000),
      popular: false,
      image: 'assets/images/menu_harian/Menu 1.png',
    },
    {
      id: 'harian-2',
      category: 'menu-harian',
      name: 'Menu 2',
      desc: 'Nasi, Ayam bakar, Tahu tempe, Urap, Sambal, Krupuk, Buah',
      price: rupiah(27000),
      popular: false,
      image: 'assets/images/menu_harian/Menu 2.png',
    },
    {
      id: 'harian-3',
      category: 'menu-harian',
      name: 'Menu 3',
      desc: 'Nasi, Tuna asam manis, Rolade tahu, Tumis labu jagung manis, Sambal, Krupuk, Buah',
      price: rupiah(27500),
      popular: false,
      image: 'assets/images/menu_harian/Menu 3.png',
    },
    {
      id: 'harian-4',
      category: 'menu-harian',
      name: 'Menu 4',
      desc: 'Nasi, Ayam goreng serundeng, Orek tempe, Sop baso, Sambal, Krupuk, Buah',
      price: rupiah(27000),
      popular: false,
      image: 'assets/images/menu_harian/Menu 4.png',
    },
    {
      id: 'harian-5',
      category: 'menu-harian',
      name: 'Menu 5',
      desc: 'Nasi, Rendang, Sambal kentang, Tumis buncis putren, Sambal, Krupuk, Buah',
      price: rupiah(30000),
      popular: false,
      image: 'assets/images/menu_harian/menu 5.png',
    },
    {
      id: 'harian-6',
      category: 'menu-harian',
      name: 'Menu 6',
      desc: 'Nasi, Beef teriyaki, Capcay, Sambal kentang ati, Buah, Kerupuk',
      price: rupiah(30000),
      popular: false,
      image: 'assets/images/menu_harian/Menu 6.png',
    },
    {
      id: 'harian-7',
      category: 'menu-harian',
      name: 'Menu 7',
      desc: 'Nasi, Dendeng balado, Bergedel, Mie goreng, Sambal, Buah, Kerupuk',
      price: rupiah(30000),
      popular: false,
      image: 'assets/images/menu_harian/Menu 7.png',
    },

    /* ---------- Kue Tradisional ---------- */
    {
      id: 'kue-1',
      category: 'kue-tradisional',
      name: 'Lemper',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/lemper.jpg',
    },
    {
      id: 'kue-2',
      category: 'kue-tradisional',
      name: 'Pastel',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/pastel.jpg',
    },
    {
      id: 'kue-3',
      category: 'kue-tradisional',
      name: 'Putu Ayu',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/putu ayu.jpg',
    },
    {
      id: 'kue-4',
      category: 'kue-tradisional',
      name: 'Bolu Kukus',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/bolu kukus.jpg',
    },
    {
      id: 'kue-5',
      category: 'kue-tradisional',
      name: 'Wingko',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/wingko.jpg',
    },
    {
      id: 'kue-6',
      category: 'kue-tradisional',
      name: 'Talam Srikaya',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/talam srikaya.jpg',
    },
    {
      id: 'kue-7',
      category: 'kue-tradisional',
      name: 'Lumpur',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/kue lumpur.jpg',
    },
    {
      id: 'kue-8',
      category: 'kue-tradisional',
      name: 'Nona Manis',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/kue nona manis.jpg',
    },
    {
      id: 'kue-9',
      category: 'kue-tradisional',
      name: 'Sosis Solo',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/sosis solo.jpg',
    },
    {
      id: 'kue-10',
      category: 'kue-tradisional',
      name: 'Risol Sayur',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/risol sayur.jpg',
    },
    {
      id: 'kue-11',
      category: 'kue-tradisional',
      name: 'Risol Mayo',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/risol mayo.jpg',
    },
    {
      id: 'kue-12',
      category: 'kue-tradisional',
      name: 'Dadar Gulung',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/dadar gulung.jpg',
    },
    {
      id: 'kue-13',
      category: 'kue-tradisional',
      name: 'Arem-arem',
      desc: 'Harga satuan',
      price: rupiah(2000),
      popular: false,
      image: 'assets/images/kue_tradisional/arem arem.jpg',
    },
    {
      id: 'kue-14',
      category: 'kue-tradisional',
      name: 'Pukis',
      desc: 'Harga satuan',
      price: rupiah(2000),
      popular: false,
      image: 'assets/images/kue_tradisional/pukis.jpg',
    },
    {
      id: 'kue-15',
      category: 'kue-tradisional',
      name: 'Lupis',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/lupis.jpg',
    },
    {
      id: 'kue-16',
      category: 'kue-tradisional',
      name: 'Pai',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/pie.jpg',
    },
    {
      id: 'kue-17',
      category: 'kue-tradisional',
      name: 'Bugis',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/kue bugis.jpg',
    },
    {
      id: 'kue-18',
      category: 'kue-tradisional',
      name: 'Sengkulun',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/sengkulun.jpg',
    },
    {
      id: 'kue-19',
      category: 'kue-tradisional',
      name: 'Lapis Singkong Pelangi',
      desc: 'Harga satuan',
      price: rupiah(2000),
      popular: false,
      image: 'assets/images/kue_tradisional/lapis singkong.jpg',
    },
    {
      id: 'kue-20',
      category: 'kue-tradisional',
      name: 'Lapis Pepe',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/lapis pepe.jpg',
    },
    {
      id: 'kue-21',
      category: 'kue-tradisional',
      name: 'Klepon',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/klepon.jpg',
    },
    {
      id: 'kue-22',
      category: 'kue-tradisional',
      name: 'Kue Ku',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/kue ku.jpg',
    },
    {
      id: 'kue-23',
      category: 'kue-tradisional',
      name: 'Bubur Jongkong',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/bubur jongkong.jpg',
    },
    {
      id: 'kue-24',
      category: 'kue-tradisional',
      name: 'Candil Ubi Ungu',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/candil ubi ungu.jpg',
    },
    {
      id: 'kue-25',
      category: 'kue-tradisional',
      name: 'Talam Singkong',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/talam singkong.jpg',
    },
    {
      id: 'kue-26',
      category: 'kue-tradisional',
      name: 'Onde-onde',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/onde onde.jpg',
    },
    {
      id: 'kue-27',
      category: 'kue-tradisional',
      name: 'Martabak Telur',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/martabak telur.jpg',
    },
    {
      id: 'kue-28',
      category: 'kue-tradisional',
      name: 'Tahu Telur Puyuh',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/tahu telur puyuh.jpg',
    },
    {
      id: 'kue-29',
      category: 'kue-tradisional',
      name: 'Wajik',
      desc: 'Harga satuan',
      price: rupiah(2500),
      popular: false,
      image: 'assets/images/kue_tradisional/wajik.jpg',
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
          ${item.image ? `<div class="menu-category-parallax" style="background-image: url('${item.image}');"></div>` : meta.icon}
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
