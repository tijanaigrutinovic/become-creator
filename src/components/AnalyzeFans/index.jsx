import React, { useRef } from "react";
import '../../css/analyze-fans.css';
import BgBounceAnimate from "../Common/BgBounceAnimate";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getImagePath } from "../../utils/imagePath";

const AnalyzeFans = ({ isActive, transitionDirection, id }) => {
  const sectionRef = useRef();
  useScrollAnimation(sectionRef, isActive, transitionDirection);

  return (
    <div
      id={id}
      ref={sectionRef}
      className="h-[100vh] w-full 3xl:pt-[290px] xl:pt-[220px] lg:px-0 px-[15px] pt-[85px] analyze-fans relative"
    >
      <BgBounceAnimate />

      <div className="af-wraper flex flex-col lg:flex-row md:mx-auto 3xl:max-w-[1670px] 2xl:max-w-[1300px] xl:max-w-[1200px] md:max-w-[900px]">
        <div className="xl:w-1/2 w-full flex">
          <div>
            <div className="transition-all duration-700 ai-wraper max-w-[729px] lg:p-[70px_100px] p-[34px_40px] rounded-[200px_0px] flex flex-col gap-1 relative z-2 xl:w-full xl:max-w-[729px] xl:p-[50px_60px] xl:rounded-[100px_0px] rounded-[60px_0px]">
              {isActive && (
                <div className="analyze-fans-anim absolute inset-0 z-0 pointer-events-none" />
              )}
              <div className="analyze-content">
                <h2 className="pb-1 ai-heading 3xl:text-5xl lg:text-5xl text-2xl font-bold text-white md:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">
                  Analyze your <span className="text-[#E91E63]">Fans</span>, keep them engaged
                </h2>
                <p className="pb-1 ai-paragraph text-white 3xl:text-lg lg:text-base text-sm font-bold font-gilroy capitalize leading-loose">
                  Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.
                </p>
                <div className="cp-buttons max-w-[500px] flex">
                  <button className="relative flex items-center w-fit bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize overflow-hidden group animated-button whitespace-nowrap">
                    <div className="circle circle1"></div>
                    <div className="circle circle2"></div>
                    <div className="circle circle3"></div>
                    <div className="relative z-10 flex items-center">
                      <img
                        src={getImagePath("/icons/become-a-creator-icon.svg")}
                        alt="Become a creator"
                        className="w-4 h-4 sm:w-6 sm:h-6 mr-[8px] my-1"
                      />
                      Become a creator
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 w-full flex">
          <div className="analyze-statistics w-1/2 xl:w-full relative">
            <div className="test card-list relative z-2 xl:scale-85 lg:h-[500px] lg:scale-75 scale-150 md:h-[450px] md:scale-65 sm:h-[400px] sm:scale-80">
              <div className="card-item absolute top-[1rem] left-[3rem] z-4 w-[285px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
                <img
                  src={getImagePath("/images/analyze-fans/card-1.png")}
                  width={285}
                  height={210}
                  alt="card-1"
                  className="w-full h-auto object-contain transition-all"
                />
              </div>
              <div className="card-item absolute top-[1rem] left-[22rem] z-4 w-[285px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
                <img
                  src={getImagePath("/images/analyze-fans/card-2.png")}
                  width={285}
                  height={210}
                  alt="card-2"
                  className="w-full h-auto object-contain transition-all"
                />
              </div>
              <div className="card-item absolute top-[11.5rem] left-[4rem] z-3 w-[399px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
                <img
                  src={getImagePath("/images/analyze-fans/card-3.png")}
                  width={399}
                  height={412}
                  alt="card-3"
                  className="w-full h-auto object-contain transition-all"
                />
              </div>
              <div className="card-item absolute top-[12rem] left-[26.4rem] z-4 w-[366px] rounded-[4rem] backdrop-blur-[5px] skew-x-[12deg] transition-all animate-afTopLayer">
                <img
                  src={getImagePath("/images/analyze-fans/card-4.png")}
                  width={366}
                  height={191}
                  alt="card-4"
                  className="w-[70%] h-auto object-contain transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyzeFans;
