import React, { useRef, useEffect, useState } from 'react';

/**
 * sections: [
 *   { id: 'section2', content: <TrustedCreators />, skipSnapScroll: true }, // skipSnapScroll = true za sekcije sa sopstvenom logikom
 *   { id: 'why-linkstackz-section', content: <WhyLinkstackz /> },
 *   ...
 * ]
 */
const SnapScrollContainer = ({ sections = [] }) => {
  const placeholderRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Filtriraj sekcije koje treba da koriste snap-scroll
  const snapSections = sections.filter(section => !section.skipSnapScroll);
  const skipSections = sections.filter(section => section.skipSnapScroll);

  // Prati scroll i određuje koja sekcija je aktivna
  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      let found = -1;
      
      for (let i = 0; i < snapSections.length; i++) {
        const ref = placeholderRefs.current[i];
        if (ref) {
          const top = ref.getBoundingClientRect().top;
          if (top <= vh * 0.5) {
            found = i;
          }
        }
      }
      setActiveIndex(found);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [snapSections.length]);

  return (
    <>
      {/* Renderuj sekcije koje preskaču snap-scroll direktno */}
      {skipSections.map((section, index) => (
        <React.Fragment key={`skip-${section.id}`}>
          {section.content}
        </React.Fragment>
      ))}

      {/* Renderuj sekcije sa snap-scroll logikom */}
      {snapSections.map((section, i) => (
        <React.Fragment key={section.id}>
          {/* Placeholder za scroll prostor */}
          <div
            ref={el => (placeholderRefs.current[i] = el)}
            style={{ height: '100vh', width: '100%' }}
          />
          
          {/* Fixed sekcija */}
          {activeIndex === i && (
            <div
              id={section.id}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100vh',
                zIndex: 15,
                pointerEvents: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: 'transparent',
              }}
            >
              {React.cloneElement(section.content, { isActive: true })}
            </div>
          )}
        </React.Fragment>
      ))}
      
      {/* Dodatni placeholder na kraju */}
      <div style={{ height: '100vh', width: '100%' }} />
    </>
  );
};

export default SnapScrollContainer; 