import React, { forwardRef, useRef, useState, useEffect } from 'react';
import Typewriter from './Typewriter';
import { getImagePath } from "../../utils/imagePath";

const CreatorsPlatform = forwardRef((props, ref) => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [videosReady, setVideosReady] = useState({ v1: false, v2: false });

  useEffect(() => {
    if (videosReady.v1 && videosReady.v2) {
      video1Ref.current.play();
      video2Ref.current.play();
    }
  }, [videosReady]);

  return (
    <div className="lg:justify-between content-wrapper h-full w-full flex flex-col lg:flex-row lg:mx-auto px-[5px] lg:px-[15px] 3xl:max-w-[1670px] 2xl:max-w-[1400px] xl:max-w-[1200px] md:max-w-[900px]">
      <div className="cp-left-block lg:w-1/2 w-full flex max-w-[683px] items-start md:px-0 px-[10px]">
        <div className="flex flex-col justify-center">
          <h1 className="cp-heading mb-[15px] text-white 2xl:text-8xl xl:text-7xl lg:text-6xl text-2xl font-gilroy capitalize lg:leading-[100px] leading-9 font-[1000]">
            The Creator's platform
            <br />
            of the
            <span className="text-[#E91E63]"> Future</span>
          </h1>
          <div className="cp-typewriter-box mb-[15px] 3xl:max-w-[683px] 2xl:max-w-[600px] lg:max-w-[560px] flex 3xl:p-10 xl:p-7 p-4 lg:rounded-[30px] rounded-[20px] border border-white/5 bg-white/0">
            <p className="text-pink-600 lg:text-xl text-sm font-gilroy capitalize leading-loose pr-[15px] font-[1000] whitespace-nowrap">
              Linkstackz Where
            </p>
            <div className="text-white lg:text-xl text-sm font-gilroy capitalize leading-loose font-[1000]">
              <div className="content-animate font-gilroy">
                <Typewriter
                  sentences={[
                    'Real Fans Meet Real Creator',
                    'Monetize Without Subscriptions',
                    'Exclusive To Real Creator',
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="lg:mb-[15px] mb-[5px] max-w-[600px]">
            <p className="cp-paragraph lg:mb-[15px] mb-[5px] text-white lg:text-lg text-xs font-bold font-gilroy capitalize leading-loose">
              Put your exclusive content behind a paywall for your top fans to subscribe to, generating you recurring revenue.
            </p>
          </div>
          <div className="cp-buttons max-w-[500px] flex gap-4">
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
            <button className="items-center bg-[#181818] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[20px] rounded-[15px] text-sm font-bold font-gilroy capitalize flex whitespace-nowrap">
                Sign up as a Fan
            </button>
          </div>
        </div>
      </div>
      <div className="cp-right-block lg:w-1/2 w-full flex justify-center lg:mt-0 md:mt-[42px] mt-[12px] max-w-[819px] items-start">
        <div className="relative w-full 3xl:max-w-[747px] lg:max-w-[620px] 3xl:aspect-[747/728] xl:aspect-[620/550] aspect-[348/340] max-w-[348px] 3xl:max-h-[728px] xl:max-h-[550px] max-h-[340px] lg:h-auto corners z-15">
          <div className="relative w-full h-full">
            <div className="absolute overflow-hidden z-20 w-full h-full top-0 left-0">
              <video
                ref={video1Ref}
                src={getImagePath("/images/CreatorsPlatform/cp-video.webm")}
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={() => setVideosReady(v => ({ ...v, v1: true }))}
                className="w-full h-full lg:object-none object-cover absolute top-0 left-0 3xl:rounded-tl-[300px] 3xl:rounded-br-[300px] lg:rounded-tl-[250px] lg:rounded-br-[250px] rounded-tl-[150px] rounded-br-[150px] max-w-[747.25px] max-h-[728.78px] max-w-[348px] max-h-[340px] filter grayscale"
              />
              <div className="absolute overflow-hidden z-20 rounded-[40px] h-[304px] xl:w-[215px] 3xl:h-[651px] xl:h-[450px] mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[300px] w-[150px]">
                <video
                  ref={video2Ref}
                  src={getImagePath("/images/CreatorsPlatform/cp-video.webm")}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onLoadedData={() => setVideosReady(v => ({ ...v, v2: true }))}
                  className="w-full h-full lg:object-none object-cover absolute"
                />
              </div>
              <div className="cp-lock-slides lock-slides-container absolute z-30 lg:top-[44%] top-[60%] left-1/2 -translate-x-1/2 lg:translate-y-1/3 -translate-y-1/3 pointer-events-none max-w-[256px]">
                <img
                  src={getImagePath("/images/CreatorsPlatform/lock-to-view.svg")}
                  alt="Content on phone"
                  className="lock-slide lock-slide-1 p-[25px]"
                />
                <img
                  src={getImagePath("/images/CreatorsPlatform/send-message.svg")}
                  alt="Content on phone"
                  className="lock-slide lock-slide-2 p-[25px]"
                />
                <img
                  src={getImagePath("/images/CreatorsPlatform/video-call.svg")}
                  alt="Content on phone"
                  className="lock-slide lock-slide-3 p-[25px]"
                />
              </div>
            </div>
            <img
              ref={ref}
              src={getImagePath("/images/CreatorsPlatform/mobile-frame.svg")}
              className="frame-visibility mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] xl:w-[319px] 3xl:h-[651px] xl:h-[450px]"
              alt="Mobile Frame"
            />
            <img
              src={getImagePath("/images/CreatorsPlatform/mobile-mask.png")}
              className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] 3xl:w-[300px] 3xl:h-[651px] lg:h-[450px]"
              alt="Mobile Frame"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreatorsPlatform;