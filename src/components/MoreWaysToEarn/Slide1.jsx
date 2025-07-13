import React from 'react';
import { getImagePath } from "../../utils/imagePath";

const Slide1 = ({ isActive, isTransitioning, progress, easeInOutQuart }) => {
  return (
    <div
      className="relative h-full"
      style={{
        opacity: isTransitioning ? 1 - easeInOutQuart(progress) : 1,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        transform: isTransitioning
          ? `translateX(${-easeInOutQuart(progress) * 100}%)`
          : 'translateX(0%)',
        transition: 'none',
      }}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-[1400px] px-4 sm:px-6 lg:px-12 xl:px-20 mx-auto lg:gap-16">
        
        {/* Slika - desktop only */}
        <div className="hidden lg:block relative w-[300px] md:w-[350px] xl:w-[400px] h-[500px] xl:h-[600px] flex-shrink-0">
          <img
            src={getImagePath("/images/more-ways-to-earn/iphone.png")}
            alt="iPhone"
            className=" h-full object-cover rounded-[30px] mwte-image-animate"
          />
          <img
            src={getImagePath("/images/more-ways-to-earn/video-call.png")}
            alt="Overlay"
            className="absolute left-[10%] top-[40%] object-cover rounded-[30px]"
          />
        </div>

        {/* Kartica sa tekstom */}
        <div className="flex-1 corners">
          <div className="bg-[#202020b3] backdrop-blur-[7px] rounded-tl-[60px] rounded-br-[60px] sm:rounded-tl-[80px] sm:rounded-br-[80px] lg:rounded-tl-[150px] lg:rounded-br-[150px] p-6 sm:p-10 lg:p-16 flex flex-col justify-center">
            <div className="h-[50px] sm:h-[60px] mb-4 animate-pulse">
              <img
                src={getImagePath("/images/more-ways-to-earn/3d-clock.png")}
                alt="3d-clock"
                className="w-[40px] sm:w-[50px] p-2"
              />
            </div>

            <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-gilroy capitalize font-[1000] leading-snug mb-4">
              Pay-Per-Minute <span className="text-[#E91E63]">Video Call</span>
            </h3>

            <p className="text-white text-sm sm:text-base md:text-lg font-bold font-gilroy capitalize leading-relaxed mb-6">
              Connect with your fans in real-time through live video calls and charge by the minute. This feature allows you to set your rate and engage directly with fans, providing them with a personalized experience while you earn.
            </p>

            <button className="items-center bg-[#E91E63] text-white px-[20px] sm:px-[25px] py-[8px] sm:py-[10px] rounded-[25px] text-xs sm:text-sm font-bold font-gilroy capitalize flex hover:bg-[#C2185B] transition-colors duration-300 w-fit">
              <img
                src={getImagePath("/icons/become-a-creator-icon.svg")}
                alt="Become a creator"
                className="my-1 mr-[8px] w-5 h-5 sm:w-6 sm:h-6 "
              />
              Become a creator
            </button>
          </div>
        </div>

        {/* Mobile slika ispod */}
        <div className="lg:hidden absolute top-[40%] z-[-10] max-w-md mx-auto">
          <img
            src={getImagePath("/images/more-ways-to-earn/iphone.png")}
            alt="iPhone"
            className=" h-auto object-cover rounded-[30px] mwte-image-animate h-[505px]"
          />
          <img
            src={getImagePath("/images/more-ways-to-earn/video-call.png")}
            alt="Overlay"
            className="absolute left-[10%] top-[40%] object-cover rounded-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide1;
