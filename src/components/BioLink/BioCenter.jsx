import React from "react";
import useInView from "../../hooks/seInView";


const BioCenter = () => {
  const [ref, isVisible] = useInView(0.05); // ← threshold 0.1

  return (
    <div 
    ref={ref}
      className={`bl-col-center w-full 3xl:w-[678px] text-center z-10 mt-[120px] transition-all duration-700 ${
            isVisible 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-[100px] translate-x-[-300px] opacity-1'
        }`}>
        <h2 className="lg:mb-6 mb-[10px] 3xl:text-5xl xl:text-4xl text-2xl font-bold text-center text-white lg:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">Fully customizable<br/><span className="text-[#E91E63]">bio link</span></h2>
        <p className="lg:mb-6 mb-[10px] text-white 3xl:text-lg xl:text-base text-xs font-bold font-gilroy capitalize leading-loose">
        Create a bio link that's uniquely yours with fully customizable options. Personalize your profile to reflect your style and connect all your content in one place
        </p>
      <div className="flex items-center justify-center">
      <button className="pointer relative items-center bg-[#E91E63] text-white px-[25px] py-[10px] mb-6 rounded-[25px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group">
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
      <div className="i-phone-frame" style={{margin: '0 auto', position: 'relative'}}>
        {/* Ljubičasti video u centralnom delu frame-a */}
        <div className="bio-center-scroll-frame-inside">
          <video
            src={"/images/bio-link/bio-center/video.webm"}
            className=""
            autoPlay
            loop
            muted
            playsInline
            style={{objectFit: 'cover', borderRadius: '65px', padding: '5px'}}
          />
        </div>
        <img
          src="/images/bio-link/bio-center/iphone.svg"
          className="frame-iphone"
          width={443}
          height={414}
          alt="iphone-frame"
          style={{position: 'absolute', top: 0, left: 0, zIndex: 2, pointerEvents: 'none'}}
        />
      </div>
      <div className="bg-star-img1" style={{ position: 'absolute', top: '28%', left: '0%', margin: '0 auto', zIndex: 3}}>
        <img
          src="/images/bio-link/bio-center/bg-star.png"
          width={802}
          height={481}
          alt="star-frame"
        />
      </div>
      <div className="bg-star-img2" style={{position: 'absolute', top: '28%', left: '0%', margin: '0 auto', zIndex: 3}}>
        <img
          src="/images/bio-link/bio-center/bg-star.png"
          width={802}
          height={481}
          alt="star-frame"
        />
      </div>
    </div>
  );
}

export default BioCenter;
