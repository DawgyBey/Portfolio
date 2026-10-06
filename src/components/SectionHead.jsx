import { MaskLine } from './Reveal'

/** Mono-numbered section header: `01 // ABOUT` + right-side metadata. */
export default function SectionHead({ index, label, meta, light = false }) {
  return (
    <div
      className={`mb-12 flex items-end justify-between gap-4 border-b pb-4 md:mb-16 ${
        light ? 'border-black/15' : 'border-white/15'
      }`}
    >
      <div className="font-mono2 flex items-baseline gap-3 text-xs uppercase tracking-[0.25em] md:text-sm">
        <span className={light ? 'text-black/40' : 'text-white/40'}>{index}</span>
        <span className={light ? 'text-black/40' : 'text-white/40'}>//</span>
        <MaskLine>
          <span className="font-bold">{label}</span>
        </MaskLine>
      </div>
      <span
        className={`font-mono2 hidden text-[10px] uppercase tracking-[0.2em] sm:block ${
          light ? 'text-black/40' : 'text-white/40'
        }`}
      >
        {meta}
      </span>
    </div>
  )
}
