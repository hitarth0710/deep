import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const masks = Array(40)
  .fill(null)
  .map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 60, // Larger size range (60px to 160px)
    rotation: Math.random() * 360,
  }));

export function RotatingMasks() {
  const { scrollY } = useScroll();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setScrollPosition(latest);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {masks.map((mask) => (
        <motion.div
          key={mask.id}
          className="absolute"
          style={{
            left: `${mask.x}%`,
            top: `${mask.y}%`,
            width: mask.size,
            height: mask.size,
          }}
          initial={{ rotate: mask.rotation }}
          animate={{
            rotate: mask.rotation + scrollPosition / 3,
          }}
          transition={{ duration: 0.1 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-full h-full opacity-[0.15]"
            stroke="#ff6b00"
            strokeWidth="1.5"
          >
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            <circle cx="12" cy="12" r="6" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
