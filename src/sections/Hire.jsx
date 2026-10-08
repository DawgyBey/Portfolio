import Reveal, { FadeUp, MaskLine } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const SERVICES = [
  {
    n: 'S_01',
    title: 'Web Development',
    body: 'Building clean, responsive front-end websites using HTML, CSS, and modern JavaScript.',
  },
  {
    n: 'S_02',
    title: 'Python Scripting',
    body: 'Writing scripts to automate simple tasks, parse data files, and perform basic data analysis.',
  },
  {
    n: 'S_03',
    title: 'Collaborative Projects',
    body: 'Eager to join team hackathons, contribute to open source, or work on group software projects.',
  },
]

export default function Hire() {
  return (
    <section id="hire" className="scroll-mt-20 bg-[#0e0e0e] text-[#eceae5]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="06" label="Work With Me" meta="collaboration" />

          <h2 className="font-display mb-6 font-black uppercase leading-[0.9] tracking-[-0.02em]">
            <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]">Open to internships</MaskLine>
            <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={120}>
              & <span className="outline-text-dark">junior developer roles.</span>
            </MaskLine>
          </h2>

          <FadeUp delay={250}>
            <p className="font-mono2 mb-14 max-w-lg text-xs uppercase leading-relaxed tracking-[0.2em] text-white/50 md:mb-20">
              // currently accepting: internships · junior roles · hackathon teams
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 border-l border-t border-white/15 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FadeUp
                key={s.n}
                delay={i * 120}
                className="group border-b border-r border-white/15 p-6 transition-colors duration-300 hover:bg-[#eceae5] hover:text-[#0e0e0e] md:min-h-[280px] md:p-10"
              >
                <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-white/40 group-hover:text-black/40">
                  {s.n}
                </span>
                <h3 className="font-display mt-8 text-2xl font-black uppercase tracking-tight md:mt-16 md:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60 group-hover:text-black/60 md:text-base">
                  {s.body}
                </p>
              </FadeUp>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
