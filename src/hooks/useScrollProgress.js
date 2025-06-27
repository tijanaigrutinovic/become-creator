// src/hooks/useScrollProgress.js
import { useState, useEffect, useCallback } from 'react';

const useScrollProgress = (ref) => { // ref sada mora biti prosleđen glavnom placeholder divu
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    if (ref.current) {
      const elementTop = ref.current.getBoundingClientRect().top;
      const elementHeight = ref.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progres od 0 (placeholder ulazi u viewport) do 1 (placeholder izlazi iz viewporta)
      let currentProgress = -elementTop / (elementHeight - viewportHeight);
      currentProgress = Math.max(0, Math.min(1, currentProgress));
      setProgress(currentProgress);
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Pozovi jednom pri montiranju za početno stanje

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return progress;
};

export default useScrollProgress;