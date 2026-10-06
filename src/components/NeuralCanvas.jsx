import { useEffect, useRef } from 'react'

/**
 * Monochrome neural-network particle field.
 * Nodes drift with velocity vectors; edges draw between nodes within a
 * threshold distance. Pointer acts as an attractor, like an input signal.
 */
export default function NeuralCanvas({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let nodes = []
    let raf = 0
    const pointer = { x: -9999, y: -9999, active: false }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(110, Math.max(34, Math.floor((width * height) / 16000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    const threshold = () => Math.min(170, Math.max(110, width / 9))

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)
      const th = threshold()

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        // pointer attraction — the "input signal"
        if (pointer.active) {
          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const d = Math.hypot(dx, dy)
          if (d < 220 && d > 0.001) {
            const f = ((220 - d) / 220) * 0.012
            n.vx += (dx / d) * f
            n.vy += (dy / d) * f
          }
        }

        // damp + clamp speed
        n.vx *= 0.995
        n.vy *= 0.995
        const sp = Math.hypot(n.vx, n.vy)
        const max = 0.6
        if (sp > max) {
          n.vx = (n.vx / sp) * max
          n.vy = (n.vy / sp) * max
        }
        if (sp < 0.08) {
          n.vx += (Math.random() - 0.5) * 0.02
          n.vy += (Math.random() - 0.5) * 0.02
        }

        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20
      }

      // edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < th * th) {
            const alpha = (1 - Math.sqrt(d2) / th) * 0.32
            ctx.strokeStyle = `rgba(236,234,229,${alpha.toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // nodes — a few "fire" with a soft halo, like activations
      for (const n of nodes) {
        const glow = (Math.sin(t / 900 + n.pulse) + 1) / 2
        if (glow > 0.86) {
          ctx.fillStyle = `rgba(236,234,229,${(0.1 * glow).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(n.x, n.y, n.r * 7, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = `rgba(236,234,229,${(0.45 + glow * 0.55).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const loop = (t) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      pointer.x = -9999
      pointer.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    if (reduced) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
