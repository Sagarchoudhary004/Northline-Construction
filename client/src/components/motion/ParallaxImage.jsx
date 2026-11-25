import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ParallaxImage({
  src,
  alt,
  className = '',
  aspectClass = 'aspect-[16/10]',
  priority = false,
  parallaxStrength = 9,
  zoomRange = [1.14, 1.02],
  revealDelay = 0,
}) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  const y = useTransform(
    smoothProgress,
    [0, 1],
    [`-${parallaxStrength}%`, `${parallaxStrength}%`]
  );
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [zoomRange[0], 1.06, zoomRange[1]]);
  const containerScale = useTransform(smoothProgress, [0, 0.35], [0.95, 1]);

  if (shouldReduceMotion) {
    return (
      <div className={`relative overflow-hidden bg-[#E4E2DA] ${aspectClass} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      style={{ scale: containerScale }}
      className={`relative overflow-hidden bg-[#E4E2DA] ${aspectClass} ${className}`}
    >
      {/* Architectural curtain wipe reveal on scroll into view */}
      <motion.div
        initial={{ clipPath: 'inset(14% 0% 14% 0%)', opacity: 0.7 }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.95, delay: revealDelay, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full overflow-hidden"
      >
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{ y, scale }}
          className="h-[118%] w-full -mt-[9%] object-cover will-change-transform"
        />

        {/* Terracotta & charcoal architectural shutter overlay sweep */}
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: revealDelay, ease: [0.77, 0, 0.175, 1] }}
          style={{ transformOrigin: 'top center' }}
          className="pointer-events-none absolute inset-0 bg-[#111317]/35"
        />
      </motion.div>
    </motion.div>
  );
}
