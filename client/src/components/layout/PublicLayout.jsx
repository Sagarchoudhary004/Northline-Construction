import { Outlet, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from '../motion/CustomCursor';
import { useLenis } from '../../hooks/useLenis';
import { useSite } from '../../context/SiteContext';

export default function PublicLayout() {
  useLenis(true);
  const { loading, error, refreshSiteData } = useSite();
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-[#D95D39] animate-spin" />
        <p className="font-mono-label text-xs uppercase tracking-[0.25em] text-white/60">
          Loading Northline Build
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F4F0] text-[#111317] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <h1 className="font-display text-3xl font-semibold">Unable to connect to server</h1>
        <p className="text-sm text-[#111317]/70 max-w-md">{error}</p>
        <button
          type="button"
          onClick={refreshSiteData}
          className="rounded-full bg-[#111317] px-6 py-3 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#D95D39] transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#111317] pb-20 md:pb-0">
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D95D39] origin-left z-[60] pointer-events-none"
      />
      <CustomCursor />
      <Navbar />
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
}
