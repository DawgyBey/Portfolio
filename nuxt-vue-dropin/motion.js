// Framework-free motion helpers. Client-side only (guard with import.meta.client in Nuxt).

/** Adds .is-revealed to every `[data-reveal]` once it scrolls into view. Returns a cleanup fn. */
export function initReveal(root = document, selector = '[data-reveal]') {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target) }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' })
  root.querySelectorAll(selector).forEach((el) => io.observe(el))
  return () => io.disconnect()
}

/** Crosshair cursor (fine pointers only, respects reduced motion). Returns a cleanup fn. */
export function initCrosshair() {
  if (!matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  const wrap = document.createElement('div')
  wrap.className = 'crosshair'
  wrap.setAttribute('aria-hidden', 'true')
  wrap.innerHTML = '<div class="crosshair__v"></div><div class="crosshair__h"></div><div class="crosshair__dot"></div>'
  document.body.appendChild(wrap)
  const [v, h, dot] = wrap.children
  let x = -100, y = -100, raf = 0
  const render = () => {
    v.style.transform = `translateX(${x}px)`
    h.style.transform = `translateY(${y}px)`
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
  }
  const move = (e) => {
    x = e.clientX; y = e.clientY
    wrap.classList.toggle('is-hovering', !!e.target.closest?.('a, button, [data-cursor]'))
    cancelAnimationFrame(raf); raf = requestAnimationFrame(render)
  }
  addEventListener('pointermove', move, { passive: true })
  return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf); wrap.remove() }
}
