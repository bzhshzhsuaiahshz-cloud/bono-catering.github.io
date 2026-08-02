/* =========================================================
   BONO CATERING — search.js
   Handles the collapsible header search bar and filters the
   menu grid by name/description as the user types.
========================================================= */

(function searchModule() {
  let debounceTimer = null;

  function debounce(fn, delay) {
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fn(...args), delay);
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    const openSearch = () => {
      searchBar.hidden = false;
      searchToggle.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    };
    const closeSearch = () => {
      searchBar.hidden = true;
      searchToggle.setAttribute('aria-expanded', 'false');
    };

    searchToggle.addEventListener('click', () => {
      searchBar.hidden ? openSearch() : closeSearch();
    });
    searchClose.addEventListener('click', () => {
      searchInput.value = '';
      window.BONO.state.searchTerm = '';
      window.BONO.renderMenu();
      closeSearch();
    });

    const handleInput = debounce((value) => {
      window.BONO.state.searchTerm = value;
      // A search implies "search everywhere", so reset the category
      // tab back to "Semua" whenever there's an active query.
      if (value.trim()) {
        window.BONO.state.activeCategory = 'all';
        document.querySelectorAll('#categoryTabs .tab').forEach((tab) => {
          const isAll = tab.dataset.category === 'all';
          tab.classList.toggle('active', isAll);
          tab.setAttribute('aria-selected', String(isAll));
        });
      }
      window.BONO.renderMenu();
    }, 200);

    searchInput.addEventListener('input', (e) => handleInput(e.target.value));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !searchBar.hidden) closeSearch();
    });
  });
})();
