import { useState, useEffect, useRef, useCallback } from 'react';

interface UseAutoScaleOptions {
  enabled?: boolean;
  minScale?: number;
  maxScale?: number;
  padding?: number;
  debounceMs?: number;
}

interface AutoScaleResult {
  scale: number;
  containerRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  isScaled: boolean;
  viewportHeight: number;
  contentHeight: number;
}

export function useAutoScale(options: UseAutoScaleOptions = {}): AutoScaleResult {
  const {
    enabled = true,
    minScale = 0.4,
    maxScale = 1,
    padding = 40,
    debounceMs = 150
  } = options;

  const [scale, setScale] = useState(1);
  const [isScaled, setIsScaled] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const calculateScale = useCallback(() => {
    if (!enabled || !containerRef.current || !contentRef.current) {
      setScale(1);
      setIsScaled(false);
      return;
    }

    const container = containerRef.current;
    const content = contentRef.current;
    
    // Get actual viewport dimensions
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    
    // Account for mobile viewport quirks
    const actualViewportHeight = Math.min(vh, window.screen.height);
    
    // Get container bounds (considering any parent transforms)
    const containerRect = container.getBoundingClientRect();
    const availableHeight = actualViewportHeight - containerRect.top - padding;
    
    // Get content dimensions
    content.style.transform = 'scale(1)'; // Reset scale to measure actual size
    const contentRect = content.getBoundingClientRect();
    const actualContentHeight = content.scrollHeight;
    
    setViewportHeight(actualViewportHeight);
    setContentHeight(actualContentHeight);

    if (actualContentHeight <= availableHeight) {
      // Content fits naturally
      setScale(1);
      setIsScaled(false);
    } else {
      // Calculate needed scale
      const neededScale = Math.max(
        minScale,
        Math.min(maxScale, availableHeight / actualContentHeight)
      );
      
      setScale(neededScale);
      setIsScaled(neededScale < 1);
    }
  }, [enabled, minScale, maxScale, padding]);

  const debouncedCalculateScale = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = window.setTimeout(() => {
      calculateScale();
    }, debounceMs);
  }, [calculateScale, debounceMs]);

  useEffect(() => {
    if (!enabled) return;

    // Initial calculation
    calculateScale();

    // Handle resize events
    const handleResize = () => {
      debouncedCalculateScale();
    };

    // Handle orientation change (mobile)
    const handleOrientationChange = () => {
      // Delay to account for viewport changes
      setTimeout(debouncedCalculateScale, 100);
    };

    // Handle content changes with ResizeObserver
    let resizeObserver: ResizeObserver | null = null;
    
    if (contentRef.current && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(() => {
        debouncedCalculateScale();
      });
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Also listen for viewport meta changes on mobile
    window.addEventListener('load', debouncedCalculateScale);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('load', debouncedCalculateScale);
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [enabled, debouncedCalculateScale]);

  return {
    scale,
    containerRef,
    contentRef,
    isScaled,
    viewportHeight,
    contentHeight
  };
}