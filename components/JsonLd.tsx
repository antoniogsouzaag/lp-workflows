/**
 * Renderiza dados estruturados (JSON-LD) num <script type="application/ld+json">.
 * Server component — o JSON é serializado no HTML estático exportado, ficando
 * legível para crawlers de busca e motores generativos sem depender de JS.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado a partir de dados próprios (constantes do site),
      // não de entrada do usuário — seguro para injetar.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
