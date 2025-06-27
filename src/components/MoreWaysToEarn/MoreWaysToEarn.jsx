import React, { useEffect, useRef, useState, useCallback } from 'react';
import BgBounceAnimate from '../Common/bg-bounce-animate';
import WaveCircleBox from '../Common/wave-circle-box';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const MoreWaysToEarn = () => {
  const sectionRef = useRef(null);
  const placeholderRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(false);
  const [hideSection, setHideSection] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Threshold za animaciju
  const TRANSITION_THRESHOLD = 0.15;
  const TRANSITION_COMPLETE = 0.85;

  // Za snap-scroll na WhyLinkstackz
  const WHY_LINKSTACKZ_ID = 'why-linkstackz-section';

  const handleScroll = useCallback(() => {
    if (placeholderRef.current) {
      const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
      const placeholderHeight = placeholderRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      let progress = -placeholderTop / (placeholderHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      if (progress >= TRANSITION_THRESHOLD) {
        setShouldTransition(true);
        setIsInitialized(true);
      } else {
        setShouldTransition(false);
      }

      if (progress > 0.1) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

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
      // Snap-scroll na WhyLinkstackz
      setTimeout(() => {
        const el = document.getElementById(WHY_LINKSTACKZ_ID);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100); // mali delay da se animacija završi
    } else {
      setHideSection(false);
    }
  }, [scrollProgress]);

  // Scroll animacija za MoreWaysToEarn
  useEffect(() => {
    if (shouldTransition && scrollProgress >= TRANSITION_THRESHOLD) {
      const transitionProgress = Math.min(
        (scrollProgress - TRANSITION_THRESHOLD) / (TRANSITION_COMPLETE - TRANSITION_THRESHOLD), 
        1
      );

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(transitionProgress);

      // Naslov se pomera na gore - ostaje vidljiv duže
      if (titleRef.current) {
        const titleFadeStart = 0.8; // Naslov počinje da nestaje tek na 80% progress-a
        let titleOpacity = 1;
        let titleTranslateY = 0;
        
        if (transitionProgress > titleFadeStart) {
          const titleProgress = (transitionProgress - titleFadeStart) / (1 - titleFadeStart);
          titleOpacity = 1 - titleProgress;
          titleTranslateY = -titleProgress * 100;
        }
        
        titleRef.current.style.transform = `translateY(${titleTranslateY}px)`;
        titleRef.current.style.opacity = titleOpacity;
        titleRef.current.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';
      }

      if (transitionProgress > 0.3) {
        triggerNextSectionAnimation((transitionProgress - 0.3) / 0.7);
      }
    } else {
      // Reset animacije
      if (titleRef.current) {
        titleRef.current.style.transform = 'translateY(0px)';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
      }
      
      const nextSection = document.getElementById('next-section');
      if (nextSection) {
        nextSection.style.opacity = '0';
        nextSection.style.transform = 'translateY(100px)';
        nextSection.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        nextSection.style.zIndex = '1';
      }
    }
  }, [shouldTransition, scrollProgress]);

  const triggerNextSectionAnimation = (progress) => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3);
      };
      
      const easedProgress = easeOutCubic(progress);

      nextSection.style.opacity = easedProgress;
      nextSection.style.transform = `translateY(${(1 - easedProgress) * 100}px)`;
      nextSection.style.zIndex = '30';
      nextSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
  };

  // Izračunaj trenutni slajd i progress
  const SLIDE_COUNT = 3;
  
  // Mapiraj scroll progress na slajdove - smooth prelazak
  const getSlideData = () => {
    // Scroll progress ide od 0 do 1, podelimo na slajdove
    const totalSlideProgress = scrollProgress * SLIDE_COUNT;
    const currentSlideIndex = Math.floor(totalSlideProgress);
    const slideProgress = totalSlideProgress - currentSlideIndex;
    
    // Osiguraj da ne izađemo iz granica
    const safeCurrentIndex = Math.max(0, Math.min(currentSlideIndex, SLIDE_COUNT - 1));
    const safeNextIndex = Math.min(safeCurrentIndex + 1, SLIDE_COUNT - 1);
    
    return {
      currentIndex: safeCurrentIndex,
      nextIndex: safeNextIndex,
      progress: slideProgress,
      isTransitioning: slideProgress > 0 && safeCurrentIndex !== safeNextIndex
    };
  };

  const slideData = getSlideData();

  // Smooth easing funkcija
  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };

  // Renderuj slajd komponentu na osnovu indeksa
  const renderSlide = (slideIndex, isTransitioning, progress) => {
    const slideProps = {
      isActive: slideIndex === slideData.currentIndex,
      isTransitioning,
      progress,
      easeInOutQuart
    };

    switch (slideIndex) {
      case 0:
        return <Slide1 key={`slide-${slideIndex}`} {...slideProps} />;
      case 1:
        return <Slide2 key={`slide-${slideIndex}`} {...slideProps} />;
      case 2:
        return <Slide3 key={`slide-${slideIndex}`} {...slideProps} />;
      default:
        return <Slide1 key={`slide-${slideIndex}`} {...slideProps} />;
    }
  };

  return (
    <>
      {/* Placeholder div - povećana visina za smooth scroll */}
      <div 
        ref={placeholderRef}
        className="more-ways-placeholder" 
        style={{ 
          height: '400vh', // Veća visina za glatki scroll
          width: '100%'
        }}
      />

      {/* Fixed pozicionirana sekcija */}
      <section
        ref={sectionRef}
        id="more-ways-section"
        className="max-w-[1670px] mx-auto px-6 py-24 relative"
        style={{
          opacity: isInitialized ? (hideSection ? 0 : 1) : 0,
          transform: 'translateY(0px)',
          position: hideSection ? 'relative' : 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 15,
          pointerEvents: isInitialized ? (hideSection ? 'none' : 'auto') : 'none',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'opacity 0.7s ease-out, transform 0.7s',
        }}
      >

        {/* Naslov - ostaje vidljiv duže */}
        <div
          ref={titleRef}
          className="text-center max-w-3xl mx-auto mb-20 transition-all duration-500"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(-80px)",
          }}
        >
          <h2 className="md:text-5xl text-2xl font-bold text-white leading-[70px] font-[1000]">
          More Ways to <span className="text-[#E91E63] font-gilroy capitalize">Earn</span>
          </h2>
          <p className="md:block hidden text-white text-lg font-bold font-gilroy capitalize leading-loose">
          From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
          </p>
        </div>

        {/* Sadržaj slajdova */}
        <div ref={contentRef} className="relative" style={{height: '600px'}}>
          {/* Trenutni slajd */}
          {renderSlide(slideData.currentIndex, slideData.isTransitioning, slideData.progress)}

          {/* Sledeći slajd (tokom tranzicije) */}
          {slideData.isTransitioning && slideData.currentIndex !== slideData.nextIndex && (
            <div
              style={{
                opacity: easeInOutQuart(slideData.progress),
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
                transform: `translateX(${(1 - easeInOutQuart(slideData.progress)) * 100}%)`,
                transition: 'none',
              }}
            >
              {renderSlide(slideData.nextIndex, false, 0)}
            </div>
          )}
        </div>
        <WaveCircleBox style={{ width: '100%', top: '40%', left: '-50%' }} />
      </section>
    </>
  );
};

export default MoreWaysToEarn;