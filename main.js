/* Gombey AI landing page interactions. */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');

  const nav = document.getElementById('main-nav');
  const circuitLayer = document.getElementById('circuit-parallax');
  const glowCursor = document.getElementById('glow-cursor');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');
  let menuOpen = false;

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('visible'));
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (circuitLayer) circuitLayer.style.transform = `translateY(${scrollY * 0.25}px)`;
    if (nav) nav.classList.toggle('scrolled', scrollY > 40);
  }, { passive: true });

  window.addEventListener('mousemove', (event) => {
    if (!glowCursor) return;
    glowCursor.style.setProperty('--mouse-x', `${(event.clientX / window.innerWidth) * 100}%`);
    glowCursor.style.setProperty('--mouse-y', `${(event.clientY / window.innerHeight) * 100}%`);
  }, { passive: true });

  const setMenuState = (open) => {
    menuOpen = open;
    mobileMenu.classList.toggle('active', menuOpen);
    mobileToggle.setAttribute('aria-expanded', String(menuOpen));
    mobileToggle.setAttribute('aria-label', menuOpen ? 'Close navigation menu' : 'Open navigation menu');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = menuOpen ? '0' : '1';
    spans[2].style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  };

  mobileToggle.addEventListener('click', () => setMenuState(!menuOpen));
  mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuOpen) setMenuState(false);
  });

  window.closeMobileMenu = () => setMenuState(false);

  if ('IntersectionObserver' in window && stickyCta && heroSection) {
    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => stickyCta.classList.toggle('visible', !entry.isIntersecting));
    }, { threshold: 0 });
    stickyObserver.observe(heroSection);
  }

  document.querySelectorAll('.service-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    }, { passive: true });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
    });
  });
});
