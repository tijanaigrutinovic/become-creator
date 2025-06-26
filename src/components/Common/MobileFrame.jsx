import React, { useEffect, useRef, useState } from 'react';

const MobileFrame = () => {
const frameRef = useRef(null);
  const [position, setPosition] = useState(0); // Y pozicija

  useEffect(() => {
    const handleScroll = () => {
      const start = 0; // po potrebi podesi preciznije
      const end = 800; // gde treba da stane
      const scrollY = window.scrollY;

      // Prilagodi intenzitet animacije
      const progress = Math.min(Math.max((scrollY - start) / (end - start), 0), 1);

      // Npr. kreće sa 0px i ide do 300px dole
      const translateY = progress * 300;

      setPosition(translateY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <img
      ref={frameRef}
      src="/images/CreatorsPlatform/mobile-frame.svg"
      alt="Floating Frame"
      className="fixed left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-transform duration-75 ease-linear"
      style={{
        transform: `translate(-50%, ${position}px)`,
      }}
    />
  );
};

export default MobileFrame;
