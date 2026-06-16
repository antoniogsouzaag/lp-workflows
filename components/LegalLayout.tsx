import { ArrowLeft } from "lucide-react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

type LegalLayoutProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <main className="relative min-h-screen" style={{ background: "#050505" }}>
      <Nav />

      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-mist transition-colors hover:text-emerald"
        >
          <ArrowLeft size={15} />
          Voltar ao início
        </a>

        <h1 className="mt-8 text-4xl font-light tracking-tightest text-cloud sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-[13px] text-faint">Última atualização: {updated}</p>

        <div className="legal-prose mt-12">{children}</div>
      </article>

      <Footer />
    </main>
  );
}
