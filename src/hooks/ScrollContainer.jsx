import React, { useEffect } from 'react';
import { useSnapController } from '../hooks/useSnapController';

const ScrollContainer = ({ children }) => {
  const {
    currentSection,
    setCurrentSection,
    isAnimating,
    scrollContainerRef,
    onSectionAnimationStart,
    onSectionAnimationEnd
  } = useSnapController();

  // Disable scroll snapping kada je animacija u toku
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      if (isAnimating) {
        container.style.scrollSnapType = 'none';
        container.style.overflowY = 'hidden';
      } else {
        container.style.scrollSnapType = 'y mandatory';
        container.style.overflowY = 'scroll';
      }
    }
  }, [isAnimating]);

  // Kloniraj decu i proslijedi props
  const enhancedChildren = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        isActive: currentSection === index,
        sectionIndex: index,
        onSectionAnimationStart,
        onSectionAnimationEnd,
        onSectionDone: () => {
          onSectionAnimationEnd();
          // Automatski idi na sledeću sekciju nakon završetka animacije
          setTimeout(() => {
            if (index < children.length - 1) {
              setCurrentSection(index + 1);
            }
          }, 100);
        }
      });
    }
    return child;
  });

  return (
    <div 
      ref={scrollContainerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{
        scrollBehavior: isAnimating ? 'auto' : 'smooth'
      }}
    >
      {enhancedChildren}
    </div>
  );
};

export default ScrollContainer;