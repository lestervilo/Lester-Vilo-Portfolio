/* ============================================================
   APP.JS — Lester Vilo Portfolio
   Handles: dark/light mode, scroll reveals, nav behavior,
            mobile menu, active link tracking, scroll-to-top,
            contact form, footer year
   ============================================================ */

(function () {
  'use strict';

  /* -----------------------------------------------------------
     DARK / LIGHT MODE TOGGLE
     ----------------------------------------------------------- */
  const html = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');

  // Initialize theme from system preference
  let currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', currentTheme);
  updateThemeIcon();

  themeToggle && themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', currentTheme);
    themeToggle.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
    updateThemeIcon();
  });

  function updateThemeIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = currentTheme === 'dark'
      // Sun icon shown in dark mode
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      // Moon icon shown in light mode
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* -----------------------------------------------------------
     MOBILE NAV TOGGLE
     ----------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  navToggle && navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen.toString());
  });

  // Close mobile nav when a link is clicked
  nav && nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle && navToggle.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav && navToggle && !nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  /* -----------------------------------------------------------
     STICKY HEADER — hide on scroll down, show on scroll up
     ----------------------------------------------------------- */
  const header = document.getElementById('header');
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Scrolled down state
        if (currentScrollY > 40) {
          header.classList.add('header--scrolled');
        } else {
          header.classList.remove('header--scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          header.classList.add('header--hidden');
        } else {
          header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* -----------------------------------------------------------
     ACTIVE NAV LINK — highlight on scroll
     ----------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${entry.target.id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* -----------------------------------------------------------
     SCROLL REVEAL ANIMATIONS
     ----------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Trigger visible for elements already in view on load
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.classList.add('visible');
      }
    });
  }, 100);

  /* -----------------------------------------------------------
     SCROLL TO TOP BUTTON
     ----------------------------------------------------------- */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
    }
  }, { passive: true });

  scrollTopBtn && scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -----------------------------------------------------------
     SMOOTH SCROLL for anchor links (legacy support)
     ----------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* -----------------------------------------------------------
     CONTACT FORM — demo feedback (no real submission)
     To make real: replace with Formspree fetch or EmailJS
     ----------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = form.querySelector('#form-name').value.trim();
    const email = form.querySelector('#form-email').value.trim();
    const msg   = form.querySelector('#form-message').value.trim();

    if (!name || !email || !msg) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const data = new FormData(form);
    fetch('https://formspree.io/f/mzdqybvo', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(r => {
      if (r.ok) {
        formSuccess.style.display = 'block';
        form.reset();
      } else {
        formSuccess.style.display = 'block';
        formSuccess.style.background = 'var(--color-error, #fee)';
        formSuccess.style.color = 'var(--color-error, #c0394b)';
        formSuccess.textContent = 'Something went wrong. Please email me directly at lestervilo02@gmail.com';
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    })
    .catch(() => {
      formSuccess.style.display = 'block';
      formSuccess.textContent = 'Network error. Please email me directly at lestervilo02@gmail.com';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    });
  });

  /* -----------------------------------------------------------
     FOOTER YEAR
     ----------------------------------------------------------- */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -----------------------------------------------------------
     HERO COUNTER ANIMATION (optional flair for stats)
     ----------------------------------------------------------- */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const suffix = el.dataset.suffix || '';
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  // Trigger hero stat counters once hero is in view
  const heroStats = document.querySelectorAll('.hero__stat-num');
  const heroStatObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        heroStats.forEach(el => {
          const text = el.textContent;
          const match = text.match(/^(\d+)(.*)$/);
          if (match) {
            const num = parseInt(match[1], 10);
            const suffix = match[2] || '';
            el.dataset.suffix = suffix;
            animateCounter(el, num, 1000);
          }
        });
        heroStatObserver.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  if (heroStats.length > 0) {
    heroStatObserver.observe(heroStats[0].closest('.hero__stats') || document.body);
  }

})();
