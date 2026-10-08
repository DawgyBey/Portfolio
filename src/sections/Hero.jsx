import NeuralCanvas from '../components/NeuralCanvas'
import Reveal, { FadeUp, MaskLine } from '../components/Reveal'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col overflow-hidden bg-[#0e0e0e]">
      <NeuralCanvas className="absolute inset-0 h-full w-full" />

      {/* corner metadata */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
        <span className="font-mono2 absolute left-10 top-24 text-[10px] uppercase tracking-[0.25em] text-white/40">
          The Builders — Class of 2026
        </span>
        <span className="font-mono2 absolute right-10 top-24 text-[10px] uppercase tracking-[0.25em] text-white/40">
          Kathmandu, NP — 27.7172° N
        </span>
        <span className="font-mono2 absolute bottom-10 left-10 text-[10px] uppercase tracking-[0.25em] text-white/40">
          <span className="blink mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#eceae5] align-middle" />
          System online — open to work
        </span>
        <span className="font-mono2 absolute bottom-10 right-10 text-[10px] uppercase tracking-[0.25em] text-white/40">
          Scroll to train ↓
        </span>
      </div>

      <div className="relative z-20 flex flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center">
        <Reveal>
          <FadeUp>
            <p className="font-mono2 mb-6 inline-flex items-center gap-3 border border-white/25 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-white/70 md:text-xs">
              <span className="blink h-1.5 w-1.5 rounded-full bg-[#eceae5]" />
              Verified profile · Student & Aspiring Software Developer
            </p>
          </FadeUp>

          <h1 className="font-display font-black uppercase leading-[0.82] tracking-[-0.03em] text-[#eceae5]">
            <MaskLine className="text-[clamp(4rem,17vw,15rem)]" delay={100}>
              Sulav
            </MaskLine>
            <MaskLine className="text-[clamp(4rem,17vw,15rem)]" delay={220}>
              <span className="outline-text-dark">Nepal</span>
            </MaskLine>
          </h1>

          <FadeUp delay={400}>
            <p className="font-mono2 mx-auto mt-8 max-w-md text-xs leading-relaxed tracking-[0.15em] text-white/60 md:text-sm">
              CLASS OF 2026 — BUILDING CLEAN WEB APPLICATIONS,
              <br className="hidden md:block" /> LEARNING MACHINES THAT LEARN.
            </p>
          </FadeUp>

          <FadeUp delay={550}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <a
                href="#work"
                className="font-mono2 flex min-h-[48px] items-center bg-[#eceae5] px-8 text-xs font-bold uppercase tracking-[0.25em] text-[#0e0e0e] transition-colors duration-300 hover:bg-white"
              >
                View work →
              </a>
              <a
                href="#contact"
                className="font-mono2 flex min-h-[48px] items-center border border-white/30 px-8 text-xs font-bold uppercase tracking-[0.25em] text-[#eceae5] transition-colors duration-300 hover:border-[#eceae5] hover:bg-[#eceae5] hover:text-[#0e0e0e]"
              >
                Hire me
              </a>
            </div>
          </FadeUp>
        </Reveal>
      </div>
    </section>
  )
}
