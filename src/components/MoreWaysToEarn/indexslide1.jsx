// src/components/MoreWaysToEarnSlide1.jsx
import React from 'react';

const MoreWaysToEarnSlide1 = () => {
  return (
    // Dodajte klase za animaciju unutar slajda, koje ce ciljati animations.css
    <div className="mwte-slide-content flex flex-col-reverse lg:flex-row md:mx-auto 3xl:max-w-[1670px] 2xl:max-w-[1300px] xl:max-w-[1200px] md:max-w-[900px] mwte-slide">
      {/* Left image section */}
      <div className="lg:w-1/3 w-full flex justify-center items-center">
        <div className="relative absolute md:relative flex-shrink-0
                        md:w-[350px] xl:w-[500px] h-[585px] xl:h-[850px]
                        lg:top-[-15%] top-[-80px] lg:left-[-20%]">
          <img
            src="/images/more-ways-to-earn/iphone.png"
            alt="iPhone"
            className="h-full object-cover rounded-[30px] mwte-image-animate" // Dodata klasa za CSS animaciju
          />
          <img
            src="/images/more-ways-to-earn/video-call.png"
            alt="Overlay"
            className="absolute left-[10%] top-[40%] object-cover rounded-[30px] mwte-overlay-animate" // Dodata klasa za CSS animaciju
          />
        </div>
      </div>

      {/* Right content box */}
      <div className="lg:w-2/3 w-full flex items-start lg:mt-[85px] mt-[25px]">
        <div className="flex-1 corners mwte-content-box-animate"> {/* Dodata klasa za CSS animaciju */}
          <div className="w-full xl:h-[450px]
                          bg-[#202020b3] backdrop-blur-[7px]
                          rounded-tl-[60px] rounded-br-[60px]
                          sm:rounded-tl-[80px] sm:rounded-br-[80px]
                          lg:rounded-tl-[150px] lg:rounded-br-[150px]
                          px-[19px] pr-[11px] pt-[31px] pb-[12px]
                          sm:p-10 lg:p-16 flex flex-col justify-center">

            <div>
              <img
                src="/images/more-ways-to-earn/3d-clock.png"
                alt="3d-clock"
                className="w-[50px] lg:w-[70px]
                           absolute lg:relative
                           top-[-11%] lg:top-0
                           left-0 pb-0 md:pb-2 mwte-icon-animate" // Dodata klasa za CSS animaciju
              />
            </div>

            <h3 className="mwte-slide-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl
                           font-gilroy font-[1000] capitalize text-white
                           leading-tight lg:leading-loose mb-[10px] lg:mb-4">
              Pay-Per-Minute <span className="text-[#E91E63]">Video Call</span>
            </h3>

            <p className="mwte-slide-paragraph text-xs md:text-base md:text-lg font-bold
                          font-gilroy capitalize text-white
                          leading-relaxed mb-[10px] lg:mb-6">
              Connect with your fans in real-time through live video calls and charge by the minute.
              This feature allows you to set your rate and engage directly with fans, providing them
              with a personalized experience while you earn.
            </p>

            <button className="flex items-center w-fit
                               bg-[#E91E63] hover:bg-[#C2185B] transition-colors duration-300
                               text-white px-[20px] sm:px-[25px] py-[8px] sm:py-[10px]
                               rounded-[25px] text-xs sm:text-sm font-bold font-gilroy capitalize">
              <img
                src="/icons/become-a-creator-icon.svg"
                alt="Become a creator"
                className="w-5 h-5 sm:w-6 sm:h-6 mr-[8px] my-1"
              />
              Become a creator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreWaysToEarnSlide1;