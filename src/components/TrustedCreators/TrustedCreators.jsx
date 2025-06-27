// TrustedCreators.jsx - popravljena verzija sa scroll animacijom
import React, { useEffect, useRef, useState, useCallback } from 'react';
import WaveCircleBox from "../Common/wave-circle-box";
import BgBounceAnimate from "../Common/bg-bounce-animate";

const TcSliderList = [
    "10.png", "11.png", "12.png", "13.png", "14.png", "15.png",
    "16.png", "17.png", "18.png", "19.png", "20.png", "21.png",
    "22.png", "23.png", "24.png", "25.png", "26.png", "27.png",
];

const TrustedCreators = () => {
    const sectionRef = useRef(null);
    const placeholderRef = useRef(null);
    const titleContainerRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const [scrollProgressTc, setScrollProgressTc] = useState(0);
    const [shouldTransition, setShouldTransition] = useState(false);
    const [globalScrollY, setGlobalScrollY] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    // Threshold za animaciju - brže kao hero sekcija
    const TRANSITION_THRESHOLD = 0.05; // 10% scroll progress-a (ranije)
    const TRANSITION_COMPLETE = 0.6; // Kompletno na 60% (brže)

    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setGlobalScrollY(currentScrollY);

        if (placeholderRef.current) {
            // Koristimo placeholder div za kalkulaciju scroll progress-a
            const placeholderTop = placeholderRef.current.getBoundingClientRect().top;
            const placeholderHeight = placeholderRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;

            // Normalni scroll progress za sekciju
            let progress = -placeholderTop / (placeholderHeight - viewportHeight);
            progress = Math.max(0, Math.min(1, progress));
            setScrollProgressTc(progress);

            // Aktiviraj transition kada je sekcija dovoljno skrolovana
            if (progress >= TRANSITION_THRESHOLD) {
                setShouldTransition(true);
                setIsInitialized(true);
            } else {
                setShouldTransition(false);
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

    // Scroll animacija za TrustedCreators
    useEffect(() => {
        if (shouldTransition && scrollProgressTc >= TRANSITION_THRESHOLD) {
            // Izračunaj transition progress (0 do 1) između threshold-a i kompletnog
            const transitionProgress = Math.min(
                (scrollProgressTc - TRANSITION_THRESHOLD) / (TRANSITION_COMPLETE - TRANSITION_THRESHOLD), 
                1
            );

            // Smooth easing funkcija
            const easeInOutCubic = (t) => {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            };
            
            const easedProgress = easeInOutCubic(transitionProgress);

            // Naslov se pomera na gore
            if (titleContainerRef.current) {
                const translateY = -easedProgress * 200; // Pomeri na gore za 200px
                const opacity = 1 - easedProgress; // Fade out
                titleContainerRef.current.style.transform = `translateY(${translateY}px)`;
                titleContainerRef.current.style.opacity = opacity;
                titleContainerRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
            }

            // Carousel se pomera na dole
            if (sliderWrapperRef.current) {
                const translateY = easedProgress * 300; // Pomeri na dole za 300px
                const opacity = 1 - easedProgress; // Fade out
                sliderWrapperRef.current.style.transform = `translateY(${translateY}px)`;
                sliderWrapperRef.current.style.opacity = opacity;
                sliderWrapperRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out';
            }

            // Pokaži MoreWaysToEarn sekciju kada je TrustedCreators napola nestao
            if (transitionProgress > 0.2) { // Pokretanje ranije
                triggerMoreWaysToEarnAnimation((transitionProgress - 0.2) / 0.8); // 0.2-1 mapira na 0-1
            }
        } else {
            // Reset animacije kada nema transition-a - smooth reverz
            if (titleContainerRef.current) {
                titleContainerRef.current.style.transform = 'translateY(0px)';
                titleContainerRef.current.style.opacity = '1';
                titleContainerRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
            }
            if (sliderWrapperRef.current) {
                sliderWrapperRef.current.style.transform = 'translateY(0px)';
                sliderWrapperRef.current.style.opacity = '1';
                sliderWrapperRef.current.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out';
            }
            
            // Sakrij MoreWaysToEarn sekciju - smooth reverz
            const moreWaysSection = document.getElementById('more-ways-section');
            if (moreWaysSection) {
                moreWaysSection.style.opacity = '0';
                moreWaysSection.style.transform = 'translateY(100px)';
                moreWaysSection.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
                moreWaysSection.style.zIndex = '1';
            }
        }
    }, [shouldTransition, scrollProgressTc]);

    const triggerMoreWaysToEarnAnimation = (progress) => {
        // Animiraj MoreWaysToEarn sekciju - ulazi odozdo
        const moreWaysSection = document.getElementById('more-ways-section');
        if (moreWaysSection) {
            // Smooth easing za MoreWaysToEarn
            const easeOutCubic = (t) => {
                return 1 - Math.pow(1 - t, 3);
            };
            
            const easedProgress = easeOutCubic(progress);

            // Pokaži MoreWaysToEarn sekciju
            moreWaysSection.style.opacity = easedProgress;
            moreWaysSection.style.transform = `translateY(${(1 - easedProgress) * 100}px)`; // Ulazi odozdo
            moreWaysSection.style.zIndex = '20'; // Postavi iznad TrustedCreators
            moreWaysSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        }
    };

    return (
        <>
            {/* Placeholder div koji zauzima prostor i omogućava scroll kalkulaciju */}
            <div 
                ref={placeholderRef}
                className="trusted-creators-placeholder" 
                style={{ 
                    height: '100vh', // Dupla visina da bi imalo više prostora za scroll animaciju
                    width: '100%'
                }}
            />
            
            {/* Fixed pozicionirana TrustedCreators sekcija */}
            <div
                className={`trusted-creators overflow-hidden py-[4rem] relative`}
                id="section2"
                ref={sectionRef}
                style={{ 
                    opacity: isInitialized ? 1 : 0,
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    pointerEvents: isInitialized ? 'auto' : 'none',
                    transition: 'opacity 0.7s ease-out',
                }}
            >
                <BgBounceAnimate />

                <div
                    className="text-center mb-[4rem]"
                    ref={titleContainerRef}
                    data-title-container
                    style={{ 
                        transform: 'translateY(0px)', 
                        opacity: 1 
                    }}
                >
                    <h2 className="text-white text-5xl font-gilroy capitalize leading-[70px] font-[1000]">
                        Trusted By The World&apos;s Biggest{" "}
                        <span className="text-[#E91E63]">Creators</span>
                    </h2>
                    <p className="max-w-[766px] text-white text-lg font-bold font-gilroy capitalize leading-loose font-[700] mx-auto mt-4">
                        Ladies, it&apos;s time to take control and start earning like the boss you are.
                        Linkstackz isn&apos;t just another link site out there — it&apos;s your gateway to
                        finding out which fans are really about that life before they subscribe to your other platforms.
                    </p>
                </div>

                <div
                    className="tc-slider-wrapper relative py-[7rem] z-[-1]"
                    ref={sliderWrapperRef}
                    data-slider-wrapper
                    style={{ 
                        transform: 'translateY(0px)', 
                        opacity: 1 
                    }}
                >
                    <div className="tc-slider-list">
                        {TcSliderList.concat(TcSliderList).map((sItem, index) => (
                            <div key={`tcs-index-${index}`} className="tc-slider-item">
                                <img
                                    src={`/images/trusted-creators/${sItem}`}
                                    className="tcs-img-slide rounded-[30px]"
                                    style={{ width: '280px', height: '420px', objectFit: 'fill', display: 'block' }}
                                    alt={`slide-${index}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TrustedCreators;