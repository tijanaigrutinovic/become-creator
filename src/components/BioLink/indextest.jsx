import React, { useRef, useEffect, useCallback } from "react";
import BioCenter from "./BioCenter";
import BioLeft from "./BioLeft";
import BioRight from "./BioRight";
import BgBounceAnimate from "../Common/bg-bounce-animate";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getImagePath } from "../../utils/imagePath";


const BioLinkTest = ({ isActive, transitionDirection, onNextSectionTrigger, id, }) => {
    const sectionRef = useRef();
    useScrollAnimation(sectionRef, isActive, transitionDirection);
  
    return (
        <section 
        id={id}
        ref={sectionRef}
        className="w-full bio-link h-screen">
        <BgBounceAnimate />

        <div className="flex flex-col lg:flex-row items-center justify-center h-full relative z-10 bl-wraper">
        <div className="z-30 order-1 lg:order-2">
            <BioCenter />
        </div>
      
        <div className="z-10 order-2 lg:order-1">
            <BioLeft />
        </div>
      
        <div className="z-10 order-3 lg:order-3">
            <BioRight />
        </div>
      </div>
      </section>
    );
  }
  
  export default BioLinkTest;
  