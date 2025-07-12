// src/components/Faq.jsx
import React from "react"; // Dodajte React import
import BgBounceAnimate from "../Common/bg-bounce-animate";
import WaveCircleBox from "../Common/wave-circle-box";
import FaqItems from './FaqItems';
// Uklanjamo SnapScrollSection jer ćemo koristiti direktan section tag

// Faq sada prima isActive, transitionDirection, id, nextSectionId propove
const Faq = ({ isActive, transitionDirection, id, nextSectionId }) => {
  // Nema potrebe za useRef i useEffect za animaciju glavnog kontejnera ovde,
  // jer će se to kontrolisati putem CSS klasa dodatih iz App.jsx.

  // Međutim, možemo koristiti useRef i useEffect za animaciju UNUTRAŠNJIH elemenata
  // ako želimo kaskadni ulazak/izlazak tih elemenata.
  // Za sada, fokusiraćemo se na glavnu sekciju.

  return (
    // Koristimo direktan 'section' tag umesto SnapScrollSection
    // ID i data-animation-in su ključni za CSS ciljanje
    // 'screen-section' klasa je ključna za globalne animacije
    <section
      id={id} // ID sekcije (npr. "faq-section")
      data-animation-in="faq-anim" // Atribut za CSS ciljanje animacija
      className={`h-[100vh] relative px-[0.5rem] lg:px-5 overflow-hidden bc-faq-body`}
      // isActive klasa se dodaje/uklanja iz App.jsx
      // transitionDirection prop se koristi za CSS klase leaving-down/up u App.jsx
    >
      <div className="bc-faq pt-[140px]">
        <div className="max-w-[1645px] mx-auto faq-wraper grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-9 px-0 lg:px-[4.75rem] lg:py-[3.75rem] py-4 rounded-[100px_100px_0_0] bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,141,131,0.10)_100%)] backdrop-blur-[17px]">
          {/* Levi deo sa medaljom i tekstom */}
          <div className="faq-desc relative lg:border-r lg:border-b-0 border-b border-white/10 p-2 lg:pr-[50px]">
            <div className="medal-gold w-[50%] mx-auto lg:w-full md:mb-6">
              <img
                src="/images/faq/medal-gold.png"
                alt="medal-gold"
                className="mx-auto"
              />
            </div>
            {/* Dodaj klasu za tekstualni info radi animacije */}
            <div className="text-info text-center max-w-[516px] mx-auto text-white capitalize 2xl:text-4xl md:text-3xl text-2xl font-bold font-gilroy">
              <h3 className="p-text-4xl font-bold font-gilroy text-center text-white capitalize md:leading-[50px] leading-9 ">The <span className="text-[#FFB800]">No.1</span> Adult bio link website trusted by millions of adult content <span className="text-[#E91E63]">creators</span> across the globe</h3>
            </div>
            {/* Zvezde sa animacijama */}
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
          {/* Desni deo sa FAQ listom */}
          <div className="faq-list pt-5 mt-0 lg:pl-[84px]">
            {/* Dodaj klasu za naslove FAQ liste radi animacije */}
            <div className="mb-[23px] p-3 faq-list-heading">
              <h4 className="md:text-4xl text-xl font-gilroy font-black text-white capitalize font-[900]">Frequently Asked Questions</h4>
              <p className="text-lg font-gilroy font-normal text-white capitalize font-[400]">Questions that most users may have</p>
            </div>
            <FaqItems /> {/* Pretpostavljamo da FaqItems ima svoje interne animacije ili da ćemo ih dodati */}
          </div>
        </div>
      </div>
      <BgBounceAnimate/> {/* Ovo je verovatno globalna pozadina, pa može biti i van main div-a */}
    </section>
  );
}

export default Faq;