import React from 'react';

const Slide1 = ({ isActive, isTransitioning, progress, easeInOutQuart }) => {
  return (
    <div
      className="relative w-full h-full"
      style={{
        opacity: isTransitioning ? 1 - easeInOutQuart(progress) : 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2,
        transform: isTransitioning 
          ? `translateX(${-easeInOutQuart(progress) * 100}%)` 
          : 'translateX(0%)',
        transition: 'none',
      }}
    >
      {/* Slika sa leve strane - absolute pozicionirana */}
      <div className="hidden md:block absolute left-0 top-[-40%] z-10">
        <img
          src="/images/more-ways-to-earn/iphone.png"
          alt="Video Call Feature"
          className="object-cover rounded-[30px] xl:h-[806px] md:h-[600px] h-[505px] animate-video-call-float mwte-image-animate"
        />
        <img
          src="/images/more-ways-to-earn/video-call.png"
          alt="Video Call Feature"
          className="absolute left-[10%] top-[40%] w-[100%] object-cover rounded-[30px] animate-video-call-float mwte-image-animate"
        />
      </div>
      
      {/* Div sa tekstom sa desne strane */}
      <div className="md:ml-[650px] w-full md:w-auto">
        <div className="max-w-[890px] h-[400px] md:h-[500px] relative corners z-0">
          <div className="relative z-10 rounded-tl-[100px] md:rounded-tl-[150px] rounded-br-[100px] md:rounded-br-[150px] p-10 md:p-20 bg-[#202020b3] backdrop-blur-[7px] h-full flex flex-col justify-center">
            {/* Ikonica */}
            <div className="text-pink-500 text-2xl md:text-4xl h-[60px] md:h-[82px] animate-pulse">
              <img
                src="/images/more-ways-to-earn/3d-clock.png"
                alt="3d-clock"
                className="p-3 md:p-5"
              />
            </div>
            {/* Naslov */}
            <h3 className="text-white text-2xl md:text-4xl font-gilroy capitalize leading-[50px] md:leading-[70px] font-[1000]">
              Pay-Per-Minute <span className="text-[#E91E63]">Video Call</span>
            </h3>
            {/* Opis */}
            <p className="text-white text-base md:text-lg font-bold font-gilroy capitalize leading-relaxed md:leading-loose">
              Connect with your fans in real-time through live video calls and charge by the minute. This feature allows you to set your rate and engage directly with fans, providing them with a personalized experience while you earn.
            </p>
            {/* Dugme */}
            <button className="mt-[10px] md:mt-[15px] items-center bg-[#E91E63] text-white px-[20px] md:px-[25px] py-[8px] md:py-[10px] rounded-[25px] text-xs md:text-sm font-bold font-gilroy capitalize flex hover:bg-[#C2185B] transition-colors duration-300">
              <img
                src="/icons/become-a-creator-icon.svg"
                alt="Become a creator"
                className="my-1 md:my-2 mr-[8px] md:mr-[10px] w-5 h-5 md:w-6 md:h-6"
              />
              Become a creator
            </button>
          </div>
        </div>
      </div>

      {/* Slika za mobile/tablet - ispod div-a */}
      <div className="md:hidden mt-10 w-full flex justify-center">
        <img
          src="/images/more-ways-to-earn/iphone.png"
          alt="Video Call Feature"
          className="w-auto h-[505px] object-cover rounded-[30px] animate-video-call-float"
        />
      </div>
    </div>
  );
};

export default Slide1; 