type LogoProps = {
  className?: string;
  withText?: boolean;
};

/** Marca asterisco / flor de 8 pétalas — assinatura do estilo FlowTune */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <g>
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x="18.4"
            y="3"
            width="3.2"
            height="14"
            rx="1.6"
            fill="url(#mark-grad)"
            transform={`rotate(${i * 45} 20 20)`}
          />
        ))}
      </g>
      <circle cx="20" cy="20" r="3" fill="#0a0c0a" />
      <defs>
        <linearGradient id="mark-grad" x1="20" y1="3" x2="20" y2="20">
          <stop stopColor="#EAFFF3" />
          <stop offset="1" stopColor="#34E27E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className = "", withText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="AG LABS"
        className="h-8 w-auto drop-shadow-[0_0_10px_rgba(52,226,126,0.35)]"
      />
      {withText && (
        <span className="text-[17px] font-semibold tracking-tight text-cloud">
          AG<span className="text-emerald"> LABS</span>
        </span>
      )}
    </div>
  );
}
