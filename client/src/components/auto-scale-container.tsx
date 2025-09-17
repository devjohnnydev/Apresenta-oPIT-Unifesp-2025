import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { useAutoScale } from '@/hooks/use-auto-scale';

interface AutoScaleContainerProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  minScale?: number;
  maxScale?: number;
  padding?: number;
  showDebugInfo?: boolean;
  style?: React.CSSProperties;
}

export const AutoScaleContainer = forwardRef<HTMLDivElement, AutoScaleContainerProps>(
  ({ 
    children, 
    className = "", 
    enabled = true,
    minScale = 0.4,
    maxScale = 1,
    padding = 40,
    showDebugInfo = false,
    style = {},
    ...props 
  }, ref) => {
    const {
      scale,
      containerRef,
      contentRef,
      isScaled,
      viewportHeight,
      contentHeight
    } = useAutoScale({
      enabled,
      minScale,
      maxScale,
      padding
    });

    return (
      <div 
        ref={containerRef}
        className={cn(
          "auto-scale-container relative w-full h-full",
          className
        )}
        style={{
          minHeight: '100dvh',
          ...style
        }}
        {...props}
      >
        <div
          ref={contentRef}
          className={cn(
            "auto-scale-content w-full transition-transform duration-300 ease-out origin-top-center",
            isScaled && "transform-gpu"
          )}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            width: isScaled ? `${100 / scale}%` : '100%'
          }}
          data-testid="auto-scale-content"
        >
          {children}
        </div>

        {/* Debug Information */}
        {showDebugInfo && process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs z-50 font-mono">
            <div>Scale: {scale.toFixed(2)}</div>
            <div>Scaled: {isScaled ? 'Yes' : 'No'}</div>
            <div>Viewport: {viewportHeight}px</div>
            <div>Content: {contentHeight}px</div>
            <div>Ratio: {contentHeight > 0 ? (viewportHeight / contentHeight).toFixed(2) : 'N/A'}</div>
          </div>
        )}
      </div>
    );
  }
);

AutoScaleContainer.displayName = 'AutoScaleContainer';