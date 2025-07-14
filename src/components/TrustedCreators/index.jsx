import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";
import { getImagePath } from "../../utils/imagePath";


const TcSliderList = [
  "10.png", "11.png", "12.png", "13.png", "14.png", "15.png",
  "16.png", "17.png", "18.png", "19.png", "20.png", "21.png",
  "22.png", "23.png", "24.png", "25.png", "26.png", "27.png",
];

const TestTrusted = () => {

  return (
    <div className="overflow-hidden trusted-creators block content-wrapper flex flex-col items-center justify-center text-center lg:pt-[140px] lg:mt-[140px] lg:pb-[130px] pt-[80px]">
        <BgBounceAnimate/>
        <div className="tc-content w-full max-w-6xl">
          <h2 className="tc-heading text-white 2xl:text-5xl xl:text-4xl text-2xl font-gilroy capitalize md:leading-[70px] leading-9 font-[1000]">
              Trusted By The World&apos;s Biggest{" "}
              <span className="text-[#E91E63]">Creators</span>
          </h2>
          <p className="tc-paragraph max-w-[766px] text-white 2xl:text-lg lg:text-base text-xs font-bold font-gilroy capitalize leading-loose font-[700] mx-auto mt-4">
              Ladies, it&apos;s time to take control and start earning like the boss you are.
              Linkstackz isn&apos;t just another link site out there — it&apos;s your gateway to
              finding out which fans are really about that life before they subscribe to your other platforms.
          </p>
        </div>
        <div
            className="tc-slider-wrapper-anim tc-slider-wrapper relative 3xl:pt-[130px] xl:pt-[100px] pt-[80px] w-full max-w-full"
            data-slider-wrapper
        >
           
            
            <img
                src={getImagePath("/images/CreatorsPlatform/mobile-frame.svg")}
                className=" block mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[304px]"
                alt="Mobile Frame"
            />
            <div className="tc-slider-list flex gap-6 w-full">
            
                {TcSliderList.concat(TcSliderList).map((sItem, index) => (
                    <div key={`tcs-index-${index}`} className="tc-slider-item shrink-0">
                        <img
                            src={getImagePath(`/images/trusted-creators/${sItem}`)}
                            className="tcs-img-slide rounded-[30px] w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] h-auto"
                            style={{ objectFit: "fill", display: "block" }}
                            alt={`slide-${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
);
};

export default TestTrusted;