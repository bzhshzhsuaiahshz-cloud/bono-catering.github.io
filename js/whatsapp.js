/* =========================================================
   BONO CATERING — whatsapp.js
   Turns the cart (+ address + notes) into a formatted
   WhatsApp message and opens a wa.me chat with it prefilled.
   This is the final step of the ordering flow described in
   the project brief:

   Pilih menu -> Tambah ke keranjang -> Isi jumlah -> Alamat
   -> Catatan -> Konfirmasi -> Klik WhatsApp -> Pesan otomatis
   -> Diarahkan ke WhatsApp
========================================================= */

(function whatsappModule() {
  /* TODO: replace with BONO CATERING's real WhatsApp number,
     in international format without symbols (62 = Indonesia). */
  const WHATSAPP_NUMBER = '6281312609775';

  function buildOrderMessage(cart, address, notes) {
    const lines = cart.lineItems();

    const orderLines = lines.map((item) => (
      `- ${item.name}\n` +
      `  Jumlah: ${item.qty}\n` +
      `  Harga: ${window.BONO.formatRupiah(item.lineTotal)}`
    )).join('\n\n');

    const total = window.BONO.formatRupiah(cart.subtotal());

    return [
      'Halo BONO CATERING.',
      '',
      'Saya ingin melakukan pemesanan.',
      '',
      'Daftar pesanan:',
      '',
      orderLines,
      '',
      'Alamat:',
      address || '-',
      '',
      'Catatan:',
      notes || '-',
      '',
      `Total: ${total}`,
      '',
      'Terima kasih.',
    ].join('\n');
  }

  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
  }

  function showFieldError(field, message) {
    field.style.borderColor = 'var(--danger)';
    field.focus();
    let hint = field.parentElement.querySelector('.field-hint');
    if (!hint) {
      hint = document.createElement('p');
      hint.className = 'field-hint';
      hint.style.color = 'var(--danger)';
      hint.style.fontSize = '0.78rem';
      hint.style.margin = '4px 0 0';
      field.parentElement.appendChild(hint);
    }
    hint.textContent = message;
  }

  function clearFieldError(field) {
    field.style.borderColor = '';
    const hint = field.parentElement.querySelector('.field-hint');
    if (hint) hint.remove();
  }

  document.addEventListener('DOMContentLoaded', () => {
    /* -------- Checkout button inside the cart drawer -------- */
    const checkoutBtn = document.getElementById('checkoutBtn');
    const addressField = document.getElementById('cartAddress');
    const notesField = document.getElementById('cartNotes');

    checkoutBtn?.addEventListener('click', () => {
      const cart = window.BONO.cart;

      if (cart.lineItems().length === 0) return;

      const address = addressField.value.trim();
      if (!address) {
        showFieldError(addressField, 'Tulis alamat pengantaran terlebih dahulu.');
        return;
      }
      clearFieldError(addressField);

      const message = buildOrderMessage(cart, address, notesField.value.trim());
      openWhatsApp(message);
    });

    addressField?.addEventListener('input', () => clearFieldError(addressField));

    /* -------- General "Chat via WhatsApp" button in Contact -------- */
    const contactWaBtn = document.getElementById('contactWaBtn');
    contactWaBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp('Halo BONO CATERING, saya ingin bertanya.');
    });

    /* -------- Floating WhatsApp Button -------- */
    const fabWaBtn = document.getElementById('fabWaBtn');
    fabWaBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp('Halo BONO CATERING, saya ingin bertanya.');
    });

    /* -------- Contact form: routed to WhatsApp as well -------- */
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cfName').value.trim();
      const msg = document.getElementById('cfMessage').value.trim();
      const message = `Halo BONO CATERING, saya ${name}.\n\n${msg}`;
      openWhatsApp(message);
    });
  });
})();
