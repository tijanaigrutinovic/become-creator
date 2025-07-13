import React, { useRef, useEffect, useCallback } from "react";
import WaveCircleBox from "../Common/wave-circle-box";
import DataList from './DataList';
import { getImagePath } from "../../utils/imagePath";


// WhyLinkstackz sada prima isActive prop
const WhyLinkstackzTest = ({ isActive, onNextSectionTrigger, id, nextSectionId }) => {

  const dataList = [
    {
      title: "90% Payouts",
      desc: "Keep more of what you earn with one of the highest payout rates in the industry.",
      image: "item-1.png",
    },
    {
      title: "Secure & Private",
      desc: "Your content is protected with cloud storage, watermarks, and tracking tools to prevent unauthorized sharing.",
      image: "item-2.png",
    },
    {
      title: "Exclusive to Real Creators",
      desc: "Fans know they're interacting with verified creators, not agencies or bots.",
      image: "item-3.png",
    },
    {
      title: "Built-in Promotion",
      desc: "We help drive traffic to your page, so you can start making money right away.",
      image: "item-4.png",
    },
    {
      title: "No Hidden Fees",
      desc: "Transparent pricing with no surprises—what you see is what you get.",
      image: "item-5.png",
    },
    {
      title: "Monetize Without Subscriptions",
      desc: "Get paid instantly through video calls, locked content, and direct fan engagement.",
      image: "item-6.png",
    },
  ];

 

  return (
    <section className="snap-start h-[100vh] w-full lg:py-[80px] lg:px-0 px-[15px] pt-[80px]">
        <div className="flex flex-col-reverse lg:flex-row md:mx-auto mx-[15px] 3xl:max-w-[1670px] 2xl:max-w-[1300px] xl:max-w-[1200px] md:max-w-[900px]">
          {/* Left image section */}
          <div className="lg:w-1/2 w-full flex justify-center items-center">
          </div>
  
          {/* Right content box */}
          <div className="lg:w-1/2 w-full flex items-start lg:mt-[85px] mt-[25px]">
          </div>
        </div>

    </section>
  );
};

export default WhyLinkstackzTest;