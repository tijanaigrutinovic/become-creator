import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getImagePath } from "../../utils/imagePath";
import BgBounceAnimate from '../Common/bg-bounce-animate';
import WaveCircleBox from '../Common/wave-circle-box';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';

const MoreWaysToEarn = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(false);
  const [hideSection, setHideSection] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Threshold za animaciju
  const TRANSITION_THRESHOLD = 0.15;
  const TRANSITION_COMPLETE = 0.85;

  // Za snap-scroll na WhyLinkstackz
  const WHY_LINKSTACKZ_ID = 'why-linkstackz';

  // Detect mobile/tablet
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleScroll = useCallback(() => {
    if (sectionRef.current && !isMobile) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Kalkulacija progress-a na osnovu pozicije sekcije
      let progress = -sectionTop / (sectionHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Snap to slide logic
      const slideProgress = progress * 3; // 3 slajda
      const newSlideIndex = Math.round(slideProgress);
      const clampedSlideIndex = Math.max(0, Math.min(newSlideIndex, 2));
      
      if (clampedSlideIndex !== currentSlideIndex) {
        setCurrentSlideIndex(clampedSlideIndex);
      }

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

      // Kada se dostigne kraj, sakrij sekciju
      if (progress > 0.9) {
        setHideSection(true);
      } else {
        setHideSection(false);
      }
    }
  }, [isMobile, currentSlideIndex]);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      // Na mobile, samo prikaži sve
      setIsVisible(true);
      setIsInitialized(true);
    }
  }, [handleScroll, isMobile]);

  // Scroll animacije (samo za desktop)
  useEffect(() => {
    if (!isMobile && shouldTransition && scrollProgress >= TRANSITION_THRESHOLD) {
      const transitionProgress = Math.min(
        (scrollProgress - TRANSITION_THRESHOLD) / (TRANSITION_COMPLETE - TRANSITION_THRESHOLD), 
        1
      );

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(transitionProgress);

      // Naslov animacija
      if (titleRef.current) {
        const titleFadeStart = 0.8;
        let titleOpacity = 1;
        let titleTranslateY = 0;
        
        if (transitionProgress > titleFadeStart) {
          const titleProgress = (transitionProgress - titleFadeStart) / (1 - titleFadeStart);
          titleOpacity = 1 - titleProgress;
          titleTranslateY = -titleProgress * 100;
        }
        
        titleRef.current.style.transform = `translateY(${titleTranslateY}px)`;
        titleRef.current.style.opacity = titleOpacity;
        titleRef.current.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      }
    } else if (!isMobile) {
      // Reset animacije
      if (titleRef.current) {
        titleRef.current.style.transform = 'translateY(0px)';
        titleRef.current.style.opacity = '1';
        titleRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
      }
    }
  }, [shouldTransition, scrollProgress, isMobile]);

  // Slide logika za snap scrolling
  const SLIDE_COUNT = 3;
  
  const getSlideData = () => {
    if (isMobile) {
      return {
        currentIndex: 0,
        nextIndex: 0,
        progress: 0,
        isTransitioning: false
      };
    }

    // Za snap scrolling, koristimo trenutni slide index
    const nextIndex = Math.min(currentSlideIndex + 1, SLIDE_COUNT - 1);
    
    return {
      currentIndex: currentSlideIndex,
      nextIndex: nextIndex,
      progress: 0, // Nema tranzicije jer se odmah prebacuje
      isTransitioning: false
    };
  };

  const slideData = getSlideData();

  const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };

  const renderSlide = (slideIndex, isTransitioning, progress, isNextSlide = false) => {
    const slideProps = {
      isActive: slideIndex === slideData.currentIndex,
      isTransitioning,
      progress,
      easeInOutQuart
    };

    switch (slideIndex) {
      case 0:
        return <Slide1 key={`slide-${slideIndex}-${isNextSlide ? 'next' : 'current'}`} {...slideProps} />;
      case 1:
        return <Slide2 key={`slide-${slideIndex}-${isNextSlide ? 'next' : 'current'}`} {...slideProps} />;
      case 2:
        return <Slide3 key={`slide-${slideIndex}-${isNextSlide ? 'next' : 'current'}`} {...slideProps} />;
      default:
        return <Slide1 key={`slide-${slideIndex}-${isNextSlide ? 'next' : 'current'}`} {...slideProps} />;
    }
  };

  // Preload state
  const [slidesInitialized, setSlidesInitialized] = useState(false);
  const [fadeInComplete, setFadeInComplete] = useState(false);
  const [slidesPreloaded, setSlidesPreloaded] = useState(false);

  // Preload slike
  useEffect(() => {
    const preloadImages = async () => {
      const images = [
        getImagePath('/images/more-ways-to-earn/iphone.png'),
        getImagePath('/images/more-ways-to-earn/video-call.png'),
        getImagePath('/images/more-ways-to-earn/3d-clock.png'),
        getImagePath('/images/more-ways-to-earn/3d-lock.png'),
        getImagePath('/images/more-ways-to-earn/flip-1.png'),
                  getImagePath('/icons/become-a-creator-icon.svg')
      ];

      try {
        await Promise.all(
          images.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = src;
            });
          })
        );
        setSlidesPreloaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setSlidesPreloaded(true);
      }
    };

    preloadImages();
  }, []);

  useEffect(() => {
    if (slidesPreloaded) {
      const timer = setTimeout(() => {
        setSlidesInitialized(true);
        setTimeout(() => {
          setFadeInComplete(true);
        }, 200);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [slidesPreloaded]);

  // Mobile rendering - prikaži sve slajdove vertikalno
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="more-ways-to-earn"
        className="w-full min-h-screen bg-transparent py-16 px-4"
      >
        {/* Naslov */}
        <div className="text-center mx-auto mb-12 max-w-[400px]">
          <h2 className="text-2xl font-bold text-white leading-tight font-[1000] mb-4">
            More Ways to <span className="text-[#E91E63] font-gilroy capitalize">Earn</span>
          </h2>
          <p className="text-white text-base font-bold font-gilroy capitalize leading-relaxed">
            From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
          </p>
        </div>

        {/* Svi slajdovi jedan ispod drugog - BEZ absolute pozicioniranja */}
        <div className="max-w-[400px] mx-auto">
          {[0, 1, 2].map(slideIndex => (
            <div key={`mobile-slide-${slideIndex}`} className="mb-16 relative" style={{ minHeight: '400px' }}>
              <div className="w-full h-full">
                {renderSlide(slideIndex, false, 0)}
              </div>
            </div>
          ))}
        </div>

        <WaveCircleBox style={{ top: '40%', left: '-50%' }} />
      </section>
    );
  }

  // Desktop rendering - snap scrolling sa 3 slajda od 100vh svaki
  return (
    <section
      ref={sectionRef}
      id="more-ways-to-earn"
      className="md:max-w-[1670px] max-w-[400px] md:mx-auto relative w-full"
      style={{
        height: '300vh', // 3 slajda x 100vh svaki
        opacity: hideSection ? 0 : 1,
        pointerEvents: hideSection ? 'none' : 'auto',
        transition: 'opacity 0.7s ease-out',
      }}
    >
      {/* Sticky kontejner koji ostaje na mestu tokom scroll-a */}
      <div 
        className=" top-0 w-full h-screen flex flex-col justify-center"
        style={{ zIndex: 15 }}
      >
        {/* Naslov */}
        <div
          ref={titleRef}
          className="text-center mx-auto transition-all duration-500 mb-8"
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
        <div ref={contentRef} className="relative flex-1 max-h-[600px]">
          {slidesInitialized && slidesPreloaded ? (
            <div
              style={{
                opacity: fadeInComplete ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            >
              {/* Trenutni slajd */}
              {renderSlide(currentSlideIndex, false, 0)}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-white text-lg">Loading...</div>
            </div>
          )}
        </div>
        
        <WaveCircleBox style={{ top: '40%', left: '-50%' }} />
      </div>
    </section>
  );
};

export default MoreWaysToEarn;