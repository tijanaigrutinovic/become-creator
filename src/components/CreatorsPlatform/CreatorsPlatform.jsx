// CreatorsPlatform.jsx - ažurirano sa sporijim i smooth animacijama
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Typewriter from './Typewriter';
import WaveCircleBox from "../Common/wave-circle-box";

const CreatorsPlatform = () => {
  const sectionRef = useRef(null);
  const leftContentRef = useRef(null);
  const rightContentRef = useRef(null);
  const mobileFrameRef = useRef(null);
  const waveCircleBoxRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [globalScrollY, setGlobalScrollY] = useState(0);
  const [shouldTransition, setShouldTransition] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Novo stanje za detekciju mobilnog uređaja

  const TRANSITION_THRESHOLD = 0;
  // Povećao sam raspon skrola za animaciju kako bi se video skroz pomerio na mobilnom
  const TRANSITION_SCROLL_RANGE = 0.3; // Npr. animacija se dešava tokom 30% skrola sekcije

  // Funkcija za detekciju veličine ekrana
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768); // Pretpostavljamo da je 768px breakpoint za 'md'
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize(); // Početna provera

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      let progress = -sectionTop / (sectionHeight - viewportHeight);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      if (progress >= TRANSITION_THRESHOLD) {
        setShouldTransition(true);
      } else {
        setShouldTransition(false);
      }
    }
    
    setGlobalScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Pokreni pri učitavanju

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Hero sekcija animacije
  useEffect(() => {
    const effectiveTransitionComplete = TRANSITION_THRESHOLD + TRANSITION_SCROLL_RANGE;

    if (shouldTransition && scrollProgress >= TRANSITION_THRESHOLD) {
      const transitionProgress = Math.min(
        (scrollProgress - TRANSITION_THRESHOLD) / (effectiveTransitionComplete - TRANSITION_THRESHOLD), 
        1
      );

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };
      
      const easedProgress = easeInOutCubic(transitionProgress);

      if (isMobile) {
        // Logika za mobilne uređaje: naslov ide gore, video ide skroz dole
        if (leftContentRef.current) {
          const translateY = -easedProgress * 150; // Pomeri naslov za 150% visine gore
          leftContentRef.current.style.transform = `translateY(${translateY}%)`;
          leftContentRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        if (rightContentRef.current) {
          const translateY = easedProgress * 200; // Pomeri video za 200% visine dole, da ode skroz van
          rightContentRef.current.style.transform = `translateY(${translateY}%)`;
          rightContentRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          // Dodatno, ako želite da nestane (opacity), to bi ovde dodali
          rightContentRef.current.style.opacity = 1 - easedProgress; // Neka postepeno nestaje
        }
      } else {
        // Logika za desktop: sadržaj se pomera levo/desno (originalna logika)
        if (leftContentRef.current) {
          const translateX = -easedProgress * 120;
          leftContentRef.current.style.transform = `translateX(${translateX}%)`;
          leftContentRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }

        if (rightContentRef.current) {
          const translateX = easedProgress * 120;
          rightContentRef.current.style.transform = `translateX(${translateX}%)`;
          rightContentRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
      }


      // Pokreni sledeću sekciju (ova logika je univerzalna)
      if (transitionProgress > 0.85) {
        triggerNextSectionAnimation((transitionProgress - 0.85) / 0.15);
      }
    } else {
      // Reset animacije kada nije u tranziciji
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = 'translate(0%, 0%)';
        leftContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
      if (rightContentRef.current) {
        rightContentRef.current.style.transform = 'translate(0%, 0%)';
        rightContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        rightContentRef.current.style.opacity = '1'; // Reset opacity
      }
      
      // Reset mobile frame
      if (mobileFrameRef.current && (scrollProgress < 0.1 || globalScrollY < 100)) {
        
        mobileFrameRef.current.style.position = 'absolute';
        mobileFrameRef.current.style.top = '50%';
        mobileFrameRef.current.style.left = '50%';
        mobileFrameRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        mobileFrameRef.current.style.opacity = '1';
        mobileFrameRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        mobileFrameRef.current.style.zIndex = '30';
      }
      
      // Reset sledeće sekcije
      const nextSection = document.getElementById('section2');
      if (nextSection) {
        nextSection.style.opacity = '0';
        nextSection.style.transition = 'opacity 0.4s ease-out';
        const titleContainer = nextSection.querySelector('[data-title-container]');
        const sliderWrapper = nextSection.querySelector('[data-slider-wrapper]');
        
        if (titleContainer) {
          titleContainer.style.transform = 'translateY(120px)';
          titleContainer.style.opacity = '0';
          titleContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
        }
        if (sliderWrapper) {
          sliderWrapper.style.transform = 'translateY(180px)';
          sliderWrapper.style.opacity = '0';
          sliderWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
        }
      }
    }
  }, [shouldTransition, scrollProgress, isMobile]);

  const triggerNextSectionAnimation = (progress) => {
    const nextSection = document.getElementById('section2');
    if (nextSection) {
      const titleContainer = nextSection.querySelector('[data-title-container]');
      const sliderWrapper = nextSection.querySelector('[data-slider-wrapper]');

      const easeOutCubic = (t) => {
        return 1 - Math.pow(1 - t, 3);
      };
      
      const easedProgress = easeOutCubic(progress);

      nextSection.style.opacity = easedProgress;
      nextSection.style.zIndex = '10';
      nextSection.style.transition = 'opacity 0.6s ease-out';

      if (titleContainer) {
        const titleTranslateY = (1 - easedProgress) * -140;
        const titleOpacity = easedProgress;
        titleContainer.style.transform = `translateY(${titleTranslateY}px)`;
        titleContainer.style.opacity = titleOpacity;
        titleContainer.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s ease-out';
      }

      if (sliderWrapper) {
        const sliderTranslateY = (1 - easedProgress) * 200;
        const sliderOpacity = easedProgress;
        sliderWrapper.style.transform = `translateY(${sliderTranslateY}px)`;
        sliderWrapper.style.opacity = sliderOpacity;
        sliderWrapper.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s ease-out';
      }
    }
  };

  // WaveCircleBox animacija
  useEffect(() => {
    if (waveCircleBoxRef.current && sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const animationStart = Math.max(0, sectionTop - viewportHeight / 2);
      const animationEnd = sectionTop + sectionHeight * 0.15;

      let waveCircleProgress = 0;
      if (globalScrollY >= animationStart && globalScrollY <= animationEnd) {
        waveCircleProgress = (globalScrollY - animationStart) / (animationEnd - animationStart);
      } else if (globalScrollY > animationEnd) {
        waveCircleProgress = 1;
      }

      const startTop = -20;
      const startLeft = 45;
      const startWidth = 100;
      
      const endTop = 70;
      const endLeft = -10;
      const endWidth = 70;
      
      const currentTop = startTop + (endTop - startTop) * waveCircleProgress;
      const currentLeft = startLeft + (endLeft - startLeft) * waveCircleProgress;
      const currentWidth = startWidth + (endWidth - startWidth) * waveCircleProgress;
      
      const opacityStart = 0.6;
      let waveCircleOpacity = 1;
      if (waveCircleProgress > opacityStart) {
        waveCircleOpacity = 1 - ((waveCircleProgress - opacityStart) / (1 - opacityStart));
        waveCircleOpacity = Math.max(0, waveCircleOpacity);
      }

      if (waveCircleBoxRef.current) {
        waveCircleBoxRef.current.style.setProperty('top', `${currentTop}%`, 'important');
        waveCircleBoxRef.current.style.setProperty('left', `${currentLeft}%`, 'important');
        waveCircleBoxRef.current.style.setProperty('width', `${currentWidth}%`, 'important');
        waveCircleBoxRef.current.style.setProperty('opacity', waveCircleOpacity, 'important');
        waveCircleBoxRef.current.style.setProperty('right', 'auto', 'important');
        waveCircleBoxRef.current.style.transition = 'all 0.3s ease-out';
      }
    }
  }, [globalScrollY]);

  return (
    <section
      className="h-screen creators-platform-section max-w-[1670px] mx-auto md:px-6 px-[15px] md:py-16 pb-[15px] pt-[150px] flex flex-col md:flex-row items-center gap-10 relative"
      ref={sectionRef}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Levi sadržaj */}
      <div className="flex-1 relative z-5 md:h-full h-auto flex flex-col justify-center" ref={leftContentRef}>
        <div className="mb-[15px]">
            <h1 className="text-white 2xl:text-8xl md:text-6xl text-2xl font-gilroy capitalize md:leading-[100px] leading-9 font-[1000]">
                The Creator's platform
                <br />
                of the{' '}
                <span className="text-[#E91E63]">
                    Future
                </span>
            </h1>
        </div>
        <div className="max-w-[683px] flex md:p-10 p-4 md:rounded-[30px] rounded-[20px] border border-white/5 bg-white/0 mb-[15px]">
            <p className="text-pink-600 md:text-xl text-sm font-gilroy capitalize leading-loose pr-[15px] font-[1000] whitespace-nowrap">
                Linkstackz Where
            </p>
            <div className="text-white md:text-xl text-sm font-gilroy capitalize leading-loose font-[1000]">
                <div className="content-animate font-gilroy">
                    <Typewriter
                        sentences={[
                            'Real Fans Meet Real Creator',
                            'Monetize Without Subscriptions',
                            'Exclusive To Real Creator',
                        ]}
                    />
                </div>
            </div>
        </div>
        <div className="mb-[15px]">
            <p className="text-white md:text-lg text-xs font-bold font-gilroy capitalize leading-loose">
                Put your exclusive content behind a paywall for your top fans to subscribe to, generating you recurring revenue.
            </p>
        </div>
        <div className="flex gap-4">
            <button className="relative items-center bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group animated-button whitespace-nowrap">
                <div className="circle circle1"></div>
                <div className="circle circle2"></div>
                <div className="circle circle3"></div>
                <div className="relative z-10 flex items-center">
                    <img
                        src="/icons/become-a-creator-icon.svg"
                        alt="Become a creator"
                        className="md:my-2 md:mr-[10px] w-6 h-6"
                    />
                    Become a creator
                </div>
            </button>
            <button className="items-center bg-[#181818] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[20px] rounded-[15px] text-sm font-bold font-gilroy capitalize flex whitespace-nowrap">
                Sign up as a Fan
            </button>
        </div>
      </div>

      {/* Desni sadržaj */}
      <div className="relative w-full md:max-w-[747px] md:aspect-[747/728] aspect-[348/340] max-w-[348px] md:max-h-[728px] max-h-[340px] md:h-auto corners z-15" ref={rightContentRef}>
        <div className="relative w-full h-full">
          <video
            src="/images/CreatorsPlatform/cp-video.webm"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute top-0 left-0 md:rounded-tl-[300px] md:rounded-br-[300px] rounded-tl-[150px] rounded-br-[150px] md:max-w-[747.25px] md:max-h-[728.78px] max-w-[348px] max-h-[340px]"
          />

          <div
            className="absolute overflow-hidden z-20 w-full h-full top-0 left-0"
            style={{}}
          >
            <video
              src="/images/CreatorsPlatform/cp-video.webm"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover absolute top-0 left-0 md:rounded-tl-[300px] md:rounded-br-[300px] rounded-tl-[150px] rounded-br-[150px] md:max-w-[747.25px] md:max-h-[728.78px] max-w-[348px] max-h-[340px]"
            />

            <div className="lock-slides-container absolute z-30 top-1/2 left-1/2 -translate-x-1/2 md:translate-y-1/3 -translate-y-1/3 pointer-events-none max-w-[256px]">
                    <img
                      src="/images/CreatorsPlatform/lock-to-view.svg"
                      alt="Content on phone"
                      className="lock-slide lock-slide-1"
                    />
                     <img
                      src="/images/CreatorsPlatform/lock-to-view.svg"
                      alt="Content on phone"
                      className="lock-slide lock-slide-2"
                    />
                     <img
                      src="/images/CreatorsPlatform/lock-to-view.svg"
                      alt="Content on phone"
                      className="lock-slide lock-slide-3"
                    />
                </div>
          </div>

          <img
              src="/images/CreatorsPlatform/mobile-frame.svg"
              className="absolute z-30 top-1/2 left-1/2-translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] md:w-[319px] md:h-[651px]"
              alt="Mobile Frame"
              ref={mobileFrameRef}
          />
          <img
              src="/images/CreatorsPlatform/mobile-mask.png"
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] md:w-[300px] md:h-[651px]"
              alt="Mobile Frame"
          />
        </div>
      </div>

      <WaveCircleBox ref={waveCircleBoxRef} />
    </section>
  );
};

export default CreatorsPlatform;