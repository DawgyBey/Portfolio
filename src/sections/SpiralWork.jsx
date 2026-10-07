import { useEffect, useRef, useState } from 'react'
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, PlaneGeometry, ShaderMaterial,
  CanvasTexture, TextureLoader, SRGBColorSpace, Raycaster, Vector2,
} from 'three'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import { PROJECTS } from '../data/projects'

/* ------------------------------------------------------------------ */
/*  Spiral / list showcase                                             */
/*  Tiles are curved WebGL planes on a helix. Page scroll flies the     */
/*  camera through them; scroll speed shears + blurs the tiles.         */
/* ------------------------------------------------------------------ */

const GAP = 2.0            // distance between tiles along the tunnel
const MIN_TILES = 12       // pad with decorative tiles so the spiral feels full
const PER_TILE_VH = 34     // scroll length per tile
const ASPECT = 1.6         // tile width / height
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

/** Interleave real projects with decorative art tiles. */
function buildTiles() {
  const tiles = []
  PROJECTS.forEach((p) => {
    tiles.push({ project: p })
    tiles.push({}, {}, {})
  })
  while (tiles.length < MIN_TILES) tiles.push({})
  return tiles
}
const TILES = buildTiles()
const T = TILES.length

function rng(seed) {
  let s = seed * 9301 + 49297
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280)
}

/** Procedural cover art (no image files needed). */
function paintCover(tile, index) {
  const W = 800, H = 500
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const g = c.getContext('2d')
  const r = rng(index + 3)
  const hue = tile.project ? (PROJECTS.indexOf(tile.project) * 140 + 210) % 360 : r() * 360
  const lg = g.createLinearGradient(0, 0, W, H)
  lg.addColorStop(0, `hsl(${hue}, 90%, ${tile.project ? 38 : 58}%)`)
  lg.addColorStop(1, `hsl(${(hue + 70) % 360}, 95%, ${tile.project ? 22 : 52}%)`)
  g.fillStyle = lg
  g.fillRect(0, 0, W, H)
  for (let i = 0; i < 6; i++) {
    const x = r() * W, y = r() * H, rad = 120 + r() * 240
    const rg = g.createRadialGradient(x, y, 0, x, y, rad)
    const h2 = (hue + r() * 120 - 30 + 360) % 360
    rg.addColorStop(0, `hsla(${h2}, 100%, ${50 + r() * 25}%, .85)`)
    rg.addColorStop(1, `hsla(${h2}, 100%, 60%, 0)`)
    g.fillStyle = rg
    g.fillRect(0, 0, W, H)
  }
  if (tile.project) {
    const p = tile.project
    g.fillStyle = 'rgba(8,8,8,.72)'
    g.fillRect(40, 40, W - 80, H - 80)
    g.strokeStyle = 'rgba(255,255,255,.35)'
    g.lineWidth = 2
    g.strokeRect(40, 40, W - 80, H - 80)
    g.fillStyle = 'rgba(255,255,255,.55)'
    g.font = '500 20px "JetBrains Mono", monospace'
    g.fillText(p.id, 64, 80)
    g.fillStyle = '#eceae5'
    g.font = '500 26px "JetBrains Mono", monospace'
    const lines = p.ascii || []
    const startY = H / 2 - (lines.length * 34) / 2 + 16
    lines.forEach((ln, i) => g.fillText(ln, W / 2 - ln.length * 7.9, startY + i * 34))
    g.font = '900 44px Archivo, Arial, sans-serif'
    g.fillText(p.name.toUpperCase(), 64, H - 66)
  }
  return c
}

const VERT = /* glsl */ `
  uniform float uBend, uVel, uTime;
  varying vec2 vUv; varying float vDepth;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.z += p.x * p.x * uBend;                    // curved panel
    p.x += (uv.y - 0.5) * uVel * 0.38;            // scroll-speed shear
    p.y += (uv.x - 0.5) * uVel * 0.1;
    p.z += sin(uv.x * 6.2831 + uTime) * 0.015 * (0.3 + abs(uVel));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }`

const FRAG = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uCrop;
  uniform float uVel, uHover;
  varying vec2 vUv; varying float vDepth;
  float rbox(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q,0.)) + min(max(q.x,q.y),0.) - r; }
  void main() {
    vec2 uv = (vUv - 0.5) * uCrop + 0.5;
    float b = abs(uVel) * 0.02;
    vec4 c = vec4(0.);
    for (int i = -3; i <= 3; i++) c += texture2D(uTex, uv + vec2(float(i) * b, 0.));
    c /= 7.;
    float d = rbox((vUv - 0.5) * vec2(1.6, 1.0), vec2(0.8, 0.5), 0.07);
    float a = 1.0 - smoothstep(0.0, 0.012, d);
    float fade = (1.0 - smoothstep(12.0, 20.0, vDepth)) * smoothstep(0.6, 2.2, vDepth);
    c.rgb *= 1.0 + uHover * 0.18;
    gl_FragColor = vec4(c.rgb, a * fade);
    #include <colorspace_fragment>
  }`

export default function SpiralWork() {
  const sectionRef = useRef(null)
  const canvasWrap = useRef(null)
  const [mode, setMode] = useState('spiral')
  const [active, setActive] = useState(0)
  const [hoverLabel, setHoverLabel] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setMode('list')
  }, [])

  useEffect(() => {
    if (mode !== 'spiral') return
    const wrap = canvasWrap.current
    if (!wrap) return

    let renderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setMode('list')
      return
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    const canvas = renderer.domElement
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y'
    wrap.appendChild(canvas)

    const scene = new Scene()
    const camera = new PerspectiveCamera(46, 1, 0.1, 60)
    const pivot = new Group()
    const tunnel = new Group()
    pivot.add(tunnel)
    scene.add(pivot)

    const loader = new TextureLoader()
    loader.setCrossOrigin('anonymous')
    const meshes = []
    const geo = new PlaneGeometry(1, 1 / ASPECT, 24, 16)

    TILES.forEach((tile, i) => {
      const r = rng(i + 11)
      const tex = new CanvasTexture(paintCover(tile, i))
      tex.colorSpace = SRGBColorSpace
      tex.anisotropy = 8
      const mat = new ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTex: { value: tex }, uCrop: { value: [1, 1] },
          uBend: { value: 0.1 }, uVel: { value: 0 }, uHover: { value: 0 }, uTime: { value: 0 },
        },
      })
      if (tile.project?.cover) {
        loader.load(tile.project.cover, (t) => {
          t.colorSpace = SRGBColorSpace
          t.anisotropy = 8
          const ar = t.image.width / t.image.height
          mat.uniforms.uCrop.value = ar > ASPECT ? [ASPECT / ar, 1] : [1, ar / ASPECT]
          mat.uniforms.uTex.value = t
        })
      }
      const mesh = new Mesh(geo, mat)
      const real = !!tile.project
      const ang = i * 2.399963
      const rad = real ? 0.9 + r() * 0.5 : 1.2 + r() * 2.4
      const size = real ? 1.9 : 1.1 + r() * 0.9
      mesh.scale.setScalar(size)
      mesh.position.set(Math.cos(ang) * rad, Math.sin(ang) * rad * 0.8, -4 - i * GAP)
      mesh.rotation.set(Math.sin(ang) * 0.16, -Math.cos(ang) * 0.18, (r() - 0.5) * 0.22)
      mesh.userData = { i, tile, base: size, hover: 0, roll: mesh.rotation.z }
      tunnel.add(mesh)
      meshes.push(mesh)
    })

    const realIdx = TILES.map((t, i) => (t.project ? i : -1)).filter((i) => i >= 0)

    /* ---- sizing ---- */
    const resize = () => {
      const w = wrap.clientWidth, h = wrap.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      const s = clamp(camera.aspect / 1.5, 0.5, 1)
      tunnel.scale.set(s, s, 1)
    }
    resize()
    window.addEventListener('resize', resize)

    /* ---- pointer ---- */
    const ray = new Raycaster()
    const ndc = new Vector2(9, 9)
    const mouse = { x: 0, y: 0 }
    let hovered = -1
    const onMove = (e) => {
      const b = canvas.getBoundingClientRect()
      ndc.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1)
      mouse.x = ndc.x; mouse.y = ndc.y
    }
    const onLeave = () => { ndc.set(9, 9); mouse.x = mouse.y = 0 }
    const onClick = () => {
      if (hovered >= 0) {
        const p = TILES[hovered].project
        if (p?.link) window.open(p.link, '_blank', 'noopener')
      }
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('click', onClick)

    /* ---- visibility ---- */
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: '200px' })
    io.observe(sectionRef.current)

    /* ---- loop ---- */
    let cur = 0, vel = 0, raf = 0, lastActive = 0, lastLabel = '', lastProg = -1
    const t0 = performance.now()
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const r = sectionRef.current.getBoundingClientRect()
      const target = clamp(-r.top / (r.height - window.innerHeight), 0, 1)
      const prev = cur
      cur += (target - cur) * 0.075
      if (Math.abs(target - cur) < 1e-5) cur = target
      const worldSpeed = (cur - prev) * (T - 1) * GAP
      vel += (clamp(worldSpeed * 1.3, -1, 1) - vel) * 0.18
      const time = (performance.now() - t0) / 1000

      tunnel.position.z = cur * (T - 1) * GAP
      tunnel.rotation.z = cur * Math.PI * 1.1 + vel * 0.12 + time * 0.01
      pivot.rotation.y += (mouse.x * 0.09 - pivot.rotation.y) * 0.05
      pivot.rotation.x += (-mouse.y * 0.06 - pivot.rotation.x) * 0.05

      ray.setFromCamera(ndc, camera)
      const hit = ray.intersectObjects(meshes, false).find((h) => {
        const depth = camera.position.z - h.point.z
        return depth > 2 && depth < 16
      })
      hovered = hit ? hit.object.userData.i : -1
      const label = hovered < 0 ? '' : TILES[hovered].project ? `${TILES[hovered].project.id} — ${TILES[hovered].project.name} · click to open` : 'In development'
      if (label !== lastLabel) { lastLabel = label; setHoverLabel(label) }
      canvas.style.cursor = hovered >= 0 && TILES[hovered].project ? 'pointer' : 'default'
      if (hovered >= 0 && TILES[hovered].project) canvas.setAttribute('data-cursor', ''); else canvas.removeAttribute('data-cursor')

      meshes.forEach((m) => {
        const u = m.material.uniforms
        u.uVel.value = vel
        u.uTime.value = time
        m.userData.hover += ((m.userData.i === hovered ? 1 : 0) - m.userData.hover) * 0.12
        u.uHover.value = m.userData.hover
        m.scale.setScalar(m.userData.base * (1 + m.userData.hover * 0.06))
        m.rotation.z = m.userData.roll - tunnel.rotation.z // keep tiles landscape while the spiral twists
      })

      const pos = cur * (T - 1)
      let best = 0, bd = 1e9
      realIdx.forEach((ti, k) => { const d = Math.abs(ti - pos); if (d < bd) { bd = d; best = k } })
      if (best !== lastActive) { lastActive = best; setActive(best) }
      const pr = Math.round(cur * 100)
      if (pr !== lastProg) { lastProg = pr; setProgress(pr) }

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('click', onClick)
      meshes.forEach((m) => { m.material.uniforms.uTex.value.dispose(); m.material.dispose() })
      geo.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [mode])

  const proj = PROJECTS[active] || PROJECTS[0]
  const isSpiral = mode === 'spiral'

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative scroll-mt-20 bg-[#0e0e0e] text-[#eceae5]"
      style={isSpiral ? { height: `calc(100vh + ${(T - 1) * PER_TILE_VH}vh)` } : undefined}
    >
      <div className={isSpiral ? 'sticky top-0 h-screen overflow-hidden' : 'relative min-h-screen'}>
        <div className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 pt-24 md:px-10">
          <Reveal>
            <SectionHead index="03" label="Selected Work" meta={isSpiral ? 'scroll to travel' : 'index'} />
          </Reveal>
          <div className="font-mono2 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.25em]">
            <button onClick={() => setMode('spiral')} data-cursor className={isSpiral ? 'text-white' : 'text-white/40 hover:text-white'}>Spiral</button>
            <span className={`h-1.5 w-1.5 rounded-full bg-white transition-transform ${isSpiral ? '-translate-x-0' : 'translate-x-0 opacity-40'}`} />
            <button onClick={() => setMode('list')} data-cursor className={!isSpiral ? 'text-white' : 'text-white/40 hover:text-white'}>List</button>
          </div>
        </div>

        {isSpiral ? (
          <>
            <div ref={canvasWrap} className="absolute inset-0 z-0" />

            {/* info */}
            <div className="pointer-events-none absolute bottom-8 left-5 z-10 max-w-md md:bottom-12 md:left-10">
              <p className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                {String(active + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')} · {proj.kind} · {proj.year}
              </p>
              <h3 key={proj.id} className="font-display mt-2 text-4xl font-black uppercase leading-none tracking-tight md:text-6xl" style={{ animation: 'infoIn .6s cubic-bezier(.23,.34,.18,1)' }}>
                {proj.name}
              </h3>
              <p className="mt-3 hidden text-sm leading-relaxed text-white/60 md:block">{proj.desc}</p>
              <a href={proj.link} target="_blank" rel="noreferrer" data-cursor className="link-sweep font-mono2 pointer-events-auto mt-4 inline-block text-[11px] font-bold uppercase tracking-[0.2em]">
                Open repo ↗
              </a>
            </div>

            <div className="font-mono2 pointer-events-none absolute bottom-8 right-5 z-10 text-right text-[10px] uppercase tracking-[0.25em] text-white/50 md:bottom-12 md:right-10">
              <div className="mb-2 h-px w-24 bg-white/20"><div className="h-px bg-white" style={{ width: `${progress}%` }} /></div>
              {hoverLabel || 'scroll ↓'}
            </div>
            <style>{`@keyframes infoIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}`}</style>
          </>
        ) : (
          <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24 pt-12 md:px-10">
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <a href={p.link} target="_blank" rel="noreferrer" data-cursor className="group grid items-baseline gap-4 py-8 md:grid-cols-[120px_1fr_1.2fr_auto] md:gap-8">
                    <span className="font-mono2 text-xs tracking-[0.25em] text-white/40">{p.id}</span>
                    <span className="font-display text-4xl font-black uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{p.name}</span>
                    <span className="text-sm leading-relaxed text-white/60">{p.desc}</span>
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.2em] text-white/50">{p.kind}<br />{p.year}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
