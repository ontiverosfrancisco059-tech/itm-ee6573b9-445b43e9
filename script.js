/* BEAR · Cevichería Campeche — interactividad del sitio */
(function () {
  'use strict';

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  document.addEventListener('DOMContentLoaded', function () {
    setupNav();
    setupReveal();
    setupActiveNav();
    setupYear();
  });

  /* ---------- Navegación móvil ---------- */
  function setupNav() {
    var toggle = $('#navToggle');
    var nav = $('#mainNav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  function setupReveal() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      observer.observe(el);
    });
  }

  /* ---------- Resaltar sección activa ---------- */
  function setupActiveNav() {
    var sections = $$('section[id]');
    var links = $$('.main-nav a[href^="#"]');

    if (!sections.length || !links.length) return;

    function onScroll() {
      var pos = window.scrollY + 120;
      var current = sections[0] ? sections[0].id : null;

      sections.forEach(function (sec) {
        if (sec.offsetTop <= pos) current = sec.id;
      });

      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Año en el pie ---------- */
  function setupYear() {
    var el = $('#year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();