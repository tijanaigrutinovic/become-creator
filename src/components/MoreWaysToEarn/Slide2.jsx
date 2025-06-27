import React from 'react';

const Slide2 = ({ isActive, isTransitioning, progress, easeInOutQuart }) => {
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
      <div className="hidden lg:block absolute left-0 top-0 w-[589px] h-[782px] z-10">
        <img
          src="/images/more-ways-to-earn/video-call.png"
          alt="Locked Content Feature"
          className="w-full h-full object-cover rounded-[30px] animate-locked-content-float"
        />
      </div>
      
      {/* Div sa tekstom sa desne strane */}
      <div className="lg:ml-[650px] w-full lg:w-auto">
        <div className="max-w-[890px] h-[500px] relative corners z-0">
          <div className="relative z-10 rounded-tl-[150px] rounded-br-[150px] p-20 bg-[#202020b3] backdrop-blur-[7px] h-full flex flex-col justify-center">
            {/* Ikonica */}
            <div className="text-pink-500 text-4xl h-[82px] animate-bounce">
              <img
                src="/images/more-ways-to-earn/3d-clock.png"
                alt="3d-clock"
                className="p-5"
              />
            </div>
            {/* Naslov */}
            <h3 className="text-white text-4xl font-gilroy capitalize leading-[70px] font-[1000]">
              Locked <span className="text-[#E91E63]">Content</span> (Pay-to-View)
            </h3>
            {/* Opis */}
            <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
              Sell exclusive photos, videos, and posts that fans must pay to unlock. Sell exclusive photos, videos, and posts that fans must pay to unlock.
            </p>
            {/* Dugme */}
            <button className="mt-[15px] items-center bg-[#E91E63] text-white px-[25px] py-[10px] rounded-[25px] text-sm font-bold font-gilroy capitalize flex hover:bg-[#C2185B] transition-colors duration-300">
              <img
                src="/icons/become-a-creator-icon.svg"
                alt="Become a creator"
                className="my-2 mr-[10px] w-6 h-6"
              />
              Become a creator
            </button>
          </div>
        </div>
      </div>

      {/* Slika za mobile/tablet - ispod div-a */}
      <div className="lg:hidden mt-10 w-full">
        <img
          src="/images/more-ways-to-earn/video-call.png"
          alt="Locked Content Feature"
          className="w-full h-auto object-cover rounded-[30px] animate-locked-content-float"
        />
      </div>
    </div>
  );
};

export default Slide2; 