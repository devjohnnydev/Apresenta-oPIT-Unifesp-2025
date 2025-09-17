import type { SlideData } from "@shared/schema";

export function validateSlideContent(slide: SlideData): boolean {
  if (!slide.title || !slide.type) {
    return false;
  }
  
  // Add more specific validation based on slide type
  switch (slide.type) {
    case "chart":
      return !!(slide.content.chartData?.labels && slide.content.chartData?.values);
    case "discussion":
      return !!(slide.content.questions && Array.isArray(slide.content.questions));
    default:
      return true;
  }
}

export function generateSlideId(): string {
  return `slide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function exportSlideToText(slide: SlideData): string {
  let content = `# ${slide.title}\n`;
  
  if (slide.subtitle) {
    content += `## ${slide.subtitle}\n\n`;
  }
  
  // Add basic content extraction based on slide type
  switch (slide.type) {
    case "intro":
      if (slide.content.sections) {
        slide.content.sections.forEach((section: any) => {
          content += `### ${section.title}\n`;
          if (section.items) {
            section.items.forEach((item: string) => {
              content += `- ${item}\n`;
            });
          }
          content += '\n';
        });
      }
      break;
    case "content":
      // Extract challenges and opportunities
      if (slide.content.challenges) {
        content += "### Desafios\n";
        slide.content.challenges.forEach((challenge: any) => {
          content += `- **${challenge.title}**: ${challenge.description}\n`;
        });
        content += '\n';
      }
      if (slide.content.opportunities) {
        content += "### Oportunidades\n";
        slide.content.opportunities.forEach((opportunity: any) => {
          content += `- **${opportunity.title}**: ${opportunity.description}\n`;
        });
        content += '\n';
      }
      break;
    default:
      content += "Conteúdo do slide\n";
  }
  
  return content;
}

export function createEmptySlide(type: SlideData["type"]): SlideData {
  const baseSlide: SlideData = {
    id: generateSlideId(),
    type,
    title: "Novo Slide",
    subtitle: "",
    content: {},
    order: 0
  };
  
  // Initialize content based on slide type
  switch (type) {
    case "intro":
      baseSlide.content = {
        sections: []
      };
      break;
    case "chart":
      baseSlide.content = {
        chartData: { labels: [], values: [] },
        stats: [],
        successCases: []
      };
      break;
    case "discussion":
      baseSlide.content = {
        questions: [],
        interactionSpaces: []
      };
      break;
    default:
      baseSlide.content = {};
  }
  
  return baseSlide;
}

export function duplicateSlide(slide: SlideData): SlideData {
  return {
    ...slide,
    id: generateSlideId(),
    title: `${slide.title} (Cópia)`,
    order: slide.order
  };
}

// Utility for handling keyboard shortcuts in presentation mode
export function handlePresentationKeyboard(
  event: KeyboardEvent,
  handlers: {
    nextSlide: () => void;
    prevSlide: () => void;
    exitFullscreen: () => void;
  }
): boolean {
  switch (event.key) {
    case 'ArrowRight':
    case ' ':
    case 'PageDown':
      event.preventDefault();
      handlers.nextSlide();
      return true;
    case 'ArrowLeft':
    case 'PageUp':
      event.preventDefault();
      handlers.prevSlide();
      return true;
    case 'Escape':
      event.preventDefault();
      handlers.exitFullscreen();
      return true;
    case 'Home':
      event.preventDefault();
      // Could implement go to first slide
      return true;
    case 'End':
      event.preventDefault();
      // Could implement go to last slide
      return true;
    default:
      return false;
  }
}

// Color utilities for consistent theming
export const slideColors = {
  primary: {
    bg: "bg-primary/10",
    border: "border-primary/20",
    text: "text-primary",
    icon: "text-primary"
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-800",
    icon: "text-blue-600"
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    icon: "text-green-600"
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-800",
    icon: "text-purple-600"
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-800",
    icon: "text-orange-600"
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    icon: "text-red-600"
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    icon: "text-yellow-600"
  }
};

export function getSlideColorClasses(color: string) {
  return slideColors[color as keyof typeof slideColors] || slideColors.primary;
}
