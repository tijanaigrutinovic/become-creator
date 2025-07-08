import React, { useState, useEffect } from 'react';

const Typewriter = ({ sentences }) => {
  const [text, setText] = useState('');
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const currentSentence = sentences[sentenceIndex];

    if (!isDeleting) {
      // Typing mode: add one character at a time.
      if (charIndex < currentSentence.length) {
        timeout = setTimeout(() => {
          setText(currentSentence.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, 100); // Typing speed (ms)
      } else {
        // Sentence complete; pause before deleting.
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1000); // Pause duration (ms)
      }
    } else {
      // Deleting mode: remove one character at a time.
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setText(currentSentence.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, 50); // Deleting speed (ms)
      } else {
        // Sentence completely deleted; move to next sentence.
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setSentenceIndex((prev) => (prev + 1) % sentences.length);
        }, 500); // Pause before typing the next sentence.
      }
    }

    return () => clearTimeout(timeout);
  }, [text, charIndex, isDeleting, sentenceIndex, sentences]);

  return <div className="typewriter-container">{text} |</div>;
};

export default Typewriter;
