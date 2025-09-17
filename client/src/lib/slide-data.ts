import type { SlideData } from "@shared/schema";

export const defaultSlides: SlideData[] = [
  {
    id: "slide-1",
    type: "intro",
    title: "Tipos de Captação de Recursos",
    subtitle: "Ecossistema de investimento para startups em estágio inicial",
    content: {
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
    order: 1
  }
  // Additional slides would be defined here...
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
