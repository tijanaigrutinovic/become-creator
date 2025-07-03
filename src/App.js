// src/App.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import './css/analyze-fans.css'
import './css/bio-link.css'
import './css/creators-platform.css'
import './css/more-ways-to-earn.css'
import './css/faq.css'
import './css/animations.css'

// Uvezite vaše specifične komponente
import CreatorsPlatform from './components/CreatorsPlatform';
import TrustedCreators from './components/TrustedCreators';
import MoreWaysToEarn from './components/MoreWaysToEarn';
import WhyLinkstackz from './components/WhyLinkstackz';
import AnalyzeFans from './components/AnalyzeFans';
import Faq from './components/Faq';

// Generička komponenta za sekcije
const SectionContent = ({ id, title, description, elements }) => (
    <div className="content-wrapper">
        {elements && elements.map((el, index) => <div key={index} className={el}></div>)}
        <h1>{title}</h1>
        <p>{description}</p>
    </div>
);

const ANIMATION_DURATION = 1200;
const SCROLL_DEBOUNCE_TIME = 800;

function App() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [prevSectionIndex, setPrevSectionIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const lastScrollTime = useRef(0);
    const sectionRefs = useRef([]);

    const moreWaysToEarnComponentRef = useRef(null);

    const sectionsData = [
        { id: 'creators-platform', animationType: 'creators-platform-anim', title: 'Creators Platform', description: 'Vaša platforma za kreiranje sadržaja.', elements: [] },
        { id: 'trusted-creators', animationType: 'trusted-creators-anim', title: 'Trusted Creators', description: 'Ladies, it\'s time to take control and start earning like the boss you are.', elements: [] },
        { id: 'more-ways-to-earn', animationType: 'more-ways-to-earn-anim', title: 'More Ways to Earn', description: 'Nove metode zarade.', elements: [] },
        { id: 'why-linkstackz', animationType: 'why-linkstackz-anim', title: 'Why Linkstackz?', description: 'Razlozi za Linkstackz.', elements: [] },
        { id: 'analyze-fans', animationType: 'analyze-fans-anim', title: 'Analyze Fans', description: 'Analiza fanova.', elements: [] },
        { id: 'faq-section', animationType: 'faq-anim', title: 'FAQ', description: 'Često postavljana pitanja.', elements: [] },
    ];

    const sectionComponentsMap = {
        'creators-platform': CreatorsPlatform,
        'trusted-creators': TrustedCreators,
        'more-ways-to-earn': MoreWaysToEarn,
        'why-linkstackz': WhyLinkstackz,
        'analyze-fans': AnalyzeFans,
        'faq-section': Faq,
    };

    const goToSection = useCallback((index, direction) => { // <-- VAŽNO: direction je ovde prisutan
        console.log(`--- goToSection pozvan: Cilj: ${index}, Smer: ${direction} ---`);
        console.log(`isAnimating: ${isAnimating}, currentSectionIndex: ${currentSectionIndex}, index: ${index}`);

        if (isAnimating || index === currentSectionIndex || index < 0 || index >= sectionsData.length) {
            console.log(`[goToSection] Blokirano. Trenutni: ${currentSectionIndex}, ciljani: ${index}, animacija u toku: ${isAnimating}`);
            return;
        }

        setIsAnimating(true);
        setPrevSectionIndex(currentSectionIndex);

        const prevSectionEl = sectionRefs.current[currentSectionIndex];
        const nextSectionEl = sectionRefs.current[index];

        console.log(`Prethodna sekcija (${currentSectionIndex}):`, prevSectionEl ? prevSectionEl.id : 'N/A');
        console.log(`Sledeća sekcija (${index}):`, nextSectionEl ? nextSectionEl.id : 'N/A');


        if (prevSectionEl) {
            console.log(`[PREV] Dodajem 'section-leaving' i uklanjam 'active' na ${prevSectionEl.id}`);
            prevSectionEl.classList.add('section-leaving');
            prevSectionEl.classList.remove('active'); // Prethodna sekcija odmah prestaje biti 'active'

            // Dodavanje smera odlaska (leaving-up/down) - OVDE ZAVISI OD 'direction'
            if (direction > 0) { // Skroluje se DOLE, prethodna sekcija ide GORE
                console.log(`[PREV] Dodajem 'leaving-up' na ${prevSectionEl.id}`);
                prevSectionEl.classList.add('leaving-up');
                prevSectionEl.classList.remove('leaving-down');
            } else if (direction < 0) { // Skroluje se GORE, prethodna sekcija ide DOLE
                console.log(`[PREV] Dodajem 'leaving-down' na ${prevSectionEl.id}`);
                prevSectionEl.classList.add('leaving-down');
                prevSectionEl.classList.remove('leaving-up');
            }
            console.log(`[PREV] Klase na ${prevSectionEl.id} ODMAH NAKON AŽURIRANJA: ${prevSectionEl.className}`);
        }

        if (nextSectionEl) {
            console.log(`[NEXT] Dodajem 'active' na ${nextSectionEl.id}`);
            nextSectionEl.classList.add('active');
            nextSectionEl.style.opacity = '1';
            nextSectionEl.style.pointerEvents = 'auto';

            // Dodavanje smera ulaska (entering-from-top/bottom) - OVDE ZAVISI OD 'direction'
            if (direction > 0) { // Skroluje se DOLE, nova sekcija dolazi ODOZDO
                console.log(`[NEXT] Dodajem 'entering-from-bottom' na ${nextSectionEl.id}`);
                nextSectionEl.classList.add('entering-from-bottom');
                nextSectionEl.classList.remove('entering-from-top');
            } else if (direction < 0) { // Skroluje se GORE, nova sekcija dolazi ODOZGO
                console.log(`[NEXT] Dodajem 'entering-from-top' na ${nextSectionEl.id}`);
                nextSectionEl.classList.add('entering-from-top');
                nextSectionEl.classList.remove('entering-from-bottom');
            }
            console.log(`[NEXT] Klase na ${nextSectionEl.id} ODMAH NAKON AŽURIRANJA: ${nextSectionEl.className}`);
        }

        const dots = document.querySelectorAll('.navigation-dots .dot');
        dots.forEach((dot, dotIdx) => {
            if (dotIdx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        console.log(`Postavljen timeout za ${ANIMATION_DURATION}ms`);
        setTimeout(() => {
            console.log(`--- Timeout istekao (${ANIMATION_DURATION}ms) ---`);
            if (prevSectionEl) {
                console.log(`[TIMEOUT PREV] Uklanjam klase sa ${prevSectionEl.id}`);
                prevSectionEl.classList.remove('section-leaving');
                prevSectionEl.classList.remove('leaving-up');
                prevSectionEl.classList.remove('leaving-down');
                prevSectionEl.style.opacity = '0';
                prevSectionEl.style.pointerEvents = 'none';
                console.log(`[TIMEOUT PREV] Klase na ${prevSectionEl.id} POSLE TIMEOUTA: ${prevSectionEl.className}`);
            }
            if (nextSectionEl) {
                console.log(`[TIMEOUT NEXT] Uklanjam entering klase sa ${nextSectionEl.id}`);
                nextSectionEl.classList.remove('entering-from-bottom');
                nextSectionEl.classList.remove('entering-from-top');
                console.log(`[TIMEOUT NEXT] Klase na ${nextSectionEl.id} POSLE TIMEOUTA: ${nextSectionEl.className}`);
            }
            setIsAnimating(false);
            console.log(`setIsAnimating(false)`);
            console.log(`--- goToSection završen ---`);
        }, ANIMATION_DURATION);

        setCurrentSectionIndex(index);
        console.log(`currentSectionIndex postavljen na: ${index}`);
    }, [currentSectionIndex, isAnimating, sectionsData.length]);


    useEffect(() => {
        const handleWheel = (event) => {
            const now = new Date().getTime();
            if (now - lastScrollTime.current < SCROLL_DEBOUNCE_TIME) {
                event.preventDefault();
                return;
            }

            const currentSectionId = sectionsData[currentSectionIndex].id;
            const direction = event.deltaY > 0 ? 1 : -1; // <-- VAŽNO: direction se izračunava ovde
            console.log(`[WHEEL] Smer skrolovanja: ${direction === 1 ? 'DOLE' : 'GORE'}`);


            if (currentSectionId === 'more-ways-to-earn' && moreWaysToEarnComponentRef.current) {
                const movedInternally = moreWaysToEarnComponentRef.current.moveSlide(direction);

                if (movedInternally) {
                    event.preventDefault();
                    lastScrollTime.current = now;
                    console.log(`[WHEEL] Interni slajder se pomerio.`);
                    return;
                } else {
                    const canGoGlobal = moreWaysToEarnComponentRef.current.canGoFurther(direction);
                    if (canGoGlobal) {
                        lastScrollTime.current = now;
                        console.log(`[WHEEL] Interni slajder je na kraju, prelazim na sledeću sekciju.`);
                        goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            lastScrollTime.current = now;
            console.log(`[WHEEL] Prelazim na sledeću sekciju.`);
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
            console.log(`[KEY] Smer kretanja: ${direction === 1 ? 'DOLE' : 'GORE'}`);

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
                    console.log(`[KEY] Interni slajder se pomerio.`);
                    return;
                } else {
                    const canGoGlobal = moreWaysToEarnComponentRef.current.canGoFurther(direction);
                    if (canGoGlobal) {
                        console.log(`[KEY] Interni slajder je na kraju, prelazim na sledeću sekciju.`);
                        goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
                        event.preventDefault();
                        return;
                    }
                }
            }

            event.preventDefault();
            console.log(`[KEY] Prelazim na sledeću sekciju.`);
            goToSection(currentSectionIndex + direction, direction); // <-- VAŽNO: prosleđuje direction
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentSectionIndex, goToSection, sectionsData]);

    useEffect(() => {
        console.log(`--- Prvo renderovanje: Inicijalizujem prvu sekciju ---`);
        if (sectionRefs.current[0]) {
            sectionRefs.current[0].classList.add('active');
            // Prva sekcija mora imati i ulaznu klasu za pravilan početak animacije
            // 'entering-from-bottom' kao default ulaz pri prvom učitavanju
            sectionRefs.current[0].classList.add('entering-from-bottom');
            console.log(`[INIT] Klase na prvoj sekciji (${sectionRefs.current[0].id}): ${sectionRefs.current[0].className}`);
            // Ukloni nakon kratkog vremena, jer je animacija završena
            setTimeout(() => {
                if (sectionRefs.current[0]) {
                    sectionRefs.current[0].classList.remove('entering-from-bottom');
                    console.log(`[INIT] Uklonjena 'entering-from-bottom' sa prve sekcije.`);
                }
            }, ANIMATION_DURATION);
        }
        const firstDot = document.querySelector('.navigation-dots .dot[data-index="0"]');
        if (firstDot) {
            firstDot.classList.add('active');
        }
    }, []);


    return (
        <div className="fixed-viewport">
            {sectionsData.map((sectionData, index) => {
                const SpecificSectionComponent = sectionComponentsMap[sectionData.id];

                if (!SpecificSectionComponent) {
                    console.warn(`Nema komponente za ID sekcije: ${sectionData.id}. Renderovanje placeholder-a.`);
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
                        className={`screen-section ${isCurrentActive ? 'active' : ''}`}
                        data-animation-in={sectionData.animationType}
                        ref={el => sectionRefs.current[index] = el}
                    >
                        {sectionData.id === 'section1' || sectionData.id === 'section2' || sectionData.id === 'section3' ? (
                            <SpecificSectionComponent
                                id={sectionData.id}
                                title={sectionData.title}
                                description={sectionData.description}
                                elements={sectionData.elements}
                            />
                        ) : sectionData.id === 'more-ways-to-earn' ? (
                            <SpecificSectionComponent ref={moreWaysToEarnComponentRef} />
                        ) : (
                            <SpecificSectionComponent
                                isActive={isCurrentActive}
                                id={sectionData.id}
                                nextSectionId={sectionsData[index + 1] ? sectionsData[index + 1].id : null}
                            />
                        )}
                    </section>
                );
            })}

            <nav className="navigation-dots">
                {sectionsData.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSectionIndex ? 'active' : ''}`}
                        data-index={index}
                        onClick={() => goToSection(index, index > currentSectionIndex ? 1 : -1)} // <-- VAŽNO: prosleđuje direction
                    ></span>
                ))}
            </nav>
        </div>
    );
}

export default App;