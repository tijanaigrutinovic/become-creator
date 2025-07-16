import React from 'react';
import { getImagePath } from "../../utils/imagePath";

const MoreWaysToEarnSlide1 = () => {
  return (
    <div className="mwte-slide-content flex flex-col-reverse lg:flex-row md:mx-auto 3xl:max-w-[1670px] 2xl:max-w-[1300px] xl:max-w-[1200px] md:max-w-[900px] mwte-slide">
      <div className="lg:w-1/3 w-full flex justify-center items-center">
        <div className="relative absolute md:relative flex-shrink-0 w-[350px] xl:w-[500px] lg:h-[585px] h-[450px] 3xl:h-[850px] lg:top-[-20%] top-[-140px] lg:left-[-20%]">
          <img
            src={getImagePath("/images/more-ways-to-earn/iphone.png")}
            alt="iPhone"
            className="h-full object-cover rounded-[30px] mwte-image-animate"
          />
          <img
            src={getImagePath("/images/more-ways-to-earn/video-call.png")}
            alt="Overlay"
            className="absolute left-[10%] top-[40%] object-cover rounded-[30px] mwte-overlay-animate lg:w-[100%] w-[90%]"
          />
        </div>
      </div>

      <div className="lg:w-2/3 w-full flex items-start 3xl:mt-[85px] lg:mt-[65px] mt-[25px] md:px-0 px-[20px]">
        <div className="flex-1 corners mwte-content-box-animate max-w-[850px]">
          <div className="h-auto w-full max-h-[450px] bg-[#202020b3] backdrop-blur-[7px] rounded-tl-[60px] rounded-br-[60px] sm:rounded-tl-[80px] sm:rounded-br-[80px] lg:rounded-tl-[150px] lg:rounded-br-[150px] px-[19px] pr-[11px] pt-[31px] pb-[12px] sm:p-10 lg:p-16 flex flex-col justify-center">
            <div>
              <img
                src={getImagePath("/images/more-ways-to-earn/3d-clock.png")}
                alt="3d-clock"
                className="md:w-[50px] w-[30px] 3xl:w-[70px] absolute lg:relative top-[-2%] md:top-0 left-0 pb-0 md:pb-2 mwte-icon-animate"
              />
            </div>

            <h3 className="mwte-slide-heading text-xl lg:text-3xl md:text-2xl 3xl:text-4xl font-gilroy font-[1000] capitalize text-white leading-tight 3xl:leading-loose mb-[8px] lg:mb-4">
              Pay-Per-Minute <span className="text-[#E91E63]">Video Call</span>
            </h3>

            <p className="mwte-slide-paragraph text-xs 3xl:text-base md:text-lg font-bold font-gilroy capitalize text-white leading-relaxed mb-[10px] lg:mb-6">
              Connect with your fans in real-time through live video calls and charge by the minute.
              This feature allows you to set your rate and engage directly with fans, providing them
              with a personalized experience while you earn.
            </p>

            <div className="cp-buttons max-w-[500px] flex">
              <button className="relative flex items-center w-fit items-center w-[100%] bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group animated-button whitespace-nowrap">
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
  );
};

export default MoreWaysToEarnSlide1;
