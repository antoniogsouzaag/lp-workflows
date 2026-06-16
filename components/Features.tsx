import { Eyebrow, SectionHeading } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";
import {
  IconBolt,
  IconPlug,
  IconEye,
  IconSparkle,
  IconClock,
  IconShield,
} from "./ui/Icons";

const features = [
  {
    icon: IconBolt,
    title: "Automação de ponta a ponta",
    desc: "Eliminamos tarefas repetitivas mapeando cada etapa do seu processo e transformando em fluxos que rodam sozinhos, 24/7.",
    span: "lg:col-span-2",
    highlight: true,
  },
  {
    icon: IconPlug,
    title: "Integração entre ferramentas",
    desc: "Conectamos CRM, planilhas, WhatsApp, ERPs e APIs — seus sistemas finalmente conversando entre si.",
    span: "",
  },
  {
    icon: IconEye,
    title: "Visibilidade total",
    desc: "Dashboards em tempo real mostram cada execução, gargalo e resultado. Decisões com dado, não com achismo.",
    span: "",
  },
  {
    icon: IconSparkle,
    title: "Inteligência aplicada",
    desc: "Camadas de IA para qualificar leads, classificar tickets, resumir conversas e tomar ações com contexto.",
    span: "lg:col-span-2",
    highlight: true,
  },
];

const bullets = [
  { icon: IconClock, label: "Implementação em semanas" },
  { icon: IconShield, label: "Operação monitorada e segura" },
  { icon: IconBolt, label: "Escala sem aumentar o time" },
];

export function Features() {
  return (
    <section
      id="solucoes"
      className="vignette relative overflow-hidden bg-dotgrid py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>O que entregamos</Eyebrow>
          <SectionHeading className="mt-6">
            Tudo o que seu fluxo precisa,{" "}
            <span className="dim">menos o trabalho manual</span>
          </SectionHeading>
          <p className="mx-auto mt-5 max-w-xl text-balance text-mist">
            Da estratégia à operação. Cuidamos do ciclo completo das suas
            automações para o seu time não tocar em nada disso.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 90}
              className={`group relative overflow-hidden rounded-3xl p-7 ${f.span} ${
                f.highlight ? "glass-strong" : "glass"
              }`}
            >
              {f.highlight && (
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-radial-glow opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70" />
              )}
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/20 bg-emerald/[0.08] text-emerald-bright">
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-xl font-medium text-cloud">
                  {f.title}
                </h3>
                <p className="mt-2.5 max-w-md leading-relaxed text-mist">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {bullets.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-2.5 text-sm text-mist"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-emerald">
                <b.icon className="h-4 w-4" />
              </span>
              {b.label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
