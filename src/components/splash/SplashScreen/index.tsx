import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [text, setText] = useState("");
  const fullText = "MASKOFF";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setIsVisible(false), 500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{
              scale: 2,
              y: -50,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          >
            <motion.h1
              className="text-[40px] font-bold tracking-tighter text-[#ff6b00]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block ml-1"
              >
                |
              </motion.span>
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
