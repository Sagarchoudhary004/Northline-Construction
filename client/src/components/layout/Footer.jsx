import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BrandMark from '../common/BrandMark';
import { useSite } from '../../context/SiteContext';
import { useCursor } from '../../context/CursorContext';

export default function Footer() {
  const { content } = useSite();
  const { setCursor, resetCursor } = useCursor();

  const footer = content?.footer || {
    brandLine: 'Building with purpose. Delivering with care.',
    ctaText: 'Have a project in mind? Let’s talk.',
    ctaButtonLabel: 'START A PROJECT',
    ctaLink: '/contact',
    copyrightText: '© 2026 Northline Build. All rights reserved.',
  };

  const contactInfo = content?.contact?.info || {};
  const socialLinks = contactInfo.socialLinks || [];

  return (
    <footer className="bg-[#0B0D10] text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <BrandMark light />
            <p className="text-lg text-white/80 max-w-sm leading-relaxed">{footer.brandLine}</p>
            <div className="pt-2 space-y-1 text-sm text-white/60">
              {contactInfo.email && <p>{contactInfo.email}</p>}
              {contactInfo.phone && <p>{contactInfo.phone}</p>}
              {contactInfo.officeAddress && <p className="max-w-xs">{contactInfo.officeAddress}</p>}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono-label text-xs uppercase tracking-[0.2em] text-white/45">
              Navigation
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  to="/"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="text-white/80 hover:text-[#D95D39] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="text-white/80 hover:text-[#D95D39] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="text-white/80 hover:text-[#D95D39] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  onMouseEnter={() => setCursor('hover')}
                  onMouseLeave={resetCursor}
                  className="text-white/80 hover:text-[#D95D39] transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <h3 className="font-mono-label text-xs uppercase tracking-[0.2em] text-white/45">
              Start a Conversation
            </h3>
            <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              {footer.ctaText}
            </p>
            <Link
              to={footer.ctaLink || '/contact'}
              onMouseEnter={() => setCursor('hover')}
              onMouseLeave={resetCursor}
              className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-6 py-3 text-xs font-medium uppercase tracking-wider text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#111317]"
            >
              <span>{footer.ctaButtonLabel || 'START A PROJECT'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <p>{footer.copyrightText}</p>
          {socialLinks.length > 0 && (
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={`${social.platform}-${idx}`}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="uppercase tracking-wider hover:text-white transition-colors"
                >
                  {social.label || social.platform}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
