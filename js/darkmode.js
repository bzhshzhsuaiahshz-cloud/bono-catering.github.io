/* =========================================================
   BONO CATERING — darkmode.js
   Toggles data-theme between "light" and "dark" on <html> and
   remembers the choice in Local Storage. The initial theme
   (saved choice, or system preference as a fallback) is
   already applied by the inline script in index.html <head>
   before first paint, so this file only handles the toggle
   button and keeping storage in sync.
========================================================= */

(function darkModeModule() {
  const STORAGE_KEY = 'bono-theme';

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('themeToggle');
    const root = document.documentElement;

    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (err) {
        console.warn('Tidak bisa menyimpan preferensi tema:', err);
      }
    });
  });
})();
