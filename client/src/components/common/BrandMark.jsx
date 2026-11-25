export default function BrandMark({ light = false }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="2"
          y="2"
          width="28"
          height="28"
          rx="4"
          stroke={light ? '#FFFFFF' : '#111317'}
          strokeWidth="2"
        />
        <path
          d="M9 23V9L23 23V9"
          stroke={light ? '#FFFFFF' : '#111317'}
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <rect x="20" y="7" width="5" height="5" fill="#D95D39" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-sm sm:text-base font-bold tracking-[0.14em] uppercase ${
            light ? 'text-white' : 'text-[#111317]'
          }`}
        >
          Northline
        </span>
        <span
          className={`font-mono-label text-[9px] tracking-[0.26em] uppercase ${
            light ? 'text-white/60' : 'text-[#111317]/60'
          }`}
        >
          Build
        </span>
      </span>
    </span>
  );
}
