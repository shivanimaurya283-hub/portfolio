/* ==========================================================================
   Portfolio script - Shivani Maurya
   Plain JavaScript only. No libraries needed.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- 1. Theme toggle (light / dark) ----------
     The starting theme is set by a small script in index.html <head>.
     Here we handle the button and remember the choice. */
  var themeBtn = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, save) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) { meta.setAttribute('content', theme === 'dark' ? '#0b1220' : '#0f766e'); }
    if (save) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* storage may be blocked */ }
    }
  }

  applyTheme(currentTheme(), false);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  // Follow the device theme only if the visitor has not chosen one yet
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onSystemChange = function (e) {
      var saved = null;
      try { saved = localStorage.getItem('theme'); } catch (err) {}
      if (!saved) { applyTheme(e.matches ? 'dark' : 'light', false); }
    };
    if (mq.addEventListener) { mq.addEventListener('change', onSystemChange); }
    else if (mq.addListener) { mq.addListener(onSystemChange); }
  }

  /* ---------- 2. Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!menuBtn || !nav) { return; }
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    // Close after choosing a link
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { setMenu(false); }
    });

    // Close with the Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuBtn.focus();
      }
    });

    // Close when clicking outside the menu
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.site-header')) { setMenu(false); }
    });

    // Reset when the window becomes wide
    window.addEventListener('resize', function () {
      if (window.innerWidth > 860) { setMenu(false); }
    });
  }

  /* ---------- 3. Active link highlight while scrolling ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (link) {
      var active = link.getAttribute('href') === '#' + id;
      link.classList.toggle('active', active);
      if (active) { link.setAttribute('aria-current', 'true'); }
      else { link.removeAttribute('aria-current'); }
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 4. Scroll-reveal animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---------- 5. Images: graceful fallbacks if a file is missing ---------- */
  // Profile photo -> show "SM" avatar
  var profileImg = document.getElementById('profile-img');
  var avatar = document.getElementById('avatar-fallback');

  function showAvatar() {
    if (profileImg) { profileImg.style.display = 'none'; }
    if (avatar) { avatar.hidden = false; }
  }
  if (profileImg) {
    profileImg.addEventListener('error', showAvatar);
    if (profileImg.complete && profileImg.naturalWidth === 0) { showAvatar(); }
  }

  // Project images -> keep the gradient placeholder until the picture loads
  document.querySelectorAll('[data-project-img]').forEach(function (img) {
    var box = img.closest('.project-media');
    if (!box) { return; }
    function loaded() { box.classList.add('has-image'); }
    function failed() { box.classList.add('no-image'); }
    img.addEventListener('load', loaded);
    img.addEventListener('error', failed);
    if (img.complete) {
      if (img.naturalWidth > 0) { loaded(); } else { failed(); }
    }
  });

  /* ---------- 6. Back-to-top button ---------- */
  var toTop = document.getElementById('to-top');
  if (toTop) {
    var toggleTop = function () { toTop.hidden = window.scrollY < 500; };
    window.addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 7. Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
