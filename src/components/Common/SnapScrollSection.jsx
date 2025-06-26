import React, { useRef, useEffect, useState, useCallback } from 'react';

const SnapScrollSection = ({ 
  children, 
  id, 
  nextSectionId, 
  placeholderHeight = '100vh',
  transitionThreshold = 0.15,
  transitionComplete = 0.85,
  onNextSectionTrigger,
  className = '',
  style = {}
}) => {
  const sectionRef = useRef(null);
  const placeholderRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(false);
  const [hideSection, setHideSection] = useState(false);

  const handleScroll = useCallback(() => {
    if (placeholderRef.current) {
      const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
      const placeholderHeight = placeholderRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      let progress = -placeholderTop / (placeholderHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      if (progress >= transitionThreshold) {
        setShouldTransition(true);
      } else {
        setShouldTransition(false);
      }
    }
  }, [transitionThreshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (scrollProgress > 0.98) {
      setHideSection(true);
      // Snap-scroll na sledeću sekciju
      if (nextSectionId) {
        setTimeout(() => {
          const el = document.getElementById(nextSectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      setHideSection(false);
    }
  }, [scrollProgress, nextSectionId]);

  // Animacija za prikaz sledeće sekcije
  useEffect(() => {
    if (shouldTransition && scrollProgress >= transitionThreshold) {
      const transitionProgress = Math.min(
        (scrollProgress - transitionThreshold) / (transitionComplete - transitionThreshold),
        1
      );
      if (transitionProgress > 0.3 && onNextSectionTrigger) {
        onNextSectionTrigger((transitionProgress - 0.3) / 0.7);
      }
    }
  }, [shouldTransition, scrollProgress, transitionThreshold, transitionComplete, onNextSectionTrigger]);

  return (
    <>
      {/* Placeholder za scroll prostor */}
      <div 
        ref={placeholderRef} 
        style={{ 
          height: placeholderHeight, 
          width: '100%' 
        }} 
      />
      
      {/* Fixed sekcija */}
      <div
        ref={sectionRef}
        id={id}
        className={className}
        style={{
          position: hideSection ? 'relative' : 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 15,
          pointerEvents: hideSection ? 'none' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: hideSection ? 0 : 1,
          transform: 'translateY(0px)',
          transition: 'opacity 0.7s, transform 0.7s',
          ...style
        }}
      >
        {children}
      </div>
    </>
  );
};

export default SnapScrollSection; 