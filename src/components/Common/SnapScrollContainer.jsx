import React, { useRef, useEffect, useState, useCallback } from 'react';

const SnapScrollContainer = ({ sections = [] }) => {
  const placeholderRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [prevActiveIndex, setPrevActiveIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false); // Sada prati da li je BILO KOJA animacija u toku
  const [scrollDirection, setScrollDirection] = useState('down'); // 'up' or 'down'

  const lastScrollY = useRef(0);

  // Filter sections that should use snap-scroll
  const snapSections = sections.filter(section => !section.skipSnapScroll);
  const skipSections = sections.filter(section => section.skipSnapScroll);

  // Detect scroll direction
  useEffect(() => {
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, []);

  // Track scroll and determine which section is active
  useEffect(() => {
    const handleScroll = () => {
      if (isAnimating) return; // Prevent new calculations during animation

      const vh = window.innerHeight;
      let foundIndex = -1;

      for (let i = 0; i < snapSections.length; i++) {
        const ref = placeholderRefs.current[i];
        if (ref) {
          const top = ref.getBoundingClientRect().top;
          // Sekcija postaje aktivna kada je njen vrh na polovini viewporta
          if (top <= vh * 0.5 && (top + ref.offsetHeight) > vh * 0.5) {
            foundIndex = i;
            break;
          }
        }
      }

      if (foundIndex !== activeIndex) {
        setIsAnimating(true); // Start animation
        setPrevActiveIndex(activeIndex); // Store previous active index
        setActiveIndex(foundIndex); // Set new active index

        // End animation after a timeout (matching CSS transition duration)
        const animationDuration = 700; // ms, should match CSS transition for smooth finish
        setTimeout(() => {
          setIsAnimating(false);
          setPrevActiveIndex(-1); // Clear previous active index
        }, animationDuration);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex, snapSections.length, isAnimating]);


  // Helper function to get styles for a section based on its active/previous status and scroll direction
  const getSectionStyles = useCallback((index) => {
    const isCurrentActive = activeIndex === index;
    const isPreviousActive = prevActiveIndex === index;

    let transformValue = 'translateY(0%)';
    let zIndexValue = 10;
    let opacityValue = 1; // Default to 1 for "push" effect

    // Set transitions based on if animation is active
    let transitionValue = isAnimating ? 'transform 0.7s ease-out' : 'none';

    if (isCurrentActive) {
      // The current active section
      zIndexValue = 20; // Ensure it's on top
      if (isAnimating) {
        // It's coming into view
        transformValue = scrollDirection === 'down' ? 'translateY(0%)' : 'translateY(0%)';
        // If coming from below: translateY(100%) to translateY(0%)
        // If coming from above: translateY(-100%) to translateY(0%)
        // This is handled by the initial state of the component when it's rendered for the first time
        // or by the previousActiveIndex pushing it.
      } else {
        transformValue = 'translateY(0%)'; // Rest position
      }
    } else if (isPreviousActive) {
      // The section that was active and is now leaving
      zIndexValue = 15; // Below the new active section
      if (isAnimating) {
        // It's leaving view
        transformValue = scrollDirection === 'down' ? 'translateY(-100%)' : 'translateY(100%)';
        // If scrolling down, previous moves up: translateY(-100%)
        // If scrolling up, previous moves down: translateY(100%)
        // Opacity can fade out at the very end if needed, but not initially
        opacityValue = 1; // Start at 1, maybe fade to 0 slightly at the end of transition
      } else {
        // Should not be visible if animation is not active
        opacityValue = 0;
        transformValue = 'translateY(0%)'; // Reset, or keep off-screen depending on next usage
        transitionValue = 'none';
      }
    } else {
      // Not active, not previous, just a regular placeholder
      opacityValue = 0; // Not visible
      transformValue = 'translateY(0%)'; // Reset for next activation
      transitionValue = 'none';
    }

    return {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '100vh',
      pointerEvents: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'transparent', // Make sure background is transparent if you want previous/next to be seen
      zIndex: zIndexValue,
      transform: transformValue,
      opacity: opacityValue, // Maintain opacity 1 for push, or fade slightly at very end
      transition: transitionValue,
    };
  }, [activeIndex, prevActiveIndex, isAnimating, scrollDirection]);


  return (
    <>
      {/* Render skip-scroll sections directly */}
      {skipSections.map((section) => (
        <React.Fragment key={`skip-${section.id}`}>
          <div id={section.id} style={{ minHeight: '100vh', width: '100%' }}>
            {section.content}
          </div>
        </React.Fragment>
      ))}

      {/* Render snap-scroll sections */}
      {snapSections.map((section, i) => {
        const isCurrentActive = activeIndex === i;
        const isPreviousActive = prevActiveIndex === i;

        // Determine if this section needs to be rendered (active OR previous and animating)
        const shouldRenderFixed = isCurrentActive || (isPreviousActive && isAnimating);

        return (
          <React.Fragment key={section.id}>
            {/* Placeholder for scroll space - always render for snap sections */}
            <div
              ref={el => (placeholderRefs.current[i] = el)}
              style={{ height: '100vh', width: '100%' }}
            />

            {/* Fixed section only if it's active or being animated out */}
            {shouldRenderFixed && (
              <div
                id={section.id}
                style={getSectionStyles(i)} // Apply styles from helper function
              >
                {/* Clone element to pass isActive and potentially other props */}
                {React.cloneElement(section.content, {
                  isActive: isCurrentActive,
                  scrollDirection: scrollDirection, // Pass scroll direction to child
                  // onNextSectionTrigger and nextSectionId are managed by SnapScrollContainer's logic now
                  // If child components still need nextSectionId for internal links, pass it
                  nextSectionId: sections[i + 1] ? sections[i + 1].id : undefined
                })}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Additional placeholder at the end if needed */}
    </>
  );
};

export default SnapScrollContainer;