import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Uso — AG LABS",
  description:
    "Termos de Uso dos serviços de automação e do site da AG LABS.",
};

export default function TermosPage() {
  return (
    <LegalLayout title="Termos de Uso" updated="15 de junho de 2026">
      <p>
        Bem-vindo à AG LABS. Estes Termos de Uso (&ldquo;Termos&rdquo;) regem o acesso e a
        utilização do site, dos conteúdos e dos serviços de automação de processos
        oferecidos pela AG LABS (&ldquo;AG LABS&rdquo;, &ldquo;nós&rdquo;). Ao acessar ou usar nossos
        serviços, você concorda integralmente com estes Termos.
      </p>

      <h2>1. Serviços</h2>
      <p>
        A AG LABS projeta, integra e opera automações sob medida — incluindo
        integrações entre ferramentas, fluxos de trabalho e soluções com
        inteligência artificial. O escopo, prazos e condições de cada projeto são
        definidos em proposta ou contrato específico firmado com o cliente.
      </p>

      <h2>2. Uso do site</h2>
      <p>Ao utilizar este site, você concorda em:</p>
      <ul>
        <li>Não empregar o conteúdo para fins ilícitos ou não autorizados;</li>
        <li>Não tentar comprometer a segurança, a integridade ou a disponibilidade do site;</li>
        <li>Respeitar os direitos de propriedade intelectual descritos abaixo.</li>
      </ul>

      <h2>3. Propriedade intelectual</h2>
      <p>
        Todo o conteúdo deste site — marca, logotipo, textos, layout, código e
        materiais visuais — pertence à AG LABS ou é licenciado a ela, sendo
        protegido pela legislação aplicável. Nenhum conteúdo pode ser reproduzido
        sem autorização prévia por escrito.
      </p>

      <h2>4. Propostas e contratação</h2>
      <p>
        As informações exibidas no site têm caráter informativo e não constituem
        oferta vinculante. A contratação de serviços ocorre apenas mediante proposta
        formal e aceite das partes, que prevalecem sobre estes Termos em caso de
        divergência.
      </p>

      <h2>5. Limitação de responsabilidade</h2>
      <p>
        Os serviços são prestados com diligência técnica, mas a AG LABS não garante
        que estarão livres de interrupções ou erros decorrentes de fatores externos —
        como falhas de terceiros, APIs ou ferramentas integradas. Na máxima extensão
        permitida em lei, a AG LABS não se responsabiliza por danos indiretos,
        lucros cessantes ou perda de dados causados por tais fatores.
      </p>

      <h2>6. Serviços de terceiros</h2>
      <p>
        Nossas automações podem conectar-se a serviços de terceiros (ex.: WhatsApp,
        HubSpot, n8n, provedores de IA). O uso desses serviços está sujeito aos
        respectivos termos e políticas, pelos quais a AG LABS não é responsável.
      </p>

      <h2>7. Alterações</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. A versão vigente será
        sempre a publicada nesta página, com a data de última atualização indicada
        acima. O uso contínuo dos serviços após mudanças implica concordância.
      </p>

      <h2>8. Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas pelo nosso canal de{" "}
        <a href="/#contato">contato</a>.
      </p>
    </LegalLayout>
  );
}
