import React from "react";
import { getImagePath } from "../../utils/imagePath";

const MobileFrame = React.forwardRef(({ style, className = "", ...props }, ref) => (
  <img
    ref={ref}
    src={getImagePath("/images/CreatorsPlatform/mobile-frame.svg")}
    alt="Mobile Frame"
    className={`mobile-frame ${className}`}
    style={style}
    {...props}
  />
));

export default MobileFrame;
