import React from "react";

const BioCenter = () => {
  return (
    <div className="bl-col-center">
        <h2 className=" mb-6 text-5xl font-bold text-center text-white leading-[70px] font-[1000] font-gilroy capitalize">Fully customizable <span className="text-[#E91E63]">bio link</span></h2>
        <p className="mb-6 text-white text-lg font-bold font-gilroy capitalize leading-loose">
        Create a bio link that’s uniquely yours with fully customizable options. Personalize your profile to reflect your style and connect all your content in one place
        </p>
      <div className="flex items-center justify-start">
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
            style={{objectFit: 'cover', borderRadius: '45px', padding: '2px'}}
          />
        </div>
        <img
          src="/images/bio-link/bio-center/iphone.svg"
          className="frame-iphone"
          width={443}
          height={414}
          alt="iphone-frame"
          style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none'}}
        />
      </div>
      <div className="bg-star-img1" style={{width: '114%', position: 'absolute', bottom: '1rem', margin: '0 auto', zIndex: 1}}>
        <img
          src="/images/bio-link/bio-center/bg-star.png"
          width={802}
          height={481}
          alt="star-frame"
        />
      </div>
      <div className="bg-star-img2" style={{width: '134%', position: 'absolute', bottom: '1rem', margin: '0 auto', zIndex: 1}}>
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
