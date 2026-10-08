import { useEffect, useRef } from 'react'

/**
 * IntersectionObserver wrapper — adds `.is-revealed` once the element
 * enters the viewport, driving the mask / fade-up CSS transitions.
 */
export default function Reveal({ children, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** One line of a mask reveal. */
export function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`mask-line ${className}`}>
      <span style={{ '--reveal-delay': `${delay}ms` }}>{children}</span>
    </span>
  )
}

/** Fade-up block. */
export function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <div className={`fade-up ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      {children}
    </div>
  )
}
