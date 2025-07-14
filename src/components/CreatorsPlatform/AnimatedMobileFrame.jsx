import React, { useRef, useEffect } from 'react';
import { getImagePath } from "../../utils/imagePath";

const AnimatedMobileFrame = ({ 
  className = "", 
  style = {}, 
  children,
  animationTrigger = false,
  onAnimationComplete = () => {}
}) => {
  const frameRef = useRef(null);

  useEffect(() => {
    if (animationTrigger && frameRef.current) {
      frameRef.current.style.transition = 'transform 2s ease-in-out';
      frameRef.current.style.transform = 'translateY(-100vh)';

      setTimeout(() => {
        onAnimationComplete();
      }, 1000);
    }
  }, [animationTrigger, onAnimationComplete]);

  return (
    <div ref={frameRef} className={`relative ${className}`} style={style}>
      <div className="relative w-full lg:max-w-[747px] lg:aspect-[747/728] aspect-[348/340] max-w-[348px] lg:max-h-[728px] max-h-[340px] lg:h-auto corners z-15">
        <div className="relative w-full h-full">
          <video
            src={getImagePath("/images/CreatorsPlatform/cp-video.webm")}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover absolute top-0 left-0 xl:rounded-tl-[300px] xl:rounded-br-[300px] rounded-tl-[150px] rounded-br-[150px] lg:max-w-[747.25px] lg:max-h-[728.78px] max-w-[348px] max-h-[340px]"
          />

          <div className="absolute overflow-hidden z-20 w-full h-full top-0 left-0">
            <video
              src={getImagePath("/images/CreatorsPlatform/cp-video.webm")}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover absolute top-0 left-0 md:rounded-tl-[300px] md:rounded-br-[300px] rounded-tl-[150px] rounded-br-[150px] max-w-[747.25px] max-h-[728.78px] max-w-[348px] max-h-[340px]"
            />

            <div className="cp-lock-slides lock-slides-container absolute z-30 top-[44%] left-1/2 -translate-x-1/2 lg:translate-y-1/3 -translate-y-1/3 pointer-events-none max-w-[256px]">
              <img
                src={getImagePath("/images/CreatorsPlatform/lock-to-view.svg")}
                alt="Content on phone"
                className="lock-slide lock-slide-1 p-[25px]"
              />
              <img
                src={getImagePath("/images/CreatorsPlatform/lock-to-view.svg")}
                alt="Content on phone"
                className="lock-slide lock-slide-2 p-[25px]"
              />
              <img
                src={getImagePath("/images/CreatorsPlatform/lock-to-view.svg")}
                alt="Content on phone"
                className="lock-slide lock-slide-3 p-[25px]"
              />
            </div>
          </div>

          <img
            src={getImagePath("/images/CreatorsPlatform/mobile-frame.svg")}
            className="mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] xl:w-[319px] 3xl:h-[651px] xl:h-[500px]"
            alt="Mobile Frame"
          />
          <img
            src={getImagePath("/images/CreatorsPlatform/mobile-mask.png")}
            className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] 3xl:w-[300px] 3xl:h-[651px] lg:h-[500px]"
            alt="Mobile Frame"
          />
        </div>
      </div>

      {children}
    </div>
  );
};

export default AnimatedMobileFrame;
