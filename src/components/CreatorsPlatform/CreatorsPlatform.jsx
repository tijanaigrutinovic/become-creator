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

  const TRANSITION_THRESHOLD = 0.25;
  const TRANSITION_COMPLETE = 0.85;

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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Hero sekcija animacije
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

      if (mobileFrameRef.current) {
        // Početna pozicija (u Creators sekciji)
        const startX = window.innerWidth / 2;
        const startY = window.innerHeight / 2;
        
        // Ciljna pozicija - mobile frame ide na levo
        const targetX = window.innerWidth * -0.5;
        const targetY = window.innerHeight * 0.8;
        
        // Interpolacija između početne i ciljne pozicije
        const currentX = startX + (targetX - startX) * easedProgress;
        const currentY = startY + (targetY - startY) * easedProgress;
        
        // Skaliranje - počinje sa 1, završava sa 0.8
        const scale = 1 - (easedProgress * 0.2);
        
        // Opacity ostaje 1 - mobile frame ostaje vidljiv
        const opacity = 1;
        
        // Dodatna animacija kada počne Trusted sekcija
        let finalY = currentY;
        if (transitionProgress > 0.85) {
          // Kada počne Trusted animacija, mobile frame ide gore
          const trustedProgress = (transitionProgress - 0.85) / 0.15;
          const moveUpDistance = 200; // Pomeri se gore za 200px
          finalY = currentY - (moveUpDistance * trustedProgress);
        }
        
        mobileFrameRef.current.style.position = 'fixed';
        mobileFrameRef.current.style.top = `${finalY}px`;
        mobileFrameRef.current.style.left = `${currentX}px`;
        mobileFrameRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        mobileFrameRef.current.style.opacity = opacity;
        mobileFrameRef.current.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        mobileFrameRef.current.style.zIndex = '50';
        
        // Debug informacije
        console.log('Mobile Frame animacija:', {
          easedProgress,
          transitionProgress,
          startX,
          startY,
          targetX,
          targetY,
          currentX,
          currentY,
          finalY,
          scale,
          opacity,
          shouldTransition,
          scrollProgress
        });
      }

      if (transitionProgress > 0.85) {
        triggerNextSectionAnimation((transitionProgress - 0.85) / 0.15);
      }
    } else {
      if (leftContentRef.current) {
        leftContentRef.current.style.transform = 'translateX(0%)';
        leftContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
      if (rightContentRef.current) {
        rightContentRef.current.style.transform = 'translateX(0%)';
        rightContentRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      }
      // Mobile frame se resetuje samo ako nije već animiran
      if (mobileFrameRef.current && scrollProgress < 0.1) {
        mobileFrameRef.current.style.position = 'absolute';
        mobileFrameRef.current.style.top = '50%';
        mobileFrameRef.current.style.left = '50%';
        mobileFrameRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        mobileFrameRef.current.style.opacity = '1';
        mobileFrameRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        mobileFrameRef.current.style.zIndex = '30';
        
        // Debug informacije za reset
        console.log('Mobile Frame RESET:', {
          shouldTransition,
          scrollProgress,
          TRANSITION_THRESHOLD
        });
      } else if (mobileFrameRef.current && !shouldTransition && scrollProgress < 0.2) {
        // Dodatna provera - resetuj ako nema transition-a i scroll je blizu početka
        mobileFrameRef.current.style.position = 'absolute';
        mobileFrameRef.current.style.top = '50%';
        mobileFrameRef.current.style.left = '50%';
        mobileFrameRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        mobileFrameRef.current.style.opacity = '1';
        mobileFrameRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        mobileFrameRef.current.style.zIndex = '30';
        
        console.log('Mobile Frame RESET - dodatna provera:', {
          shouldTransition,
          scrollProgress
        });
      } else if (mobileFrameRef.current && globalScrollY < 100) {
        // Resetuj kada se vratite na sam početak stranice
        mobileFrameRef.current.style.position = 'absolute';
        mobileFrameRef.current.style.top = '50%';
        mobileFrameRef.current.style.left = '50%';
        mobileFrameRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        mobileFrameRef.current.style.opacity = '1';
        mobileFrameRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        mobileFrameRef.current.style.zIndex = '30';
        
        console.log('Mobile Frame RESET - na početak stranice:', {
          globalScrollY,
          shouldTransition,
          scrollProgress
        });
      }
      
      const nextSection = document.getElementById('section2');
      if (nextSection) {
        nextSection.style.opacity = '0';
        nextSection.style.transition = 'opacity 0.4s ease-out';
        const titleContainer = nextSection.querySelector('[data-title-container]');
        const sliderWrapper = nextSection.querySelector('[data-slider-wrapper]');
        
        if (titleContainer) {
          titleContainer.style.transform = 'translateY(-120px)';
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
  }, [shouldTransition, scrollProgress]);

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
      className="h-[100vh] creators-platform-section max-w-[1670px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 min-h-screen relative"
      ref={sectionRef}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Levi sadržaj */}
      <div className="flex-1 relative z-10" ref={leftContentRef}>
        <div className="mb-[15px]">
            <h1 className="text-white text-8xl font-gilroy capitalize leading-[100px] font-[1000]">
                The Creator's platform
                <br />
                of the{' '}
                <span className="text-[#E91E63] text-8xl font-gilroy capitalize leading-[100px] font-[1000]">
                    Future
                </span>
            </h1>
        </div>
        <div className="w-[683px] flex p-10 rounded-[30px] border border-white/5 bg-white/0 mb-[15px]">
            <p className="text-pink-600 text-xl font-gilroy capitalize leading-loose pr-[15px] font-[1000]">
                Linkstackz Where
            </p>
            <div className="text-white text-xl font-gilroy capitalize leading-loose font-[1000]">
                <div className="content-animate font-gilroy">
                    <Typewriter
                        sentences={[
                            'Real Fans Meat Real Creator',
                            'Monetize Without Subscriptions',
                            'Exclusive To Real Creator',
                        ]}
                    />
                </div>
            </div>
        </div>
        <div className="mb-[15px]">
            <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
                Put your exclusive content behind a paywall for your top fans to subscribe to, generating you recurring revenue.
            </p>
        </div>
        <div className="flex gap-4">
            <button className="relative items-center bg-[#E91E63] text-white px-[25px] py-[10px] rounded-[25px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group">
                <div className="absolute inset-0 z-0">
                    <span className="circle-animation circle-1 bg-[#E91E63]/21"></span>
                    <span className="circle-animation circle-2 bg-[#E91E63]/21"></span>
                    <span className="circle-animation circle-3 bg-[#E91E63]/21"></span>
                </div>
                <div className="relative z-10 flex items-center">
                    <img
                        src="/icons/become-a-creator-icon.svg"
                        alt="Become a creator"
                        className="my-2 mr-[10px] w-6 h-6"
                    />
                    Become a creator
                </div>
            </button>
            <button className="items-center bg-[#181818] text-white px-[25px] py-[10px] rounded-[20px] text-base font-bold font-gilroy capitalize flex">
                Sign up as a Fan
            </button>
        </div>
      </div>

      {/* Desni sadržaj */}
      <div className="relative w-fit corners z-10" ref={rightContentRef}>
        <div className="relative w-[818.66px] h-[804.73px]">
          <video
            src="/images/CreatorsPlatform/cp-video.webm"
            autoPlay
            muted
            loop
            playsInline
            className="w-[747.25px] h-[728.78px] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 filter grayscale rounded-tl-[300px] rounded-br-[300px]"
          />

          <div
            className="absolute overflow-hidden z-20 rounded-[40px]"
            style={{
              width: '296.554px',
              height: '636.192px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            >
            <video
              src="/images/CreatorsPlatform/cp-video.webm"
              autoPlay
              muted
              loop
              playsInline
              className="w-[747.25px] h-[728.78px] object-cover absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            <div className="absolute inset-0 z-25 flex flex-col items-center justify-center p-4 text-center text-white">
                <img
                  src="/images/your-content-image.jpg"
                  alt="Content on phone"
                  className="w-2/3 h-auto rounded-lg mb-4"
                />
                <p className="text-lg font-bold">
                  Evo tvog teksta unutar telefona!
                </p>
                <p className="text-sm mt-2">
                  Možeš dodati još detalja ovde.
                </p>
            </div>
          </div>

          <img
              src="/images/CreatorsPlatform/mobile-frame.svg"
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              alt="Mobile Frame"
              ref={mobileFrameRef}
          />
        </div>
      </div>

      <WaveCircleBox ref={waveCircleBoxRef} />
    </section>
  );
};

export default CreatorsPlatform;