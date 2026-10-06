import Reveal, { FadeUp, MaskLine } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

export default function Contact() {
  return (
    <footer id="contact" className="section-light scroll-mt-20 bg-[#eceae5] text-[#0e0e0e]">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-24 md:px-10 md:pt-36">
        <Reveal>
          <SectionHead index="07" label="Get In Touch" meta="start a conversation" light />

          <a href="mailto:sulavinjob@gmail.com" className="group block" data-cursor>
            <h2 className="font-display font-black uppercase leading-[0.85] tracking-[-0.03em]">
              <MaskLine className="text-[clamp(2.6rem,9vw,9rem)]">Let&apos;s build</MaskLine>
              <MaskLine className="text-[clamp(2.6rem,9vw,9rem)]" delay={120}>
                <span className="outline-text-light transition-colors duration-300 group-hover:text-[#0e0e0e]">
                  something
                </span>
              </MaskLine>
              <MaskLine className="text-[clamp(2.6rem,9vw,9rem)]" delay={240}>
                together <span className="align-top text-[0.4em]">↗</span>
              </MaskLine>
            </h2>
          </a>

          <FadeUp delay={300}>
            <div className="mt-16 grid gap-10 border-t border-black/15 pt-10 md:mt-24 md:grid-cols-3">
              <div>
                <span className="font-mono2 block text-[10px] uppercase tracking-[0.25em] text-black/40">
                  Email
                </span>
                <a
                  href="mailto:sulavinjob@gmail.com"
                  className="link-sweep font-mono2 mt-3 inline-flex min-h-[44px] items-center text-sm font-bold md:text-base"
                >
                  sulavinjob@gmail.com
                </a>
              </div>
              <div>
                <span className="font-mono2 block text-[10px] uppercase tracking-[0.25em] text-black/40">
                  Social
                </span>
                <div className="mt-3 flex flex-col items-start gap-1">
                  <a
                    href="https://www.linkedin.com/in/sulav-nepal/"
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep font-mono2 inline-flex min-h-[44px] items-center text-sm font-bold"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://x.com/Dawgybey"
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep font-mono2 inline-flex min-h-[44px] items-center text-sm font-bold"
                  >
                    Twitter / X ↗
                  </a>
                  <a
                    href="https://github.com/DawgyBey"
                    target="_blank"
                    rel="noreferrer"
                    className="link-sweep font-mono2 inline-flex min-h-[44px] items-center text-sm font-bold"
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div>
                <span className="font-mono2 block text-[10px] uppercase tracking-[0.25em] text-black/40">
                  Status
                </span>
                <p className="font-mono2 mt-3 text-sm leading-relaxed text-black/60">
                  <span className="blink mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#0e0e0e] align-middle" />
                  Open to internships & junior developer roles
                </p>
              </div>
            </div>
          </FadeUp>

          <div
            className="font-mono2 mt-20 flex flex-col items-start justify-between gap-4 border-t border-black/15 py-6 text-[10px] uppercase tracking-[0.25em] text-black/40 md:flex-row md:items-center"
            style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
          >
            <span>Sulav Nepal — Student & Aspiring Software Developer (Class of 2026)</span>
            <span>© 2026 — Designed in monochrome. Trained in public.</span>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
