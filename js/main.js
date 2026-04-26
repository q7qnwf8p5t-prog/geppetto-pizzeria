/* ================================================
   PIZZA CRÉOLIA — MAIN JS
   ================================================ */

// ---- Année footer --------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// ---- Notice banner (congés) ----------------------
const noticeBanner = document.getElementById('noticeBanner');
const noticeClose  = document.getElementById('noticeClose');

if (noticeClose && noticeBanner) {
  noticeClose.addEventListener('click', () => {
    noticeBanner.style.display = 'none';
  });
}

// ---- Navbar scroll --------------------------------
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Burger menu ----------------------------------
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navMenu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// ---- Tabs menu ------------------------------------
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.menu-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => {
      b.classList.remove('tab-btn--active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach(p => p.classList.remove('menu-panel--active'));

    btn.classList.add('tab-btn--active');
    btn.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + target).classList.add('menu-panel--active');
  });
});

// ---- Formulaire de contact (simulation) ----------
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formSuccess.style.color = 'var(--primary)';
    formSuccess.textContent = 'Veuillez remplir tous les champs.';
    return;
  }

  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Envoi en cours…';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer le message';
    formSuccess.style.color = 'var(--secondary)';
    formSuccess.textContent = '✓ Message envoyé ! Nous vous répondrons dans les plus brefs délais.';
    setTimeout(() => { formSuccess.textContent = ''; }, 6000);
  }, 1200);
});

// ---- Intersection Observer: fade-in on scroll ----
const fadeEls = document.querySelectorAll(
  '.usp__item, .pizza-card, .about-content, .about-visual, .contact-info, .contact-right, .gallery-item'
);

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  fadeEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .5s ease ${i * 0.04}s, transform .5s ease ${i * 0.04}s`;
    io.observe(el);
  });

  document.head.insertAdjacentHTML('beforeend', `
    <style>.visible { opacity: 1 !important; transform: none !important; }</style>
  `);
}
