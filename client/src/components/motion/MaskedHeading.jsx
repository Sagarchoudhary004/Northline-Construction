import { motion } from 'framer-motion';

export default function MaskedHeading({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  immediate = false,
}) {
  const words = String(text || '').split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        {...(immediate
          ? { animate: 'visible' }
          : { whileInView: 'visible', viewport: { once: true, amount: 0.2 } })}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.06em]"
      >
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-block overflow-hidden align-bottom pb-[0.04em]">
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
