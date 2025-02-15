import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const funnyMessages = [
  "Trust, but Verify... Because Even Your Grandma's WhatsApp Videos Can Be Deepfakes! 👵",
  "This AI Has No Chill – It Exposes Fakes Faster Than Your Friends Expose Your Secrets! 🔍",
  "Loading Our Trust Issues... I Mean, Detection Algorithms! 🕵️‍♂️",
  "Teaching AI to Spot Lies Better Than Your Mom! 🤖",
  "Scanning for Fakeness... Like Your Ex's Instagram Stories! 📱",
  "Deep Learning in Progress... Deeper Than Your Last Relationship! 💔",
  "Loading Reality Check... Because The Internet Needs One! 🌐",
];

export function LoadingScreen() {
  const navigate = useNavigate();
  const [currentMessage, setCurrentMessage] = useState(funnyMessages[0]);

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % funnyMessages.length;
      setCurrentMessage(funnyMessages[messageIndex]);
    }, 3000);

    const navigationTimeout = setTimeout(() => {
      navigate("/dashboard");
    }, 15000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(navigationTimeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center p-4 z-50 overflow-hidden">
      {/* Matrix-like Digital Rain */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 text-[#ff6b00] text-2xl font-mono"
            style={{ left: `${(i / 50) * 100}%` }}
            initial={{ y: -100 }}
            animate={{ y: ["0%", "100%"] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          >
            {"01"[Math.floor(Math.random() * 2)]}
          </motion.div>
        ))}
      </motion.div>

      {/* Central Content */}
      <div className="relative z-10 max-w-2xl text-center space-y-8">
        {/* Rotating Hexagon */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#ff6b00]">
            <motion.path
              d="M50 0 L93.3 25 L93.3 75 L50 100 L6.7 75 L6.7 25 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>

        {/* Animated Message */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            className="relative px-6 py-4 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ff6b00] via-[#ff9900] to-[#ff6b00] opacity-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.p
              className="text-2xl md:text-3xl font-bold text-[#ff6b00] relative z-10"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {currentMessage}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[#ff6b00] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 15, ease: "linear" }}
          />
        </div>
      </div>

      {/* Pulsing Background Circles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#ff6b00]"
          style={{
            width: 300 + i * 100,
            height: 300 + i * 100,
          }}
          animate={{
            scale: [1, 1.5],
            opacity: [0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
