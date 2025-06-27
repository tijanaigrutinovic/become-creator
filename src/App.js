import React from 'react';
import './css/creators-platform.css'

const HeroSection = () => {
  return (
    <section className="h-screen px-[110px] py-20 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-20 
                        md:py-20 md:px-[110px] sm:px-4 sm:pt-[150px] sm:pb-10">
      
      {/* Leva strana */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Tvoje Ime Naslova</h1>
        <p className="text-lg text-gray-700 mb-4">
          Ovo je prvi paragraf koji objašnjava nešto važno o sadržaju.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Ovde možeš dodati još jedan paragraf sa dodatnim informacijama.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="relative items-center bg-[#E91E63] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[25px] rounded-[20px] text-sm font-bold font-gilroy capitalize flex overflow-hidden group animated-button">
                <div class="circle circle1"></div>
                <div class="circle circle2"></div>
                <div class="circle circle3"></div>
                <div className="relative z-10 flex items-center">
                    <img
                        src="/icons/become-a-creator-icon.svg"
                        alt="Become a creator"
                        className="my-2 mr-[10px] w-6 h-6"
                    />
                    Become a creator
                </div>
            </button>
            <button className="items-center bg-[#181818] text-white md:px-[25px] px-[15px] md:py-[10px] py-[5px] md:rounded-[20px] rounded-[15px] text-sm font-bold font-gilroy capitalize flex">
                Sign up as a Fan
            </button>
        </div>
      </div>

      {/* Desna strana */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="https://via.placeholder.com/500x400"
          alt="Slika"
          className="max-w-full h-auto rounded shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
