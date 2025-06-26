import React from "react";
import '../../css/analyze-fans.css';
/**
 * NOTE: Custom keyframes (afTopLayer, afBounceLightBlue, afBounceLightRed, af-rotate-wave-circle) i animacije ostaju u CSS-u.
 * Sve ostalo je prebačeno u Tailwind klase.
 */
import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";
import SnapScrollSection from '../Common/SnapScrollSection';

const AnalyzeFans = () => {
  const triggerNextSectionAnimation = (progress) => {
    const nextSection = document.getElementById('section6');
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
      id="section5"
      nextSectionId="section6"
      onNextSectionTrigger={triggerNextSectionAnimation}
      className="analyze-fans w-full relative px-5 overflow-hidden py-16"
    >
      <BgBounceAnimate />
      <div className="af-wraper flex items-start gap-4 relative z-2 xl:items-center">
        <div className="analyze-info w-1/2 xl:w-full">
          <div className="ai-wraper max-w-[729px] p-[70px_100px] rounded-[200px_0px] bg-[#20202080] backdrop-blur-[7.5px] flex flex-col gap-1 relative z-2 xl:w-full xl:max-w-[729px] xl:p-[50px_60px] xl:rounded-[100px_0px] md:p-[23px_13px] md:rounded-[60px_0px]">
            <h2 className="text-5xl font-bold text-white leading-[70px] font-[1000] font-gilroy capitalize">Analyze your <span className="text-[#E91E63]">Fans</span>, keep them engagaed</h2>
            <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
              Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.
            </p>
            <div className="mt-3 flex items-center justify-start">
              <button className="pointer relative items-center bg-[#E91E63] text-white px-[25px] py-[10px] rounded-[25px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group">
                <div className="absolute inset-0 z-0">
                  <span className="circle-animation circle-1 bg-[#E91E63]/21"></span>
                  <span className="circle-animation circle-2 bg-[#E91E63]/21"></span>
                  <span className="circle-animation circle-3 bg-[#E91E63]/21"></span>
                </div>
                <div className="relative z-10 flex items-center">
                  <img
                    src="/icons/become-a-creator-icon.svg"
                    alt="Become a creator"
                    className="my-2 mr-[10px] w-6 h-6"
                  />
                  Become a creator
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="analyze-statistics w-1/2 xl:w-full relative">
          <div className="card-list relative z-2 h-[700px] 2xl:h-[600px] xl:h-[550px] xl:scale-85 xl:mt-8 lg:h-[500px] lg:scale-75 md:h-[450px] md:scale-65 sm:h-[400px] sm:scale-80">
            <div className="card-item absolute top-[1rem] left-[3rem] z-4 w-[285px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
              <img
                src="/images/analyze-fans/card-1.png"
                width={285}
                height={210}
                alt="card-1"
                className="w-full h-auto object-contain transition-all"
              />
            </div>
            <div className="card-item absolute top-[1rem] left-[22rem] z-4 w-[285px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
              <img
                src="/images/analyze-fans/card-2.png"
                width={285}
                height={210}
                alt="card-2"
                className="w-full h-auto object-contain transition-all"
              />
            </div>
            <div className="card-item absolute top-[11.5rem] left-[4rem] z-3 w-[399px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
              <img
                src="/images/analyze-fans/card-3.png"
                width={399}
                height={412}
                alt="card-3"
                className="w-full h-auto object-contain transition-all"
              />
            </div>
            <div className="card-item absolute top-[12rem] left-[26.4rem] z-4 w-[366px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
              <img
                src="/images/analyze-fans/card-4.png"
                width={366}
                height={191}
                alt="card-4"
                className="w-[70%] h-auto object-contain transition-all"
              />
            </div>
          </div>
        </div>
        <WaveCircleBox />
      </div>
    </SnapScrollSection>
  );
};

export default AnalyzeFans; 