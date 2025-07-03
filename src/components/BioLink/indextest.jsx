import BioCenter from "./BioCenter";
import BioLeft from "./BioLeft";
import BioRight from "./BioRight";
import useInView from "../../hooks/seInView";


const BioLinkTest = () => {
  const [ref, isVisible] = useInView(0.1); // ← threshold 0.1

    const triggerNextSectionAnimation = (progress) => {
      const nextSection = document.getElementById('section7');
      if (nextSection) {
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);
        nextSection.style.opacity = easedProgress;
        nextSection.style.transform = `translateY(${(1 - easedProgress) * 100}px)`;
        nextSection.style.zIndex = '30';
        nextSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      }
    };
  
    return (
        <section 
        ref={ref}
        className="snap-start bio-link h-screen">
        <div className="flex flex-col lg:flex-row items-center justify-center h-full relative z-10 bl-wraper">
        {/* Div 2 - uvek na vrhu, najveći z-index */}
        <div className="z-30 order-1 lg:order-2">
            <BioCenter />
        </div>
      
        {/* Div 1 - ispod, manji z-index */}
        <div className="z-10 order-2 lg:order-1">
            <BioLeft />
        </div>
      
        {/* Div 3 - ispod, manji z-index */}
        <div className="z-10 order-3 lg:order-3">
            <BioRight />
        </div>
      </div>
      </section>
    );
  }
  
  export default BioLinkTest;
  