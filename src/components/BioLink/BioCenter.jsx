import React from "react";
import { getImagePath } from "../../utils/imagePath";

const BioCenter = ({ isActive }) => {
  return (
    <div className="bl-col-center relative w-full 3xl:w-[678px] text-center z-10 mt-[100px] transition-all duration-700 flex flex-col items-center">
      {isActive && (
        <div className="section-bg-anim bio-link-anim absolute inset-0 z-0"/>
      )}

      <div className="2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px] flex flex-col items-center z-40">
        <h2 className="2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px] lg:mb-5 mb-[10px] 2xl:text-5xl xl:text-4xl text-2xl font-bold text-center text-white lg:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">
          Fully customizable
          <br />
          <span className="text-[#E91E63]">bio link</span>
        </h2>


        <p className="2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px] 3xl:mb-6 mb-[10px] text-white 3xl:text-lg xl:text-base text-xs font-bold font-gilroy capitalize leading-loose">
          Create a bio link that's uniquely yours with fully customizable options.
          Personalize your profile to reflect your style and connect all your content in one place
        </p>

        <div className="flex items-center justify-center py-[16px] w-full z-999">
          <div className="cp-buttons flex justify-center">
            <a className="relative flex items-center w-fit bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize overflow-hidden group animated-button whitespace-nowrap pointer">
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
            </a>
          </div>
        </div>

        <div className="i-phone-frame mx-auto relative 2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px] flex justify-center">
          <div className="bio-center-scroll-frame-inside 2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px] flex justify-center">
            <video
              src={getImagePath("/images/bio-link/bio-center/video.webm")}
              className="object-cover rounded-[65px] p-[5px] 2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <img
            src={getImagePath("/images/bio-link/bio-center/iphone.svg")}
            className="frame-iphone absolute top-0 left-1/2 -translate-x-1/2 z-[2] 2xl:w-[437px] xl:w-[400px] md:w-[370px] w-[324px]"
            width={437}
            height={447}
            alt="iphone-frame"
          />
        </div>
      </div>

      <div
        className="bg-star-img1"
        style={{ position: "absolute", top: "28%", left: "0%", margin: "0 auto", zIndex: 3 }}
      >
        <img
          src={getImagePath("/images/bio-link/bio-center/bg-star.png")}
          width={802}
          height={481}
          alt="star-frame"
        />
      </div>

      <div
        className="bg-star-img2"
        style={{ position: "absolute", top: "28%", left: "0%", margin: "0 auto", zIndex: 3 }}
      >
        <img
          src={getImagePath("/images/bio-link/bio-center/bg-star.png")}
          width={802}
          height={481}
          alt="star-frame"
        />
      </div>
    </div>
  );
};

export default BioCenter;
