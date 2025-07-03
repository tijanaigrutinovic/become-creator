import { useEffect, useRef, useState } from "react";

export default function useInViewWithDelay(threshold = 0.03, animationDelay = 0) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        if (entry.isIntersecting && animationDelay > 0) {
          // Odloži animaciju za određeno vreme
          setTimeout(() => {
            setShouldAnimate(true);
          }, animationDelay);
        } else if (entry.isIntersecting) {
          setShouldAnimate(true);
        } else {
          setShouldAnimate(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, animationDelay]);

  return [ref, isVisible, shouldAnimate];
}