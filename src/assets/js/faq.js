
const faqQuestions = document.querySelectorAll('.faq-question');
const faqItems = document.querySelectorAll('.faq-item');

if (!faqQuestions.length || !faqItems.length) {
  // FAQ section is not present on this page.
} else {
faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('active');

    faqItems.forEach(i => {
      i.classList.remove('active');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

// Mobile swipe open
let startY = 0;

faqItems.forEach(item => {
  item.addEventListener('touchstart', e => {
    startY = e.touches[0].clientY;
  });

  item.addEventListener('touchend', e => {
    const endY = e.changedTouches[0].clientY;
    if (startY - endY > 40) {
      item.querySelector('.faq-question').click();
    }
  });
});
}

