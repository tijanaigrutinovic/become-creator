import React from 'react';

// Koristimo React.forwardRef da bismo mogli da prosledimo ref na interni div
const AiWrapperContent = React.forwardRef(({ isLeaving, className = '', style = {}, children, ...props }, ref) => {
  return (
    <div
      ref={ref} // Ref je zakačen za ovaj div
      className={`transition-all duration-700 section-bg-anim max-w-[729px] lg:p-[70px_100px] p-[34px_40px] rounded-[200px_0px] bg-[#20202080] backdrop-blur-[7.5px] flex flex-col gap-1 relative z-2 xl:w-full xl:max-w-[729px] xl:p-[50px_60px] xl:rounded-[100px_0px] rounded-[60px_0px] ${
        isLeaving ? 'morphing-shape' : ''
      } ${className}`} // Spoji prosleđene klase
      style={style} // Spoji prosleđene stilove
      {...props} // Prosledi ostale propove (npr. custom data atributi)
    >
      {children ? children : (
        // Standardni sadržaj AiWrappera ako nije prosleđen 'children'
        <div className="analyze-content">
          <h2 className="pb-1 ai-heading 3xl:text-5xl lg:text-5xl text-2xl font-bold text-white md:leading-[70px] leading-9 font-[1000] font-gilroy capitalize">
            Analyze your <span className="text-[#E91E63]">Fans</span>, keep them engaged
          </h2>
          <p className="pb-1 ai-paragraph text-white 3xl:text-lg lg:text-base text-sm font-bold font-gilroy capitalize leading-loose">
            Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.
          </p>
          <div className="ai-button cp-buttons max-w-[500px] flex mt-[15px]">
            <button className="relative flex items-center w-fit bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize overflow-hidden group animated-button whitespace-nowrap">
              <div className="circle circle1"></div>
              <div className="circle circle2"></div>
              <div className="circle circle3"></div>
              <div className="relative z-10 flex items-center">
                <img
                  src="/icons/become-a-creator-icon.svg"
                  alt="Become a creator"
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-[8px] my-1"
                />
                Become a creator
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});

export default AiWrapperContent;