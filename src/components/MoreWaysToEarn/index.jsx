// src/components/MoreWaysToEarn.jsx
import React, { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';// Uklonite useInView hook
// import useInView from "../../hooks/seInView"; // OBRISATI OVU LINIJU!

import MoreWaysToEarnSlide1 from './indexslide1';
import MoreWaysToEarnSlide2 from './indexslide2';
const SLIDE_TRANSITION_DURATION = 800; // Trajanje animacije horizontalnog slajdera
// Uklanjamo SLIDE_SCROLL_DEBOUNCE jer ce ga App.jsx kontrolisati

// Koristimo forwardRef da bismo mogli da prosledimo ref iz App.jsx
const MoreWaysToEarn = forwardRef((props, ref) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const slideContainerRef = useRef(null);
    const isHorizontalAnimating = useRef(false);

    const slides = [MoreWaysToEarnSlide1, MoreWaysToEarnSlide2]; // Dodajte sve slajdove

    // Funkcija za prelazak na slajd
    const goToSlide = useCallback((direction) => {
        if (isHorizontalAnimating.current || !slideContainerRef.current) {
            return false; // Vec se animira ili ref nije spreman
        }

        const newIndex = currentSlideIndex + direction;

        // Proveravamo da li je novi indeks unutar granica
        if (newIndex < 0 || newIndex >= slides.length) {
            return false; // Nismo mogli da se pomerimo, jer je van granica
        }

        isHorizontalAnimating.current = true;
        const offset = newIndex * -100;

        const currentSlideEl = slideContainerRef.current.querySelector(`.mwte-slide.active`);
        if (currentSlideEl) {
            currentSlideEl.classList.remove('active');
            currentSlideEl.classList.add('slide-leaving');
        }

        slideContainerRef.current.style.transform = `translateX(${offset}%)`;
        slideContainerRef.current.style.transition = `transform ${SLIDE_TRANSITION_DURATION / 1000}s ease-in-out`;

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
        }, SLIDE_TRANSITION_DURATION);

        return true; // Uspesno inicirana promena slajda
    }, [currentSlideIndex, slides.length]);

    // Koristimo useImperativeHandle da izlozimo funkcije roditeljskoj komponenti (App.jsx)
    useImperativeHandle(ref, () => ({
        // Funkcija koju App.jsx moze da pozove da pomeri slajd unutar MoreWaysToEarn
        moveSlide: (direction) => {
            return goToSlide(direction); // Vrati true/false da li je slajd promenjen
        },
        // Funkcija koju App.jsx moze da pozove da proveri da li je moguce ici dalje (van ove sekcije)
        canGoFurther: (direction) => { // direction: -1 za gore, 1 za dole
            if (isHorizontalAnimating.current) return false;

            if (direction === -1) { // Pokusavamo ici gore (na prethodnu sekciju)
                return currentSlideIndex === 0; // Mozemo ici dalje samo ako smo na prvom slajdu
            } else { // Pokusavamo ici dole (na sledecu sekciju)
                return currentSlideIndex === slides.length - 1; // Mozemo ici dalje samo ako smo na poslednjem slajdu
            }
        }
    }));

    useEffect(() => {
        if (slideContainerRef.current && slides.length > 0) {
            const initialSlide = slideContainerRef.current.children[currentSlideIndex];
            if (initialSlide && !initialSlide.classList.contains('active')) {
                initialSlide.classList.add('active');
            }
        }
        // Nema vise wheel/keydown event listenera ovde! App.jsx ce ih hendlovati.
    }, [currentSlideIndex, slides.length]);

    return (
        <div className="mwte-section-content w-full h-full flex flex-col items-center">
            {/* Fiksni naslov sekcije */}
            <div className="mwte-title text-center mx-auto mb-12 max-w-[766px]">
                <h2 className="text-2xl lg:text-5xl font-bold font-[1000] text-white leading-tight mb-4">
                    More Ways to{" "}
                    <span className="text-[#E91E63] font-gilroy capitalize">Earn</span>
                </h2>
                <p className="hidden lg:block text-base lg:text-lg font-bold font-gilroy capitalize text-white leading-relaxed">
                    From pay-per-minute video calls to paid attachments and interactive toys,
                    Linkstackz maximizes your income potential.
                </p>
            </div>

            <div className="mwte-slides-container w-full h-full relative">
                <div
                    ref={slideContainerRef}
                    className="mwte-slides-inner-wrapper flex w-full h-full"
                    style={{
                        transform: `translateX(${-currentSlideIndex * 100}%)`,
                        transition: `transform ${SLIDE_TRANSITION_DURATION / 1000}s ease-in-out`
                    }}
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

                {/* Horizontalna navigacija (tačkice) */}
                <div className="mwte-slide-dots absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, idx) => (
                        <span
                            key={`dot-${idx}`}
                            className={`mwte-dot w-3 h-3 rounded-full bg-white cursor-pointer ${idx === currentSlideIndex ? 'active' : 'opacity-50'}`}
                            onClick={() => setCurrentSlideIndex(idx)} // Ovde mozete direktno setCurrentSlideIndex jer goToSlide nije u direktnoj vezi
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default MoreWaysToEarn;