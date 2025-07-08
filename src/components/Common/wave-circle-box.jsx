import React, { forwardRef } from 'react';

const WaveCircleBox = forwardRef(({ style = {}, className = '', ...props }, ref) => {
  return (
    <div
      className={`absolute z-[-1] wave-circle-box ${className} top-[-20%] left-[-45%] w-[100%] opacity-1 right-[auto]`}
      ref={ref}
      style={{
        
        ...style,
      }}
      {...props}
    >
      <img
        src="/images/common/stroke1.svg"
        className="w-full absolute top-0 right-0 bottom-0 left-0 z-1 animate-stroke-1 wave-circle-1"
        width={2772}
        height={2747}
        alt="stroke-1"
      />
      <img
        src="/images/common/stroke2.svg"
        className="w-full absolute top-0 right-0 bottom-0 left-0 z-1 animate-stroke-2 wave-circle-2"
        width={2926}
        height={2486}
        alt="stroke-2"
      />
      <img
        src="/images/common/stroke3.svg"
        className="w-full absolute top-0 right-0 bottom-0 left-0 z-1 animate-stroke-3 wave-circle-3"
        width={2762}
        height={2768}
        alt="stroke-3"
      />
    </div>
  );
});

export default WaveCircleBox;