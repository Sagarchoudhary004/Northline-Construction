import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import MaskedHeading from '../components/motion/MaskedHeading';
import RevealSection from '../components/motion/RevealSection';
import ParallaxImage from '../components/motion/ParallaxImage';
import MagneticButton from '../components/motion/MagneticButton';

export default function AboutPage() {
  const { content } = useSite();
  const about = content?.about;
  const seo = content?.seo?.about;

  useDocumentMeta(seo?.title || 'About Us — Northline Build', seo?.description || '');

  if (!about) return null;

  return (
    <div className="overflow-x-hidden">
      {/* 1. ABOUT HERO */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 bg-architectural-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-label text-xs uppercase tracking-[0.24em] text-[#D95D39] mb-6"
          >
            {about.hero.eyebrow}
          </motion.p>

          <MaskedHeading
            text={about.hero.headline}
            as="h1"
            immediate
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02] text-[#111317] max-w-5xl"
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 text-lg sm:text-xl text-[#111317]/75 max-w-3xl leading-relaxed"
          >
            {about.hero.supportingText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="mt-12 rounded-2xl overflow-hidden shadow-xl shadow-black/10"
          >
            <ParallaxImage
              src={about.hero.image || '/uploads/seed/about-site.jpg'}
              alt={about.hero.imageAlt || 'Northline Build site execution'}
              aspectClass="aspect-[16/9] sm:aspect-[21/9]"
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* 2. OUR STORY */}
      <section className="py-20 sm:py-28 bg-white border-y border-[#111317]/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-[#111317]/10">
              <ParallaxImage
                src={about.story.image || '/uploads/seed/approach-blueprint.jpg'}
                alt={about.story.imageAlt || 'Engineering coordination'}
                aspectClass="aspect-[4/3]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <RevealSection>
              <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                Our Story
              </span>
            </RevealSection>
            <MaskedHeading
              text={about.story.headline}
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]"
            />
            <RevealSection delay={0.12}>
              <p className="text-base sm:text-lg text-[#111317]/75 leading-relaxed">
                {about.story.description}
              </p>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH */}
      <section className="py-20 sm:py-28 bg-[#F5F4F0]">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 space-y-6">
          <RevealSection>
            <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
              Our Approach
            </span>
          </RevealSection>
          <MaskedHeading
            text={about.approach.headline}
            className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08]"
          />
          <RevealSection delay={0.12}>
            <p className="text-lg sm:text-xl text-[#111317]/80 leading-relaxed">
              {about.approach.description}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* 4. WHAT GUIDES OUR WORK */}
      <section className="py-24 sm:py-32 bg-[#0B0D10] text-white bg-architectural-grid-dark">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 space-y-4">
            <RevealSection>
              <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                Core Principles
              </span>
            </RevealSection>
            <MaskedHeading
              text={about.values.headline || 'What Guides Our Work'}
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.values.items.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[#14171D] p-8 sm:p-10 hover:border-[#D95D39]/60 active:border-[#D95D39] transition-colors"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                    0{idx + 1}
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: 0.1 + idx * 0.08 }}
                    style={{ transformOrigin: 'right center' }}
                    className="w-10 h-[1px] bg-[#D95D39]"
                  />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-4">
                  {val.title}
                </h3>
                <p className="text-base text-white/70 leading-relaxed">{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OUR PROCESS */}
      <section className="py-24 sm:py-32 bg-[#F5F4F0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <RevealSection>
              <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                Our Process
              </span>
            </RevealSection>
            <MaskedHeading
              text={about.process.headline}
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-[#111317]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.process.items.map((step, idx) => (
              <motion.div
                key={`${step.number}-${step.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="rounded-2xl bg-white border border-[#111317]/10 p-7 flex flex-col justify-between active:border-[#D95D39]"
              >
                <div>
                  <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                    {step.number} / {step.title}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-[#111317] mt-5 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#111317]/75 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[#111317]/10 flex items-center justify-between font-mono-label text-[11px] text-[#111317]/45">
                  <span>STAGE {step.number}</span>
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: 28 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 + idx * 0.08 }}
                    className="h-[2px] bg-[#D95D39] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLOSING CTA */}
      <section className="py-24 sm:py-32 bg-[#14171D] text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center space-y-8">
          <MaskedHeading
            text={about.closingCta.headline}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white justify-center"
          />
          <RevealSection delay={0.1}>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              {about.closingCta.supportingText}
            </p>
          </RevealSection>
          <RevealSection delay={0.2}>
            <MagneticButton to={about.closingCta.buttonLink || '/contact'} variant="accent">
              <span>{about.closingCta.buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
