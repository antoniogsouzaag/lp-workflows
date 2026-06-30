/**
 * Construtores de schema markup (JSON-LD / schema.org).
 *
 * Estes objetos alimentam Google, Bing e os motores generativos (GPT, Claude,
 * Gemini, Perplexity) com dados estruturados sobre quem é a AG LABS, o que ela
 * oferece e como contatá-la. Tudo encadeado por @id para formar um grafo único.
 */
import { SITE, SITE_URL, ORG_URL, absoluteUrl } from "./site";
import { projects } from "@/components/projects-data";

const ORG_ID = `${ORG_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** A AG LABS como prestadora de serviço (entidade central do grafo). */
export const organizationSchema = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: "AG LABS Automação",
  url: ORG_URL,
  logo: {
    "@type": "ImageObject",
    url: SITE.logo,
    width: 512,
    height: 512,
  },
  image: SITE.logo,
  description: SITE.description,
  slogan: "Automações que escalam",
  telephone: SITE.telephone,
  priceRange: "$$",
  areaServed: {
    "@type": "Country",
    name: "Brasil",
  },
  knowsLanguage: ["pt-BR"],
  sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.facebook, SITE.social.x],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: SITE.telephone,
    url: SITE.whatsapp,
    areaServed: "BR",
    availableLanguage: ["Portuguese"],
  },
};

/** O site (landing page) em si. */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: SITE.title,
  description: SITE.description,
  inLanguage: SITE.lang,
  publisher: { "@id": ORG_ID },
};

/**
 * Catálogo de serviços oferecidos — cada automação da AG LABS vira um Service
 * dentro de um OfferCatalog, descrevendo claramente o portfólio para os motores.
 */
export const serviceSchema = {
  "@type": "Service",
  "@id": `${SITE_URL}/#service`,
  serviceType: "Automação de processos com IA",
  name: "Automações sob medida — AG LABS",
  description:
    "Desenho, integração e operação de automações sob medida: workflows, integração de sistemas e IA aplicada para eliminar trabalho manual.",
  provider: { "@id": ORG_ID },
  areaServed: { "@type": "Country", name: "Brasil" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: SITE_URL,
    servicePhone: SITE.telephone,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Soluções de automação AG LABS",
    itemListElement: projects.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.title,
        category: p.category,
        description: p.description,
        url: absoluteUrl(`/solucoes#${p.id}`),
      },
    })),
  },
};

/** Página inicial (WebPage) ligada ao site e à organização. */
export const homeWebPageSchema = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: SITE.title,
  description: SITE.description,
  inLanguage: SITE.lang,
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: SITE.logo,
};

/** Constrói um FAQPage a partir de pares pergunta/resposta. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl("/solucoes")}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}

/** Constrói uma trilha de navegação (breadcrumb). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Empacota um ou mais nós num grafo JSON-LD único. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
