import { useState, useEffect } from "react";

const useTypingEffect = (text, speed = 15) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    if (!text) return;

    let index = 0;
    const interval = setInterval(() => {
        
      // Functional update to avoid dependency issues
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return {
    displayedText,
    isTyping: displayedText.length < (text?.length || 0)
  };
};

export default useTypingEffect;