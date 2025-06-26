import React, { useRef } from "react";
import WaveCircleBox from "../Common/wave-circle-box";
import BgBounceAnimate from '../Common/bg-bounce-animate';
import DataList from './DataList';
import SnapScrollSection from '../Common/SnapScrollSection';

const WhyLinkstackz = () => {
  const titleRef = useRef(null);

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
      title: "Built-in Promotion ",
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
      desc: "Get paid instantly through video calls, locked content, and direct fan engagement",
      image: "item-6.png",
    }
  ];

  const triggerNextSectionAnimation = (progress) => {
    const nextSection = document.getElementById('section5');
    if (nextSection) {
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      nextSection.style.opacity = easedProgress;
      nextSection.style.transform = `translateY(${(1 - easedProgress) * 100}px)`;
      nextSection.style.zIndex = '30';
      nextSection.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    }
  };

  return (
    <SnapScrollSection
      id="why-linkstackz-section"
      nextSectionId="section5"
      onNextSectionTrigger={triggerNextSectionAnimation}
      className="max-w-[1544px] mx-auto px-6 py-24 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center md:mb-20 mb-5" ref={titleRef}>
        <h2 className="text-5xl font-bold text-white"><span className="text-[#E91E63] font-gilroy capitalize leading-[100px] font-[1000]">Why</span> Linkstackz?</h2>
        <p className="text-white text-lg font-bold font-gilroy capitalize leading-loose">
          From pay-per-minute video calls to paid attachments and interactive toys, Linkstackz maximizes your income potential.
        </p>
      </div>
      <div
        className="data-list grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-1 rounded-[50px] justify-items-center items-center h-auto md:h-[600px] w-full max-w-full overflow-hidden"
      >
        {dataList?.map((item, index) =>
          <DataList
            key={`dl-${index}`}
            data={item}
          />
        )}
      </div>
      <WaveCircleBox style={{ width: '100%', top: 'unset', left: '33%' }} />
    </SnapScrollSection>
  );
}

export default WhyLinkstackz;
