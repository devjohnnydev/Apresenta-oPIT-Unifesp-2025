import type { SlideData } from "@shared/schema";

export const defaultSlides: SlideData[] = [
  {
    id: "slide-1",
    type: "intro",
    title: "O Ecossistema de Investimento Privado",
    subtitle: "Startups em Estágio Inicial: Do Impulso ao Crescimento",
    content: {
      presentationInfo: {
        title: "Seminário em Grupo - Tema I",
        institution: "Universidade Federal",
        course: "Administração de Empresas",
        professor: "Prof. Dr. João Silva",
        semester: "2024.2",
        duration: "25 minutos + perguntas"
      },
      teamMembers: [
        { name: "Ana Carolina Santos", role: "Coordenadora de Pesquisa", ra: "2021001" },
        { name: "Bruno Henrique Lima", role: "Especialista em Venture Capital", ra: "2021002" },
        { name: "Carla Fernanda Costa", role: "Analista de Mercado", ra: "2021003" },
        { name: "Diego Rodrigues Alves", role: "Especialista em Startups", ra: "2021004" },
        { name: "Elena Marques Silva", role: "Pesquisadora de Políticas", ra: "2021005" }
      ],
      backgroundImage: "Team_presentation_academic_background_9df5e1d2.png"
    },
    order: 1
  },
  {
    id: "slide-2", 
    type: "intro",
    title: "Visão Geral do Ecossistema",
    subtitle: "Mapeando o caminho do investimento privado em startups",
    content: {
      sections: [
        {
          title: "O Impulso Inicial",
          icon: "fas fa-rocket",
          color: "blue",
          items: [
            "Ideia inovadora e identificação do problema",
            "Formação da equipe fundadora",
            "Primeiras validações de mercado",
            "Recursos próprios e bootstrapping"
          ]
        },
        {
          title: "Validação e MVP",
          icon: "fas fa-flask",
          color: "green", 
          items: [
            "Desenvolvimento do produto mínimo viável",
            "Testes com usuários reais",
            "Iteração baseada em feedback",
            "Validação do modelo de negócios"
          ]
        },
        {
          title: "Captação de Recursos",
          icon: "fas fa-coins",
          color: "orange",
          items: [
            "Investidores-anjo: R$ 50k - R$ 500k",
            "Capital semente: R$ 500k - R$ 3M",
            "Aceleradoras e incubadoras",
            "Preparação para rodadas maiores"
          ]
        }
      ],
      ecosystemImage: "Startup_investment_ecosystem_diagram_b4dc1768.png"
    },
    order: 2
  },
  {
    id: "slide-3",
    type: "content", 
    title: "O Impulso Inicial",
    subtitle: "Transformando ideias em oportunidades de negócio",
    content: {
      phases: [
        {
          title: "Identificação do Problema",
          icon: "fas fa-search",
          color: "blue",
          description: "Reconhecer uma dor real do mercado que pode ser solucionada de forma inovadora",
          keyPoints: [
            "Pesquisa de mercado inicial",
            "Entrevistas com potenciais clientes",
            "Análise da concorrência existente",
            "Validação da relevância do problema"
          ]
        },
        {
          title: "Formação da Equipe",
          icon: "fas fa-users",
          color: "green",
          description: "Reunir profissionais complementares com visão compartilhada",
          keyPoints: [
            "Perfis técnicos e de negócios",
            "Experiência no setor-alvo",
            "Comprometimento e dedicação",
            "Química e alinhamento cultural"
          ]
        },
        {
          title: "Recursos Iniciais",
          icon: "fas fa-piggy-bank", 
          color: "purple",
          description: "Mobilizar recursos próprios para dar os primeiros passos",
          keyPoints: [
            "Economia pessoal dos fundadores",
            "Trabalho em paralelo a empregos",
            "Recursos familiares (FFF - Friends, Family, Fools)",
            "Foco na eficiência máxima"
          ]
        }
      ],
      challenges: [
        {
          title: "Incerteza e Risco",
          description: "Alto nível de incerteza sobre viabilidade e aceitação do mercado",
          color: "red"
        },
        {
          title: "Recursos Limitados", 
          description: "Orçamento restrito para desenvolvimento e marketing",
          color: "orange"
        },
        {
          title: "Falta de Experiência",
          description: "Curva de aprendizado íngreme para novos empreendedores",
          color: "yellow"
        }
      ]
    },
    order: 3
  },
  {
    id: "slide-4",
    type: "content",
    title: "Validação e Construção do MVP",
    subtitle: "Do conceito à primeira versão funcional",
    content: {
      mvpConcept: {
        title: "O que é um MVP (Minimum Viable Product)?",
        definition: "Versão mais simples do produto que permite validar hipóteses fundamentais com menor investimento possível",
        benefits: [
          "Reduz tempo de desenvolvimento inicial",
          "Minimiza riscos e custos",
          "Permite feedback rápido do mercado",
          "Facilita iterações baseadas em dados reais"
        ]
      },
      validationProcess: [
        {
          step: 1,
          title: "Definição de Hipóteses",
          description: "Identificar premissas-chave sobre usuários, problema e solução",
          deliverables: ["Personas definidas", "Problema validado", "Proposta de valor clara"]
        },
        {
          step: 2, 
          title: "Desenvolvimento do MVP",
          description: "Criar versão simplificada focada nas funcionalidades essenciais",
          deliverables: ["Protótipo funcional", "Interface básica", "Funcionalidades core"]
        },
        {
          step: 3,
          title: "Testes com Usuários",
          description: "Colocar o produto nas mãos de usuários reais",
          deliverables: ["Feedback coletado", "Métricas de uso", "Insights validados"]
        },
        {
          step: 4,
          title: "Iteração e Melhoria", 
          description: "Refinar o produto baseado no aprendizado obtido",
          deliverables: ["Versão aprimorada", "Roadmap atualizado", "Estratégia refinada"]
        }
      ],
      metrics: [
        {
          name: "Taxa de Adoção",
          description: "Percentual de usuários que continuam usando após primeiro contato",
          target: "> 20%"
        },
        {
          name: "Net Promoter Score (NPS)",
          description: "Probabilidade de recomendação do produto",
          target: "> 50"
        },
        {
          name: "Tempo de Retenção",
          description: "Período médio que usuários permanecem ativos",
          target: "> 30 dias"
        }
      ],
      mvpImage: "MVP_validation_process_diagram_0bb6181c.png"
    },
    order: 4
  },
  {
    id: "slide-5",
    type: "content",
    title: "Investidores-Anjo",
    subtitle: "Mais que capital: mentoria e rede de contatos",
    content: {
      definition: {
        title: "Quem são os Investidores-Anjo?",
        description: "Pessoas físicas com experiência empresarial que investem capital próprio em startups em estágio inicial, oferecendo além de recursos financeiros, mentoria e acesso à sua rede de contatos."
      },
      characteristics: [
        {
          title: "Perfil Típico",
          icon: "fas fa-user-tie",
          color: "blue",
          items: [
            "Ex-empreendedores bem-sucedidos",
            "Executivos seniores aposentados",
            "Profissionais liberais de alto patrimônio", 
            "Especialistas setoriais com capital disponível"
          ]
        },
        {
          title: "Ticket de Investimento",
          icon: "fas fa-money-bill-wave",
          color: "green",
          items: [
            "Valores entre R$ 50 mil e R$ 500 mil",
            "Participação societária de 5% a 20%",
            "Investimentos múltiplos para diversificar risco",
            "Follow-on em rodadas posteriores"
          ]
        },
        {
          title: "Valor Agregado",
          icon: "fas fa-handshake",
          color: "purple",
          items: [
            "Mentoria estratégica e operacional",
            "Acesso à rede de contatos qualificada",
            "Credibilidade para próximas rodadas",
            "Experiência prática do mercado"
          ]
        }
      ],
      process: {
        title: "Como Atrair Investidores-Anjo",
        steps: [
          "Networking em eventos especializados",
          "Participação em grupos de anjos",
          "Indicações através da rede de contatos",
          "Apresentação em pitch events",
          "Due diligence e negociação de termos"
        ]
      },
      angelImage: "Angel_investor_mentorship_illustration_8e82fbea.png"
    },
    order: 5
  },
  {
    id: "slide-6",
    type: "content", 
    title: "Capital Semente (Seed)",
    subtitle: "Estruturando para o crescimento sustentável",
    content: {
      seedConcept: {
        title: "Características do Capital Semente",
        description: "Modalidade de investimento que ocorre após validação inicial do MVP, visando estruturar a startup para crescimento acelerado e preparação para rodadas maiores.",
        stage: "Entre MVP validado e Series A"
      },
      investors: [
        {
          type: "Fundos Seed",
          description: "Fundos especializados em early-stage",
          ticket: "R$ 500k - R$ 3M",
          focus: "Potencial de crescimento exponencial",
          examples: "Monashees, Kaszek, Redpoint eventures"
        },
        {
          type: "Corporate Ventures", 
          description: "Braços de investimento de grandes empresas",
          ticket: "R$ 1M - R$ 5M",
          focus: "Sinergia estratégica com core business",
          examples: "Natura &Co Ventures, Ambev Ventures"
        },
        {
          type: "Super Anjos",
          description: "Investidores individuais com cheques maiores",
          ticket: "R$ 250k - R$ 1M", 
          focus: "Setores de expertise específica",
          examples: "Founders de unicórnios brasileiros"
        }
      ],
      useCases: [
        {
          category: "Estruturação da Equipe",
          items: [
            "Contratação de talentos-chave",
            "Implementação de processos",
            "Estruturação de áreas funcionais",
            "Definição de cultura organizacional"
          ]
        },
        {
          category: "Desenvolvimento do Produto",
          items: [
            "Evolução tecnológica da plataforma",
            "Melhoria da experiência do usuário",
            "Implementação de novas funcionalidades", 
            "Infraestrutura para escalabilidade"
          ]
        },
        {
          category: "Go-to-Market",
          items: [
            "Estratégias de marketing digital",
            "Canais de aquisição de clientes",
            "Estruturação comercial",
            "Expansão geográfica inicial"
          ]
        }
      ],
      milestones: [
        {
          metric: "Revenue Run Rate",
          target: "R$ 1M+ anual",
          importance: "Prova de tração comercial"
        },
        {
          metric: "Crescimento MoM",
          target: "15%+ consistente", 
          importance: "Escalabilidade comprovada"
        },
        {
          metric: "Unit Economics",
          target: "LTV:CAC > 3:1",
          importance: "Modelo sustentável"
        }
      ]
    },
    order: 6
  },
  {
    id: "slide-7",
    type: "content",
    title: "Aceleradoras e Incubadoras", 
    subtitle: "Ecossistemas de apoio ao empreendedorismo",
    content: {
      definitions: {
        incubadoras: {
          title: "Incubadoras",
          description: "Organizações que apoiam startups em estágio muito inicial, oferecendo infraestrutura, mentoria e recursos básicos para desenvolvimento da ideia.",
          duration: "12-24 meses",
          stage: "Ideação até MVP",
          investment: "Geralmente sem investimento direto"
        },
        aceleradoras: {
          title: "Aceleradoras", 
          description: "Programas intensivos que aceleram o crescimento de startups já com MVP, oferecendo capital, mentoria intensiva e preparação para próximas rodadas.",
          duration: "3-6 meses",
          stage: "MVP até Series A",
          investment: "R$ 100k - R$ 500k por 5-15% equity"
        }
      },
      topPrograms: [
        {
          name: "Techstars",
          type: "Aceleradora Global",
          focus: "Tecnologia",
          investment: "$120k por 6% equity",
          highlights: "Rede global, mentoria intensiva, Demo Day"
        },
        {
          name: "Rocket Internet",
          type: "Venture Builder",
          focus: "E-commerce, Fintech",
          investment: "Funding + recursos",
          highlights: "Modelo de construção de startups"
        },
        {
          name: "Porto Seguro Conecta",
          type: "Corporate Accelerator", 
          focus: "Insurtech, Mobilidade",
          investment: "R$ 200k + parcerias",
          highlights: "Acesso ao ecossistema Porto"
        },
        {
          name: "InovAtiva Brasil",
          type: "Programa Governamental",
          focus: "Diversos setores",
          investment: "Capacitação + networking",
          highlights: "Apoio do SEBRAE e MDIC"
        }
      ],
      benefits: [
        {
          category: "Acesso a Capital",
          items: [
            "Investimento inicial para desenvolvimento",
            "Preparação para rodadas futuras", 
            "Conexão com investidores qualificados",
            "Melhoria na valorização da empresa"
          ]
        },
        {
          category: "Mentoria Especializada",
          items: [
            "Empreendedores experientes",
            "Especialistas setoriais",
            "Executivos de grandes empresas",
            "Investidores e fundadores de sucesso"
          ]
        },
        {
          category: "Networking e Parcerias",
          items: [
            "Rede de alumni das aceleradoras",
            "Parcerias estratégicas com corporações",
            "Conexões com potenciais clientes",
            "Relacionamento com ecossistema de inovação"
          ]
        }
      ],
      acceleratorImage: "Accelerator_incubator_ecosystem_building_e1c49f25.png"
    },
    order: 7
  },
  {
    id: "slide-8",
    type: "chart",
    title: "Dados e Tendências do Mercado",
    subtitle: "Panorama atual do investimento em startups no Brasil",
    content: {
      chartData: [
        { year: "2019", amount: 2.8, deals: 412 },
        { year: "2020", amount: 3.5, deals: 394 },
        { year: "2021", amount: 9.4, deals: 633 },
        { year: "2022", amount: 4.9, deals: 498 },
        { year: "2023", amount: 2.1, deals: 312 },
        { year: "2024", amount: 3.2, deals: 425 }
      ],
      stats: [
        "Crescimento de 285% no volume investido entre 2019-2021",
        "Correção de mercado em 2022-2023 devido ao cenário global",
        "Retomada gradual do interesse investidor em 2024",
        "Fintechs lideram como setor mais investido (28% do total)"
      ],
      successCases: [
        {
          name: "Nubank",
          description: "Maior fintech da América Latina, revolucionando o mercado bancário brasileiro",
          highlight: "Valorização de US$ 41 bilhões no IPO (NYSE, 2021)",
          color: "purple"
        },
        {
          name: "iFood",
          description: "Líder em delivery de comida, transformando hábitos alimentares dos brasileiros", 
          highlight: "Valorização de US$ 7 bilhões, operando em 13 países",
          color: "red"
        },
        {
          name: "Stone",
          description: "Revolucionando o mercado de meios de pagamento para PMEs",
          highlight: "IPO na NASDAQ em 2018, avaliada em US$ 33 bilhões",
          color: "green"
        }
      ],
      sectorData: [
        { sector: "Fintech", percentage: 28, deals: 142 },
        { sector: "E-commerce", percentage: 18, deals: 96 },
        { sector: "Healthtech", percentage: 15, deals: 78 },
        { sector: "Edtech", percentage: 12, deals: 63 },
        { sector: "Agtech", percentage: 8, deals: 42 },
        { sector: "Outros", percentage: 19, deals: 104 }
      ]
    },
    order: 8
  },
  {
    id: "slide-9",
    type: "discussion",
    title: "Reflexões e Discussão",
    subtitle: "Analisando desafios e oportunidades do ecossistema",
    content: {
      questions: [
        {
          question: "Quais são os principais obstáculos que impedem mais empreendedores brasileiros de buscar investimento privado?",
          context: "Considere aspectos culturais, educacionais e regulatórios que podem influenciar a decisão de empreender.",
          color: "blue"
        },
        {
          question: "Como a pandemia da COVID-19 alterou as prioridades e estratégias dos investidores em startups?",
          context: "Reflita sobre setores que ganharam relevância e mudanças no modelo de avaliação de investimentos.",
          color: "green"
        },
        {
          question: "Qual o papel das universidades brasileiras no fortalecimento do ecossistema de startups?",
          context: "Analise iniciativas de transferência de tecnologia, incubadoras universitárias e formação empreendedora.",
          color: "purple"
        }
      ],
      interactionSpaces: [
        {
          title: "Compartilhe Experiências",
          description: "Algum membro da turma já participou de programas de empreendedorismo ou conhece casos próximos?"
        },
        {
          title: "Ideias de Negócio",
          description: "Que problemas vocês identificam no dia a dia que poderiam ser solucionados por uma startup?"
        },
        {
          title: "Visão Regional", 
          description: "Como o ecossistema de investimento poderia ser fortalecido em nossa região/estado?"
        }
      ],
      academicContext: {
        theoretical: "O estudo do ecossistema de investimento privado conecta teorias de empreendedorismo, finanças corporativas e inovação, fundamentais para compreender a dinâmica de criação de valor em economias modernas.",
        practical: "Compreender estes mecanismos é essencial para futuros administradores que atuarão em cenários de transformação digital e busca constante por inovação nas organizações."
      }
    },
    order: 9
  },
  {
    id: "slide-10",
    type: "conclusion",
    title: "Conclusões e Perspectivas Futuras",
    subtitle: "Síntese dos aprendizados e tendências emergentes",
    content: {
      keyTakeaways: [
        {
          title: "Ecossistema Maduro mas em Evolução",
          description: "O Brasil desenvolveu um ecossistema robusto de investimento em startups, mas ainda apresenta oportunidades de crescimento e democratização.",
          icon: "fas fa-seedling"
        },
        {
          title: "Importância do Capital Inteligente",
          description: "Além do recurso financeiro, mentoria e networking são diferenciais competitivos cruciais para o sucesso das startups.",
          icon: "fas fa-brain"
        },
        {
          title: "Diversificação Setorial Crescente",
          description: "Expansão beyond fintech para setores como saúde, educação e agronegócios, refletindo maturidade do mercado.",
          icon: "fas fa-chart-line"
        }
      ],
      futureTrends: [
        {
          trend: "Deep Tech e Impacto",
          description: "Crescimento de investimentos em tecnologias emergentes (IA, blockchain, biotech) e startups com propósito social/ambiental."
        },
        {
          trend: "Regionalização",
          description: "Fortalecimento de hubs de inovação fora do eixo SP-RJ, com apoio local e programas governamentais regionais."
        },
        {
          trend: "Corporate Venture Capital",
          description: "Maior participação de grandes empresas como investidoras estratégicas, buscando inovação aberta."
        },
        {
          trend: "Democratização do Investimento",
          description: "Plataformas de equity crowdfunding e regulamentação facilitada ampliando acesso a capital para mais empreendedores."
        }
      ],
      callToAction: {
        title: "Próximos Passos para Interessados",
        actions: [
          "Participar de eventos de empreendedorismo e networking",
          "Desenvolver competências em análise de mercado e modelo de negócios",
          "Acompanhar tendências tecnológicas e setoriais",
          "Considerar programas de especialização em venture capital e private equity"
        ]
      }
    },
    order: 10
  },
  {
    id: "slide-11", 
    type: "references",
    title: "Referências e Fontes",
    subtitle: "Base científica e dados utilizados na apresentação",
    content: {
      academicReferences: [
        {
          authors: "FELD, Brad; MENDELSON, Jason",
          title: "Venture Deals: Be Smarter Than Your Lawyer and Venture Capitalist",
          publisher: "Wiley, 4ª edição",
          year: "2019",
          url: "https://www.wiley.com/en-us/Venture+Deals%3A+Be+Smarter+Than+Your+Lawyer+and+Venture+Capitalist%2C+4th+Edition-p-9781119594826"
        },
        {
          authors: "BLANK, Steve; DORF, Bob", 
          title: "The Startup Owner's Manual: The Step-by-Step Guide for Building a Great Company",
          publisher: "K&S Ranch",
          year: "2020",
          url: "https://www.amazon.com/Startup-Owners-Manual-Step-Step/dp/1732102200"
        },
        {
          authors: "MASON, Colin; HARRISON, Richard",
          title: "Business Angel Investment Activity in the Financial Crisis: UK Evidence and Policy Implications", 
          journal: "Environment and Planning C: Government and Policy",
          year: "2015",
          url: "https://journals.sagepub.com/doi/10.1068/c1302r"
        }
      ],
      industryReports: [
        {
          organization: "ABVCAP (Associação Brasileira de Private Equity e Venture Capital)",
          title: "Estudos de Private Equity e Venture Capital no Brasil - 2024",
          url: "https://www.abvcap.com.br/pesquisas/estudo.aspx?a=2024",
          accessDate: "Setembro 2024"
        },
        {
          organization: "Distrito",
          title: "Distrito Report: Investimentos em Startups no Brasil 2024",
          url: "https://distrito.me/reports/",
          accessDate: "Setembro 2024"
        },
        {
          organization: "PwC Brasil",
          title: "MoneyTree Report Brazil 2024: Análise dos investimentos de venture capital e private equity",
          url: "https://www.pwc.com.br/pt/estudos/servicos/private-equity-venture-capital/2024/moneytree-2024.html",
          accessDate: "Agosto 2024"
        }
      ],
      dataSource: [
        {
          source: "Crunchbase Pro",
          description: "Dados de investimentos e financiamentos em startups brasileiras",
          url: "https://www.crunchbase.com/"
        },
        {
          source: "SEBRAE",
          description: "Estatísticas sobre micro e pequenas empresas e empreendedorismo no Brasil",
          url: "https://www.sebrae.com.br/sites/PortalSebrae/estudos_pesquisas"
        },
        {
          source: "StartupBlink Global Startup Ecosystem Index 2024", 
          description: "Ranking global de ecossistemas de startups",
          url: "https://www.startupblink.com/reports/"
        }
      ],
      additionalResources: [
        {
          title: "Portal do Empreendedor - Governo Federal",
          description: "Informações oficiais sobre abertura de empresas e programas de apoio",
          url: "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor"
        },
        {
          title: "Anjos do Brasil",
          description: "Associação nacional de investidores anjo",
          url: "https://www.anjosdobrasil.net/"
        },
        {
          title: "Endeavor Brasil",
          description: "Organização global de apoio a empreendedores de alto impacto",
          url: "https://endeavor.org.br/"
        }
      ]
    },
    order: 11
  }
];

export function getSlideTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    intro: "Introdução",
    content: "Conteúdo",
    chart: "Gráficos",
    discussion: "Discussão",
    conclusion: "Conclusão",
    references: "Referências"
  };
  
  return labels[type] || type;
}

export function getSlideTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    intro: "fas fa-play-circle",
    content: "fas fa-file-text",
    chart: "fas fa-chart-bar",
    discussion: "fas fa-comments",
    conclusion: "fas fa-check-circle",
    references: "fas fa-book"
  };
  
  return icons[type] || "fas fa-file";
}
