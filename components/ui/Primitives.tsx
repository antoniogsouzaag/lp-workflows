import { Mark } from "./Logo";

/** Pílula "eyebrow" acima dos títulos de seção */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-mist">
      <Mark className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/** Orbe de glow radial verde — usado como luz de fundo */
export function GlowOrb({
  className = "",
  size = 600,
  animate = true,
  blur = 20,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  blur?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-radial-glow ${animate ? "animate-glow-breathe" : ""} ${className}`}
      style={{ width: size, height: size, filter: `blur(${blur}px)` }}
    />
  );
}

/** Título de seção bicolor (palavras apagadas com .dim) */
export function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-4xl font-light leading-[1.08] tracking-tightest text-cloud sm:text-5xl lg:text-[3.4rem] ${className}`}
    >
      {children}
    </h2>
  );
}
