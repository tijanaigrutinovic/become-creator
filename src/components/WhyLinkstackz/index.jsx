import { useEffect, useRef } from 'react';
import WaveCircleBox from "../Common/wave-circle-box";
import DataList from './DataList';
import BgBounceAnimate from '../Common/bg-bounce-animate';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getImagePath } from "../../utils/imagePath";

const WhyLinkstackz = ({ isActive, transitionDirection, onNextSectionTrigger, id, nextSectionId }) => {
  const sectionRef = useRef();

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

  useScrollAnimation(sectionRef, isActive, transitionDirection);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={`max-w-[1544px] mx-auto lg:px-6 px-[10px] pb-2 flex flex-col items-center justify-center`}
    >
      <BgBounceAnimate />

      <div className="flex flex-col items-center text-center lg:mb-12 mwte-title">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="text-[#E91E63] font-gilroy font-[1000]">Why</span> Linkstackz?
        </h2>
        <p className="text-white text-lg font-gilroy font-bold max-w-2xl lg:block hidden">
          From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
        </p>
      </div>

      <div className="w-full rounded-[50px] overflow-hidden">
        <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-[5px] p-[5px] rounded-[50px] h-full">
          {dataList.map((item, index) => (
            <DataList key={`dl-${index}`} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyLinkstackz;
