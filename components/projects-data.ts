export interface ProjectItem {
  id: string;
  /** Nome curto exibido no card e no menu */
  title: string;
  /** Categoria/eyebrow exibida na página de soluções */
  category: string;
  /** Frase de impacto na página de soluções */
  tagline: string;
  /** Descrição curta usada no card da galeria */
  description: string;
  /** Texto explicativo (parágrafos) na página de soluções */
  longDescription: string[];
  /** Itens entregues / o que está incluso */
  features: string[];
  image: string;
}

const WORKFLOW_IMG =
  "https://udcsokdtdqqdnoqozbxh.supabase.co/storage/v1/object/public/heros-lp/aglabs/workflow";

export const projects: ProjectItem[] = [
  {
    id: "youtube",
    title: "YouTube Automático",
    category: "Conteúdo em vídeo",
    tagline: "Crie vídeos automáticos do roteiro à publicação",
    description:
      "Criação de áudio e vídeo completo automatizado — do roteiro à publicação, sem intervenção manual.",
    longDescription: [
      "Um canal inteiro rodando no automático: a IA escreve o roteiro, gera a narração em voz natural, monta a edição com cortes, trilha e legendas, cria a thumbnail e publica no horário ideal.",
      "Você escolhe o estilo do canal, a voz da narração, a trilha sonora e o ritmo — o fluxo cuida do resto e mantém o calendário sempre cheio.",
    ],
    features: [
      "Roteiro gerado por IA no tom do canal",
      "Narração em voz natural, no idioma e estilo que você escolher",
      "Edição automática: cortes, trilha, legendas e thumbnail",
      "Publicação e agendamento sem intervenção manual",
    ],
    image: `${WORKFLOW_IMG}/youtube.jpg`,
  },
  {
    id: "atendimento",
    title: "Atendimento Inteligente",
    category: "Atendimento & WhatsApp",
    tagline: "Atenda no WhatsApp 24/7 sem perder cliente",
    description:
      "Mensagens no WhatsApp respondidas por IA 24/7 — tria, resolve e só escala para um humano quando precisa.",
    longDescription: [
      "Um atendente de IA que responde na hora, a qualquer hora. Ele entende a intenção da mensagem, resolve as dúvidas mais comuns e conduz a conversa até o próximo passo.",
      "Quando a situação exige um humano, o fluxo escala com todo o histórico em mãos — nada se perde e o cliente nunca fica sem resposta.",
    ],
    features: [
      "Respostas instantâneas 24/7 no tom da sua marca",
      "Triagem automática por assunto e prioridade",
      "Escalada para um humano com o contexto completo",
      "Integração com seu CRM e agenda",
    ],
    image: `${WORKFLOW_IMG}/atendimento.jpg`,
  },
  {
    id: "leads",
    title: "Qualificação de Leads",
    category: "Vendas & CRM",
    tagline: "Leads qualificados e no vendedor certo, na hora",
    description:
      "Leads do formulário classificados por score, distribuídos ao vendedor certo e nutridos até a proposta.",
    longDescription: [
      "Todo lead que entra é enriquecido e pontuado automaticamente por critérios que importam para o seu negócio — e cai direto na mão do vendedor certo.",
      "Enquanto o time foca em quem está pronto para comprar, o fluxo nutre os demais com mensagens no tempo certo até virarem proposta.",
    ],
    features: [
      "Score automático por perfil e intenção de compra",
      "Distribuição inteligente entre os vendedores",
      "Nutrição automática até o momento da proposta",
      "Registro e atualização direto no CRM",
    ],
    image: `${WORKFLOW_IMG}/leads.jpg`,
  },
  {
    id: "comentarios",
    title: "Comentários Automáticos",
    category: "Engajamento social",
    tagline: "Responda todo comentário no tom da marca",
    description:
      "Comentários no Instagram e YouTube respondidos automaticamente, no tom da marca, com encaminhamento de oportunidades.",
    longDescription: [
      "Cada comentário no Instagram e no YouTube recebe uma resposta no tom da sua marca, em segundos — mantendo o engajamento alto e a audiência sempre ativa.",
      "Quando um comentário é uma oportunidade de venda ou suporte, o fluxo identifica e encaminha para o canal certo automaticamente.",
    ],
    features: [
      "Respostas automáticas no Instagram e YouTube",
      "Tom de voz consistente com a sua marca",
      "Detecção de oportunidades de venda e suporte",
      "Encaminhamento para o time ou para o WhatsApp",
    ],
    image: `${WORKFLOW_IMG}/comentarios.jpg`,
  },
  {
    id: "redes",
    title: "Redes Sociais no Automático",
    category: "Marketing de conteúdo",
    tagline: "Conteúdo gerado, agendado e publicado sozinho",
    description:
      "Conteúdo gerado, agendado e publicado sozinho nas redes — calendário sempre cheio, zero esforço manual.",
    longDescription: [
      "Posts, legendas e imagens criados pela IA seguindo a identidade da marca, organizados num calendário e publicados automaticamente nas redes certas.",
      "Sua presença digital nunca para — sem depender de alguém lembrar de postar todo dia.",
    ],
    features: [
      "Geração de posts, legendas e imagens com IA",
      "Calendário de conteúdo montado automaticamente",
      "Agendamento e publicação em várias redes",
      "Identidade visual e tom de voz consistentes",
    ],
    image: `${WORKFLOW_IMG}/redes-automaticas.jpg`,
  },
];
