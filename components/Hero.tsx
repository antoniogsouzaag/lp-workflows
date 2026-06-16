import { DashboardMockup } from "./ui/DashboardMockup";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-dotgrid pt-20 sm:pt-28 lg:pt-36"
      style={{ background: "#050505", minHeight: "70vh" }}
    >
      {/* Headline */}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <h1 className="mx-auto text-center text-5xl font-extralight leading-[1.05] tracking-tightest text-cloud animate-fade-up sm:text-6xl lg:text-7xl">
          Automações que{" "}
          <span className="text-gradient-green font-light">escalam</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-base font-light text-cloud/50 animate-fade-up sm:text-lg">
          Conecte suas ferramentas, elimine tarefas repetitivas e ganhe visibilidade total da operação.
        </p>
      </div>

      {/* Device + glows */}
      <div className="relative mt-6 pb-24 sm:mt-8 sm:pb-48">

        {/* Glow 1 — esquerda, saindo da tela */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "10%", left: "-25%", zIndex: 0, width: "55%", height: "80%" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "radial-gradient(ellipse at 30% 50%, rgba(52,226,126,0.18) 0%, rgba(52,226,126,0.05) 50%, transparent 70%)",
              filter: "blur(90px)",
            }}
          />
        </div>

        {/* Glow 2 — direita, saindo da tela */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ top: "0%", right: "-25%", zIndex: 0, width: "50%", height: "60%" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "radial-gradient(ellipse at 70% 25%, rgba(52,226,126,0.12) 0%, transparent 65%)",
              filter: "blur(90px)",
            }}
          />
        </div>

        {/* Glow 3 — base dispersa */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "15%", zIndex: 1, width: "100%", height: "50%" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(52,226,126,0.18) 0%, rgba(52,226,126,0.06) 45%, transparent 72%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        {/* Glow 4 — núcleo intenso sobre a base */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "12%", zIndex: 1, width: "55%", height: "30%" }}
        >
          <div
            className="h-full w-full"
            style={{
              background: "radial-gradient(ellipse at 50% 100%, rgba(120,255,180,0.28) 0%, rgba(52,226,126,0.12) 40%, transparent 65%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Device */}
        <div
          className="relative mx-auto max-w-6xl px-0 sm:px-8 lg:px-12"
          style={{ zIndex: 2 }}
        >
          <div style={{ transform: "rotate(-4deg)" }}>
            <DashboardMockup />
          </div>
        </div>

      </div>

      {/* Watermark — colado no bottom da section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-center"
        style={{ transform: "translateY(25%)", zIndex: 1 }}
      >
        <span
          style={{
            display: "block",
            fontSize: "clamp(6rem, 28vw, 99rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "rgba(255,255,255,0.05)",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          AG LABS
        </span>
      </div>

      {/* Gradiente de fade — integra com a próxima seção */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0"
        style={{
          height: "45%",
          zIndex: 2,
          background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.6) 18%, rgba(5,5,5,0.2) 40%, transparent 100%)",
        }}
      />
    </section>
  );
}
