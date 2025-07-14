import { useEffect, useRef } from 'react';

export function useScrollAnimation(sectionRef, isActive, transitionDirection) {
  const lastExitDirectionRef = useRef(null);
  const prevIsActiveRef = useRef(false);
  const prevTransitionDirectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prevIsActive = prevIsActiveRef.current;
    const prevDirection = prevTransitionDirectionRef.current;

    const isReEnteringSameDirection =
      isActive &&
      prevIsActive &&
      transitionDirection === prevDirection;

    if (isReEnteringSameDirection) {
      let startY = transitionDirection === 'up' ? '-1000px' : '1000px';

      el.style.transition = 'none';
      el.style.transform = `translateY(${startY})`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        el.style.transition = 'transform 2s ease, opacity 2s ease';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
      });

      prevIsActiveRef.current = isActive;
      prevTransitionDirectionRef.current = transitionDirection;
      return;
    }

    if (isActive) {
      if (transitionDirection === 'up' || transitionDirection === 'down') {
        lastExitDirectionRef.current = transitionDirection;
      }

      const directionForStart = transitionDirection || lastExitDirectionRef.current || 'down';

      let startY = '0px';
      if (directionForStart === 'up') startY = '-1000px';
      else if (directionForStart === 'down') startY = '1000px';

      el.style.transition = 'none';
      el.style.transform = `translateY(${startY})`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'transform 2s ease, opacity 2s ease';
          el.style.transform = 'translateY(0)';
          el.style.opacity = '1';
        });
      });
    } else {
      const lastDir = lastExitDirectionRef.current || transitionDirection || 'down';

      if (lastDir === 'up') {
        el.style.transition = 'transform 2s ease, opacity 2s ease';
        el.style.transform = 'translateY(1000px)';
        el.style.opacity = '0';
      } else if (lastDir === 'down') {
        el.style.transition = 'transform 2s ease, opacity 2s ease';
        el.style.transform = 'translateY(-1000px)';
        el.style.opacity = '0';
      } else {
        el.style.transition = 'opacity 2s ease';
        el.style.opacity = '0';
      }

      const timeout = setTimeout(() => {
        lastExitDirectionRef.current = null;
      }, 100);

      return () => clearTimeout(timeout);
    }

    prevIsActiveRef.current = isActive;
    prevTransitionDirectionRef.current = transitionDirection;
  }, [sectionRef, isActive, transitionDirection]);
}