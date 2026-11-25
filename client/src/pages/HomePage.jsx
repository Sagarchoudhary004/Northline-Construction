import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, MapPin, Maximize2, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useCursor } from '../context/CursorContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import MaskedHeading from '../components/motion/MaskedHeading';
import RevealSection from '../components/motion/RevealSection';
import ParallaxImage from '../components/motion/ParallaxImage';
import MagneticButton from '../components/motion/MagneticButton';

export default function HomePage() {
  const { content, projects } = useSite();
  const { setCursor, resetCursor } = useCursor();
  const [activeSector, setActiveSector] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  const home = content?.home;
  const seo = content?.seo?.home;

  useDocumentMeta(
    seo?.title || 'Northline Build — Construction, Engineering & Project Delivery',
    seo?.description || ''
  );

  if (!home) return null;

  const activeSectorItem = home.sectors?.items?.[activeSector] || home.sectors?.items?.[0];

  return (
    <div className="overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 bg-architectural-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-label text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#D95D39] mb-6"
          >
            {home.hero.eyebrow}
          </motion.p>

          <MaskedHeading
            text={home.hero.headline}
            as="h1"
            immediate
            className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-[-0.03em] leading-[0.98] text-[#111317] max-w-5xl"
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-6 text-lg sm:text-xl text-[#111317]/75 leading-relaxed"
            >
              {home.hero.supportingText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="lg:col-span-6 flex flex-wrap lg:justify-end gap-4"
            >
              <MagneticButton to={home.hero.primaryCtaLink || '#selected-work'} variant="primary">
                <span>{home.hero.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton to={home.hero.secondaryCtaLink || '/contact'} variant="secondary">
                <span>{home.hero.secondaryCtaLabel}</span>
                <ArrowUpRight className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 sm:mt-16 rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <ParallaxImage
              src={home.hero.heroImage || '/uploads/seed/hero-architecture.jpg'}
              alt={home.hero.heroImageAlt || 'Northline Build architectural landmark'}
              aspectClass="aspect-[16/9] sm:aspect-[21/9]"
              priority
            />
          </motion.div>
        </div>

        {/* Kinetic Ticker Band */}
        <div className="mt-16 border-y border-[#111317]/10 bg-white/60 backdrop-blur-sm py-4 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-10 pr-10">
                {[
                  '01 / PLAN',
                  '02 / ENGINEER',
                  '03 / BUILD',
                  '04 / DELIVER',
                  'INDUSTRIAL',
                  'COMMERCIAL',
                  'HEALTHCARE',
                  'INSTITUTIONAL',
                ].map((token) => (
                  <span
                    key={`${loopIdx}-${token}`}
                    className="font-mono-label text-xs uppercase tracking-[0.25em] text-[#111317]/65 flex items-center gap-10"
                  >
                    <span>{token}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D95D39]" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTORY / OUR APPROACH SECTION */}
      <section className="py-20 sm:py-28 bg-[#F5F4F0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <RevealSection>
                <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                  {home.approach.label}
                </span>
              </RevealSection>

              <MaskedHeading
                text={home.approach.headline}
                className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-[#111317]"
              />

              <RevealSection delay={0.15}>
                <p className="text-base sm:text-lg text-[#111317]/75 leading-relaxed">
                  {home.approach.description}
                </p>
              </RevealSection>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#111317]/10">
                <ParallaxImage
                  src={home.approach.image || '/uploads/seed/approach-blueprint.jpg'}
                  alt={home.approach.imageAlt || 'Architectural blueprint and planning'}
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES SECTION (Dark Architectural Steel Theme) */}
      <section className="py-24 sm:py-32 bg-[#0B0D10] text-white bg-architectural-grid-dark">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
            <div className="lg:col-span-7 space-y-5">
              <RevealSection>
                <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                  {home.capabilities.label}
                </span>
              </RevealSection>
              <MaskedHeading
                text={home.capabilities.headline}
                className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-white"
              />
            </div>
            <RevealSection delay={0.15} className="lg:col-span-5 flex items-end">
              <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                {home.capabilities.introduction}
              </p>
            </RevealSection>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {home.capabilities.items.map((item, idx) => (
              <motion.article
                key={`${item.number}-${item.title}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className="group relative rounded-2xl border border-white/10 bg-[#14171D] p-7 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] transition-colors duration-300 hover:border-[#D95D39]/70 active:border-[#D95D39]"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-label text-xs tracking-[0.2em] text-[#D95D39]">
                      {item.number} / {item.title}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#D95D39] transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
                </div>

                <div className="mt-8 h-[2px] w-full bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.75, delay: 0.15 + idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left center' }}
                    className="h-full w-full bg-[#D95D39] lg:w-0 lg:scale-x-100 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:w-full"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTORS SECTION */}
      <section className="py-24 sm:py-32 bg-[#F5F4F0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl space-y-5 mb-14">
            <RevealSection>
              <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                {home.sectors.label}
              </span>
            </RevealSection>
            <MaskedHeading
              text={home.sectors.headline}
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-[#111317]"
            />
            <RevealSection delay={0.1}>
              <p className="text-base sm:text-lg text-[#111317]/75 leading-relaxed">
                {home.sectors.introduction}
              </p>
            </RevealSection>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Interactive Sector List (inline photo accordion on mobile + hover list on desktop) */}
            <div className="lg:col-span-7 divide-y divide-[#111317]/12 border-y border-[#111317]/12">
              {home.sectors.items.map((sector, idx) => {
                const isActive = idx === activeSector;
                return (
                  <motion.button
                    key={sector.title}
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveSector(idx)}
                    onMouseEnter={() => {
                      setActiveSector(idx);
                      setCursor('hover');
                    }}
                    onMouseLeave={resetCursor}
                    className={`w-full text-left py-5 sm:py-6 px-3 sm:px-5 transition-colors duration-300 ${
                      isActive ? 'bg-white rounded-xl my-1 shadow-sm' : 'hover:bg-white/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono-label text-xs text-[#D95D39]">
                            0{idx + 1}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111317]">
                            {sector.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base text-[#111317]/70 leading-relaxed pl-7">
                          {sector.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-300 ${
                          isActive
                            ? 'text-[#D95D39] rotate-45 lg:rotate-0 lg:translate-x-0.5 lg:-translate-y-0.5'
                            : 'text-[#111317]/30'
                        }`}
                      />
                    </div>

                    {/* Mobile Inline Expandable Sector Image */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="lg:hidden overflow-hidden pl-7"
                        >
                          <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#E4E2DA]">
                            <motion.img
                              initial={{ scale: 1.08 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                              src={sector.image || '/uploads/seed/project-foundry.jpg'}
                              alt={sector.imageAlt || sector.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Sticky Visual Preview with Scroll Reveal (Desktop) */}
            <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-28">
              <RevealSection delay={0.1}>
                <div className="rounded-2xl overflow-hidden bg-white border border-[#111317]/10 shadow-lg">
                  <motion.div
                    initial={{ clipPath: 'inset(12% 0% 12% 0%)', opacity: 0.75 }}
                    whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-[4/3] overflow-hidden relative bg-[#E4E2DA]"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeSectorItem?.image || activeSector}
                        src={activeSectorItem?.image || '/uploads/seed/project-foundry.jpg'}
                        alt={activeSectorItem?.imageAlt || activeSectorItem?.title}
                        initial={{ opacity: 0, scale: 1.08 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </motion.div>
                  <div className="p-6">
                    <span className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-[#D95D39]">
                      Sector Focus
                    </span>
                    <h4 className="font-display text-xl font-semibold mt-1 text-[#111317]">
                      {activeSectorItem?.title}
                    </h4>
                    <p className="text-sm text-[#111317]/70 mt-2">{activeSectorItem?.description}</p>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SELECTED PROJECTS SECTION */}
      <section id="selected-work" className="py-24 sm:py-32 bg-white border-y border-[#111317]/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-end">
            <div className="lg:col-span-7 space-y-5">
              <RevealSection>
                <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                  {home.selectedWork.label}
                </span>
              </RevealSection>
              <MaskedHeading
                text={home.selectedWork.headline}
                className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-[#111317]"
              />
            </div>
            <RevealSection delay={0.1} className="lg:col-span-5 space-y-3">
              <p className="text-base text-[#111317]/75 leading-relaxed">
                {home.selectedWork.introduction}
              </p>
              {home.selectedWork.disclaimer && (
                <p className="font-mono-label text-[11px] text-[#111317]/55 border-l-2 border-[#D95D39] pl-3">
                  {home.selectedWork.disclaimer}
                </p>
              )}
            </RevealSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.08 }}
                onClick={() => setSelectedProject(project)}
                onMouseEnter={() => setCursor('pill', 'VIEW')}
                onMouseLeave={resetCursor}
                className="group cursor-pointer flex flex-col justify-between rounded-2xl border border-[#111317]/10 bg-[#F5F4F0] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:border-[#D95D39]"
              >
                <div>
                  <div className="relative overflow-hidden bg-[#E4E2DA]">
                    <ParallaxImage
                      src={project.imageUrl || '/uploads/seed/project-foundry.jpg'}
                      alt={project.imageAlt || project.title}
                      aspectClass="aspect-[4/3]"
                      parallaxStrength={7}
                      zoomRange={[1.12, 1.02]}
                      revealDelay={idx * 0.08}
                      className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                    {project.isFictionalDemo && (
                      <span className="absolute top-3 left-3 z-10 rounded-full bg-[#0B0D10]/80 backdrop-blur-sm px-3 py-1 font-mono-label text-[10px] uppercase tracking-wider text-white">
                        Concept Entry
                      </span>
                    )}
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex flex-wrap items-center gap-2 font-mono-label text-[11px] uppercase tracking-wider text-[#D95D39]">
                      <span>{project.category}</span>
                      <span>/</span>
                      <span className="text-[#111317]/65">{project.location}</span>
                      <span>/</span>
                      <span className="text-[#111317]/65">{project.area}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-[#111317] group-hover:text-[#D95D39] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#111317]/75 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-mono-label uppercase tracking-wider text-[#111317]/60">
                  <span>Inspect Brief</span>
                  <ArrowUpRight className="w-4 h-4 text-[#D95D39] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY NORTHLINE SECTION */}
      <section className="py-24 sm:py-32 bg-[#F5F4F0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl space-y-5 mb-16">
            <RevealSection>
              <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                {home.whyNorthline.label}
              </span>
            </RevealSection>
            <MaskedHeading
              text={home.whyNorthline.headline}
              className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] text-[#111317]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {home.whyNorthline.items.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.985 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-white p-8 sm:p-10 border border-[#111317]/10 hover:border-[#D95D39]/50 transition-colors"
              >
                <span className="font-mono-label text-xs text-[#D95D39] tracking-widest">
                  0{idx + 1}
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#111317] mt-3 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-base text-[#111317]/75 leading-relaxed">{pillar.description}</p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.1 + idx * 0.08 }}
                  style={{ transformOrigin: 'left center' }}
                  className="mt-6 h-[2px] w-16 bg-[#D95D39]/70 rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA SECTION */}
      <section className="py-24 sm:py-32 bg-[#14171D] text-white relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center space-y-8 relative z-10">
          <MaskedHeading
            text={home.closingCta.headline}
            className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white justify-center"
          />
          <RevealSection delay={0.1}>
            <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              {home.closingCta.supportingText}
            </p>
          </RevealSection>
          <RevealSection delay={0.2}>
            <MagneticButton to={home.closingCta.buttonLink || '/contact'} variant="accent">
              <span>{home.closingCta.buttonLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
          </RevealSection>
        </div>
      </section>

      {/* PROJECT DETAIL MODAL (Swipe-down bottom sheet on mobile) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.45 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 90 || info.velocity.y > 400) {
                  setSelectedProject(null);
                }
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F5F4F0] text-[#111317] rounded-t-3xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            >
              <div className="sm:hidden flex justify-center pt-3 pb-1 bg-[#F5F4F0]">
                <span className="w-10 h-1 rounded-full bg-[#111317]/20" />
              </div>
              <div className="relative aspect-[16/9] bg-[#E4E2DA]">
                <img
                  src={selectedProject.imageUrl || '/uploads/seed/project-foundry.jpg'}
                  alt={selectedProject.imageAlt || selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 text-[#111317] flex items-center justify-center hover:bg-[#D95D39] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-[#111317] px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider text-white">
                    {selectedProject.category}
                  </span>
                  {selectedProject.isFictionalDemo && (
                    <span className="rounded-full border border-[#D95D39]/40 bg-[#D95D39]/10 px-3 py-1 font-mono-label text-[11px] uppercase tracking-wider text-[#D95D39]">
                      Fictional Demonstration Concept
                    </span>
                  )}
                </div>
                <h3 className="font-display text-3xl font-bold tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-6 text-sm text-[#111317]/75">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D95D39]" />
                    {selectedProject.location}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Maximize2 className="w-4 h-4 text-[#D95D39]" />
                    {selectedProject.area}
                  </span>
                </div>
                <p className="text-base text-[#111317]/80 leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="pt-3 flex flex-wrap justify-between items-center gap-4 border-t border-[#111317]/10">
                  <span className="text-xs text-[#111317]/55">
                    Interested in a similar facility or development brief?
                  </span>
                  <MagneticButton to="/contact" variant="primary" onClick={() => setSelectedProject(null)}>
                    <span>Start a Similar Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
