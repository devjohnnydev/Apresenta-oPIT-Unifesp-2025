import type { SlideData } from "@shared/schema";

export const defaultSlides: SlideData[] = [
  {
    id: "slide-1",
    type: "intro",
    title: "O Ecossistema de Investimento Privado",
    subtitle: "Startups em Estágio Inicial: Panorama Brasileiro 2024",
    content: {
      presentationInfo: {
        title: "Seminário sobre Captação de Recursos e Gestão de Projetos de Inovação Tecnológica",
        institution: "Digite o nome da Instituição",
        course: "Digite o nome da Disciplina",
        professor: "Digite o nome do Professor",
        semester: "2024.2",
        duration: "20 minutos de apresentação + 20 minutos de discussão"
      },
      teamMembers: [
        { name: "Membro 1", role: "Coordenador(a) de Pesquisa", ra: "RA 1" },
        { name: "Membro 2", role: "Especialista em Venture Capital", ra: "RA 2" },
        { name: "Membro 3", role: "Analista de Mercado", ra: "RA 3" },
        { name: "Membro 4", role: "Especialista em Startups", ra: "RA 4" },
        { name: "Membro 5", role: "Pesquisador(a) de Políticas", ra: "RA 5" }
      ],
      backgroundImage: "Team_presentation_academic_background_9df5e1d2.png"
    },
    order: 1
  },
  {
    id: "slide-2", 
    type: "intro",
    title: "Panorama Brasileiro 2024",
    subtitle: "Um ecossistema em crescimento e transformação",
    content: {
      sections: [
        {
          title: "Marco Legal das Startups",
          icon: "fas fa-gavel",
          color: "blue",
          items: [
            "Lei Complementar nº 182/2021 em vigor",
            "Ambiente regulatório favorável",
            "Compras governamentais simplificadas",
            "Definição legal clara de startup"
          ]
        },
        {
          title: "Números do Ecossistema",
          icon: "fas fa-chart-line",
          color: "green", 
          items: [
            "R$ 13,9 bilhões captados em 2024 (+50% vs 2023)",
            "389 rodadas de investimento realizadas",
            "65,1% das startups nunca receberam aportes",
            "Brasil representa 50% dos aportes na América Latina"
          ]
        },
        {
          title: "Distribuição de Investimentos",
          icon: "fas fa-coins",
          color: "orange",
          items: [
            "39,8% via investidores-anjo",
            "13,9% via programas de aceleração",
            "7,2% via Corporate Venture Capital",
            "3,4% via fundos de Venture Capital"
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
    title: "Desafios dos Ecossistemas Emergentes",
    subtitle: "Análise baseada em pesquisa científica (Porto Alegre como estudo de caso)",
    content: {
      research: {
        title: "Estudo: Por que startups falham em ecossistemas emergentes?",
        source: "REGEPE - Revista de Empreendedorismo e Gestão de Pequenas Empresas, 2023",
        methodology: "Entrevistas com empreendedores cujas startups falharam em Porto Alegre"
      },
      domains: [
        {
          title: "Políticas Públicas",
          icon: "fas fa-university",
          color: "red",
          level: "Muito Problemático",
          description: "Falta de programas específicos e burocracia excessiva",
          keyPoints: [
            "Marco Legal implementado apenas em 2021",
            "Compras públicas ainda complexas",
            "Poucos incentivos fiscais regionais",
            "Descontinuidade de programas governamentais"
          ]
        },
        {
          title: "Financiamento",
          icon: "fas fa-money-bill-wave",
          color: "red",
          level: "Muito Problemático",
          description: "Acesso limitado a capital especialmente em estágios iniciais",
          keyPoints: [
            "65,1% das startups nunca receberam aportes",
            "Concentração de investidores no eixo SP-RJ",
            "Ticket médio ainda baixo (R$ 1,1 milhão)",
            "Poucos fundos seed especializados"
          ]
        },
        {
          title: "Cultura e Suporte",
          icon: "fas fa-handshake",
          color: "orange",
          level: "Necessita Melhorias",
          description: "Cultura empreendedora em desenvolvimento",
          keyPoints: [
            "Crescimento de comunidades de startups",
            "Aumento de eventos e networking",
            "Ainda há receio cultural ao fracasso",
            "Mentoria disponível mas não estruturada"
          ]
        }
      ],
      solutions: [
        {
          area: "Estrutural",
          actions: [
            "Fortalecimento de hubs regionais",
            "Programas de capacitação continuada",
            "Conexão universidade-mercado"
          ]
        },
        {
          area: "Financeiro", 
          actions: [
            "Ampliação do capital semente",
            "Democratização via crowdfunding",
            "Fundos regionais de investimento"
          ]
        }
      ]
    },
    order: 3
  },
  {
    id: "slide-4",
    type: "content",
    title: "Setores em Destaque no Brasil",
    subtitle: "Onde o investimento privado está concentrado em 2024",
    content: {
      introduction: {
        title: "Distribuição Setorial dos Investimentos",
        description: "Análise dos segmentos que mais atraem capital e suas características específicas"
      },
      topSectors: [
        {
          sector: "Fintechs",
          icon: "fas fa-credit-card",
          color: "blue",
          percentage: "41,5%",
          amount: "US$ 889 milhões",
          description: "Liderança consolidada no ecossistema brasileiro",
          highlights: [
            "Nubank: maior fintech da América Latina",
            "Stone: pagamentos para PMEs", 
            "C6 Bank: banco digital completo",
            "Crescimento em open banking e PIX"
          ],
          challenges: [
            "Regulamentação em constante evolução",
            "Concorrência com bancos tradicionais",
            "Necessidade de compliance robusto"
          ]
        },
        {
          sector: "Healthtechs",
          icon: "fas fa-heartbeat",
          color: "red",
          percentage: "16%",
          amount: "US$ 135,8 milhões",
          description: "Impulsionadas pela digitalização da saúde pós-pandemia",
          highlights: [
            "Telemedicina e consultas remotas",
            "Gestão hospitalar digitalizada",
            "Diagnósticos por IA",
            "Marketplace de saúde"
          ],
          challenges: [
            "Regulamentação do CFM",
            "Integração com SUS",
            "Validação clínica necessária"
          ]
        },
        {
          sector: "Agtechs",
          icon: "fas fa-seedling",
          color: "green",
          percentage: "16%",
          amount: "US$ 119,5 milhões",
          description: "Aproveitando a força do agronegócio brasileiro",
          highlights: [
            "Agricultura de precisão",
            "Monitoramento por satélite",
            "Gestão de fazendas",
            "Marketplace agrícola"
          ],
          challenges: [
            "Conectividade rural limitada",
            "Resistência à mudança",
            "Ciclos longos de validação"
          ]
        }
      ],
      emergingSectors: {
        title: "Setores Emergentes com Potencial",
        sectors: [
          {
            name: "Deep Tech",
            description: "IA, blockchain, IoT - tecnologias disruptivas",
            growth: "Crescimento de 85% em 2024"
          },
          {
            name: "Climate Tech",
            description: "Soluções para sustentabilidade e ESG",
            growth: "Foco crescente de fundos de impacto"
          },
          {
            name: "Edtechs",
            description: "Educação digital e corporativa",
            growth: "Recuperação pós-pandemia"
          }
        ]
      }
    },
    order: 4
  },
  {
    id: "slide-5",
    type: "content",
    title: "Tipos de Investidores no Ecossistema Brasileiro",
    subtitle: "Perfis, estratégias e performance diferenciadas",
    content: {
      introduction: {
        title: "Análise Baseada em Pesquisa: Venture Perspective of Different Investor Effects",
        source: "Brazilian Administration Review (BAR), 2024",
        finding: "Significativas diferenças de performance entre tipos de investidores no Brasil vs EUA"
      },
      investorTypes: [
        {
          type: "Investidores-Anjo",
          icon: "fas fa-user-tie",
          color: "blue",
          performance: "Surpreendentemente Positiva",
          share: "39,8% dos investimentos",
          description: "Melhor performance para garantir rodadas futuras",
          characteristics: [
            "Ticket médio: R$ 50k - R$ 500k",
            "Proximidade com empreendedores",
            "Mentoria baseada em experiência",
            "Networking setorial específico"
          ],
          advantage: "Conhecimento local e proximidade cultural facilitam suporte"
        },
        {
          type: "Fundos de Venture Capital (IVCs)",
          icon: "fas fa-building",
          color: "green",
          performance: "Positiva apenas para VCs Experientes",
          share: "3,4% dos investimentos",
          description: "Presença ainda modesta no seed stage brasileiro",
          characteristics: [
            "Ticket médio: R$ 500k - R$ 3M+",
            "Processo estruturado de due diligence",
            "Suporte profissional especializado",
            "Foco em escalabilidade"
          ],
          challenge: "Adaptação necessária às particularidades do mercado brasileiro"
        },
        {
          type: "Corporate Venture Capital (CVC)",
          icon: "fas fa-building-shield",
          color: "purple",
          performance: "Mista - Boa para M&A, Limitada para Seed",
          share: "7,2% dos investimentos",
          description: "Crescimento recente no interesse por startups",
          characteristics: [
            "Ticket médio: R$ 1M - R$ 5M",
            "Sinergia estratégica",
            "Acesso a recursos corporativos",
            "Potencial para parcerias"
          ],
          challenge: "Objetivos estratégicos podem conflitar com crescimento da startup"
        },
        {
          type: "Aceleradoras",
          icon: "fas fa-rocket",
          color: "orange",
          performance: "Pior Performance (Exceto Altamente Experientes)",
          share: "13,9% dos investimentos",
          description: "Modelo ainda em adaptação ao contexto brasileiro",
          characteristics: [
            "Ticket: R$ 100k - R$ 300k + programa",
            "Mentoria intensiva 3-6 meses",
            "Demo day e exposição",
            "Rede de alumni"
          ],
          challenge: "Necessidade de maior especialização setorial e local"
        }
      ],
      keyInsights: {
        title: "Principais Descobertas da Pesquisa",
        insights: [
          "Angels brasileiros superam expectativas internacionais",
          "IVCs precisam de mais experiência local para ter sucesso",
          "CVCs focam mais em aquisições que desenvolvimento",
          "Aceleradoras precisam de mais especialização setorial"
        ]
      }
    },
    order: 5
  },
  {
    id: "slide-6",
    type: "chart",
    title: "Evolução Histórica dos Investimentos em Startups",
    subtitle: "Dados atualizados do ecossistema brasileiro (2019-2024)",
    content: {
      chartData: [
        { year: "2019", amount: 2.8, deals: 412, context: "Crescimento inicial" },
        { year: "2020", amount: 3.5, deals: 394, context: "Início da pandemia" },
        { year: "2021", amount: 9.4, deals: 633, context: "Boom dos investimentos" },
        { year: "2022", amount: 4.9, deals: 498, context: "Correção de mercado" },
        { year: "2023", amount: 2.1, deals: 312, context: "Cenário global adverso" },
        { year: "2024", amount: 13.9, deals: 389, context: "Recuperação brasileira" }
      ],
      keyStats: [
        {
          title: "R$ 13,9 bilhões",
          subtitle: "Captados em 2024",
          change: "+561% vs 2023",
          color: "green"
        },
        {
          title: "389 rodadas",
          subtitle: "Realizadas em 2024",
          change: "+25% vs 2023",
          color: "green"
        },
        {
          title: "R$ 1,1 milhão",
          subtitle: "Ticket médio",
          change: "Estável",
          color: "blue"
        },
        {
          title: "50%",
          subtitle: "Dos aportes da América Latina",
          change: "Liderança regional",
          color: "purple"
        }
      ],
      successCases: [
        {
          name: "Azaas",
          sector: "Fintech",
          round: "R$ 820 milhões",
          description: "Maior rodada de 2024 - gestão financeira para PMEs",
          color: "blue"
        },
        {
          name: "Tractian", 
          sector: "Industrial IoT",
          round: "R$ 700 milhões",
          description: "Monitoramento industrial com IA",
          color: "orange"
        },
        {
          name: "Asaas",
          sector: "Fintech",
          round: "US$ 150 milhões",
          description: "Soluções de pagamento para pequenos negócios",
          color: "green"
        }
      ],
      marketAnalysis: {
        title: "Análise do Mercado 2024",
        insights: [
          "Recuperação robusta após 2 anos de retração",
          "Concentração em fewer deals but larger tickets",
          "Inteligência Artificial atrai 42% dos investimentos",
          "Diversificação setorial além de fintechs"
        ]
      },
      futureOutlook: {
        title: "Perspectivas 2025",
        trends: [
          "Consolidação do mercado em estágios mais maduros",
          "Maior interesse em deep tech e climate tech", 
          "Entrada de fundos internacionais no Brasil",
          "Regulamentação de equity crowdfunding"
        ]
      }
    },
    order: 6
  },
  {
    id: "slide-7",
    type: "content",
    title: "Inteligência Artificial: O Novo Motor do Ecossistema",
    subtitle: "Como a IA está transformando o investimento em startups brasileiras",
    content: {
      aiOverview: {
        title: "IA no Ecossistema Brasileiro 2024",
        stats: {
          startups: "741 startups aplicam IA",
          investment: "R$ 5,8 bilhões captados (42% do total)",
          growth: "Crescimento de 85% em deep tech"
        }
      },
      sectorDistribution: [
        {
          sector: "Healthtechs",
          percentage: "16%",
          applications: [
            "Diagnósticos por imagem",
            "Análise de exames laboratoriais",
            "Telemedicina assistida por IA",
            "Descoberta de medicamentos"
          ],
          color: "red"
        },
        {
          sector: "Agtechs", 
          percentage: "16%",
          applications: [
            "Agricultura de precisão",
            "Previsão de safras",
            "Detecção de pragas",
            "Otimização de irrigação"
          ],
          color: "green"
        },
        {
          sector: "Retailtechs",
          percentage: "14%",
          applications: [
            "Recomendação personalizada",
            "Gestão de estoque",
            "Previsão de demanda",
            "Chatbots inteligentes"
          ],
          color: "blue"
        },
        {
          sector: "Fintechs",
          percentage: "10%",
          applications: [
            "Análise de crédito",
            "Detecção de fraudes", 
            "Investimentos automatizados",
            "Atendimento ao cliente"
          ],
          color: "purple"
        }
      ],
      challenges: {
        title: "Desafios para Startups de IA no Brasil",
        items: [
          {
            challenge: "Talento Especializado",
            description: "Escassez de profissionais qualificados em machine learning",
            impact: "Alto"
          },
          {
            challenge: "Infraestrutura Computacional",
            description: "Custos elevados de cloud computing e GPUs",
            impact: "Médio"
          },
          {
            challenge: "Dados de Qualidade",
            description: "Acesso limitado a datasets grandes e limpos",
            impact: "Alto"
          },
          {
            challenge: "Regulamentação",
            description: "Marco legal ainda em desenvolvimento",
            impact: "Médio"
          }
        ]
      },
      opportunities: {
        title: "Oportunidades Emergentes",
        areas: [
          {
            area: "IA Generativa",
            description: "Aplicações em conteúdo, código e design",
            potential: "Muito Alto"
          },
          {
            area: "Edge Computing + IA",
            description: "Processamento local para IoT e mobile",
            potential: "Alto"
          },
          {
            area: "IA Explicável",
            description: "Transparência em decisões algorítmicas",
            potential: "Médio"
          }
        ]
      },
      investorPerspective: {
        title: "Visão dos Investidores",
        insights: [
          "Preferência por startups com diferencial técnico real",
          "Foco em problemas específicos vs soluções genéricas",
          "Valorização de equipes com PhDs e experiência",
          "Due diligence técnica mais rigorosa"
        ]
      }
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
