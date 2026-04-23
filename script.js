(() => {
  'use strict';

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Reveal on scroll ──────────────────────────────────────
  const targets = document.querySelectorAll(
    '.hero-status, .hero-title, .hero-sub, .hero-cta, .hero-stats, ' +
    '.strip, .two-col > *, .stack-grid .card, .t-item, ' +
    '.hl, .quote, .contact-card, .edu, .lang'
  );

  targets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.is-visible)')];
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 65, 260);
        setTimeout(() => entry.target.classList.add('is-visible'), delay);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });

    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }

  // ── Parallax sheen ────────────────────────────────────────
  const sheen = document.querySelector('.bg-sheen');
  if (sheen && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY * 0.10, 90);
        sheen.style.transform = `translate3d(0, ${y}px, 0)`;
        raf = null;
      });
    }, { passive: true });
  }

  // ── Active nav link ───────────────────────────────────────
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const linkMap  = new Map();
  navLinks.forEach(a => linkMap.set(a.getAttribute('href').slice(1), a));

  if (sections.length && 'IntersectionObserver' in window) {
    const navIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const link = linkMap.get(entry.target.id);
        if (!link) return;
        navLinks.forEach(l => l.removeAttribute('data-active'));
        link.setAttribute('data-active', 'true');
      });
    }, { rootMargin: '-38% 0px -56% 0px', threshold: 0 });
    sections.forEach(s => navIo.observe(s));
  }

  // ── Subtle spotlight on cards ─────────────────────────────
  const cards = document.querySelectorAll('.card, .hl, .stat');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, #15151a 0%, var(--bg-card-h, #141418) 55%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

})();
