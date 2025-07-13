import React from "react";
import { getImagePath } from "../../utils/imagePath";

const BioCenter = ({ isActive }) => {
  return (
    <div
      className="bl-col-center relative w-full 3xl:w-[678px] text-center z-10 mt-[120px] transition-all duration-700"
    >
      {/* POZADINSKI DIV - animiraj samo kada je sekcija aktivna */}
      {isActive && (
        <div
          className="section-bg-anim bio-link-anim absolute inset-0 z-0 pointer-events-none"
        />
      )}

      {/* Sadržaj */}
      <h2 className="lg:mb-6 mb-[10px] 3xl:text-5xl xl:text-4xl text-2xl font-bold text-center text-white lg:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">
        Fully customizable
        <br />
        <span className="text-[#E91E63]">bio link</span>
      </h2>

      <p className="3xl:mb-6 mb-[10px] text-white 3xl:text-lg xl:text-base text-xs font-bold font-gilroy capitalize leading-loose">
        Create a bio link that's uniquely yours with fully customizable options.
        Personalize your profile to reflect your style and connect all your content in one place
      </p>

      <div className="flex items-center justify-center 3xl:py-[24px] lg:py-[16px]">
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

      <div className="i-phone-frame" style={{ margin: "0 auto", position: "relative" }}>
        {/* Ljubičasti video u centralnom delu frame-a */}
        <div className="bio-center-scroll-frame-inside">
          <video
            src={getImagePath("/images/bio-link/bio-center/video.webm")}
            className=""
            autoPlay
            loop
            muted
            playsInline
            style={{ objectFit: "cover", borderRadius: "65px", padding: "5px" }}
          />
        </div>
        <img
          src={getImagePath("/images/bio-link/bio-center/iphone.svg")}
          className="frame-iphone"
          width={443}
          height={414}
          alt="iphone-frame"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 2, pointerEvents: "none" }}
        />
      </div>

      {/* Pozadinske zvezde - ako želiš, možeš i njih animirati zasebno */}
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

      {/* Dodaj ovde ako želiš i animacije pozadinskih zvezda */}
    </div>
  );
};

export default BioCenter;
