/* =========================================================
   BONO CATERING — faq.js
   Accordion behavior for the FAQ section. Only one question
   is open at a time; clicking an open question closes it.
========================================================= */

(function faqModule() {
  document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach((item) => {
      const question = item.querySelector('.faq-question');

      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });
})();
