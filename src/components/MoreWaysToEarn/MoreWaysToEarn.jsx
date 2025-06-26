import React, { useEffect, useRef, useState, useCallback } from 'react';
import BgBounceAnimate from '../Common/bg-bounce-animate';
import WaveCircleBox from '../Common/wave-circle-box';

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

  // Podatci za slajdove
  const slides = [
    {
      image: '/images/more-ways-to-earn/iphone.png',
      icon: '/images/more-ways-to-earn/3d-clock.png',
      title: (
        <>Pay-Per-Minute <span className="text-[#E91E63]">Video Call</span></>
      ),
      description:
        'Connect with your fans in real-time through live video calls and charge by the minute. This feature allows you to set your rate and engage directly with fans, providing them with a personalized experience while you earn.',
      button: 'Become a creator',
    },
    {
      image: '/images/more-ways-to-earn/iphone.png',
      icon: '/images/more-ways-to-earn/3d-clock.png',
      title: (
        <> Locked <span className="text-[#E91E63]">Content</span> (Pay-to-View)</>
      ),
      description:
        ' Sell exclusive photos, videos, and posts that fans must pay to unlock.  Sell exclusive photos, videos, and posts that fans must pay to unlock.',
      button: 'Become a creator',
    },
    {
      image: '/images/more-ways-to-earn/iphone.png',
      icon: '/images/more-ways-to-earn/3d-clock.png',
      title: (
        <><span className="text-[#E91E63]">Tips</span></>
      ),
      description:
        "Let your fans show their appreciation with tips. Whether it's during a live session or in response to your content, tips are an easy way for fans to support you and for you to increase your earnings effortlessly.",
      button: 'Become a creator',
    },
  ];

  // Izračunaj trenutni slajd i progress
  const SLIDE_COUNT = slides.length;
  
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
          <h2 className="text-5xl font-bold text-white leading-[70px] font-[1000]">
          More Ways to <span className="text-[#E91E63] font-gilroy capitalize">Earn</span>
          </h2>
          <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
          From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
          </p>
        </div>

        {/* Sadržaj slajdova */}
        <div ref={contentRef} className="flex flex-col gap-10 relative" style={{height: '600px'}}>
          {/* Trenutni slajd */}
          <div
            className="flex flex-col md:flex-row items-center gap-10"
            style={{
              opacity: slideData.isTransitioning ? 1 - easeInOutQuart(slideData.progress) : 1,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 2,
              transform: slideData.isTransitioning 
                ? `translateX(${-easeInOutQuart(slideData.progress) * 100}%)` 
                : 'translateX(0%)',
              transition: 'none', // Uklanjamo CSS transition jer koristimo JS animaciju
            }}
          >
            {/* Leva strana – slika */}
            <div className="w-full md:w-1/2">
              <img
                src={slides[slideData.currentIndex].image}
                alt="Feature"
                className="rounded-[30px] w-full h-auto object-cover"
              />
            </div>
            {/* Desna strana – card */}
            <div className="w-full md:w-1/2 relative corners z-0">
              <div className="relative z-10 rounded-tl-[150px] rounded-br-[150px] p-20 bg-[#202020b3] backdrop-blur-[7px]">
                {/* Ikonica */}
                <div className="text-pink-500 text-4xl h-[82px]">
                  <img
                    src={slides[slideData.currentIndex].icon}
                    alt="3d-clock"
                    className="p-5"
                  />
                </div>
                {/* Naslov */}
                <h3 className="text-white text-4xl font-gilroy capitalize leading-[70px] font-[1000]">
                  {slides[slideData.currentIndex].title}
                </h3>
                {/* Opis */}
                <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
                  {slides[slideData.currentIndex].description}
                </p>
                {/* Dugme */}
                <button className="mt-[15px] items-center bg-[#E91E63] text-white px-[25px] py-[10px] rounded-[25px] text-sm font-bold font-gilroy capitalize flex">
                  <img
                    src="/icons/become-a-creator-icon.svg"
                    alt="Become a creator"
                    className="my-2 mr-[10px] w-6 h-6"
                  />
                  {slides[slideData.currentIndex].button}
                </button>
              </div>
            </div>
          </div>

          {/* Sledeći slajd (tokom tranzicije) */}
          {slideData.isTransitioning && slideData.currentIndex !== slideData.nextIndex && (
            <div
              className="flex flex-col md:flex-row items-center gap-10"
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
              {/* Leva strana – slika */}
              <div className="w-full md:w-1/2">
                <img
                  src={slides[slideData.nextIndex].image}
                  alt="Feature"
                  className="rounded-[30px] w-full h-auto object-cover"
                />
              </div>
              {/* Desna strana – card */}
              <div className="w-full md:w-1/2 relative corners z-0">
                <div className="relative z-10 rounded-tl-[150px] rounded-br-[150px] p-20 bg-[#202020b3] backdrop-blur-[7px]">
                  {/* Ikonica */}
                  <div className="text-pink-500 text-4xl h-[82px]">
                    <img
                      src={slides[slideData.nextIndex].icon}
                      alt="3d-clock"
                      className="p-5"
                    />
                  </div>
                  {/* Naslov */}
                  <h3 className="text-white text-4xl font-gilroy capitalize leading-[70px] font-[1000]">
                    {slides[slideData.nextIndex].title}
                  </h3>
                  {/* Opis */}
                  <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
                    {slides[slideData.nextIndex].description}
                  </p>
                  {/* Dugme */}
                  <button className="mt-[15px] items-center bg-[#E91E63] text-white px-[25px] py-[10px] rounded-[25px] text-sm font-bold font-gilroy capitalize flex">
                    <img
                      src="/icons/become-a-creator-icon.svg"
                      alt="Become a creator"
                      className="my-2 mr-[10px] w-6 h-6"
                    />
                    {slides[slideData.nextIndex].button}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <WaveCircleBox style={{ width: '100%', top: '40%', left: '-50%' }} />
      </section>
    </>
  );
};

export default MoreWaysToEarn;