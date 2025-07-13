import React from "react";
import WaveCircleBox from "../Common/wave-circle-box";
import BioCenter from "./BioCenter";
import BioLeft from "./BioLeft";
import BioRight from "./BioRight";
import '../../css/bio-link.css';
import SnapScrollSection from '../Common/SnapScrollSection';
import { getImagePath } from "../../utils/imagePath";

const BioLink = () => {
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
    <SnapScrollSection
      id="section6"
      nextSectionId="section7"
      onNextSectionTrigger={triggerNextSectionAnimation}
      className="bio-link h-screen relative"
    >
      <div className="bl-wraper flex flex-col lg:flex-row items-center justify-center h-full px-4 relative z-10">
        <BioLeft />
        <BioCenter />
        <BioRight />
      </div>
      <WaveCircleBox style={{ width: '100%', top: 'unset', left: '33%' }} />
    </SnapScrollSection>
  );
}

export default BioLink;
