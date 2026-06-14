/* GSAP motion module for Kamus Bahasa Paser
 *
 * Mirrors the entrance pattern in docs/altitude.html (.reveal + IntersectionObserver)
 * but drives it with GSAP so the reveal respects the timing/easing contract in
 * docs/DESIGN.md §8: slow opacity + small Y-translate (12-24px), 0.6-1s, light stagger.
 * Honors prefers-reduced-motion.
 *
 * Public API on window.Motion:
 *   - init()                          page-load entrance for hero + search panel
 *   - animateEntries(elements)        stagger fade-in for result cards
 *   - animateStatus(element)          fade status text on update
 *   - animateNoResults(element)       gentle pulse on empty state
 *   - animateHelper(element)          fade-in helper card
 *   - attachDetailsMotion(root)       wire up <details> expand/collapse tween
 *   - attachRevealOnScroll(root)      .reveal -> .in (replaces the plain CSS observer)
 */
(function () {
  'use strict';

  const REDUCED_MOTION = typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn, { once: true });
  }

  function ensureGsap() {
    return typeof window.gsap !== 'undefined' ? window.gsap : null;
  }

  function init() {
    ready(() => {
      const gsap = ensureGsap();
      if (!gsap) return;

      if (REDUCED_MOTION) {
        gsap.set(['.hero-foot', '.search-panel', '.results', '.status'], { clearProps: 'all' });
        // Promote any .reveal nodes to .in so they're visible immediately.
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        return;
      }

      const hero = document.querySelector('.hero-foot');
      const search = document.querySelector('.search-panel');

      const targets = [hero, search].filter(Boolean);
      if (!targets.length) return;

      gsap.set(targets, { autoAlpha: 0, y: 16 });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'transform,opacity,visibility'
      });
    });
  }

  function animateEntries(elements) {
    if (!elements || !elements.length) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;

    gsap.from(elements, {
      autoAlpha: 0,
      y: 12,
      duration: 0.5,
      ease: 'power2.out',
      stagger: 0.04,
      clearProps: 'transform,opacity'
    });
  }

  function animateStatus(element) {
    if (!element) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;
    if (!element.textContent) return;
    gsap.fromTo(
      element,
      { autoAlpha: 0.4, y: -2 },
      { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  }

  function animateNoResults(element) {
    if (!element) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;
    gsap.fromTo(
      element,
      { x: 0 },
      {
        x: 6,
        duration: 0.06,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 3,
        onComplete: () => gsap.set(element, { x: 0 })
      }
    );
  }

  function animateHelper(element) {
    if (!element) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;
    gsap.from(element, {
      autoAlpha: 0,
      y: 8,
      duration: 0.5,
      ease: 'power2.out'
    });
  }

  function attachDetailsMotion(root) {
    if (!root) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;

    root.addEventListener('toggle', (event) => {
      const item = event.target;
      if (!(item instanceof HTMLDetailsElement)) return;
      const detail = item.querySelector('.variant-detail');
      if (!detail) return;

      // toggle fires BEFORE the browser toggles the `open` attribute.
      //   item.open === true  => user clicked to close
      //   item.open === false => user clicked to open
      if (item.open) {
        gsap.killTweensOf(detail);
        event.preventDefault();
        gsap.to(detail, {
          autoAlpha: 0,
          height: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            item.open = false;
            gsap.set(detail, { clearProps: 'height,opacity,visibility' });
          }
        });
      } else {
        gsap.killTweensOf(detail);
        gsap.fromTo(
          detail,
          { autoAlpha: 0, height: 0 },
          {
            autoAlpha: 1,
            height: 'auto',
            duration: 0.35,
            ease: 'power2.out',
            clearProps: 'height'
          }
        );
      }
    }, true);
  }

  // Walk the DOM once and toggle .in on .reveal nodes as they enter the viewport.
  // The CSS .reveal rule handles the actual transition; this just adds the trigger.
  function attachRevealOnScroll(root) {
    const target = root || document;
    if (!('IntersectionObserver' in window) || REDUCED_MOTION) {
      target.querySelectorAll?.('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    target.querySelectorAll?.('.reveal').forEach((el) => io.observe(el));
  }

  window.Motion = {
    init,
    animateEntries,
    animateStatus,
    animateNoResults,
    animateHelper,
    attachDetailsMotion,
    attachRevealOnScroll
  };
})();
