import Reveal, { FadeUp, MaskLine } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const STEPS = [
  {
    year: '2022',
    title: 'Intro to C programming',
    body: 'Learned fundamental concepts like variables, loops, conditional logic, and memory allocation.',
    tag: 'epoch_00',
  },
  {
    year: '2023',
    title: 'HTML, CSS, JS',
    body: 'Started building dynamic web pages, learning about DOM manipulation, responsive layouts, and CSS styling.',
    tag: 'epoch_01',
  },
  {
    year: '2024',
    title: 'Python Basic',
    body: 'Learned Python programming, writing automation scripts, sorting algorithms, and working with CLI apps.',
    tag: 'epoch_02',
  },
  {
    year: '2025',
    title: 'UI/UX Design',
    body: 'Discovered wireframing, layout hierarchy, and user-centric design principles in Figma.',
    tag: 'epoch_03',
  },
  {
    year: '2026',
    title: 'Pandas, NumPy · model training',
    body: 'Exploring data science, training basic regression models, and data visualization.',
    tag: 'epoch_04',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 bg-[#0e0e0e] text-[#eceae5]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="02" label="Training Log" meta="2022 → present" />

          <h2 className="font-display mb-14 font-black uppercase leading-[0.9] tracking-[-0.02em] md:mb-20">
            <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]">Skills,</MaskLine>
            <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={120}>
              <span className="outline-text-dark">over time.</span>
            </MaskLine>
          </h2>

          <div className="relative">
            {/* spine */}
            <div className="absolute bottom-0 left-[7px] top-0 w-px bg-white/15 md:left-1/2" />

            {STEPS.map((s, i) => {
              const leftSide = i % 2 === 0
              return (
                <FadeUp key={s.year} delay={80} className="relative pb-14 last:pb-0 md:pb-20">
                  {/* node */}
                  <span className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center md:left-1/2 md:-translate-x-1/2">
                    <span className="absolute h-full w-full rounded-full border border-white/40" />
                    <span className="h-[5px] w-[5px] rounded-full bg-[#eceae5]" />
                  </span>

                  <div
                    className={`pl-10 md:w-1/2 md:pl-0 ${
                      leftSide ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
                    }`}
                  >
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                      {s.tag} · {s.year}
                    </span>
                    <h3 className="font-display mt-2 text-2xl font-black uppercase tracking-tight md:text-3xl">
                      {s.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-md text-sm leading-relaxed text-white/60 md:text-base ${
                        leftSide ? 'md:ml-auto' : ''
                      }`}
                    >
                      {s.body}
                    </p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
