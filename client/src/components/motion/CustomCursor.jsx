import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export default function CustomCursor() {
  const { cursorVariant, cursorText } = useCursor();
  const [enabled, setEnabled] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { damping: 28, stiffness: 380, mass: 0.4 });
  const smoothY = useSpring(mouseY, { damping: 28, stiffness: 380, mass: 0.4 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    setEnabled(true);
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const isPill = cursorVariant === 'pill' && cursorText;
  const isHover = cursorVariant === 'hover';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{ x: smoothX, y: smoothY }}
    >
      <motion.div
        animate={{
          width: isPill ? 92 : isHover ? 44 : 12,
          height: isPill ? 36 : isHover ? 44 : 12,
          backgroundColor: isPill ? '#D95D39' : isHover ? 'rgba(217, 93, 57, 0.16)' : '#111317',
          borderColor: isHover ? '#D95D39' : 'transparent',
          borderWidth: isHover ? 1.5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className="rounded-full flex items-center justify-center shadow-sm backdrop-blur-[1px]"
      >
        {isPill && (
          <span className="font-mono-label text-[10px] font-medium tracking-widest text-white uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
