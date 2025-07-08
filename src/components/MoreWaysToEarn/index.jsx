// src/components/MoreWaysToEarn.jsx
import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    forwardRef,
    useImperativeHandle,
  } from 'react';
  
  import BgBounceAnimate from '../Common/bg-bounce-animate';
  import WaveCircleBox from '../Common/wave-circle-box';
  import MoreWaysToEarnSlide1 from './indexslide1';
  import MoreWaysToEarnSlide2 from './indexslide2';
  
  const SLIDE_TRANSITION_DURATION = 1000; // Trajanje animacije horizontalnog slajdera
  
  const MoreWaysToEarn = forwardRef(({ isActive, transitionDirection }, ref) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const sectionRef = useRef(null);
    const slideContainerRef = useRef(null);
    const isHorizontalAnimating = useRef(false);
  
    const slides = [MoreWaysToEarnSlide1, MoreWaysToEarnSlide2];
  
    // Ulazna animacija
    useEffect(() => {
      const el = sectionRef.current;
      if (!el) {
        console.log('❌ MoreWaysToEarn: sectionRef.current nije definisan');
        return;
      }
  
      console.log('➡️ MoreWaysToEarn useEffect (ulaz) pokrenut, isActive:', isActive);
      if (isActive) {
        el.style.transition = 'none';
  
        // Animacija ulaska zavisi od direction, možeš prilagoditi:
        let startY = '1000px'; // default dole
        if (transitionDirection === 'up') startY = '-1000px';
        else if (transitionDirection === 'down') startY = '1000px';
  
        console.log(`🎬 Ulazna animacija, startY = ${startY}`);
  
        el.style.transform = `translateY(${startY})`;
        el.style.opacity = '0';
  
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
            console.log('✅ Ulazna animacija pokrenuta');
          });
        });
      }
    }, [isActive, transitionDirection]);
  
    // Izlazna animacija - posebna, samo na isActive = false
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) {
          console.log('❌ MoreWaysToEarn: sectionRef.current nije definisan za izlaz');
          return;
        }
      
        console.log('➡️ MoreWaysToEarn useEffect (izlaz) pokrenut, isActive:', isActive, 'currentSlideIndex:', currentSlideIndex);
      
        if (!isActive) {
          let translateYValue = '0px';
      
          if (currentSlideIndex === 0) {
            // Prvi slajd - izlaz animacija ide na dole
            translateYValue = '1000px';
          } else if (currentSlideIndex === slides.length - 1) {
            // Poslednji slajd - izlaz animacija ide na gore
            translateYValue = '-1000px';
          } else {
            // Za ostale slajdove možeš staviti po potrebi, ovde ostavljam da samo fade-uje
            translateYValue = '0px';
          }
      
          console.log(`📤 Pokrećem izlaznu animaciju sa translateY(${translateYValue})`);
      
          el.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
          el.style.transform = `translateY(${translateYValue})`;
      
          const timeout = setTimeout(() => {
            console.log('♻️ Izlazna animacija završena');
            // Resetuj ako treba
          }, SLIDE_TRANSITION_DURATION);
      
          return () => {
            clearTimeout(timeout);
            console.log('⏹️ Timeout za izlaznu animaciju očišćen');
          };
        }
      }, [isActive, currentSlideIndex]);
  
    const goToSlide = useCallback(
      (direction) => {
        if (isHorizontalAnimating.current || !slideContainerRef.current) {
          console.log('⚠️ Ne mogu da promenim slajd jer je animacija u toku ili ref nije spreman');
          return false; // Vec se animira ili ref nije spreman
        }
  
        const newIndex = currentSlideIndex + direction;
  
        if (newIndex < 0 || newIndex >= slides.length) {
          console.log(`⚠️ Novi indeks (${newIndex}) je van opsega slajdova`);
          return false; // Van granica
        }
  
        console.log(`➡️ Pokrećem animaciju prelaza na slajd ${newIndex}`);
  
        isHorizontalAnimating.current = true;
        const offset = newIndex * -100;
  
        const currentSlideEl = slideContainerRef.current.querySelector(`.mwte-slide.active`);
        if (currentSlideEl) {
          currentSlideEl.classList.remove('active');
          currentSlideEl.classList.add('slide-leaving');
        }
  
        slideContainerRef.current.style.transform = `translateX(${offset}%)`;
        slideContainerRef.current.style.transition = `transform ${SLIDE_TRANSITION_DURATION / 1000}s ease`;
  
        setTimeout(() => {
          setCurrentSlideIndex(newIndex);
          isHorizontalAnimating.current = false;
          if (currentSlideEl) {
            currentSlideEl.classList.remove('slide-leaving');
          }
          const nextSlideEl = slideContainerRef.current.children[newIndex];
          if (nextSlideEl) {
            nextSlideEl.classList.add('active');
          }
          console.log(`✅ Slajd promenjen na ${newIndex}, animacija završena`);
        }, SLIDE_TRANSITION_DURATION);
  
        return true;
      },
      [currentSlideIndex, slides.length]
    );
  
    // expose funkcije za roditelja (App.jsx)
    useImperativeHandle(ref, () => ({
      moveSlide: (direction) => {
        return goToSlide(direction);
      },
      canGoFurther: (direction) => {
        if (isHorizontalAnimating.current) {
          console.log('⚠️ Ne može se ići dalje, animacija je u toku');
          return false;
        }
        if (direction === -1) {
          return currentSlideIndex === 0;
        } else {
          return currentSlideIndex === slides.length - 1;
        }
      },
    }));
  
    // Početni aktivni slajd
    useEffect(() => {
      if (slideContainerRef.current && slides.length > 0) {
        const initialSlide = slideContainerRef.current.children[currentSlideIndex];
        if (initialSlide && !initialSlide.classList.contains('active')) {
          initialSlide.classList.add('active');
        }
      }
    }, [currentSlideIndex, slides.length]);
  
    return (
      <div
        ref={sectionRef}
        className="mwte-section-content w-full h-full flex flex-col items-center"
        style={{ position: 'relative' }}
      >
        <BgBounceAnimate />
        <WaveCircleBox style={{ top: '40%', left: '-50%' }} />
        <div className="mwte-title text-center mx-auto mb-12 max-w-[766px]">
          <h2 className="text-2xl lg:text-5xl font-bold font-[1000] text-white leading-tight mb-4">
            More Ways to
            <span className="text-[#E91E63] font-gilroy capitalize"> Earn</span>
          </h2>
          <p className="hidden lg:block text-base lg:text-lg font-bold font-gilroy capitalize text-white leading-relaxed">
            From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
          </p>
        </div>
  
        <div className="mwte-slides-container w-full h-full relative">
          <div
            ref={slideContainerRef}
            className="mwte-slides-inner-wrapper flex w-full h-full"
            style={{ transition: 'transform 1.2s ease' }}
          >
            {slides.map((SlideComponent, index) => (
              <div
                key={index}
                className={`mwte-slide shrink-0 w-full h-full ${index === currentSlideIndex ? 'active' : ''}`}
                style={{ flexBasis: '100%' }}
              >
                <SlideComponent />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });
  
  export default MoreWaysToEarn;
  