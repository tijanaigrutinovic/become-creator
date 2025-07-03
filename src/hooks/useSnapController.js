/ src/hooks/useSnapController.js
import { useState, useCallback, useRef } from 'react';

export const useSnapController = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef(null);

  const scrollToSection = useCallback((sectionIndex) => {
    if (!scrollContainerRef.current || isAnimating) return;
    
    const sections = scrollContainerRef.current.children;
    if (sections[sectionIndex]) {
      sections[sectionIndex].scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [isAnimating]);

  const onSectionAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const onSectionAnimationEnd = useCallback(() => {
    setIsAnimating(false);
  }, []);

  const goToNextSection = useCallback(() => {
    if (isAnimating) return;
    
    const nextSection = currentSection + 1;
    const maxSections = scrollContainerRef.current?.children.length || 0;
    
    if (nextSection < maxSections) {
      setCurrentSection(nextSection);
      scrollToSection(nextSection);
    }
  }, [currentSection, isAnimating, scrollToSection]);

  const goToPrevSection = useCallback(() => {
    if (isAnimating) return;
    
    const prevSection = currentSection - 1;
    
    if (prevSection >= 0) {
      setCurrentSection(prevSection);
      scrollToSection(prevSection);
    }
  }, [currentSection, isAnimating, scrollToSection]);

  return {
    currentSection,
    setCurrentSection,
    isAnimating,
    scrollContainerRef,
    onSectionAnimationStart,
    onSectionAnimationEnd,
    goToNextSection,
    goToPrevSection,
    scrollToSection
  };
};
