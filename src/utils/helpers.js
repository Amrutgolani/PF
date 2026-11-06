/** Smoothly scroll to a section by id, accounting for the sticky navbar. */
export function scrollToSection(id, { behavior } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH + 1;
  window.scrollTo({ top, behavior: behavior || (prefersReduced ? 'auto' : 'smooth') });
}

export function scrollToTop() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
}
