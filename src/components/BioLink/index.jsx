import React, { useRef } from "react";
import BioCenter from "./BioCenter";
import BioLeft from "./BioLeft";
import BioRight from "./BioRight";
import BgBounceAnimate from "../Common/BgBounceAnimate";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

const BioLink = ({ isActive, transitionDirection, id }) => {
  const sectionRef = useRef();
  useScrollAnimation(sectionRef, isActive, transitionDirection);

  return (
    <div id={id} ref={sectionRef} className="w-full bio-link h-screen">
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
    </div>
  );
};

export default BioLink;
