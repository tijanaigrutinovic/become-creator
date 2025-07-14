import React from "react";
import BgBounceAnimate from "../Common/BgBounceAnimate";
import FaqItems from './FaqItems'
import { getImagePath } from "../../utils/imagePath";

const Faq = () => {

  return (
    <div
      className="relative bc-faq-body lg:pt-[140px] pt-[85px]"
    >
        <BgBounceAnimate />
      <div className="bc-faq">
        <div className="max-w-[1645px] mx-auto faq-wraper grid grid-cols-1 lg:grid-cols-2 relative z-9 px-0 lg:px-[4.75rem] 3xl:py-[3.75rem] lg:py-[50px] py-4 rounded-[100px_100px_0_0] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,141,131,0.10)_100%)] backdrop-blur-[17px]">
          <div className="faq-desc relative lg:border-r lg:border-b-0 border-b border-white/10 p-2 lg:pr-[50px]">
            <div className="medal-gold w-[50%] mx-auto lg:w-full md:mb-6">
              <img
                src={getImagePath("/images/faq/medal-gold.png")}
                alt="medal-gold"
                className="mx-auto"
              />
            </div>
            <div className="text-info text-center max-w-[516px] mx-auto text-white capitalize font-bold font-gilroy">
              <h3 className="xl:text-4xl lg:text-2xl text-xl font-bold font-gilroy text-center text-white capitalize lg::leading-[50px] md:leading-9 leading-7">The <span className="text-[#FFB800]">No.1</span> Adult bio link website trusted by millions of adult content <span className="text-[#E91E63]">creators</span> across the globe</h3>
            </div>
            <div className="star-bg-img1 w-full absolute top-4 right-4 my-0 mx-auto z-9 animate-[faqAnimateStars1_5s_infinite_alternate]">
              <img
                src={getImagePath("/images/faq/bg-star.png")}
                width={803}
                height={550}
                alt="bg-star"
              />
            </div>
            <div className="star-bg-img2 w-[110%] absolute top-[-4rem] left-0 right-0 my-0 mx-auto z-9 animate-[faqAnimateStars2_5s_infinite_alternate]">
              <img
                src={getImagePath("/images/faq/bg-star.png")}
                width={803}
                height={550}
                alt="bg-star"
              />
            </div>
          </div>
          <div className="faq-list md:pt-5 pt-2 mt-0 lg:pl-[84px]">
            <div className="md:mb-[23px] mb-2 md:p-3 p-2">
              <h4 className="xl:text-4xl lg:text-2xl text-lg font-gilroy font-black text-white capitalize font-[900]">Frequently Asked Questions</h4>
              <p className="lg:text-lg text-base font-gilroy font-normal text-white capitalize font-[400]">Questions that most users may have</p>
            </div>
            <FaqItems />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
