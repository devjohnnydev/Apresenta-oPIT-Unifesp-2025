import { type Presentation, type InsertPresentation, type SlideData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPresentation(id: string): Promise<Presentation | undefined>;
  createPresentation(presentation: InsertPresentation): Promise<Presentation>;
  updatePresentation(id: string, updates: Partial<InsertPresentation>): Promise<Presentation | undefined>;
  getAllPresentations(): Promise<Presentation[]>;
  updateSlides(id: string, slides: SlideData[]): Promise<Presentation | undefined>;
}

export class MemStorage implements IStorage {
  private presentations: Map<string, Presentation>;

  constructor() {
    this.presentations = new Map();
    
    // Initialize with default presentation
    this.initializeDefaultPresentation();
  }

  private initializeDefaultPresentation() {
    const defaultSlides: SlideData[] = [
      {
        id: "slide-1",
        type: "intro",
        title: "O Ecossistema de Investimento Privado",
        subtitle: "Captação de Recursos e Gestão de Projetos de Inovação Tecnológica",
        content: {
          presentationInfo: {
            course: "Gestão de Projetos de Inovação Tecnológica",
            professor: "Prof. Dr. Nome do Professor",
            semester: "2025.2",
            duration: "Seminário sobre Captação de Recursos e Gestão de Projetos de Inovação Tecnológica"
          },
          teamMembers: [
            {
              name: "Johnny Braga de Oliveira",
              role: "Coordenador do Projeto",
              ra: "123456789"
            },
            {
              name: "Maria Silva Santos",
              role: "Analista de Mercado",
              ra: "987654321"
            },
            {
              name: "Carlos Eduardo Lima",
              role: "Especialista em Finanças",
              ra: "456789123"
            },
            {
              name: "Ana Paula Costa",
              role: "Gestora de Inovação",
              ra: "321654987"
            },
            {
              name: "Roberto Fernandes",
              role: "Consultor Estratégico",
              ra: "789123456"
            }
          ]
        },
        order: 1
      },
      {
        id: "slide-2",
        type: "intro",
        title: "Tipos de Captação de Recursos",
        subtitle: "Ecossistema de investimento para startups em estágio inicial",
        content: {
          ecosystemImage: true,
          sections: [
            {
              title: "Investidores-anjo",
              icon: "fas fa-user-tie",
              color: "primary",
              items: [
                "Pessoa física que investe capital próprio em startups em estágio inicial",
                "Ticket médio: R$ 50 mil a R$ 500 mil",
                "Além do capital, oferece mentoria e acesso a networking"
              ]
            },
            {
              title: "Venture Capital",
              icon: "fas fa-building",
              color: "blue",
              items: [
                "Fundos de investimento que aplicam em empresas com alto potencial de crescimento",
                "Ticket médio: R$ 1 milhão a R$ 10 milhões",
                "Foco em startups com modelo de negócio validado e tração no mercado"
              ]
            },
            {
              title: "Crowdfunding",
              icon: "fas fa-users",
              color: "green",
              items: [
                "Financiamento coletivo por meio de plataformas online",
                "Democratiza acesso a capital para ideias inovadoras",
                "Além de recursos, proporciona validação de mercado e visibilidade"
              ]
            },
            {
              title: "Editais Públicos (CNPq, FINEP)",
              icon: "fas fa-university",
              color: "purple",
              items: [
                "Recursos não-reembolsáveis para inovação e pesquisa",
                "Foco em projetos de P&D e soluções para desafios sociais",
                "Requer documentação técnica e prestação de contas rigorosa"
              ]
            }
          ]
        },
        order: 2
      },
      {
        id: "slide-3",
        type: "content",
        title: "Desafios e Oportunidades",
        subtitle: "Cenário atual para startups brasileiras",
        content: {
          challenges: [
            {
              title: "Barreiras burocráticas",
              description: "Processos lentos de abertura e fechamento de empresas, complexidade tributária e regulatória que consome recursos valiosos das startups",
              color: "red"
            },
            {
              title: "Falta de conhecimento em gestão financeira",
              description: "Dificuldade em planejar fluxo de caixa, precificação adequada e preparação para captação de recursos",
              color: "orange"
            },
            {
              title: "Instabilidade econômica",
              description: "Ambiente de negócios com mudanças frequentes em regulamentações e alta taxa de juros",
              color: "yellow"
            }
          ],
          opportunities: [
            {
              title: "Inovação e digitalização",
              description: "Transformação digital acelerada pós-pandemia e demanda por soluções tecnológicas em diversos setores",
              color: "blue"
            },
            {
              title: "Expansão para mercados globais",
              description: "Possibilidade de internacionalização com soluções escaláveis desenvolvidas no Brasil",
              color: "green"
            },
            {
              title: "Parcerias corporativas",
              description: "Crescente interesse de grandes empresas em inovação aberta e colaboração com startups",
              color: "purple"
            }
          ]
        },
        order: 3
      },
      {
        id: "slide-4",
        type: "chart",
        title: "Evidências e Dados",
        subtitle: "Volume de investimentos e casos de sucesso",
        content: {
          chartData: {
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            values: [4.8, 6.5, 14.2, 8.8, 9.1, 13.9]
          },
          stats: [
            "Crescimento de 50% nos investimentos em 2024 (R$ 13,9 bilhões)",
            "366 rodadas de investimento realizadas em 2024",
            "Brasil representa 54% do investimento total na América Latina"
          ],
          successCases: [
            {
              name: "Nubank",
              description: "Fintech fundada em 2013 que revolucionou o sistema bancário brasileiro",
              highlight: "Mais de 40 milhões de clientes, IPO de US$ 2,6 bilhões em 2021",
              color: "purple"
            },
            {
              name: "QuintoAndar",
              description: "Fundada em 2012, simplificou o processo de aluguel de imóveis no Brasil",
              highlight: "Captou US$ 300 milhões em 2021, avaliada em US$ 4 bilhões",
              color: "red"
            },
            {
              name: "Resultados Digitais",
              description: "Plataforma de marketing fundada em 2011 voltada para PMEs",
              highlight: "Adquirida por R$ 665 milhões em 2021 pela Totvs",
              color: "green"
            }
          ]
        },
        order: 3
      },
      {
        id: "slide-4",
        type: "content",
        title: "Aplicação Prática",
        subtitle: "Estratégias para apresentação a investidores",
        content: {
          strategies: {
            title: "Estratégias para Apresentação a Investidores",
            pitchDeck: [
              "Problema: Identifique claramente a dor de mercado",
              "Solução: Sua proposta de valor única",
              "Mercado: Dimensão e oportunidade (TAM, SAM, SOM)",
              "Modelo de negócio: Como você gera receita",
              "Tração: Resultados e métricas já alcançados"
            ],
            tips: [
              "Limite sua apresentação a 10-12 slides",
              "Use storytelling para conectar com os investidores",
              "Destaque o time qualificado por trás da startup",
              "Seja claro sobre quanto precisa e como utilizará o capital"
            ]
          },
          businessPlan: {
            title: "Exemplo de Plano de Negócios Resumido",
            sections: [
              {
                title: "1. Sumário Executivo",
                description: "Visão geral da startup, proposta de valor e objetivos de curto e longo prazo."
              },
              {
                title: "2. Análise de Mercado",
                description: "Tamanho do mercado: R$ 5,2 bilhões, com crescimento anual de 20%. Público-alvo: Empresas B2B de médio porte em expansão."
              },
              {
                title: "3. Estratégia de Crescimento",
                description: "Aquisição de clientes: Marketing digital B2B e parcerias estratégicas. Plano de expansão: Brasil (Ano 1), América Latina (Ano 2-3)."
              },
              {
                title: "4. Projeções Financeiras",
                projections: [
                  { year: "ANO 1", value: "R$ 500 mil" },
                  { year: "ANO 2", value: "R$ 1,5 milhão" },
                  { year: "ANO 3", value: "R$ 4,8 milhões" }
                ]
              }
            ]
          }
        },
        order: 4
      },
      {
        id: "slide-5",
        type: "content",
        title: "Impacto Social e Econômico",
        subtitle: "Contribuições das startups para sociedade e economia",
        content: {
          impacts: [
            {
              category: "Impacto no mercado de trabalho e economia",
              icon: "fas fa-briefcase",
              items: [
                "Startups brasileiras são responsáveis pela geração de milhares de empregos qualificados, principalmente para jovens profissionais da área tecnológica",
                "Promoção da inclusão digital ao desenvolver soluções acessíveis para populações historicamente desbancadas e sem acesso a serviços básicos"
              ]
            },
            {
              category: "Impacto ambiental e sustentabilidade",
              icon: "fas fa-leaf",
              items: [
                "Soluções sustentáveis desenvolvidas por startups de cleantech e greentech contribuem para redução de emissões e uso consciente de recursos naturais",
                "6 em cada 10 startups de impacto na América Latina são brasileiras, promovendo economia circular e modelos de negócio regenerativos"
              ]
            }
          ],
          ods: [
            {
              number: 9,
              title: "ODS 9",
              description: "Indústria, Inovação e Infraestrutura - Promovendo soluções tecnológicas inclusivas e sustentáveis",
              color: "orange"
            },
            {
              number: 17,
              title: "ODS 17",
              description: "Parcerias para Implementação dos Objetivos - Fortalecendo ecossistemas de inovação e colaboração",
              color: "blue"
            }
          ],
          statistics: [
            { value: "54%", label: "dos investimentos em startups na América Latina" },
            { value: "366", label: "rodadas de investimento em 2024" },
            { value: "R$ 13,9bi", label: "volume total investido em 2024" }
          ]
        },
        order: 5
      },
      {
        id: "slide-6",
        type: "content",
        title: "Proposta de Projeto",
        subtitle: "Microfinanciamento coletivo para startups de impacto",
        content: {
          project: {
            title: "Microfinanciamento coletivo para startups de impacto",
            description: [
              "Plataforma dedicada a conectar pequenos investidores com startups focadas em soluções de impacto social e ambiental",
              "Investimento mínimo acessível (a partir de R$ 100) democratizando o acesso ao ecossistema de inovação",
              "Foco em startups alinhadas aos ODS com validação de impacto por comitê especializado"
            ],
            objectives: [
              "Democratizar o acesso ao investimento em startups",
              "Acelerar soluções para problemas sociais urgentes",
              "Promover educação financeira e investimento consciente",
              "Criar rede de apoio para empreendedores de impacto"
            ]
          },
          benefits: [
            "Aumento da inclusão financeira e engajamento cívico através de investimento participativo",
            "Aceleração de soluções sustentáveis voltadas para problemas sociais e ambientais urgentes",
            "Geração de empregos em regiões periféricas com descentralização da inovação"
          ],
          phases: [
            {
              title: "Fase 1: MVP (6 meses)",
              description: "Plataforma básica com 10 startups selecionadas e 1.000 investidores cadastrados",
              color: "blue"
            },
            {
              title: "Fase 2: Escala (12 meses)",
              description: "50 startups ativas, R$ 10 milhões captados, 10.000 investidores",
              color: "green"
            },
            {
              title: "Fase 3: Expansão (24 meses)",
              description: "Expansão regional, parcerias institucionais, 100 startups financiadas",
              color: "purple"
            }
          ]
        },
        order: 6
      },
      {
        id: "slide-7",
        type: "discussion",
        title: "Discussão",
        subtitle: "Perguntas para reflexão e debate acadêmico",
        content: {
          questions: [
            {
              question: "Quais seriam as maiores dificuldades para uma startup no Brasil hoje?",
              context: "Considerando aspectos burocráticos, tributários, culturais e de acesso ao capital",
              color: "blue"
            },
            {
              question: "Como políticas públicas poderiam facilitar a captação de recursos?",
              context: "Incentivos fiscais, desburocratização, programas específicos de fomento",
              color: "green"
            },
            {
              question: "Que tipos de parcerias poderiam fortalecer projetos inovadores?",
              context: "Universidade-empresa, corporate venture, hubs de inovação e colaboração internacional",
              color: "purple"
            }
          ],
          interactionSpaces: [
            { title: "📈 Experiências", description: "Casos práticos de startups que conhecem" },
            { title: "💡 Soluções", description: "Propostas para superar barreiras identificadas" },
            { title: "🤝 Colaboração", description: "Ideias para fortalecer o ecossistema" }
          ],
          academicContext: {
            theoretical: "Este estudo contribui para a literatura sobre ecossistemas de inovação, empreendedorismo e políticas públicas de fomento à inovação no contexto brasileiro e latino-americano.",
            practical: "Os insights podem orientar políticas governamentais, estratégias de investimento e desenvolvimento de programas de aceleração e incubação de startups."
          }
        },
        order: 7
      },
      {
        id: "slide-8",
        type: "conclusion",
        title: "Conclusão",
        subtitle: "Síntese dos aprendizados e recomendações estratégicas",
        content: {
          learnings: [
            {
              title: "Crescimento Acelerado",
              description: "O ecossistema de startups brasileiro está em crescimento acelerado, com R$ 13,9 bilhões captados em 2024",
              color: "green"
            },
            {
              title: "Diversidade de Fontes",
              description: "Diversidade de fontes de capital disponíveis, desde investidores-anjo até venture capital e editais públicos",
              color: "blue"
            },
            {
              title: "Desafios Estruturais",
              description: "Principais desafios incluem burocracia e conhecimento limitado em gestão financeira",
              color: "orange"
            },
            {
              title: "Liderança Regional",
              description: "Brasil representa 54% dos investimentos em startups na América Latina",
              color: "purple"
            }
          ],
          futurePerspective: "Tendência de aumento no microfinanciamento coletivo e investimentos de impacto alinhados aos Objetivos de Desenvolvimento Sustentável",
          recommendations: [
            {
              title: "Definir modelo de negócio claro",
              description: "Investidores buscam propostas de valor bem definidas e modelos de monetização viáveis",
              icon: "fas fa-bullseye"
            },
            {
              title: "Formar equipe complementar",
              description: "Combine habilidades técnicas e de gestão para criar um time balanceado e resiliente",
              icon: "fas fa-users"
            },
            {
              title: "Preparar pitch deck impactante",
              description: "Desenvolva apresentações concisas, visuais e centradas em métricas relevantes",
              icon: "fas fa-presentation"
            },
            {
              title: "Participar de redes e comunidades",
              description: "Conecte-se a aceleradoras, hubs de inovação e eventos do setor para networking",
              icon: "fas fa-network-wired"
            },
            {
              title: "Diversificar fontes de financiamento",
              description: "Combine capital público e privado, explorando editais e investidores estratégicos",
              icon: "fas fa-chart-pie"
            }
          ]
        },
        order: 8
      },
      {
        id: "slide-9",
        type: "references",
        title: "Referências",
        subtitle: "Bibliografia científica e fontes acadêmicas",
        content: {
          categories: [
            {
              title: "Relatórios e Dados Estatísticos",
              icon: "fas fa-chart-bar",
              color: "blue",
              references: [
                {
                  title: "Startupi (2024)",
                  description: "Startups no Brasil captaram R$ 13,9 bi em 2024",
                  url: "startupi.com.br",
                  color: "blue"
                },
                {
                  title: "Liga Ventures (2024)",
                  description: "Balanço do Ecossistema de Startups no Brasil em 2024",
                  url: "liga.ventures",
                  color: "green"
                },
                {
                  title: "Sebrae (2023)",
                  description: "Insights do panorama nacional das startups atendidas pelo Sebrae",
                  url: "observatorio.sebraestartups.com.br",
                  color: "purple"
                },
                {
                  title: "Anjos do Brasil (2023)",
                  description: "O crescimento do investimento Anjo",
                  url: "anjosdoBrasil.net",
                  color: "orange"
                }
              ]
            },
            {
              title: "Casos de Sucesso",
              icon: "fas fa-trophy",
              color: "yellow",
              references: [
                {
                  title: "Nubank",
                  description: "Case de sucesso do Nubank apostando no marketing digital",
                  url: "anormedia.com.br",
                  color: "purple"
                },
                {
                  title: "QuintoAndar",
                  description: "QuintoAndar capta US$ 300 milhões e passa a valer US$ 4 bilhões",
                  url: "exame.com",
                  color: "red"
                }
              ]
            },
            {
              title: "Captação de Recursos",
              icon: "fas fa-download",
              color: "blue",
              references: [
                {
                  title: "Sebrae (2023)",
                  description: "Tipos de investimento em startup: o que é e como atrair investidores",
                  url: "sebrae-sc.com.br",
                  color: "blue"
                },
                {
                  title: "DXA Invest (2024)",
                  description: "Diferenças entre venture capital, equity crowdfunding e investimento anjo",
                  url: "dxainvest.com",
                  color: "green"
                },
                {
                  title: "Stripe (2024)",
                  description: "Como levantar capital para sua startup",
                  url: "stripe.com",
                  color: "purple"
                }
              ]
            },
            {
              title: "Editais e Fundos Públicos",
              icon: "fas fa-university",
              color: "blue",
              references: [
                {
                  title: "FINEP (2024)",
                  description: "Chamadas Públicas",
                  url: "finep.gov.br",
                  color: "blue"
                },
                {
                  title: "MCTI/FINEP (2024)",
                  description: "Centros Temáticos 2024",
                  url: "finep.gov.br",
                  color: "green"
                }
              ]
            },
            {
              title: "Impacto Social (ODS)",
              icon: "fas fa-globe",
              color: "green",
              references: [
                {
                  title: "Global Goals (2024)",
                  description: "ODS 9: Indústria, Inovação e Infraestrutura",
                  url: "globalgoals.org",
                  color: "green"
                }
              ]
            }
          ],
          footer: {
            created: "Apresentação criada em 15 de setembro de 2025",
            event: "Seminário: O Ecossistema de Investimento Privado",
            theme: "Tema I - Startups em Estágio Inicial: O Impulso Inicial, Validação e Construção de Protótipo/MVP"
          }
        },
        order: 9
      }
    ];

    // Normalize slide IDs and order to ensure consistency
    const normalizedSlides: SlideData[] = defaultSlides.map((slide, index) => ({
      ...slide,
      id: `slide-${index + 1}`,
      order: index + 1
    }));

    const defaultPresentation: Presentation = {
      id: "default",
      title: "O Ecossistema de Investimento Privado",
      description: "Apresentação acadêmica sobre startups em estágio inicial",
      slides: normalizedSlides,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.presentations.set("default", defaultPresentation);
  }

  async getPresentation(id: string): Promise<Presentation | undefined> {
    return this.presentations.get(id);
  }

  async createPresentation(insertPresentation: InsertPresentation): Promise<Presentation> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const presentation: Presentation = {
      id,
      title: insertPresentation.title,
      description: insertPresentation.description || null,
      slides: insertPresentation.slides as SlideData[],
      createdAt: now,
      updatedAt: now
    };
    this.presentations.set(id, presentation);
    return presentation;
  }

  async updatePresentation(id: string, updates: Partial<InsertPresentation>): Promise<Presentation | undefined> {
    const existing = this.presentations.get(id);
    if (!existing) return undefined;

    const updated: Presentation = {
      ...existing,
      title: updates.title ?? existing.title,
      description: updates.description !== undefined ? updates.description : existing.description,
      slides: updates.slides ? updates.slides as SlideData[] : existing.slides,
      updatedAt: new Date().toISOString()
    };
    this.presentations.set(id, updated);
    return updated;
  }

  async getAllPresentations(): Promise<Presentation[]> {
    return Array.from(this.presentations.values());
  }

  async updateSlides(id: string, slides: SlideData[]): Promise<Presentation | undefined> {
    return this.updatePresentation(id, { slides });
  }
}

export const storage = new MemStorage();
