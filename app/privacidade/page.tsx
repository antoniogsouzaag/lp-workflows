import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a AG LABS coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade" updated="15 de junho de 2026">
      <p>
        A AG LABS leva a sua privacidade a sério. Esta Política descreve como
        coletamos, usamos, armazenamos e protegemos os dados pessoais tratados por
        meio do nosso site e dos nossos serviços, em conformidade com a Lei Geral de
        Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>1. Dados que coletamos</h2>
      <ul>
        <li>
          <strong>Dados de contato</strong> que você nos fornece — como nome, e-mail
          e empresa — ao preencher formulários ou solicitar um diagnóstico;
        </li>
        <li>
          <strong>Dados de navegação</strong> coletados automaticamente, como
          páginas visitadas, dispositivo e dados aproximados de uso, via cookies e
          ferramentas de analytics;
        </li>
        <li>
          <strong>Dados de projeto</strong> compartilhados durante a prestação de
          serviços, conforme acordado em contrato.
        </li>
      </ul>

      <h2>2. Como usamos os dados</h2>
      <ul>
        <li>Responder a solicitações e agendar diagnósticos;</li>
        <li>Prestar, manter e melhorar nossos serviços de automação;</li>
        <li>Enviar comunicações relevantes, quando autorizado;</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>

      <h2>3. Base legal</h2>
      <p>
        Tratamos dados pessoais com base no consentimento, na execução de contrato,
        no cumprimento de obrigação legal e no legítimo interesse, sempre nos limites
        previstos pela LGPD.
      </p>

      <h2>4. Compartilhamento</h2>
      <p>
        Não vendemos seus dados. Podemos compartilhá-los com prestadores e
        ferramentas que viabilizam nossos serviços (ex.: hospedagem, e-mail,
        analytics e plataformas de automação), sempre sob obrigações de
        confidencialidade e segurança.
      </p>

      <h2>5. Armazenamento e segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados contra
        acesso não autorizado, perda ou alteração. Os dados são mantidos apenas pelo
        tempo necessário às finalidades descritas ou conforme exigido por lei.
      </p>

      <h2>6. Seus direitos</h2>
      <p>Nos termos da LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>Confirmar a existência de tratamento e acessar seus dados;</li>
        <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
        <li>Solicitar anonimização, bloqueio ou eliminação de dados;</li>
        <li>Revogar o consentimento concedido.</li>
      </ul>

      <h2>7. Cookies</h2>
      <p>
        Utilizamos cookies para o funcionamento do site e para entender como ele é
        usado. Você pode gerenciar ou desativar cookies nas configurações do seu
        navegador — algumas funcionalidades podem ser afetadas.
      </p>

      <h2>8. Alterações</h2>
      <p>
        Esta Política pode ser atualizada periodicamente. A versão vigente é sempre a
        publicada nesta página, com a data de última atualização indicada acima.
      </p>

      <h2>9. Contato do controlador</h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre o tratamento de dados,
        entre em contato pelo nosso canal de <a href="/#contato">contato</a>.
      </p>
    </LegalLayout>
  );
}
