/* GSAP motion module for Kamus Bahasa Paser
 * Encapsulates entrance, stagger, status, no-result, and <details> animations.
 * Respects prefers-reduced-motion: returns early and lets native rendering take over.
 *
 * Public API on window.Motion:
 *   - init()                          one-time entrance for hero + search panel
 *   - animateEntries(elements)        stagger fade-in for result cards
 *   - animateStatus(element)          fade status text on update
 *   - animateNoResults(element)       gentle pulse on empty state
 *   - animateHelper(element)          fade-in helper card
 *   - attachDetailsMotion(root)       wire up <details> expand/collapse tween
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
        gsap.set(['.hero', '.search-panel', '.status', '.results'], { clearProps: 'all' });
        return;
      }

      const hero = document.querySelector('.hero');
      const search = document.querySelector('.search-panel');
      const status = document.querySelector('.status');

      const targets = [hero, search, status].filter(Boolean);
      if (!targets.length) return;

      gsap.set(targets, { autoAlpha: 0, y: 12 });
      gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.08
      });
    });
  }

  function animateEntries(elements) {
    if (!elements || !elements.length) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;

    gsap.from(elements, {
      autoAlpha: 0,
      y: 8,
      duration: 0.32,
      ease: 'power2.out',
      stagger: 0.025,
      clearProps: 'transform,opacity'
    });
  }

  function animateStatus(element) {
    if (!element) return;
    const gsap = ensureGsap();
    if (!gsap || REDUCED_MOTION) return;
    // Only animate when content actually changes (avoid flicker on initial empty string).
    if (!element.textContent) return;
    gsap.fromTo(
      element,
      { autoAlpha: 0.4, y: -2 },
      { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }
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
      y: 6,
      duration: 0.4,
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

      // The toggle event fires BEFORE the browser toggles the `open` attribute.
      // - item.open === true  => user clicked to close
      // - item.open === false => user clicked to open
      // For close we preventDefault so the attribute stays "true" during tween,
      // then flip it manually in onComplete. For open we let the native toggle
      // happen, then tween in.
      if (item.open) {
        // CLOSING: kill any in-flight tween, then animate out.
        gsap.killTweensOf(detail);
        event.preventDefault();
        gsap.to(detail, {
          autoAlpha: 0,
          height: 0,
          duration: 0.22,
          ease: 'power2.in',
          onComplete: () => {
            item.open = false;
            gsap.set(detail, { clearProps: 'height,opacity,visibility' });
          }
        });
      } else {
        // OPENING: kill any in-flight tween, then animate in.
        gsap.killTweensOf(detail);
        gsap.fromTo(
          detail,
          { autoAlpha: 0, height: 0 },
          {
            autoAlpha: 1,
            height: 'auto',
            duration: 0.3,
            ease: 'power2.out',
            clearProps: 'height'
          }
        );
      }
    }, true);
  }

  window.Motion = {
    init,
    animateEntries,
    animateStatus,
    animateNoResults,
    animateHelper,
    attachDetailsMotion
  };
})();
