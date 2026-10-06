/** Infinite marquee strip with // separators. */
export default function Marquee({ items, light = false, className = '' }) {
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          <span className="font-display px-6 text-sm font-bold uppercase tracking-[0.3em] md:px-10 md:text-base">
            {item}
          </span>
          <span className={`font-mono2 text-xs ${light ? 'text-black/40' : 'text-white/40'}`}>//</span>
        </span>
      ))}
    </>
  )

  return (
    <div
      className={`overflow-hidden border-y py-4 md:py-5 ${
        light ? 'border-black/15 bg-[#eceae5] text-[#0e0e0e]' : 'border-white/15 bg-[#0e0e0e] text-[#eceae5]'
      } ${className}`}
      aria-hidden="true"
    >
      <div className="marquee-track">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  )
}
