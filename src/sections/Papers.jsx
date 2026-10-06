import Reveal, { FadeUp, MaskLine } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

export default function Papers() {
  return (
    <section id="papers" className="scroll-mt-20 bg-[#0e0e0e] text-[#eceae5]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="04" label="Papers & Writing" meta="published" />

          <FadeUp>
            <a
              href="https://sulavnepal.com.np/assets/GuardNet%20Final%20Research%20Paper.pdf"
              target="_blank"
              rel="noreferrer"
              className="group grid gap-8 border border-white/15 p-6 transition-colors duration-300 hover:border-white/40 md:grid-cols-12 md:p-12"
              data-cursor
            >
              <div className="md:col-span-2">
                <span className="font-mono2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  PAPER_001
                </span>
                <div className="font-display mt-3 text-6xl font-black tracking-tight text-white/15 md:text-8xl">
                  ’26
                </div>
              </div>

              <div className="md:col-span-8">
                <h3 className="font-display max-w-2xl text-2xl font-black uppercase leading-tight tracking-tight md:text-4xl">
                  <MaskLine>Agentic Fraud Detection Framework</MaskLine>
                  <MaskLine delay={100}>
                    <span className="outline-text-dark">for Digital Payments</span>
                  </MaskLine>
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
                  A multi-agent framework for detecting fraud in Nepal&apos;s digital payments. It
                  combines velocity, geolocation, behavioral, and graph signals to assess
                  transactions and recommend an approve, OTP, or block decision.
                </p>
                <div className="font-mono2 mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                  <span className="border border-white/20 px-3 py-1.5">Research Paper</span>
                  <span className="border border-white/20 px-3 py-1.5">Multi-Agent Systems</span>
                  <span className="border border-white/20 px-3 py-1.5">Fraud Detection · 2026</span>
                </div>
              </div>

              <div className="flex items-end md:col-span-2 md:justify-end">
                <span className="font-mono2 flex min-h-[48px] items-center gap-2 border border-white/25 px-5 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 group-hover:bg-[#eceae5] group-hover:text-[#0e0e0e]">
                  Read PDF ↗
                </span>
              </div>
            </a>
          </FadeUp>
        </Reveal>
      </div>
    </section>
  )
}
