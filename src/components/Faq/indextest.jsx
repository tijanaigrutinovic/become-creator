import React from "react";
import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";
import FaqItems from './FaqItems'
import useInView from "../../hooks/seInView";

const Faqtest = () => {
  const [ref, isVisible] = useInView(0.003); // ← threshold 0.1

  return (
    <section
    ref={ref}
      className="snap-start h-[100vh] relative px-[0.5rem] lg:px-5 overflow-hidden bc-faq-body"
    >
      <div className="bc-faq pt-[150px]">
        <div className="max-w-[1645px] mx-auto faq-wraper grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-9 px-0 lg:px-[4.75rem] lg:py-[3.75rem] py-4 rounded-[100px_100px_0_0] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,141,131,0.10)_100%)] backdrop-blur-[17px]">
          <div className="faq-desc relative lg:border-r lg:border-b-0 border-b border-white/10 p-2 lg:pr-[50px]">
            <div className="medal-gold w-[50%] mx-auto lg:w-full md:mb-6">
              <img
                src="/images/faq/medal-gold.png"
              
                alt="medal-gold"
                className="mx-auto"
              />
            </div>
            <div className="text-info text-center max-w-[516px] mx-auto text-white capitalize md:text-4xl text-2xl font-bold font-gilroy">
              <h3 className="p-text-4xl font-bold font-gilroy text-center text-white capitalize md:leading-[50px] leading-9 ">The <span className="text-[#FFB800]">No.1</span> Adult bio link website trusted by millions of adult content <span className="text-[#E91E63]">creators</span> across the globe</h3>
            </div>
            <div className="star-bg-img1 w-full absolute top-4 right-4 my-0 mx-auto z-9 animate-[faqAnimateStars1_5s_infinite_alternate]">
              <img
                src="/images/faq/bg-star.png"
                width={803}
                height={550}
                alt="bg-star"
              />
            </div>
            <div className="star-bg-img2 w-[110%] absolute top-[-4rem] left-0 right-0 my-0 mx-auto z-9 animate-[faqAnimateStars2_5s_infinite_alternate]">
              <img
                src="/images/faq/bg-star.png"
                width={803}
                height={550}
                alt="bg-star"
              />
            </div>
          </div>
          <div className="faq-list pt-5 mt-0 lg:pl-[84px]">
            <div className="mb-[23px] p-3">
              <h4 className="md:text-4xl text-xl font-gilroy font-black text-white capitalize font-[900]">Frequently Asked Questions</h4>
              <p className="text-lg font-gilroy font-normal text-white capitalize font-[400]">Questions that most users may have</p>
            </div>
            <FaqItems />
          </div>
        </div>
        <WaveCircleBox style={{ width: '100%', top: '50%', left: '33%',}} />

      </div>
    </section>
  );
}

export default Faqtest;
