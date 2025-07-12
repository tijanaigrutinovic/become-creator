// src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import './css/globals.css'
import WaveCircleBox from "./components/Common/wave-circle-box";
import MobileFrame from './components/Common/MobileFrame';


import CreatorsPlatform from './components/CreatorsPlatform';
import TrustedCreators from './components/TrustedCreators';
import MoreWaysToEarn from './components/MoreWaysToEarn';
import WhyLinkstackz from './components/WhyLinkstackz';
import AnalyzeFans from './components/AnalyzeFans';
import Faq from './components/Faq';
import BioLinkTest from './components/BioLink/indextest';

const SectionContent = ({ id, title, description, elements }) => (
    <div className="content-wrapper">
        {elements && elements.map((el, index) => <div key={index} className={el}></div>)}
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
);

const ANIMATION_DURATION = 1200;
const SCROLL_DEBOUNCE_TIME = 800; // Increased debounce for touch for better feel

function App() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [prevSectionIndex, setPrevSectionIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const lastScrollTime = useRef(0);
    const sectionRefs = useRef([]);
    const waveCircleRef = useRef(null);

    const [mobileFrameState, setMobileFrameState] = useState({
        visible: true,
        position: 'creators', // 'creators' | 'animating' | 'trusted'
        style: {},
    });
    const mobileFrameRef = useRef(null);
    const creatorsFrameRef = useRef(null);
    const trustedFrameAnchorRef = useRef(null);
    
    // State for touch events
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);
    const minSwipeDistance = 50; // Minimum distance for a swipe to be recognized

    const animateMobileFrame = useCallback(() => {
        if (!creatorsFrameRef.current || !mobileFrameRef.current) return;
    
        const startRect = creatorsFrameRef.current.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
    
        console.log("📦 START rect:", startRect);
        console.log("📏 scrollY:", scrollY);
    
        // Postavi početnu poziciju
        setMobileFrameState({
            visible: true,
            position: 'animating',
            style: {
                position: 'fixed',
                top: `${startRect.top + scrollY}px`,
                left: `${startRect.left}px`,
                width: `${startRect.width}px`,
                height: `450px`,
                zIndex: 1000,
                transition: 'none',
                transition: 'top 1.2s, left 1.2s, width 1.2s, height 1.2s, transform 1.2s',
            },
        });
    
        // ⏳ Sačekaj da trustedFrameAnchorRef ima dimenzije
        let attempts = 0;
        const maxAttempts = 100; // 5 sekundi (100 * 50ms)
        
        const waitForAnchor = () => {
            attempts++;
            
            if (attempts > maxAttempts) {
                console.error("❌ Timeout: trustedFrameAnchorRef se nije pojavio u očekivanom vremenu");
                return;
            }
            
            // Prvo proveri da li je sekcija renderovana
            const trustedSection = document.getElementById('trusted-creators');
            if (!trustedSection) {
                console.log("⏱️ Čekam da se trusted-creators sekcija renderuje...");
                setTimeout(waitForAnchor, 50);
                return;
            }
    
            if (!trustedFrameAnchorRef.current) {
                console.log("⏱️ Čekam da se trustedFrameAnchorRef pojavi...");
                setTimeout(waitForAnchor, 50);
                return;
            }
    
            const endRect = trustedFrameAnchorRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const isMobile = windowWidth < 1024;
            
            console.log("🔍 Debug trustedFrameAnchorRef:", {
                width: endRect.width,
                height: endRect.height,
                windowWidth,
                isMobile,
                display: trustedFrameAnchorRef.current.style.display,
                computedDisplay: window.getComputedStyle(trustedFrameAnchorRef.current).display
            });
    
            // Ako je desktop, koristi fiksne koordinate
            if (!isMobile) {
                console.log("🖥️ Desktop detektovan, koristim fiksne koordinate");
                
                // Fiksne koordinate za desktop (trusted-creators sekcija)
                const trustedSectionRect = trustedSection.getBoundingClientRect();
                const endTop = trustedSectionRect.top + scrollY + 200; // Centar sekcije
                const endLeft = trustedSectionRect.left + (trustedSectionRect.width / 2) - 104.5; // Centar (209px / 2)
                const endWidth = 209;
                const endHeight = 427;
                
                console.log("📦 Desktop END rect:", { top: endTop, left: endLeft, width: endWidth, height: endHeight });
                
                // Pokreni animaciju
                const animatingState = {
                    visible: true,
                    position: 'animating',
                    style: {
                        position: 'fixed',
                        top: `${endTop}px`,
                        left: `${endLeft}px`,
                        width: `${endWidth}px`,
                        height: `${endHeight}px`,
                        zIndex: 1000,
                        transform: 'translate(100px, 100px)',
                        transformOrigin: 'top left',
                        opacity: 1,
                        transition: 'top 1.2s, left 1.2s, width 1.2s, height 1.2s, transform 1.2s',
                    },
                };
                
                console.log("🎬 Postavljam animating state:", animatingState);
                setMobileFrameState(animatingState);
                
                // Završna pozicija
                setTimeout(() => {
                    const trustedState = {
                        visible: true,
                        position: 'trusted',
                        style: {
                            position: 'fixed',
                            top: `${endTop + 150}px`,
                            left: `${endLeft + 100}px`,
                            width: `${endWidth}px`,
                            height: `${endHeight}px`,
                            zIndex: 1000,
                            transform: 'none',
                            opacity: 1,
                            transition: 'none',
                        },
                    };
                    
                    console.log("🎯 Postavljam trusted state:", trustedState);
                    setMobileFrameState(trustedState);
                }, 1300);
                
                return;
            }
    
            if (endRect.width === 0 || endRect.height === 0) {
                console.log("⏱️ Čekam da se trustedFrameAnchorRef ima dimenzije...");
                setTimeout(waitForAnchor, 50);
                return;
            }
    
            console.log("📦 END rect (nakon čekanja):", endRect);
    
            // Pokreni animaciju za mobilne
            setMobileFrameState({
                visible: true,
                position: 'animating',
                style: {
                  position: 'fixed',
                  top: `${endRect.top + scrollY}px`,
                  left: `${endRect.left}px`,
                  width: `${endRect.width}px`,
                  height: `${endRect.height}px`,
                  zIndex: 1000,
                  transform: 'translate(100px, 100px)',
                  transformOrigin: 'top left',
                  opacity: 1,
                  transition: 'top 1.2s, left 1.2s, width 1.2s, height 1.2s, transform 1.2s',
                },
              });
    
            // Završna pozicija
            setTimeout(() => {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {
                        position: 'fixed',
                        top: `${endRect.top + scrollY + 150}px`,
                        left: `${endRect.left + 100}px`,
                        width: `${endRect.width}px`,
                        height: `${endRect.height}px`,
                        zIndex: 1000,
                        transform: 'none',
                        opacity: 1,
                        transition: 'none',
                    },
                });
            }, 1300);
        };
    
        waitForAnchor(); // 👈 pokreni proveru
    }, []);

    const animateMobileFrameBack = useCallback(() => {
        console.log("🔄 animateMobileFrameBack() pokrenuta");
    
        // Koristi fiksne koordinate za creators-platform sekciju
        const creatorsSection = document.getElementById('creators-platform');
        if (!creatorsSection) {
            console.log("❌ animateMobileFrameBack() - creators-platform sekcija nije pronađena");
            return;
        }
        
        const creatorsSectionRect = creatorsSection.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        
        // Fiksne koordinate za creators poziciju (centar sekcije)
        const endTop = creatorsSectionRect.top + scrollY + (creatorsSectionRect.height / 2) - 152; // Centar (304px / 2)
        const endLeft = creatorsSectionRect.left + (creatorsSectionRect.width / 2) - 159.5; // Centar (319px / 2)
        const endWidth = 319;
        const endHeight = 450;
    
        console.log("📦 BACK - Fiksne koordinate:", { top: endTop, left: endLeft, width: endWidth, height: endHeight });
        console.log("📏 BACK - scrollY:", scrollY);
    
        // Postavi početnu poziciju (iz trusted pozicije)
        const backStartState = {
            visible: true,
            position: 'animating',
            style: {
                position: 'fixed',
                top: `${endTop + 150}px`,
                left: `${endLeft + 100}px`,
                width: `${endWidth}px`,
                height: `${endHeight}px`,
                zIndex: 1000,
                transform: 'translate(100px, 100px)',
                transition: 'none',
            },
        };
        console.log("🎬 BACK - Postavljam početnu poziciju:", backStartState);
        setMobileFrameState(backStartState);
    
        // Pokreni animaciju povratka
        setTimeout(() => {
            const backAnimatingState = {
                visible: true,
                position: 'animating',
                style: {
                    position: 'fixed',
                    top: `${endTop}px`,
                    left: `${endLeft}px`,
                    width: `${endWidth}px`,
                    height: `${endHeight}px`,
                    zIndex: 1000,
                    transform: 'none',
                    opacity: 1,
                    transition: 'top 1.2s, left 1.2s, width 1.2s, height 1.2s, transform 1.2s',
                },
            };
            console.log("🎬 BACK - Pokrećem animaciju povratka:", backAnimatingState);
            setMobileFrameState(backAnimatingState);
        }, 50);
    
        // Završna pozicija (creators)
        setTimeout(() => {
            const backFinalState = {
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
                    opacity: 1,
                    transition: 'none',
                },
            };
            console.log("🎯 BACK - Završna pozicija (creators):", backFinalState);
            setMobileFrameState(backFinalState);
        }, 1300);
    }, []);

    const [isExitingTrusted, setIsExitingTrusted] = useState(false);
    const [exitDirection, setExitDirection] = useState('up'); // 'up' ili 'down'

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
        // Ideš NA GORE (trusted -> creators)
        else if (prevSectionIndex === 1 && currentSectionIndex === 0) {
            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'creators',
                    style: {},
                });
            } else {
                // Ovde implementiraj animaciju povratka!
                animateMobileFrameBack();
            }
        }
        else if (currentSectionIndex === 0) {
            setMobileFrameState({
                visible: true,
                position: 'creators',
                style: {},
            });
        } else if (currentSectionIndex === 1) {
            console.log("🎯 Dolazim u trusted-creators sekciju, trenutna pozicija:", mobileFrameState.position);
            if (isMobile) {
                setMobileFrameState({
                    visible: true,
                    position: 'trusted',
                    style: {},
                });
            } else {
                // Proveri da li je animacija već u toku ili završena
                if (mobileFrameState.position !== 'animating' && mobileFrameState.position !== 'trusted') {
                    console.log("🎬 Pokrećem animateMobileFrame()");
                    animateMobileFrame();
                } else if (mobileFrameState.position === 'trusted' && !mobileFrameState.visible) {
                    console.log("🔄 MobileFrame je u trusted poziciji ali nije vidljiv, pokrećem animateMobileFrameBack()");
                    animateMobileFrameBack();
                } else {
                    console.log("✅ MobileFrame je već u trusted poziciji i vidljiv");
                }
            }
        } else {
            console.log("🚪 Napuštaš sekciju, prevSectionIndex:", prevSectionIndex, "currentSectionIndex:", currentSectionIndex);
            // Ako napuštaš TrustedCreators sekciju, pokreni izlaznu animaciju
            if (prevSectionIndex === 1) {
                // Proveri da li ideš u sekciju gde MobileFrame treba da ostane vidljiv
                const nextSectionId = sectionsData[currentSectionIndex]?.id;
                console.log("🎭 Napuštaš trusted-creators, idem u:", nextSectionId);
                
                // Ako ideš u sekciju gde MobileFrame nije potreban, pokreni izlaznu animaciju
                if (nextSectionId && !['more-ways-to-earn', 'why-linkstackz', 'analyze-fans', 'bio-link', 'faq-section'].includes(nextSectionId)) {
                    console.log("🎭 Pokrećem izlaznu animaciju iz trusted-creators");
                    setExitDirection(currentSectionIndex > prevSectionIndex ? 'down' : 'up');
                    setIsExitingTrusted(true);
                } else {
                    console.log("🎭 Pokrećem izlaznu animaciju iz trusted-creators u sekciju:", nextSectionId);
                    setExitDirection(currentSectionIndex > prevSectionIndex ? 'down' : 'up');
                    setIsExitingTrusted(true);
                }
            } else {
                console.log("❌ Skrivam MobileFrame jer nisi bio u trusted-creators");
                setMobileFrameState({
                    visible: false,
                    position: '',
                    style: {},
                });
            }
        }
    }, [currentSectionIndex, animateMobileFrame, animateMobileFrameBack, prevSectionIndex]);

    // Animacija izlaska MobileFrame-a iz TrustedCreators
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
                    transition: 'all 1.2s ease',
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
        { id: 'creators-platform', animationType: 'creators-platform-anim', elements: [], className: 'pt-[140px] ' },
        { id: 'trusted-creators', animationType: 'trusted-creators-anim', elements: [], },
        { id: 'more-ways-to-earn', animationType: 'more-ways-to-earn-anim', elements: [], className: 'pt-[140px] ' },
        { id: 'why-linkstackz', animationType: 'why-linkstackz-anim', elements: [] , className: 'pt-[140px] ' },
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
        'bio-link': BioLinkTest,
        'faq-section': Faq,
    };

    const goToSection = useCallback((index, direction) => { // <-- VAŽNO: direction je ovde prisutan
        

        if (isAnimating || index === currentSectionIndex || index < 0 || index >= sectionsData.length) {
            return;
        }

        setIsAnimating(true);
        setPrevSectionIndex(currentSectionIndex);

        const prevSectionEl = sectionRefs.current[currentSectionIndex];
        const nextSectionEl = sectionRefs.current[index];

        if (prevSectionEl) {
            prevSectionEl.classList.add('section-leaving');
            prevSectionEl.classList.remove('active'); // Prethodna sekcija odmah prestaje biti 'active'

            // Dodavanje smera odlaska (leaving-up/down) - OVDE ZAVISI OD 'direction'
            if (direction > 0) { // Skroluje se DOLE, prethodna sekcija ide GORE
                prevSectionEl.classList.add('leaving-up');
                prevSectionEl.classList.remove('leaving-down');
            } else if (direction < 0) { // Skroluje se GORE, prethodna sekcija ide DOLE
                prevSectionEl.classList.add('leaving-down');
                prevSectionEl.classList.remove('leaving-up');
            }
        }

        if (nextSectionEl) {
            nextSectionEl.classList.add('active');
            nextSectionEl.style.opacity = '1';
            nextSectionEl.style.pointerEvents = 'auto';

            // Dodavanje smera ulaska (entering-from-top/bottom) - OVDE ZAVISI OD 'direction'
            if (direction > 0) { // Skroluje se DOLE, nova sekcija dolazi ODOZDO
                nextSectionEl.classList.add('entering-from-bottom');
                nextSectionEl.classList.remove('entering-from-top');
            } else if (direction < 0) { // Skroluje se GORE, nova sekcija dolazi ODOZGO
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
                        goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            lastScrollTime.current = now;
            goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
        };

        const handleKeyDown = (event) => {
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
                        goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
        };

        // --- NEW: Touch Event Handlers ---
        const handleTouchStart = (event) => {
            touchStartY.current = event.touches[0].clientY;
            touchEndY.current = 0; // Reset end position
        };

        const handleTouchMove = (event) => {
            // Prevent default scroll behavior only if a swipe is potentially happening
            // This prevents the page from scrolling while trying to swipe sections
            event.preventDefault();
            touchEndY.current = event.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            const now = new Date().getTime();
            if (now - lastScrollTime.current < SCROLL_DEBOUNCE_TIME) {
                return;
            }

            const distance = touchStartY.current - touchEndY.current;
            const currentSectionId = sectionsData[currentSectionIndex].id;
            let direction = 0;

            if (distance > minSwipeDistance) { // Swiped Up (scroll down)
                direction = 1;
            } else if (distance < -minSwipeDistance) { // Swiped Down (scroll up)
                direction = -1;
            } else {
                return; // Not a significant swipe
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
        // --- END NEW: Touch Event Handlers ---


        window.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        // Add touch event listeners
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);


        return () => {
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            // Remove touch event listeners
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [currentSectionIndex, goToSection, sectionsData]);

    useEffect(() => {
        if (sectionRefs.current[0]) {
            sectionRefs.current[0].classList.add('active');
            // Prva sekcija mora imati i ulaznu klasu za pravilan početak animacije
            // 'entering-from-bottom' kao default ulaz pri prvom učitavanju
            sectionRefs.current[0].classList.add('entering-from-bottom');
            // Ukloni nakon kratkog vremena, jer je animacija završena
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
    
          circle.style.transition = 'all 1.2s ease-in-out';
          circle.style.top = `calc(${pos.top} + ${shiftY}px)`;
          circle.style.left = `calc(${pos.left} + ${shiftX}px)`;
          circle.style.width = pos.width;
          circle.style.opacity = pos.opacity;
        }
      }, [currentSectionIndex, prevSectionIndex]);

    return (
        <div className="fixed-viewport">
            {/* Jedinstveni pozadinski element koji se transformiše */}
            <div 
                className={`section-bg-anim ${sectionsData[currentSectionIndex]?.animationType || ''}`}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: -1,
                    pointerEvents: 'none',
                    transition: 'all 0.8s ease'
                }}
            />
            
            {console.log("🔍 MobileFrame render state:", mobileFrameState)}
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
                        className={`screen-section ${sectionData.className || ''} ${isCurrentActive ? 'active' : ''}`}                     data-animation-in={sectionData.animationType}
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
            <WaveCircleBox ref={waveCircleRef} />
        </div>
    );
}

export default App;