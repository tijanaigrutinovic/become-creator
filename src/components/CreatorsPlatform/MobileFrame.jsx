import React from "react";
import { getImagePath } from "../../utils/imagePath";

const MobileFrame = React.forwardRef(({ style, className = "", ...props }, ref) => (
  <img
    ref={ref}
    src={getImagePath("/images/CreatorsPlatform/mobile-frame.svg")}
    alt="Mobile Frame"
    className={`mobile-frame mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px] xl:w-[319px] 3xl:h-[651px] xl:h-[450px]`}
    style={style}
    {...props}
  />
));

export default MobileFrame;