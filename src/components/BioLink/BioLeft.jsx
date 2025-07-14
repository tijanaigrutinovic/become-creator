import React, { useEffect, useState } from "react";
import { getImagePath } from "../../utils/imagePath";

const imgsEven = ["lci-1.png", "lci-2.png", "lci-3.png", "lci-4.png"];
const imgsOdd = ["lci-5.png", "lci-6.png", "lci-7.png", "lci-8.png"];

const ANIMATION_DURATION = 1100;
const ANIMATION_DELAYS = [0, 250, 500, 750];

const BioLeft = () => {
  const [phase, setPhase] = useState(0);
  const [animateOut, setAnimateOut] = useState([false, false, false, false]);
  const [showGroup, setShowGroup] = useState(true);
  const [justAppeared, setJustAppeared] = useState([true, true, true, true]);

  useEffect(() => {
    if (!showGroup) return;

    setJustAppeared([true, true, true, true]);

    if (phase === 1) {
      const fadeTimers = imgsOdd.map((_, i) =>
        setTimeout(() => {
          setJustAppeared((prev) => {
            const updated = [...prev];
            updated[i] = false;
            return updated;
          });
        }, 700)
      );
      return () => fadeTimers.forEach(clearTimeout);
    }
  }, [phase, showGroup]);

  useEffect(() => {
    if (!showGroup) return;

    const timers = (phase === 0 ? imgsEven : imgsOdd).map((_, i) =>
      setTimeout(() => {
        setAnimateOut((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, ANIMATION_DELAYS[i] + 1200)
    );

    timers.push(
      setTimeout(() => {
        setShowGroup(false);
        setTimeout(() => {
          setPhase((prev) => (prev === 0 ? 1 : 0));
          setAnimateOut([false, false, false, false]);
          setShowGroup(true);
        }, 200);
      }, Math.max(...ANIMATION_DELAYS) + ANIMATION_DURATION + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, showGroup]);

  const imgs = phase === 0 ? imgsEven : imgsOdd;
  const folder = "left-col";

  return (
    <div className="bl-col-left">
      <div className="bl-slide-animate flex justify-center pt-16">
        <div className="bio-link-grid">
          {showGroup &&
            imgs.map((img, i) => (
              <div
                key={img}
                className={`img-wraper grid-img ${
                  animateOut[i]
                    ? "slide-up-animate"
                    : phase === 1 && justAppeared[i]
                    ? "fade-in-animate"
                    : phase === 0
                    ? "slide-in-animate"
                    : ""
                }`}
                style={{ transitionDelay: `${ANIMATION_DELAYS[i]}ms` }}
              >
                <img
                  src={getImagePath(`/images/bio-link/${folder}/${img}`)}
                  width={140}
                  height={210}
                  alt={img}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BioLeft;
