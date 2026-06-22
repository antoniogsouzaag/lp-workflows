import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Gera /robots.txt no build estático.
 *
 * Liberamos explicitamente os crawlers de busca tradicionais E os motores
 * generativos (GPT/OpenAI, Claude/Anthropic, Gemini/Google, Perplexity, etc.)
 * para que a AG LABS possa ser indexada e citada por todos eles (GEO).
 */
export const dynamic = "force-static";

// Bots de IA / motores generativos que queremos liberar.
const AI_AND_SEARCH_BOTS = [
  // OpenAI / ChatGPT
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  // Anthropic / Claude
  "ClaudeBot",
  "Claude-Web",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  // Google (IA generativa / Gemini / Vertex)
  "Google-Extended",
  "GoogleOther",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Microsoft / Bing / Copilot
  "Bingbot",
  "BingPreview",
  // Apple Intelligence
  "Applebot",
  "Applebot-Extended",
  // Outros assistentes / busca
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regra geral: tudo liberado.
      { userAgent: "*", allow: "/", disallow: ["/_next/"] },
      // Liberação explícita para cada bot de busca e IA.
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
