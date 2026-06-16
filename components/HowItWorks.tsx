import { Eyebrow, SectionHeading, GlowOrb } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";
import { IconEye, IconSparkle, IconPlug, IconClock } from "./ui/Icons";
import type { ComponentType } from "react";

type IconProps = { className?: string };

const steps: {
  n: string;
  title: string;
  desc: string;
  tag: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    n: "01",
    title: "Diagnóstico",
    desc: "Mapeamos seus processos, identificamos os gargalos e priorizamos onde a automação gera mais retorno.",
    tag: "Semana 1",
    Icon: IconEye,
  },
  {
    n: "02",
    title: "Desenho do fluxo",
    desc: "Arquitetamos a automação com você — gatilhos, regras, integrações e pontos de decisão com IA.",
    tag: "Semana 1–2",
    Icon: IconSparkle,
  },
  {
    n: "03",
    title: "Integração & testes",
    desc: "Conectamos suas ferramentas, validamos cada cenário e colocamos o fluxo em produção com segurança.",
    tag: "Semana 2–4",
    Icon: IconPlug,
  },
  {
    n: "04",
    title: "Operação & evolução",
    desc: "Monitoramos, otimizamos e expandimos as automações conforme seu negócio cresce. Suporte contínuo.",
    tag: "Contínuo",
    Icon: IconClock,
  },
];

export function HowItWorks() {
  return (
    <section
      id="fluxo"
      className="relative overflow-hidden bg-linegrid py-20 lg:py-28"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Vinheta radial sobre o grid — escurece bordas, foco no centro */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 65% at 50% 50%, transparent 30%, rgba(5,5,5,0.75) 65%, #050505 88%)",
        }}
      />

      {/* Fades verticais de transição */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40" style={{ background: "linear-gradient(to bottom, #050505 0%, transparent 100%)" }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40" style={{ background: "linear-gradient(to top, #050505 0%, transparent 100%)" }} />

      <GlowOrb className="left-1/3 top-1/3 -translate-x-1/2 -translate-y-1/2 opacity-[0.18]" size={1100} animate={false} blur={90} />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Como funciona</Eyebrow>
          <SectionHeading className="mt-6">
            Do caos manual ao fluxo{" "}
            <span className="text-gradient-green">inteligente</span>{" "}
            <span className="dim">em 4 passos</span>
          </SectionHeading>
        </Reveal>

        <div className="relative mt-16 mx-auto max-w-2xl">

          {/* Linha vertical conectora */}
          <div
            className="pointer-events-none absolute left-[38px] top-10 bottom-10 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(52,226,126,0.2) 15%, rgba(52,226,126,0.2) 85%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className="relative flex gap-5">

                {/* Nó tipográfico */}
                <div className="relative z-10 shrink-0">
                  <div
                    className="glass-strong flex h-[76px] w-[76px] flex-col items-center justify-center rounded-sm border border-line"
                  >
                    <span
                      className="text-[26px] font-extralight leading-none tracking-tight"
                      style={{ color: "rgba(52,226,126,0.55)" }}
                    >
                      {s.n}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="group flex-1 rounded-sm border border-line p-5 transition-all duration-300 hover:border-emerald/30"
                  style={{ background: "rgba(255,255,255,0.025)", backdropFilter: "blur(8px)" }}
                >
                  <div className="flex items-start justify-between gap-3">

                    {/* Ícone + título */}
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm"
                        style={{
                          background: "rgba(52,226,126,0.07)",
                          border: "1px solid rgba(52,226,126,0.18)",
                          color: "rgba(52,226,126,0.75)",
                        }}
                      >
                        <s.Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-[16px] font-semibold leading-snug text-cloud">
                        {s.title}
                      </h3>
                    </div>

                    {/* Tag */}
                    <span
                      className="mt-0.5 shrink-0 rounded-sm border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest"
                      style={{
                        borderColor: "rgba(52,226,126,0.2)",
                        color: "rgba(52,226,126,0.55)",
                        background: "rgba(52,226,126,0.04)",
                      }}
                    >
                      {s.tag}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-mist">
                    {s.desc}
                  </p>

                  {/* Barra de progresso */}
                  <div className="mt-4 h-[1px] w-full overflow-hidden rounded-sm bg-line">
                    <div
                      className="h-full rounded-sm"
                      style={{
                        width: `${(i + 1) * 25}%`,
                        background: "linear-gradient(to right, rgba(52,226,126,0.45), rgba(52,226,126,0.1))",
                      }}
                    />
                  </div>
                </div>

              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
