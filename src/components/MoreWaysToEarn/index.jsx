import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';
import BgBounceAnimate from '../Common/BgBounceAnimate';
import MoreWaysToEarnSlide1 from './Slide1';
import MoreWaysToEarnSlide2 from './Slide2';
import MoreWaysToEarnSlide3 from './Slide3';

const SLIDE_TRANSITION_DURATION = 2000;

const MoreWaysToEarn = forwardRef(({ isActive, transitionDirection }, ref) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const slideContainerRef = useRef(null);
  const isHorizontalAnimating = useRef(false);

  const slides = [MoreWaysToEarnSlide1, MoreWaysToEarnSlide2, MoreWaysToEarnSlide3];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (isActive) {
      el.style.transition = 'none';

      let startY = '1000px';
      if (transitionDirection === 'up') startY = '-1000px';

      el.style.transform = `translateY(${startY})`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'transform 2s ease, opacity 2s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
          el.style.transitionDelay = '0.5s';
        });
      });
    }
  }, [isActive, transitionDirection]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (!isActive) {
      let translateYValue = '0px';

      if (currentSlideIndex === 0) {
        translateYValue = '1000px';
      } else if (currentSlideIndex === slides.length - 1) {
        translateYValue = '-1000px';
      }

      el.style.transition = 'transform 2s ease, opacity 2s ease';
      el.style.transform = `translateY(${translateYValue})`;

      const timeout = setTimeout(() => {}, SLIDE_TRANSITION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isActive, currentSlideIndex]);

  const goToSlide = useCallback(
    (direction) => {
      if (isHorizontalAnimating.current || !slideContainerRef.current) return false;

      const newIndex = currentSlideIndex + direction;
      if (newIndex < 0 || newIndex >= slides.length) return false;

      isHorizontalAnimating.current = true;
      const offset = newIndex * -100;

      const currentSlideEl = slideContainerRef.current.querySelector(`.mwte-slide.active`);
      if (currentSlideEl) {
        currentSlideEl.classList.remove('active');
        currentSlideEl.classList.add('slide-leaving');
      }

      const transformValue = isMobile
        ? `translateY(${offset}%)`
        : `translateX(${offset}%)`;

      slideContainerRef.current.style.transform = transformValue;
      slideContainerRef.current.style.transition = `transform ${SLIDE_TRANSITION_DURATION / 1000}s ease`;

      setTimeout(() => {
        setCurrentSlideIndex(newIndex);
        isHorizontalAnimating.current = false;
        if (currentSlideEl) currentSlideEl.classList.remove('slide-leaving');
        const nextSlideEl = slideContainerRef.current.children[newIndex];
        if (nextSlideEl) nextSlideEl.classList.add('active');
      }, SLIDE_TRANSITION_DURATION);

      return true;
    },
    [currentSlideIndex, slides.length, isMobile]
  );

  useImperativeHandle(ref, () => ({
    moveSlide: (direction) => goToSlide(direction),
    canGoFurther: (direction) => {
      if (isHorizontalAnimating.current) return false;
      return direction === -1
        ? currentSlideIndex === 0
        : currentSlideIndex === slides.length - 1;
    },
  }));

  useEffect(() => {
    if (slideContainerRef.current && slides.length > 0) {
      const initialSlide = slideContainerRef.current.children[currentSlideIndex];
      if (initialSlide && !initialSlide.classList.contains('active')) {
        initialSlide.classList.add('active');
      }
    }
  }, [currentSlideIndex, slides.length]);

  useEffect(() => {
    const offset = currentSlideIndex * -100;
    const transformValue = isMobile
      ? `translateY(${offset}%)`
      : `translateX(${offset}%)`;
    if (slideContainerRef.current) {
      slideContainerRef.current.style.transform = transformValue;
    }
  }, [isMobile, currentSlideIndex]);

  return (
    <div
      ref={sectionRef}
      className="mwte-section-content w-full h-full flex flex-col items-center"
    >
      <BgBounceAnimate />
      <div className="mwte-title text-center mx-auto max-w-[766px]">
        <h2 className="font-gilroy text-2xl 2xl:text-5xl xl:text-4xl font-bold font-[1000] text-white leading-tight lg:mb-4 mb-3">
          More Ways to
          <span className="text-[#E91E63] font-gilroy capitalize"> Earn</span>
        </h2>
        <p className="hidden lg:block text-base lg:text-lg font-bold font-gilroy capitalize text-white leading-relaxed">
          From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
        </p>
      </div>

      <div className="mwte-slides-container w-full h-full relative lg:overflow-visible overflow-hidden">
        <div
          ref={slideContainerRef}
          className={`mwte-slides-inner-wrapper flex w-full h-full ${
            isMobile ? 'flex-col' : ''
          }`}
          style={{ transition: 'transform 2s ease' }}
        >
          {slides.map((SlideComponent, index) => (
            <div
              key={index}
              className={`mwte-slide shrink-0 w-full h-full ${
                index === currentSlideIndex ? 'active' : ''
              }`}
              style={{
                flexBasis: '100%',
                height: isMobile ? '100%' : 'auto',
              }}
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
