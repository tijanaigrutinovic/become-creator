import useInView from "../../hooks/seInView";
import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";



const TcSliderList = [
  "10.png", "11.png", "12.png", "13.png", "14.png", "15.png",
  "16.png", "17.png", "18.png", "19.png", "20.png", "21.png",
  "22.png", "23.png", "24.png", "25.png", "26.png", "27.png",
];

const TestTruseted = () => {

  return (
    // Uklonite ref={ref}, overflow-x-hidden, snap-start, h-[100vh], i sve klase za animaciju
    // Sekcija tag i osnovni layout (h-[100vh], snap-start) ce biti kontrolisani iz App.jsx.
    // Ostavljamo samo unutrasnji raspored i staticke Tailwind klase.
    <div className="trusted-creators content-wrapper flex flex-col items-center justify-center text-center px-[15px] lg:pt-[120px] lg:pb-[130px] pt-[80px]">
        <BgBounceAnimate/>
        <WaveCircleBox style={{ width: '100%', top: 'unset', left: '33%' }} />
        <div className="tc-content ">
          <h2 className="tc-heading text-white md:text-5xl text-2xl font-gilroy capitalize md:leading-[70px] leading-9 font-[1000]">
              Trusted By The World&apos;s Biggest{" "}
              <span className="text-[#E91E63]">Creators</span>
          </h2>
          {/* Uklonite isVisible uslove za animaciju iz klasa. Dodajte 'tc-paragraph' za CSS ciljanje. */}
          <p className="tc-paragraph max-w-[766px] text-white md:text-lg text-xs font-bold font-gilroy capitalize leading-loose font-[700] mx-auto mt-4">
              Ladies, it&apos;s time to take control and start earning like the boss you are.
              Linkstackz isn&apos;t just another link site out there — it&apos;s your gateway to
              finding out which fans are really about that life before they subscribe to your other platforms.
          </p>
        </div>
        {/* Uklonite isVisible uslove za animaciju iz klasa. Dodajte 'tc-slider-wrapper-anim' za CSS ciljanje. */}
        <div
            className="tc-slider-wrapper-anim tc-slider-wrapper relative lg:pt-[130px] pt-[80px]"
            data-slider-wrapper
        >
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