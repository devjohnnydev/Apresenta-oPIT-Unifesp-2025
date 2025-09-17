import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SlideContent } from "./slide-content";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Presentation } from "@shared/schema";

interface FullscreenPresentationProps {
  presentation: Presentation;
  currentSlide: number;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onExit: () => void;
}

export function FullscreenPresentation({
  presentation,
  currentSlide,
  onNextSlide,
  onPrevSlide,
  onExit,
}: FullscreenPresentationProps) {
  const totalSlides = presentation.slides.length;
  const currentSlideData = presentation.slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fullscreen-mode flex flex-col"
      data-testid="fullscreen-presentation"
    >
      {/* Content Area */}
      <div className="flex-1 slide-content-wrapper">
        <div className="slide-content-fullscreen">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full flex flex-col justify-center"
          >
            <SlideContent
              slide={currentSlideData}
              isEditMode={false}
              onUpdateSlide={() => {}}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-900 no-print">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevSlide}
          disabled={currentSlide === 0}
          className="text-white hover:bg-white/20"
          data-testid="button-fullscreen-prev"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        <span className="text-white text-sm" data-testid="text-fullscreen-counter">
          {currentSlide + 1} / {totalSlides}
        </span>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onNextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="text-white hover:bg-white/20"
          data-testid="button-fullscreen-next"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
        
        <div className="mx-4 h-6 w-px bg-white/20"></div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onExit}
          className="text-white hover:bg-red-600/20"
          data-testid="button-exit-fullscreen"
        >
          <X className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </motion.div>
  );
}
