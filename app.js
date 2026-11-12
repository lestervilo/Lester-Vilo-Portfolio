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
  const themeIcons = document.querySelectorAll('[data-theme-icon]');
  const themeStorageKey = 'lester-portfolio-theme';

  function readSavedTheme() {
    try {
      const saved = window.localStorage.getItem(themeStorageKey);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (_) {
      return null;
    }
  }

  function updateThemeIcon() {
    if (!themeToggle) return;
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeIcons.forEach(icon => {
      icon.hidden = icon.getAttribute('data-theme-icon') === (isDark ? 'moon' : 'sun');
    });
    themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  }

  const savedTheme = readSavedTheme();
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  html.setAttribute('data-theme', savedTheme || systemTheme);
  updateThemeIcon();

  themeToggle && themeToggle.addEventListener('click', () => {
    const nextTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', nextTheme);
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch (_) {
      // Theme still works when storage is unavailable.
    }
    updateThemeIcon();
  });

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
     CONTACT FORM — handled natively by Formspree (Basic HTML)
     The <form action="https://formspree.io/f/mzdqybvo" method="POST">
     submits directly. No JS needed. Button feedback only.
     ----------------------------------------------------------- */
  const form = document.getElementById('contactForm');

  form && form.addEventListener('submit', (event) => {
    const honeypot = form.querySelector('[name="_gotcha"]');
    if (honeypot && honeypot.value.trim() !== '') {
      event.preventDefault();
      return;
    }
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
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
