import React, { useState } from "react";


const FaqItems = () => {
  const faqList = [
    { key: "01", title: "What is Linkstackz?", desc: "Linkstackz is a bio link website designed specifically for adult content creators. It allows you to centralize and market all your adult content and links from various platforms in one place, making it easier for fans to find and follow you." },
    { key: "02", title: "How can I monetize my content on Linkstackz?", desc: "Linkstackz offers a variety of monetization options, including pay-per-minute video calls, locked content sales, tips, and disappearing messages. These flexible options enable you to maximize your earnings and cater to your audience's preferences." },
    { key: "03", title: "What payout methods are available on Linkstackz?", desc: "We offer multiple convenient payout options, including direct bank transfers and digital wallets. This ensures that you can access your earnings quickly and easily, providing financial flexibility and peace of mind." },
    { key: "04", title: "How does Linkstackz ensure the safety and authenticity of creators?", desc: "Linkstackz requires all creators to complete a verification process through our third-party KYC biometrics provider. This ensures that all creators are verified, maintaining a safe and trustworthy environment for both creators and fans." },
  ];

  const [isExpandId, setIsExpandId] = useState("");

  const handleFaqExpand = (faqId = "") => {
    console.log("Kliknuo sam na", faqId);
    setIsExpandId(faqId);
  };
  console.log("FaqItems loaded");
  return (
    <div className="faq-items relateive flex flex-col items-start self-stretch gap-0 p-4 lg:p-[30px] bg-white/5 rounded-[20px]">
      {faqList.map((item, idx) => (
        <div
          key={item.key}
          className={`faq-item w-full py-4 ${idx !== faqList.length - 1 ? 'border-b border-fullWhite/10' : ''} cursor-pointer`}
          onClick={() => handleFaqExpand(isExpandId === item.key ? "" : item.key)}
        >
          <div className={`flex justify-between gap-2 ${ isExpandId === item.key ? "items-start" : "items-center" }`}>
            <div className="details-content">
              <h4 className="fl-title font-gilroy font-bold md:text-xl text-base text-white ">{item.title}</h4>
              {isExpandId === item.key &&
                <p className="fl-desc font-gilroy pt-[13px] pb-[15px] font-normal md:text-lg text-xs text-white">{item.desc}</p>
              }
            </div>
            <div className="toggel-action">
              <div>
                {isExpandId === item.key ? (
                  <img src="/icons/arrow-up.svg" alt="arrow down" width={24} height={24} />
                ) : (
                  <img src="/icons/arrow-down.svg" alt="arrow up" width={24} height={24}/>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FaqItems;
