/* ===================================================================
   GOMBEY TECH LLC — Main JavaScript
   Scroll reveals, nav behavior, mobile menu, number counters,
   mouse-tracking card effects, sticky CTA
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Scroll Reveal (IntersectionObserver) ───
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ─── Nav Scroll Behavior ───
  const nav = document.getElementById('main-nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });


  // ─── Mobile Menu Toggle ───
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  mobileToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    // Animate hamburger to X
    const spans = mobileToggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      document.body.style.overflow = 'hidden';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
      document.body.style.overflow = '';
    }
  });

  window.closeMobileMenu = () => {
    menuOpen = false;
    mobileMenu.classList.remove('active');
    const spans = mobileToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '1';
    spans[2].style.transform = '';
    document.body.style.overflow = '';
  };


  // ─── Sticky CTA Visibility ───
  const stickyCta = document.getElementById('sticky-cta');
  const heroSection = document.getElementById('hero');

  const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyCta.classList.add('visible');
      } else {
        stickyCta.classList.remove('visible');
      }
    });
  }, {
    threshold: 0
  });

  stickyObserver.observe(heroSection);


  // ─── Number Counter Animation ───
  const trustSection = document.getElementById('trust-strip');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  countObserver.observe(trustSection);

  function animateCounters() {
    const counters = document.querySelectorAll('.trust-number[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const suffix = counter.textContent.includes('%') ? '%' : (counter.textContent.includes('+') ? '+' : '');
      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);

        if (suffix === '%') {
          counter.textContent = current + '%';
        } else {
          counter.textContent = current + '+';
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (suffix === '%') {
            counter.textContent = target + '%';
          } else if (target === 3) {
            counter.textContent = '<' + target;
          } else {
            counter.textContent = target + '+';
          }
        }
      }

      requestAnimationFrame(update);
    });
  }


  // ─── Mouse-Tracking Glow on Service Cards ───
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });


  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });




});
