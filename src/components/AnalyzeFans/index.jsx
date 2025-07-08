import React, { useRef, useEffect, useCallback } from "react";
import '../../css/analyze-fans.css';
import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";
import useInView from "../../hooks/seInView";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';


const AnalyzeFans = ({ isActive, transitionDirection, onNextSectionTrigger, id, }) => { // Prima isActive, id, nextSectionId props
  // Dodati triggerNextSectionAnimation u dependencies array
  const sectionRef = useRef();
  useScrollAnimation(sectionRef, isActive, transitionDirection);

  return (
    
    <section 
    id={id}
      ref={sectionRef}
    className="snap-start h-[100vh] w-full lg:py-[80px] lg:px-0 px-[15px] pt-[80px] analyze-fans relative">
    <div className="af-wraper flex flex-col lg:flex-row md:mx-auto 3xl:max-w-[1670px] 2xl:max-w-[1300px] xl:max-w-[1200px] md:max-w-[900px]">
      {/* Left image section */}
      <div className="xl:w-1/2 w-full flex justify-center items-center">
      <div className="">
      
      <div className="transition-all duration-700 ai-wraper max-w-[729px] lg:p-[70px_100px] p-[34px_40px] rounded-[200px_0px] bg-[#20202080] backdrop-blur-[7.5px] flex flex-col gap-1 relative z-2 xl:w-full xl:max-w-[729px] xl:p-[50px_60px] xl:rounded-[100px_0px] rounded-[60px_0px]"
          >
          
          {/* Tekstualni sadržaj u jednom div-u */}
          <div className="analyze-content">
            <h2 className="lg:text-5xl text-2xl font-bold text-white md:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">
              Analyze your <span className="text-[#E91E63]">Fans</span>, keep them engaged
            </h2>
          
            <p className="text-white lg:text-lg text-sm font-bold font-gilroy capitalize leading-loose">
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
        </div>
      </div>

      {/* Right content box */}
      <div className="lg:w-1/2 w-full flex items-start lg:mt-[85px] mt-[5px]">
      <div className="analyze-statistics w-1/2 xl:w-full relative">
          <div className="test card-list relative z-2 xl:scale-85 xl:mt-8 lg:h-[500px] lg:scale-75 scale-150 md:h-[450px] md:scale-65 sm:h-[400px] sm:scale-80">
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
      </div>
      <WaveCircleBox style={{ width: '150%', top: '50%', left: '33%' }} />
      <BgBounceAnimate/>

    </div>
</section>
    
   
  );
};

export default AnalyzeFans;