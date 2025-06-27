// src/utils/easingFunctions.js
export const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  export const easeOutCubic = (t) => {
    return 1 - Math.pow(1 - t, 3);
  };
  
  export const easeInOutQuart = (t) => {
    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
  };
  
  // Dodatne easing funkcije po potrebi
  export const easeInQuad = (t) => t * t;
  export const easeOutQuad = (t) => t * (2 - t);
  export const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;