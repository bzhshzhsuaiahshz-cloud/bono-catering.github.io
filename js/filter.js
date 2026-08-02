/* =========================================================
   BONO CATERING — filter.js
   Category tabs (filter) and the price/name sort dropdown.
   Both write into window.BONO.state and re-render the grid
   via window.BONO.renderMenu(), defined in app.js.
========================================================= */

(function filterModule() {
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#categoryTabs .tab');
    const sortSelect = document.getElementById('sortSelect');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        window.BONO.state.activeCategory = tab.dataset.category;
        window.BONO.renderMenu();
      });
    });

    sortSelect.addEventListener('change', (e) => {
      window.BONO.state.sortBy = e.target.value;
      window.BONO.renderMenu();
    });
  });
})();
