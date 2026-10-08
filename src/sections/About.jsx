import Reveal, { FadeUp, MaskLine } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const STATS = [
  { value: '04', label: 'Years learning' },
  { value: '12', label: 'Projects built' },
  { value: '500+', label: 'GitHub commits' },
]

export default function About() {
  return (
    <section id="about" className="section-light scroll-mt-20 bg-[#eceae5] text-[#0e0e0e]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="01" label="About" meta="system.identity" light />

          <div className="grid gap-12 md:grid-cols-12">
            <h2 className="font-display font-black uppercase leading-[0.9] tracking-[-0.02em] md:col-span-7">
              <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={50}>
                Aspiring software
              </MaskLine>
              <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={150}>
                developer<span className="text-black/30">,</span> learning
              </MaskLine>
              <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={250}>
                <span className="outline-text-light">data science</span> &
              </MaskLine>
              <MaskLine className="text-[clamp(2.2rem,5.5vw,5rem)]" delay={350}>
                machine learning.
              </MaskLine>
            </h2>

            <div className="md:col-span-5 md:pt-3">
              <FadeUp>
                <figure className="group mb-8 max-w-md">
                  <img
                    src="/me.jpg"
                    alt="Portrait of Sulav Nepal"
                    className="aspect-[4/5] w-full border border-black/20 object-cover grayscale contrast-110 transition-[filter] duration-500 group-hover:grayscale-0"
                  />
                  <figcaption className="font-mono2 mt-3 text-[10px] uppercase tracking-[0.25em] text-black/40">
                    Sulav, Kathmandu
                  </figcaption>
                </figure>
              </FadeUp>
              <FadeUp delay={200}>
                <p className="max-w-md text-base leading-relaxed text-black/70 md:text-lg">
                  I am a passionate computer science student who started coding with basic
                  programming concepts and quickly fell in love with software development. I enjoy
                  building functional websites and exploring data analysis libraries.
                </p>
                <p className="mt-6 max-w-md text-base leading-relaxed text-black/70 md:text-lg">
                  Currently pursuing my degree, I am focused on mastering core software engineering
                  practices, learning Python, and collaborating on academic and open-source projects
                  to solve real-world problems.
                </p>
              </FadeUp>
            </div>
          </div>

          {/* stats strip */}
          <div className="mt-16 grid grid-cols-1 border border-black/15 sm:grid-cols-3 md:mt-24">
            {STATS.map((s, i) => (
              <FadeUp
                key={s.label}
                delay={i * 120}
                className={`flex items-baseline justify-between gap-4 px-6 py-8 sm:flex-col sm:justify-normal sm:gap-2 md:px-10 md:py-10 ${
                  i > 0 ? 'border-t border-black/15 sm:border-l sm:border-t-0' : ''
                }`}
              >
                <span className="font-display text-5xl font-black tracking-tight md:text-7xl">
                  {s.value}
                </span>
                <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-black/50 md:text-xs">
                  {s.label}
                </span>
              </FadeUp>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
