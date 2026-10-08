import Reveal, { FadeUp } from '../components/Reveal'
import SectionHead from '../components/SectionHead'

const REPOS = [
  {
    name: 'aws-react-ec2-cloudformation-github-actions',
    lang: 'CSS',
    note: 'No description provided.',
    url: 'https://github.com/DawgyBey/aws-react-ec2-cloudformation-github-actions',
  },
  {
    name: 'aws-ec2-cloudformation-github-actions',
    lang: 'GitHub Repo',
    note: 'No description provided.',
    url: 'https://github.com/DawgyBey/aws-ec2-cloudformation-github-actions',
  },
  {
    name: 'LAXSHOBA',
    lang: 'JavaScript',
    note: 'No description provided.',
    url: 'https://github.com/DawgyBey/LAXSHOBA',
  },
  {
    name: 'Yeti',
    lang: 'MIT License',
    note: 'No description provided.',
    url: 'https://github.com/DawgyBey/Yeti',
  },
  {
    name: 'Basic-Git-and-Github-Training',
    lang: 'GitHub Repo',
    note: 'Delete Lab 7',
    url: 'https://github.com/DawgyBey/Basic-Git-and-Github-Training',
  },
  {
    name: 'CodeCartel',
    lang: 'GitHub Repo',
    note: 'Hackathon ty c',
    url: 'https://github.com/DawgyBey/CodeCartel',
  },
]

export default function Github() {
  return (
    <section id="github" className="section-light scroll-mt-20 bg-[#eceae5] text-[#0e0e0e]">
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <SectionHead index="05" label="Open Source" meta="@DawgyBey — synced" light />

          <div className="grid grid-cols-1 border-l border-t border-black/15 sm:grid-cols-2 lg:grid-cols-3">
            {REPOS.map((r, i) => (
              <FadeUp key={r.name} delay={(i % 3) * 90}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="group flex h-full min-h-[200px] flex-col justify-between border-b border-r border-black/15 p-6 transition-colors duration-300 hover:bg-[#0e0e0e] hover:text-[#eceae5] md:min-h-[240px] md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono2 text-[10px] uppercase tracking-[0.25em] text-black/40 group-hover:text-white/40">
                      {String(i + 1).padStart(3, '0')}
                    </span>
                    <span className="font-mono2 text-lg leading-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="font-mono2 break-words text-sm font-bold leading-snug md:text-base">
                      {r.name}
                    </h3>
                    <p className="mt-2 text-xs text-black/50 group-hover:text-white/50">{r.note}</p>
                    <span className="font-mono2 mt-4 inline-block border border-black/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-black/50 group-hover:border-white/25 group-hover:text-white/60">
                      {r.lang}
                    </span>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <a
              href="https://github.com/DawgyBey"
              target="_blank"
              rel="noreferrer"
              className="font-mono2 mt-10 inline-flex min-h-[48px] items-center gap-3 border border-black/30 px-6 text-xs font-bold uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-[#0e0e0e] hover:text-[#eceae5]"
            >
              github.com/DawgyBey ↗
            </a>
          </FadeUp>
        </Reveal>
      </div>
    </section>
  )
}
