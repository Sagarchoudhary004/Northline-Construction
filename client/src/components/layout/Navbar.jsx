import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Compass, Home, Mail, Menu, ShieldCheck, X } from 'lucide-react';
import BrandMark from '../common/BrandMark';
import { useAuth } from '../../context/AuthContext';
import { useCursor } from '../../context/CursorContext';

const NAV_LINKS = [
  { label: 'Home', shortLabel: 'Home', to: '/', icon: Home },
  { label: 'About Us', shortLabel: 'About', to: '/about', icon: Compass },
  { label: 'Contact', shortLabel: 'Contact', to: '/contact', icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setCursor, resetCursor } = useCursor();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F5F4F0]/90 backdrop-blur-md border-b border-[#111317]/10 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
          <Link
            to="/"
            onMouseEnter={() => setCursor('hover')}
            onMouseLeave={resetCursor}
            aria-label="Northline Build Home"
          >
            <BrandMark />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onMouseEnter={() => setCursor('hover')}
                onMouseLeave={resetCursor}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                    isActive ? 'text-[#111317]' : 'text-[#111317]/65 hover:text-[#111317]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute bottom-0.5 left-4 right-4 h-[2px] bg-[#D95D39]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Explicit Admin Tab requested by user */}
            <NavLink
              to="/admin"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className={({ isActive }) =>
                `ml-2 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-mono-label uppercase tracking-wider transition-all border ${
                  isActive
                    ? 'bg-[#111317] text-white border-[#111317]'
                    : 'bg-white/70 text-[#111317] border-[#111317]/15 hover:bg-[#111317] hover:text-white'
                }`
              }
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D95D39]" />
              <span>{isAuthenticated ? 'Admin Panel' : 'Admin'}</span>
            </NavLink>

            <Link
              to="/contact"
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-[#111317] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-[#D95D39]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </nav>

          {/* Mobile Quick Admin + Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 rounded-full border border-[#111317]/15 bg-white/85 px-3 py-2 text-[11px] font-mono-label uppercase tracking-wider text-[#111317] active:scale-95 transition-transform"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D95D39]" />
              <span>Admin</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#111317]/15 bg-white/85 text-[#111317]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0B0D10] text-white flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-5">
              {[...NAV_LINKS, { label: isAuthenticated ? 'Admin Panel' : 'Admin Login', to: '/admin' }].map(
                (item, idx) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + idx * 0.06, duration: 0.45 }}
                  >
                    <Link
                      to={item.to}
                      className="font-display text-4xl font-semibold tracking-tight text-white hover:text-[#D95D39] transition-colors flex items-center justify-between border-b border-white/10 pb-4"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-6 h-6 text-[#D95D39]" />
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <div className="space-y-4">
              <p className="font-mono-label text-xs uppercase tracking-widest text-white/50">
                Building with purpose. Delivering with care.
              </p>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D95D39] px-6 py-4 text-sm font-medium uppercase tracking-wider text-white"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Bottom Dock for one-thumb interactive navigation */}
      {!mobileOpen && (
        <motion.nav
          aria-label="Mobile quick navigation"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-3 inset-x-3 z-40 md:hidden grid grid-cols-4 gap-1 rounded-full bg-[#0B0D10]/92 backdrop-blur-lg border border-white/15 p-1.5 shadow-2xl shadow-black/30"
        >
          {[
            ...NAV_LINKS,
            { label: 'Admin', shortLabel: 'Admin', to: '/admin', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            const active =
              item.to === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative flex flex-col items-center justify-center gap-0.5 rounded-full py-1.5 px-1 text-[10px] font-medium tracking-wide transition-colors ${
                  active ? 'text-white' : 'text-white/65 active:text-white'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="mobile-dock-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#D95D39]"
                  />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5 shrink-0" />
                <span className="relative z-10 truncate max-w-full">{item.shortLabel}</span>
              </Link>
            );
          })}
        </motion.nav>
      )}
    </>
  );
}
