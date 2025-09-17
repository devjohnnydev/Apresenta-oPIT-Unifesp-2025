import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { SlideData } from "@shared/schema";

interface SlideNavigationProps {
  slides: SlideData[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const slideTypeIcons: Record<string, string> = {
  intro: "fas fa-play-circle",
  content: "fas fa-file-text",
  chart: "fas fa-chart-bar",
  discussion: "fas fa-comments",
  conclusion: "fas fa-check-circle",
  references: "fas fa-book",
};

const slideTypeColors: Record<string, string> = {
  intro: "bg-primary/10 border-primary/20",
  content: "bg-blue-50 border-blue-200",
  chart: "bg-green-50 border-green-200",
  discussion: "bg-purple-50 border-purple-200",
  conclusion: "bg-orange-50 border-orange-200",
  references: "bg-gray-50 border-gray-200",
};

export function SlideNavigation({ slides, currentSlide, onSlideChange }: SlideNavigationProps) {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        SLIDES
      </h3>
      <div className="space-y-2" data-testid="slide-navigation">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            data-testid={`slide-nav-item-${index}`}
          >
            <div
              className={cn(
                "p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors border",
                currentSlide === index 
                  ? slideTypeColors[slide.type] || "bg-primary/10 border-primary/20"
                  : "bg-card border-border hover:border-accent-foreground/20"
              )}
              onClick={() => onSlideChange(index)}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" data-testid={`slide-title-${index}`}>
                    {slide.title}
                  </div>
                  {slide.subtitle && (
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2" data-testid={`slide-subtitle-${index}`}>
                      {slide.subtitle}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground/60 mt-1 capitalize">
                    {slide.type}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
