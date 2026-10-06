import { useEffect, useRef, useState } from 'react'

/**
 * Crosshair cursor: vertical + horizontal hairlines that follow the pointer.
 * Desktop (fine pointer) only — hidden entirely on touch devices.
 * Expands into a labelled ring over interactive elements.
 */
export default function Crosshair() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const vRef = useRef(null)
  const hRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    let x = -100
    let y = -100
    let raf = 0

    const render = () => {
      if (vRef.current) vRef.current.style.transform = `translateX(${x}px)`
      if (hRef.current) hRef.current.style.transform = `translateY(${y}px)`
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
    }

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      const target = e.target 
      setHovering(!!target?.closest('a, button, [data-cursor]'))
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      <div
        ref={vRef}
        className="absolute top-0 h-full w-px bg-white/25 mix-blend-difference"
        style={{ left: 0 }}
      />
      <div
        ref={hRef}
        className="absolute left-0 h-px w-full bg-white/25 mix-blend-difference"
        style={{ top: 0 }}
      />
      <div
        ref={dotRef}
        className={`absolute left-0 top-0 flex items-center justify-center rounded-full border border-white mix-blend-difference transition-[width,height] duration-300 ${
          hovering ? 'h-10 w-10' : 'h-2 w-2 bg-white'
        }`}
      />
    </div>
  )
}
