import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import { SlideEditor } from "@/components/slide-editor";
import { FullscreenPresentation } from "@/components/fullscreen-presentation";
import { apiRequest } from "@/lib/queryClient";
import type { Presentation, SlideData } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function PresentationPage() {
  const { id = "default" } = useParams<{ id?: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch presentation data
  const { data: presentation, isLoading } = useQuery<Presentation>({
    queryKey: ["/api/presentations", id],
    enabled: !!id,
  });

  // Update slides mutation
  const updateSlidesMutation = useMutation({
    mutationFn: async (slides: SlideData[]) => {
      const response = await apiRequest("PUT", `/api/presentations/${id}/slides`, slides);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/presentations", id] });
      toast({
        title: "Slides atualizados",
        description: "As alterações foram salvas com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    },
  });

  // Navigation functions
  const nextSlide = useCallback(() => {
    if (presentation && currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, presentation]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (presentation && index >= 0 && index < presentation.slides.length) {
      setCurrentSlide(index);
    }
  }, [presentation]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isFullscreen) {
        switch (event.key) {
          case 'ArrowRight':
          case ' ':
            event.preventDefault();
            nextSlide();
            break;
          case 'ArrowLeft':
            event.preventDefault();
            prevSlide();
            break;
          case 'Escape':
            event.preventDefault();
            setIsFullscreen(false);
            break;
        }
      } else {
        switch (event.key) {
          case 'ArrowRight':
            event.preventDefault();
            nextSlide();
            break;
          case 'ArrowLeft':
            event.preventDefault();
            prevSlide();
            break;
          case 'f':
          case 'F':
            if (event.ctrlKey || event.metaKey) {
              event.preventDefault();
              setIsFullscreen(true);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, nextSlide, prevSlide]);

  // Handle slide content updates
  const handleSlideUpdate = useCallback((updatedSlides: SlideData[]) => {
    updateSlidesMutation.mutate(updatedSlides);
  }, [updateSlidesMutation]);

  // Export to PDF
  const exportToPDF = useCallback(() => {
    const printStyles = `
      <style>
        @media print {
          body { font-family: Inter, sans-serif; }
          .slide-container { 
            page-break-after: always; 
            margin: 0; 
            padding: 2cm; 
            min-height: 100vh;
          }
          .slide-container:last-child { page-break-after: avoid; }
          .no-print { display: none !important; }
        }
      </style>
    `;
    
    const content = presentation?.slides.map((slide, index) => `
      <div class="slide-container" data-slide="${index}">
        <h1 style="color: hsl(221, 83%, 53%); font-size: 2.5rem; font-weight: bold; margin-bottom: 1rem;">
          ${slide.title}
        </h1>
        ${slide.subtitle ? `<p style="color: hsl(215.4, 16.3%, 46.9%); font-size: 1.125rem; margin-bottom: 2rem;">${slide.subtitle}</p>` : ''}
        <div style="margin-top: 2rem;">
          <!-- Content would be rendered here based on slide type -->
          <p>Slide content will be formatted for print</p>
        </div>
      </div>
    `).join('');

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${presentation?.title} - Apresentação</title>
            ${printStyles}
          </head>
          <body>
            ${content}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast({
        title: "Erro na exportação",
        description: "Não foi possível abrir a janela de impressão. Verifique se pop-ups estão bloqueados.",
        variant: "destructive",
      });
    }
  }, [presentation, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" data-testid="loading-presentation">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando apresentação...</p>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" data-testid="presentation-not-found">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Apresentação não encontrada</h1>
          <p className="text-muted-foreground">A apresentação solicitada não foi encontrada.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-testid="presentation-page">
      {isFullscreen ? (
        <FullscreenPresentation
          presentation={presentation}
          currentSlide={currentSlide}
          onNextSlide={nextSlide}
          onPrevSlide={prevSlide}
          onExit={() => setIsFullscreen(false)}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <SlideEditor
            presentation={presentation}
            currentSlide={currentSlide}
            isEditMode={isEditMode}
            onSlideChange={goToSlide}
            onNextSlide={nextSlide}
            onPrevSlide={prevSlide}
            onToggleEditMode={() => setIsEditMode(!isEditMode)}
            onEnterFullscreen={() => setIsFullscreen(true)}
            onExportPDF={exportToPDF}
            onUpdateSlides={handleSlideUpdate}
          />
        </motion.div>
      )}
    </div>
  );
}
