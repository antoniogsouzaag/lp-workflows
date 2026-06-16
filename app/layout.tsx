import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AG LABS — Automações inteligentes que escalam seu negócio",
  description:
    "A AG LABS desenha, integra e opera automações sob medida: conecte ferramentas, elimine trabalho manual e ganhe visibilidade total dos seus fluxos. Resultados em semanas, não meses.",
  keywords: [
    "automação",
    "automações",
    "workflow",
    "integração",
    "IA",
    "AG LABS",
    "RevOps",
    "n8n",
    "make",
  ],
  openGraph: {
    title: "AG LABS — Automações inteligentes que escalam seu negócio",
    description:
      "Conecte ferramentas, elimine trabalho manual e ganhe visibilidade total dos seus fluxos.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/icon-512.png", width: 512, height: 512 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={urbanist.variable}>
      <body className="bg-ink text-cloud font-sans antialiased selection:bg-emerald/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
