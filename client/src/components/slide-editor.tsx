import { SlideNavigation } from "./slide-navigation";
import { SlideContent } from "./slide-content";
import { EditModal } from "./edit-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Edit3, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  FileText 
} from "lucide-react";
import type { Presentation, SlideData } from "@shared/schema";

interface SlideEditorProps {
  presentation: Presentation;
  currentSlide: number;
  isEditMode: boolean;
  onSlideChange: (index: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
  onToggleEditMode: () => void;
  onEnterFullscreen: () => void;
  onExportPDF: () => void;
  onUpdateSlides: (slides: SlideData[]) => void;
}

export function SlideEditor({
  presentation,
  currentSlide,
  isEditMode,
  onSlideChange,
  onNextSlide,
  onPrevSlide,
  onToggleEditMode,
  onEnterFullscreen,
  onExportPDF,
  onUpdateSlides,
}: SlideEditorProps) {
  const totalSlides = presentation.slides.length;
  const currentSlideData = presentation.slides[currentSlide];

  return (
    <div className="flex h-screen bg-background" data-testid="slide-editor">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-card border-r border-border flex flex-col transition-all duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-primary mb-2" data-testid="presentation-title">
            {presentation.title}
          </h1>
          <p className="text-sm text-muted-foreground" data-testid="presentation-description">
            {presentation.description}
          </p>
        </div>

        {/* Controls */}
        <div className="p-4 border-b border-border">
          <div className="flex gap-2 mb-4">
            <Button
              variant={isEditMode ? "destructive" : "default"}
              size="sm"
              className="flex-1"
              onClick={onToggleEditMode}
              data-testid="button-toggle-edit"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditMode ? "Finalizar" : "Editar"}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={onEnterFullscreen}
              data-testid="button-present"
            >
              <Play className="w-4 h-4 mr-2" />
              Apresentar
            </Button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onExportPDF}
            data-testid="button-export-pdf"
          >
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>

        {/* Slide Navigation */}
        <div className="flex-1 overflow-y-auto">
          <SlideNavigation
            slides={presentation.slides}
            currentSlide={currentSlide}
            onSlideChange={onSlideChange}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-slide-counter">
              Slide {currentSlide + 1} de {totalSlides}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium" data-testid="text-slide-title">
              {currentSlideData?.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrevSlide}
              disabled={currentSlide === 0}
              data-testid="button-prev-slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNextSlide}
              disabled={currentSlide === totalSlides - 1}
              data-testid="button-next-slide"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-4 ml-2" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onEnterFullscreen}
              data-testid="button-fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            <SlideContent
              slide={currentSlideData}
              isEditMode={isEditMode}
              onUpdateSlide={(updatedSlide) => {
                const updatedSlides = [...presentation.slides];
                updatedSlides[currentSlide] = updatedSlide;
                onUpdateSlides(updatedSlides);
              }}
            />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditMode && (
        <EditModal onClose={() => {}} />
      )}
    </div>
  );
}
