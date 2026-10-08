import { useEffect, useState } from 'react'

const LINKS = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Timeline', href: '#timeline' },
  { n: '03', label: 'Work', href: '#work' },
  { n: '04', label: 'Papers', href: '#papers' },
  { n: '05', label: 'Github', href: '#github' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] mix-blend-difference">
        <nav
          className="flex items-center justify-between px-5 py-4 text-[#eceae5] md:px-10 md:py-5"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <a
            href="#top"
            className="font-display flex h-11 items-center text-lg font-black tracking-tight"
            aria-label="Sulav Nepal — back to top"
          >
            SN<span className="font-mono2 ml-1 text-[10px] font-normal opacity-60">_v2.0</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.n}
                href={l.href}
                className="link-sweep font-mono2 flex h-11 items-center gap-1.5 text-[11px] uppercase tracking-[0.2em]"
              >
                <span className="opacity-40">{l.n}</span>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-mono2 ml-2 flex h-11 items-center border border-current px-5 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-[#eceae5] hover:text-black"
            >
              Hire me
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="font-mono2 flex h-11 items-center gap-2 text-[11px] uppercase tracking-[0.2em] lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? 'Close' : 'Menu'}
            <span className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-between bg-[#0e0e0e] px-5 pb-10 pt-28 transition-[clip-path] duration-500 ease-[cubic-bezier(0.23,0.34,0.18,1)] lg:hidden ${
          open ? '[clip-path:inset(0_0_0%_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        }`}
      >
        <div className="flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.n}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display flex min-h-[56px] items-baseline gap-4 border-b border-white/15 py-4 text-4xl font-black uppercase tracking-tight text-[#eceae5]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="font-mono2 text-xs font-normal text-white/40">{l.n}</span>
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="font-mono2 flex min-h-[56px] items-center justify-center border border-[#eceae5] text-xs font-bold uppercase tracking-[0.25em] text-[#eceae5]"
        >
          Hire me →
        </a>
      </div>
    </>
  )
}
