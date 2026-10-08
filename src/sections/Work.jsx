import Reveal, { FadeUp } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const PROJECTS = [
  {
    id: 'M_001',
    name: 'Lumina',
    kind: 'Academic Project',
    year: '2026',
    desc: 'A seamless fusion of computer vision and architectural glass. Designed to empower the modern campus with Invisible Intelligence.',
    stack: ['Computer Vision', 'Smart Mirror', 'IoT'],
    link: 'https://github.com/sunwaycollege-research/lumina_smart_mirror',
    ascii: `
┌──────────────────┐
│  ◉  LUMINA  ◉    │
│  ┌────────────┐  │
│  │ face.detect│  │
│  │ ████████░░ │  │
│  └────────────┘  │
└──────────────────┘`,
  },
  {
    id: 'M_002',
    name: 'Incanto',
    kind: 'Personal Project',
    year: '2026',
    desc: 'An AI-powered gift and product finder that helps users discover personalized recommendations using intelligent matching and real-time e-commerce data.',
    stack: ['Recommender', 'NLP Matching', 'Live Data'],
    link: 'https://github.com/DawgyBey/Incanto',
    ascii: `
┌──────────────────┐
│ ✦ INCANTO ✦      │
│  query ──► embed │
│  embed ──► rank  │
│  rank  ──► gift  │
└──────────────────┘`,
  },
]

export default function Work() {
  return (
    <section id="work" className="section-light scroll-mt-20 bg-[#eceae5] text-[#0e0e0e]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="03" label="Selected Work" meta="case files" light />

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-10">
            {PROJECTS.map((p, i) => (
              <FadeUp
                key={p.id}
                delay={i * 120}
                className={i % 2 === 1 ? 'lg:mt-24' : ''}
              >
                <a href={p.link} target="_blank" rel="noreferrer" className="group block" data-cursor>
                  {/* viewer */}
                  <div className="relative overflow-hidden border border-black/20 bg-[#0e0e0e]">
                    <pre className="font-mono2 flex min-h-[280px] items-center justify-center p-6 text-[11px] leading-relaxed text-[#eceae5]/80 transition-transform duration-700 ease-[cubic-bezier(0.23,0.34,0.18,1)] group-hover:scale-105 md:min-h-[360px] md:text-sm">
                      {p.ascii}
                    </pre>
                    <span className="font-mono2 absolute left-4 top-4 text-[10px] uppercase tracking-[0.25em] text-white/50">
                      {p.id}
                    </span>
                    <span className="font-mono2 absolute bottom-4 right-4 flex h-11 items-center gap-2 bg-[#eceae5] px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0e0e0e] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      Open repo ↗
                    </span>
                  </div>

                  {/* caption */}
                  <div className="mt-6 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-3xl font-black uppercase tracking-tight md:text-4xl">
                        {p.name}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
                        {p.desc}
                      </p>
                      <div className="font-mono2 mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-black/50">
                        {p.stack.map((s) => (
                          <span key={s} className="border border-black/20 px-3 py-1.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="font-mono2 shrink-0 text-right text-[10px] uppercase leading-relaxed tracking-[0.2em] text-black/50">
                      {p.kind}
                      <br />
                      {p.year}
                    </span>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
