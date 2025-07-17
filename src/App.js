import React, { useState, useEffect, useRef, useCallback } from 'react';
import './css/globals.css';
import './App.css';
import './fonts.css';

import WaveCircleBox from './components/Common/WaveCircleBox';
import WaveCircleBoxMobile from './components/Common/WaveCircleBoxMobile';
import MobileFrame from './components/Common/MobileFrame';

import CreatorsPlatform from './components/CreatorsPlatform';
import TrustedCreators from './components/TrustedCreators';
import MoreWaysToEarn from './components/MoreWaysToEarn';
import WhyLinkstackz from './components/WhyLinkstackz';
import AnalyzeFans from './components/AnalyzeFans';
import Faq from './components/Faq';
import BioLink from './components/BioLink';

const ANIMATION_DURATION = 2000;
const SCROLL_DEBOUNCE_TIME = 800;

function App() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [prevSectionIndex, setPrevSectionIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const lastScrollTime = useRef(0);
    const sectionRefs = useRef([]);
    const waveCircleRef = useRef(null);

    const [mobileFrameState, setMobileFrameState] = useState({
        visible: true,
        position: 'creators',
        style: {},
    });
    const mobileFrameRef = useRef(null);
    const creatorsFrameRef = useRef(null);
    const trustedFrameAnchorRef = useRef(null);
    
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);
    const minSwipeDistance = 50;

    const mobileFrameImgRef = useRef(null); 
    const initialMobileFrameRect = useRef(null); 
    const trustedCarouselRef = useRef(null); 
    const trustedPositionRef = useRef(null); 
    const trustedMobileFrameRef = useRef(null); 

    const animateMobileFrame = useCallback(() => {
        const startElem = mobileFrameImgRef.current || creatorsFrameRef.current;
        if (!startElem || !mobileFrameRef.current) {
            return;
        }

        const startRect = startElem.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;

        let attempts = 0;
        const maxAttempts = 100;
        const waitForTrustedFrame = () => {
            attempts++;
            if (attempts > maxAttempts) {
                return;
            }
            if (!trustedCarouselRef.current) {
                setTimeout(waitForTrustedFrame, 50);
                return;
            }
            const trustedFrameRect = trustedCarouselRef.current.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            const startLeft = startRect.left;
            const startTop = startRect.top + scrollY;
            const startWidth = startRect.width;
            const startHeight = startRect.height;
            const endWidth = 319;
            const endHeight = 450;
            const endLeft = trustedFrameRect.left + (trustedFrameRect.width / 2) - (endWidth / 2);
            const endTop = trustedFrameRect.top + scrollY - 930;
            const deltaX = (endLeft + endWidth / 2) - (startLeft + startWidth / 2);
            const deltaY = (endTop + endHeight / 2) - (startTop + startHeight / 2);
            const startStyle = {
                position: 'fixed',
                top: `${startTop}px`,
                left: `${startLeft}px`,
                width: `${startWidth}px`,
                height: `${startHeight}px`,
                zIndex: 1000,
                transform: 'translate(0px, 0px)',
                transition: 'none',
            };
            setMobileFrameState({
                visible: true,
                position: 'animating',
                style: startStyle,
            });
            setTimeout(() => {
                setMobileFrameState(prev => ({
                    ...prev,
                    style: {
                        ...prev.style,
                        width: `${endWidth}px`,
                        height: `${endHeight}px`,
                        transform: `translate(${deltaX}px, ${deltaY}px)`,
                        transition: 'transform 2s, width 2s, height 2s',
                    },
                }));
            }, 50);
            setTimeout(() => {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {
                        position: 'fixed',
                        top: `${endTop}px`,
                        left: `${endLeft}px`,
                        width: `${endWidth}px`,
                        height: `${endHeight}px`,
                        zIndex: 1000,
                        transform: 'none',
                        transition: 'none',
                    },
                });
                trustedPositionRef.current = {
                    top: endTop,
                    left: endLeft,
                    width: endWidth,
                    height: endHeight,
                };
            }, 2050);
        };
        waitForTrustedFrame();
    }, [currentSectionIndex, prevSectionIndex]);

    const animateMobileFrameToTrusted = useCallback(() => {
        if (!trustedCarouselRef.current) {
            return;
        }
        const trustedFrameRect = trustedCarouselRef.current.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const endWidth = 319;
        const endHeight = 450;
        const endTop = trustedFrameRect.top + scrollY - 930;
        const endLeft = trustedFrameRect.left + (trustedFrameRect.width / 2) - (endWidth / 2);

        const toTrustedStartState = {
            visible: true,
            position: 'animating',
            style: {
                position: 'fixed',
                top: `${endTop - 1000}px`,
                left: `${endLeft}px`,
                width: `${endWidth}px`,
                height: `${endHeight}px`,
                zIndex: 1000,
                transform: 'translateY(500px)',
                transition: 'top 2s, left 2s, width 2s, height 2s, transform 2s',
            },
        };

        setMobileFrameState(toTrustedStartState);

        setTimeout(() => {
            const toTrustedAnimatingState = {
                visible: true,
                position: 'animating',
                style: {
                    position: 'fixed',
                    top: `${endTop}px`,
                    left: `${endLeft}px`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    zIndex: 1000,
                    transform: '',
                    opacity: 1,
                    transition: 'top 2s, left 2s, width 2s, height 2s, transform 2s',
                },
            };

            setMobileFrameState(toTrustedAnimatingState);
        }, 50);

        setTimeout(() => {
            const toTrustedFinalState = {
                visible: true,
                position: 'trusted',
                style: {
                    position: 'fixed',
                    top: `${endTop}px`,
                    left: `${endLeft}px`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    zIndex: 1000,
                    transform: 'none',
                    opacity: 1,
                    transition: 'none',
                },
            };

            setMobileFrameState(toTrustedFinalState);
        }, 1300);
    }, [currentSectionIndex, prevSectionIndex]);

    const animateMobileFrameBack = useCallback(() => {
        const trustedPos = trustedPositionRef.current;
        const initialRect = initialMobileFrameRect.current;
        if (!trustedPos || !initialRect || !mobileFrameRef.current) {
            return;
        }
        const startLeft = trustedPos.left;
        const startTop = trustedPos.top;
        const startWidth = trustedPos.width;
        const startHeight = trustedPos.height;
        const endLeft = initialRect.left;
        const endTop = initialRect.top;
        const endWidth = initialRect.width;
        const endHeight = initialRect.height;
        const deltaX = (endLeft + endWidth / 2) - (startLeft + startWidth / 2);
        const deltaY = (endTop + endHeight / 2) - (startTop + startHeight / 2);
        const startStyle = {
            position: 'fixed',
            top: `${startTop}px`,
            left: `${startLeft}px`,
            width: `${startWidth}px`,
            height: `${startHeight}px`,
            zIndex: 1000,
            transform: 'translate(0px, 0px)',
            transition: 'none',
        };
        setMobileFrameState({
            visible: true,
            position: 'animating',
            style: startStyle,
        });
        setTimeout(() => {
            setMobileFrameState(prev => ({
                ...prev,
                style: {
                    ...prev.style,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    transform: `translate(${deltaX}px, ${deltaY}px)`,
                    transition: 'transform 2s, width 2s, height 2s',
                },
            }));
        }, 50);
        setTimeout(() => {
            setMobileFrameState({
                visible: true,
                position: 'creators',
                style: {
                    position: 'fixed',
                    top: `${endTop}px`,
                    left: `${endLeft}px`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    zIndex: 1000,
                    transform: 'none',
                    transition: 'none',
                },
            });
        }, 2050);
    }, [currentSectionIndex, prevSectionIndex]);

    const [isExitingTrusted, setIsExitingTrusted] = useState(false);
    const [exitDirection, setExitDirection] = useState('up');

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const isMobile = window.innerWidth < 1024;
        
        if (prevSectionIndex === 0 && currentSectionIndex === 1) {
            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {},
                });
            } else {
                animateMobileFrame();
            }
        }
        else if (prevSectionIndex === 1 && currentSectionIndex === 0) {

            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'creators',
                    style: {},
                });
            } else {
                animateMobileFrameBack();
            }
        }
        else if (prevSectionIndex === 2 && currentSectionIndex === 1) {
            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {},
                });
            } else {
                animateMobileFrameToTrusted();
            }
        }
        else if (currentSectionIndex === 0) {
            setMobileFrameState({
                visible: true,
                position: 'creators',
                style: {},
            });
        } else if (currentSectionIndex === 1) {

            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {},
                });
            } else {
                if (mobileFrameState.position !== 'animating' && mobileFrameState.position !== 'trusted') {
                    animateMobileFrame();
                } else if (mobileFrameState.position === 'trusted' && !mobileFrameState.visible) {
                    animateMobileFrameBack();
                }
            }
        } else {

            if (prevSectionIndex === 1) {
                const nextSectionId = sectionsData[currentSectionIndex]?.id;
                
                if (nextSectionId && !['more-ways-to-earn', 'why-linkstackz', 'analyze-fans', 'bio-link', 'faq-section'].includes(nextSectionId)) {
                    setExitDirection(currentSectionIndex > prevSectionIndex ? 'down' : 'up');
                    setIsExitingTrusted(true);
                } else {
                    setExitDirection(currentSectionIndex > prevSectionIndex ? 'down' : 'up');
                    setIsExitingTrusted(true);
                }
            } else {

                setMobileFrameState({
                    visible: false,
                    position: '',
                    style: {},
                });
            }
        }
    }, [currentSectionIndex, animateMobileFrame, animateMobileFrameBack, animateMobileFrameToTrusted, prevSectionIndex]);

    useEffect(() => {
        if (isExitingTrusted) {
            setMobileFrameState(prev => ({
                ...prev,
                style: {
                    ...prev.style,
                    opacity: 1,
                    transform: exitDirection === 'down'
                        ? 'translateY(-800px)'
                        : 'translateY(400px)',
                    transition: 'all 2s ease',
                }
            }));
            setTimeout(() => {
                setMobileFrameState(prev => ({ ...prev, visible: false }));
                setIsExitingTrusted(false);
            }, 1200);
        }
    }, [isExitingTrusted, exitDirection]);

    const moreWaysToEarnComponentRef = useRef(null);

    const sectionsData = [
        { id: 'creators-platform', animationType: 'creators-platform-anim', elements: [], className: 'lg:pt-[140px] pt-[85px]' },
        { id: 'trusted-creators', animationType: 'trusted-creators-anim', elements: [], },
        { id: 'more-ways-to-earn', animationType: 'more-ways-to-earn-anim', elements: [], className: 'lg:pt-[140px] pt-[85px]' },
        { id: 'why-linkstackz', animationType: 'why-linkstackz-anim', elements: [] , className: 'lg:pt-[140px] pt-[85px] lg:items-center !items-start' },
        { id: 'analyze-fans', animationType: 'analyze-fans-anim', elements: [] },
        { id: 'bio-link', animationType: 'bio-link-anim', elements: [] },
        { id: 'faq-section', animationType: 'faq-anim', elements: [] },
    ];

    const sectionComponentsMap = {
        'creators-platform': CreatorsPlatform,
        'trusted-creators': TrustedCreators,
        'more-ways-to-earn': MoreWaysToEarn,
        'why-linkstackz': WhyLinkstackz,
        'analyze-fans': AnalyzeFans,
        'bio-link': BioLink,
        'faq-section': Faq,
    };

    const goToSection = useCallback((index, direction) => {
        

        if (isAnimating || index === currentSectionIndex || index < 0 || index >= sectionsData.length) {
            return;
        }

        setIsAnimating(true);
        setPrevSectionIndex(currentSectionIndex);

        const prevSectionEl = sectionRefs.current[currentSectionIndex];
        const nextSectionEl = sectionRefs.current[index];

        if (prevSectionEl) {
            prevSectionEl.classList.add('section-leaving');
            prevSectionEl.classList.remove('active');

            if (direction > 0) {
                prevSectionEl.classList.add('leaving-up');
                prevSectionEl.classList.remove('leaving-down');
            } else if (direction < 0) {
                prevSectionEl.classList.add('leaving-down');
                prevSectionEl.classList.remove('leaving-up');
            }
        }

        if (nextSectionEl) {
            nextSectionEl.classList.add('active');
            nextSectionEl.style.opacity = '1';
            nextSectionEl.style.pointerEvents = 'auto';

            if (direction > 0) {
                nextSectionEl.classList.add('entering-from-bottom');
                nextSectionEl.classList.remove('entering-from-top');
            } else if (direction < 0) {
                nextSectionEl.classList.add('entering-from-top');
                nextSectionEl.classList.remove('entering-from-bottom');
            }
        }

        const dots = document.querySelectorAll('.navigation-dots .dot');
        dots.forEach((dot, dotIdx) => {
            if (dotIdx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        setTimeout(() => {
            if (prevSectionEl) {
                prevSectionEl.classList.remove('section-leaving');
                prevSectionEl.classList.remove('leaving-up');
                prevSectionEl.classList.remove('leaving-down');
                prevSectionEl.style.opacity = '0';
                prevSectionEl.style.pointerEvents = 'none';
            }
            if (nextSectionEl) {
                nextSectionEl.classList.remove('entering-from-bottom');
                nextSectionEl.classList.remove('entering-from-top');
            }
            setIsAnimating(false);
        }, ANIMATION_DURATION);

        setCurrentSectionIndex(index);
    }, [currentSectionIndex, isAnimating, sectionsData.length]);


    useEffect(() => {
        const handleWheel = (event) => {
            if (
                isAnimating ||
                (sectionsData[currentSectionIndex].id === 'more-ways-to-earn' &&
                 moreWaysToEarnComponentRef.current &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating())
            ) {
                event.preventDefault();
                return;
            }
            const now = new Date().getTime();
            if (now - lastScrollTime.current < SCROLL_DEBOUNCE_TIME) {
                event.preventDefault();
                return;
            }

            const currentSectionId = sectionsData[currentSectionIndex].id;
            const direction = event.deltaY > 0 ? 1 : -1; 


            if (currentSectionId === 'more-ways-to-earn' && moreWaysToEarnComponentRef.current) {
                const movedInternally = moreWaysToEarnComponentRef.current.moveSlide(direction);

                if (movedInternally) {
                    event.preventDefault();
                    lastScrollTime.current = now;
                    return;
                } else {
                    const canGoGlobal = moreWaysToEarnComponentRef.current.canGoFurther(direction);
                    if (canGoGlobal) {
                        lastScrollTime.current = now;
                        goToSection(currentSectionIndex + direction, direction);
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            lastScrollTime.current = now;
            goToSection(currentSectionIndex + direction, direction);
        };

        const handleKeyDown = (event) => {
            if (
                isAnimating ||
                (sectionsData[currentSectionIndex].id === 'more-ways-to-earn' &&
                 moreWaysToEarnComponentRef.current &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating())
            ) {
                event.preventDefault();
                return;
            }
            const currentSectionId = sectionsData[currentSectionIndex].id;
            let direction = 0;

            if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
                direction = 1;
            } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
                direction = -1;
            } else {
                return;
            }

            const now = new Date().getTime();
            if (now - lastScrollTime.current < (SCROLL_DEBOUNCE_TIME / 2)) {
                event.preventDefault();
                return;
            }
            lastScrollTime.current = now;

            if (currentSectionId === 'more-ways-to-earn' && moreWaysToEarnComponentRef.current) {
                const movedInternally = moreWaysToEarnComponentRef.current.moveSlide(direction);

                if (movedInternally) {
                    event.preventDefault();
                    return;
                } else {
                    const canGoGlobal = moreWaysToEarnComponentRef.current.canGoFurther(direction);
                    if (canGoGlobal) {
                        goToSection(currentSectionIndex + direction, direction);
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            goToSection(currentSectionIndex + direction, direction);
        };

        const handleTouchStart = (event) => {
            touchStartY.current = event.touches[0].clientY;
            touchEndY.current = 0;
        };

        const handleTouchMove = (event) => {
            event.preventDefault();
            touchEndY.current = event.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            if (
                isAnimating ||
                (sectionsData[currentSectionIndex].id === 'more-ways-to-earn' &&
                 moreWaysToEarnComponentRef.current &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating &&
                 moreWaysToEarnComponentRef.current.isHorizontalAnimating())
            ) {
                return;
            }
            const now = new Date().getTime();
            if (now - lastScrollTime.current < SCROLL_DEBOUNCE_TIME) {
                return;
            }

            const distance = touchStartY.current - touchEndY.current;
            const currentSectionId = sectionsData[currentSectionIndex].id;
            let direction = 0;

            if (distance > minSwipeDistance) {
                direction = 1;
            } else if (distance < -minSwipeDistance) {
                direction = -1;
            } else {
                return;
            }

            lastScrollTime.current = now;

            if (currentSectionId === 'more-ways-to-earn' && moreWaysToEarnComponentRef.current) {
                const movedInternally = moreWaysToEarnComponentRef.current.moveSlide(direction);

                if (movedInternally) {
                    return;
                } else {
                    const canGoGlobal = moreWaysToEarnComponentRef.current.canGoFurther(direction);
                    if (canGoGlobal) {
                        goToSection(currentSectionIndex + direction, direction);
                        return;
                    }
                }
            }
            goToSection(currentSectionIndex + direction, direction);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);


        return () => {
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSectionIndex, goToSection, sectionsData]);

    useEffect(() => {
        if (sectionRefs.current[0]) {
            sectionRefs.current[0].classList.add('active');
            sectionRefs.current[0].classList.add('entering-from-bottom');
            setTimeout(() => {
                if (sectionRefs.current[0]) {
                    sectionRefs.current[0].classList.remove('entering-from-bottom');
                }
            }, ANIMATION_DURATION);
        }
        const firstDot = document.querySelector('.navigation-dots .dot[data-index="0"]');
        if (firstDot) {
            firstDot.classList.add('active');
        }
        if (trustedCarouselRef.current) {
            const carouselRect = trustedCarouselRef.current.getBoundingClientRect();
        } else {
        }
    }, []);
    useEffect(() => {
        if (waveCircleRef.current) {
          const circle = waveCircleRef.current;
          const positions = [
            { top: '10%', left: '40%', width: '100%', opacity: 1 },
            { top: '40%', left: '0%', width: '100%', opacity: 1 },
            { top: '40%', left: '-50%', width: '100%', opacity: 1 },
            { top: '60%', left: '10%', width: '100%', opacity: 1 },
            { top: '60%', left: '10%', width: '100%', opacity: 1 },
            { top: '60%', left: '10%', width: '100%', opacity: 1 },
          ];
    
          const pos = positions[currentSectionIndex % positions.length];
          const direction = currentSectionIndex > prevSectionIndex ? 1 : currentSectionIndex < prevSectionIndex ? -1 : 0;
          const shiftY = direction === 1 ? 5 : direction === -1 ? -5 : 0;
          const shiftX = direction === 1 ? -3 : direction === -1 ? 3 : 0;
    
          circle.style.transition = 'all 2s ease-in-out';
          circle.style.top = `calc(${pos.top} + ${shiftY}px)`;
          circle.style.left = `calc(${pos.left} + ${shiftX}px)`;
          circle.style.width = pos.width;
          circle.style.opacity = pos.opacity;
        }
      }, [currentSectionIndex, prevSectionIndex]);

    useEffect(() => {
        if (mobileFrameImgRef.current) {
            const rect = mobileFrameImgRef.current.getBoundingClientRect();
            const scrollY = window.scrollY || window.pageYOffset;
            initialMobileFrameRect.current = {
                top: rect.top + scrollY,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            };
            const styleToSet = {
                position: 'fixed',
                top: `${rect.top + scrollY}px`,
                left: `${rect.left}px`,
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                zIndex: 2000,
            };
            setMobileFrameState({
                visible: true,
                position: 'animating',
                style: styleToSet,
            });
        } else {
        }
    }, []);

    return (
        <div className="fixed-viewport">
            <div 
                className={`section-bg-anim ${sectionsData[currentSectionIndex]?.animationType || ''}`}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    transition: 'all 2s ease'
                }}
            />
            

            {mobileFrameState.visible && (
                <MobileFrame
                    ref={mobileFrameRef}
                    style={mobileFrameState.style}
                    className={
                        mobileFrameState.position === 'creators'
                            ? 'lg:block hidden absolute z-30 top-[57%] left-[73%] -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] xl:w-[319px] 3xl:h-[651px] xl:h-[450px]'
                            : mobileFrameState.position === 'trusted'
                            ? 'lg:block hidden relative mx-auto h-[427px] w-[209px] z-10'
                            : mobileFrameState.position === 'animating'
                            ? 'block'
                            : ''
                    }
                />
            )}
            {sectionsData.map((sectionData, index) => {
                const SpecificSectionComponent = sectionComponentsMap[sectionData.id];

                if (!SpecificSectionComponent) {
                    return (
                        <section key={sectionData.id} className="screen-section">
                            <div className="content-wrapper">
                                <h1>Greška: Komponenta nije pronađena</h1>
                                <p>Nema definisane komponente za ID: ${sectionData.id}</p>
                            </div>
                        </section>
                    );
                }

                const isCurrentActive = index === currentSectionIndex;

                return (
                    <section
                        key={sectionData.id}
                        id={sectionData.id}
                        className={`screen-section z-0 ${sectionData.className || ''} ${isCurrentActive ? 'active' : ''}`}                     data-animation-in={sectionData.animationType}
                        ref={el => sectionRefs.current[index] = el}
                        >
                            {sectionData.id === 'creators-platform' && (
                                <div
                                    ref={creatorsFrameRef}
                                    style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: '319px',
                                    height: '304px',
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none',
                                    zIndex: 30
                                    }}
                                />
                                )}
                                {sectionData.id === 'trusted-creators' && (
                                <div
                                    ref={trustedFrameAnchorRef}
                                    id="mobile-frame-anchor"
                                    style={{
                                    position: 'relative',
                                    width: '209px',
                                    height: '427px',
                                    margin: '0 auto',
                                    top: '-120px',
                                    zIndex: 10,
                                    display: window.innerWidth < 1024 ? 'block' : 'none'
                                    }}
                                />
                                )}
                        {sectionData.id === 'more-ways-to-earn' ? (
                            <SpecificSectionComponent
                            isActive={isCurrentActive}
                            transitionDirection={
                                index > prevSectionIndex ? 'down' :
                                index < prevSectionIndex ? 'up' :
                                null
                            }
                            ref={moreWaysToEarnComponentRef}
                            />
                        ) : sectionData.id === 'creators-platform' ? (
                            <SpecificSectionComponent
                                ref={mobileFrameImgRef}
                                isActive={isCurrentActive}
                                transitionDirection={
                                    index > prevSectionIndex ? 'down' :
                                    index < prevSectionIndex ? 'up' :
                                    null
                                }
                                id={sectionData.id}
                                nextSectionId={sectionsData[index + 1] ? sectionsData[index + 1].id : null}
                            />
                        ) : sectionData.id === 'trusted-creators' ? (
                            <SpecificSectionComponent
                                ref={trustedCarouselRef}
                                mobileFrameRef={trustedMobileFrameRef}
                                isActive={isCurrentActive}
                                transitionDirection={
                                    index > prevSectionIndex ? 'down' :
                                    index < prevSectionIndex ? 'up' :
                                    null
                                }
                                id={sectionData.id}
                                nextSectionId={sectionsData[index + 1] ? sectionsData[index + 1].id : null}
                            />
                        ) : (
                            <SpecificSectionComponent
                            isActive={isCurrentActive}
                            transitionDirection={
                                index > prevSectionIndex ? 'down' :
                                index < prevSectionIndex ? 'up' :
                                null
                            }
                            id={sectionData.id}
                            nextSectionId={sectionsData[index + 1] ? sectionsData[index + 1].id : null}
                            />
                            
                        )}
                        </section>
                );
            })}
            <WaveCircleBox ref={waveCircleRef} className="hidden lg:block" />
            <WaveCircleBoxMobile className="block lg:hidden" />
        </div>
    );
}

export default App;