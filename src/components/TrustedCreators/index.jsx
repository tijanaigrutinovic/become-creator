import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";


const TcSliderList = [
  "10.png", "11.png", "12.png", "13.png", "14.png", "15.png",
  "16.png", "17.png", "18.png", "19.png", "20.png", "21.png",
  "22.png", "23.png", "24.png", "25.png", "26.png", "27.png",
];

const TestTruseted = () => {

  return (
    <div className="overflow-hidden trusted-creators block content-wrapper flex flex-col items-center justify-center text-center lg:pt-[140px] lg:mt-[140px] lg:pb-[130px] pt-[80px]">
        <BgBounceAnimate/>
        <div className="tc-content ">
          <h2 className="tc-heading text-white 3xl:text-5xl xl:text-4xl text-2xl font-gilroy capitalize md:leading-[70px] leading-9 font-[1000]">
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
            className="overflow-hidden tc-slider-wrapper-anim tc-slider-wrapper relative 3xl:pt-[130px] xl:pt-[100px] pt-[80px]"
            data-slider-wrapper
        >
           
            
            <img
                src="/images/CreatorsPlatform/mobile-frame.svg"
                className="lg:hidden block mobile-frame absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none h-[427px] xl:w-[209px] 3xl:h-[651px] xl:h-[500px]"
                alt="Mobile Frame"
            />
            <div className="tc-slider-list flex gap-6">
            
                {TcSliderList.concat(TcSliderList).map((sItem, index) => (
                    <div key={`tcs-index-${index}`} className="tc-slider-item shrink-0">
                        <img
                            src={`/images/trusted-creators/${sItem}`}
                            className="tcs-img-slide rounded-[30px] md:w-[280px] h-auto"
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

export default TestTruseted;