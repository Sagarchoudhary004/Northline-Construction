import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export default function MagneticButton({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    resetCursor();
  };

  const baseStyles =
    'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D95D39]';

  const variantStyles = {
    primary: 'bg-[#111317] text-white hover:text-white border border-[#111317]',
    secondary:
      'bg-transparent text-[#111317] border border-[#111317]/30 hover:border-[#111317] hover:text-white',
    accent: 'bg-[#D95D39] text-white border border-[#D95D39] hover:text-[#111317]',
    light: 'bg-white text-[#111317] border border-white hover:text-white',
  };

  const fillBg =
    variant === 'accent'
      ? 'bg-white'
      : variant === 'light'
      ? 'bg-[#D95D39]'
      : 'bg-[#D95D39]';

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 ${fillBg}`}
      />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </>
  );

  const motionProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setCursor('hover'),
    onMouseLeave: handleMouseLeave,
    animate: { x: pos.x, y: pos.y },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 320, damping: 22, mass: 0.3 },
    className: `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${
      disabled ? 'opacity-60 pointer-events-none' : ''
    } ${className}`,
  };

  if (to) {
    if (to.startsWith('#')) {
      return (
        <motion.a href={to} {...motionProps}>
          {content}
        </motion.a>
      );
    }
    return (
      <motion.div
        className="inline-block"
        animate={motionProps.animate}
        whileTap={{ scale: 0.95 }}
        transition={motionProps.transition}
      >
        <Link
          ref={ref}
          to={to}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setCursor('hover')}
          onMouseLeave={handleMouseLeave}
          className={motionProps.className}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {content}
    </motion.button>
  );
}
