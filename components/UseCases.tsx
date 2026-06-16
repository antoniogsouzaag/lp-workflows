import { Eyebrow, SectionHeading } from "./ui/Primitives";
import { Reveal } from "./ui/Reveal";

const cases = [
  {
    area: "Vendas & RevOps",
    title: "Lead que chega já entra qualificado no CRM",
    points: [
      "Captura e enriquecimento automático de leads",
      "Qualificação com IA e roteamento por SDR",
      "Follow-up no WhatsApp e e-mail sem atraso",
    ],
  },
  {
    area: "Atendimento",
    title: "Suporte que responde antes do cliente cobrar",
    points: [
      "Triagem e classificação de tickets",
      "Respostas sugeridas com base no histórico",
      "Escalonamento automático por SLA",
    ],
  },
  {
    area: "Financeiro",
    title: "Conciliação e cobrança rodando no automático",
    points: [
      "Emissão de boletos e notas integrada",
      "Lembretes de cobrança e baixa automática",
      "Relatórios de inadimplência em tempo real",
    ],
  },
  {
    area: "Operações & Backoffice",
    title: "Processos internos sem planilha esquecida",
    points: [
      "Onboarding de clientes e colaboradores",
      "Sincronização entre sistemas e ERPs",
      "Alertas e aprovações no Slack/Teams",
    ],
  },
];

export function UseCases() {
  return (
    <section
      id="casos"
      className="vignette relative overflow-hidden bg-dotgrid py-20 lg:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Casos de uso</Eyebrow>
            <SectionHeading className="mt-6">
              Automações pensadas para{" "}
              <span className="dim">times de negócio modernos</span>
            </SectionHeading>
          </div>
          <p className="max-w-sm text-mist md:text-right">
            Cada fluxo é desenhado sob medida para a realidade da sua operação —
            nada de template genérico.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal
              key={c.area}
              delay={i * 90}
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-colors duration-300 hover:border-emerald/30"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-radial-glow opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
              <div className="relative">
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-emerald">
                  {c.area}
                </span>
                <h3 className="mt-3 text-xl font-medium leading-snug text-cloud">
                  {c.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] text-mist"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald shadow-[0_0_8px_2px_rgba(52,226,126,0.5)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
