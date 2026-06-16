/**
 * Asterisco/flor metálico glossy 3D — peça-ornamento da referência FlowTune.
 * Pétalas com gradiente especular verde + halo de glow + reflexo no piso.
 */
export function MetalMark({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 8 });
  return (
    <div className={`relative ${className}`}>
      {/* Glow ambiente */}
      <div className="absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-glow opacity-70 blur-2xl" />

      <svg
        viewBox="0 0 160 180"
        fill="none"
        className="relative w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Material glossy das pétalas */}
          <linearGradient id="petal" x1="80" y1="8" x2="80" y2="80">
            <stop offset="0" stopColor="#EAFFF3" />
            <stop offset="0.16" stopColor="#7DF2AC" />
            <stop offset="0.46" stopColor="#34E27E" />
            <stop offset="0.78" stopColor="#13923F" />
            <stop offset="1" stopColor="#073D1D" />
          </linearGradient>
          {/* Esfera central */}
          <radialGradient id="core" cx="42%" cy="38%" r="65%">
            <stop offset="0" stopColor="#EFFFF6" />
            <stop offset="0.45" stopColor="#46E98A" />
            <stop offset="1" stopColor="#073D1D" />
          </radialGradient>
          {/* Reflexo no piso */}
          <radialGradient id="floor" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#34E27E" stopOpacity="0.5" />
            <stop offset="1" stopColor="#34E27E" stopOpacity="0" />
          </radialGradient>
          <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* Reflexo/pedestal */}
        <ellipse cx="80" cy="150" rx="46" ry="11" fill="url(#floor)" />

        {/* Pétalas */}
        <g filter="url(#soft)">
          {petals.map((_, i) => (
            <g key={i} transform={`rotate(${i * 45} 80 74)`}>
              <ellipse
                cx="80"
                cy="40"
                rx="11"
                ry="30"
                fill="url(#petal)"
              />
              {/* especular */}
              <ellipse
                cx="76"
                cy="26"
                rx="3"
                ry="8"
                fill="#FFFFFF"
                opacity="0.4"
              />
            </g>
          ))}
        </g>

        {/* Núcleo */}
        <circle cx="80" cy="74" r="15" fill="url(#core)" />
        <circle cx="75" cy="69" r="4.5" fill="#FFFFFF" opacity="0.7" />
      </svg>
    </div>
  );
}
