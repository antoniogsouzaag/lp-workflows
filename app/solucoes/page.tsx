import type { Metadata } from "next";
import { ArrowLeft, Check } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow, SectionHeading } from "@/components/ui/Primitives";
import { projects } from "@/components/projects-data";

export const metadata: Metadata = {
  title: "Soluções — AG LABS",
  description:
    "Conheça em detalhe cada automação da AG LABS: criação de vídeos, atendimento no WhatsApp, qualificação de leads, comentários e redes sociais no automático.",
};

export default function SolucoesPage() {
  return (
    <main className="relative min-h-screen" style={{ background: "#050505" }}>
      <Nav />

      {/* Cabeçalho */}
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 lg:px-8 lg:pt-40">
        <a
          href="/#projetos"
          className="inline-flex items-center gap-2 text-[13px] text-mist transition-colors hover:text-emerald"
        >
          <ArrowLeft size={15} />
          Voltar à galeria
        </a>

        <Reveal className="mt-8">
          <Eyebrow>Soluções</Eyebrow>
          <SectionHeading className="mt-5 max-w-3xl">
            Automações que rodam{" "}
            <span className="text-gradient-green">no automático</span>
          </SectionHeading>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-mist">
            Veja em detalhe o que cada automação faz e o que está incluso. Tudo
            sob medida para o seu negócio, configurado do seu jeito.
          </p>
        </Reveal>
      </section>

      {/* Itens */}
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 pb-24 lg:gap-28 lg:px-8 lg:pb-32">
        {projects.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <section
              key={item.id}
              id={item.id}
              className="scroll-mt-28 grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* Imagem */}
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <div className="relative aspect-[16/11] overflow-hidden rounded-md border border-line">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(5,5,5,0.55) 0%, transparent 55%)",
                    }}
                  />
                </div>
              </Reveal>

              {/* Texto */}
              <Reveal delay={80} className={reversed ? "lg:order-1" : ""}>
                <span className="text-[12px] font-medium uppercase tracking-[0.18em] text-emerald">
                  {item.category}
                </span>
                <h2 className="mt-3 text-3xl font-light leading-[1.1] tracking-tightest text-cloud sm:text-4xl">
                  {item.tagline}
                </h2>

                <div className="mt-5 space-y-4">
                  {item.longDescription.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-[15px] leading-relaxed text-mist"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="mt-7 space-y-3">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald/40 bg-emerald/10">
                        <Check size={12} className="text-emerald" />
                      </span>
                      <span className="text-[14px] leading-relaxed text-cloud/90">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>
          );
        })}
      </div>

      {/* CTA final */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-light leading-[1.1] tracking-tightest text-cloud sm:text-4xl">
              Qual dessas faz sentido para o seu negócio?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-mist">
              Fale com a gente no WhatsApp e receba um diagnóstico gratuito das
              automações que mais geram retorno.
            </p>
            <a
              href="https://wa.me/556493259857"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-8 inline-flex h-12 items-center justify-center rounded-sm px-7 text-[14px] font-semibold"
            >
              Falar no WhatsApp
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
