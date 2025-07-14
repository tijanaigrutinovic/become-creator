import React, { useEffect, useState } from "react";
import { getImagePath } from "../../utils/imagePath";

const imgsEven = ["rci-1.png", "rci-2.png", "rci-3.png", "rci-4.png"];
const imgsOdd = ["rci-5.png", "rci-6.png", "rci-7.png", "rci-8.png"];

const ANIMATION_DURATION = 1100;
const ANIMATION_DELAYS = [0, 250, 500, 750];

const BioRight = () => {
  const [phase, setPhase] = useState(0);
  const [animateOut, setAnimateOut] = useState([false, false, false, false]);
  const [showGroup, setShowGroup] = useState(true);
  const [justAppeared, setJustAppeared] = useState([true, true, true, true]);
  const [resetPosition, setResetPosition] = useState([false, false, false, false]);

  useEffect(() => {
    if (!showGroup) return;

    setJustAppeared([true, true, true, true]);
    setResetPosition([false, false, false, false]);

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

    const timers = [];

    (phase === 0 ? imgsEven : imgsOdd).forEach((_, i) => {
      timers.push(
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
          setResetPosition((prev) => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
        }, ANIMATION_DELAYS[i] + 1200 + ANIMATION_DURATION)
      );
    });

    timers.push(
      setTimeout(() => {
        setShowGroup(false);
        setTimeout(() => {
          setPhase((prev) => (prev === 0 ? 1 : 0));
          setAnimateOut([false, false, false, false]);
          setResetPosition([false, false, false, false]);
          setShowGroup(true);
        }, 200);
      }, Math.max(...ANIMATION_DELAYS) + ANIMATION_DURATION + 1200)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, showGroup]);

  const imgs = phase === 0 ? imgsEven : imgsOdd;
  const folder = "right-col";

  return (
    <div className="bl-col-right">
      <div className="bl-slide-animate flex justify-center pt-16">
        <div className="bio-link-grid">
          {showGroup &&
            imgs.map((img, i) => (
              <div
                key={img}
                className={`img-wraper grid-img ${
                  resetPosition[i]
                    ? "reset-position"
                    : animateOut[i]
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

export default BioRight;
