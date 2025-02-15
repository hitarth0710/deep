import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const wittyLines = [
  "Teaching AI to spot lies... it's getting better than my ex! 🕵️‍♂️",
  "Analyzing pixels faster than you can say 'deepfake' 🚀",
  "Our AI is doing a background check... trust issues are our specialty 🔍",
  "Making sure your content is as real as your coffee addiction ☕",
  "Scanning for fakery with more precision than your mom's BS detector 🎯",
  "Loading authenticity... no filters allowed! 📸",
  "Deep learning in progress... deeper than your last philosophical conversation 🤔",
  "AI working harder than your gym promises 💪",
  "Detecting deepfakes faster than you can say 'photoshop' ⚡",
  "Our AI is like your best friend - it knows when something's fake 🤖",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    // Change line every 1 second
    const lineInterval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % wittyLines.length);
    }, 1000);

    // Complete after 5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(lineInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md mx-auto p-6 text-center space-y-6">
        {/* Animated Logo */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 relative"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary opacity-20" />
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">M</span>
          </div>
        </motion.div>

        {/* Witty Lines */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-medium text-primary"
          >
            {wittyLines[currentLine]}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <motion.div className="w-full h-1 bg-primary/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
