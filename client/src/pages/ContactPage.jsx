import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { enquiryService } from '../services';
import MaskedHeading from '../components/motion/MaskedHeading';
import RevealSection from '../components/motion/RevealSection';
import MagneticButton from '../components/motion/MagneticButton';

const PROJECT_TYPES = [
  'Industrial',
  'Commercial',
  'Institutional',
  'Healthcare',
  'Hospitality',
  'Residential',
  'Other',
];

const INITIAL_FORM = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  projectType: 'Commercial',
  location: '',
  approximateArea: '',
  expectedStart: '',
  message: '',
};

export default function ContactPage() {
  const { content } = useSite();
  const contact = content?.contact;
  const seo = content?.seo?.contact;

  useDocumentMeta(seo?.title || 'Contact Us — Northline Build', seo?.description || '');

  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  if (!contact) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    if (!form.fullName.trim() || !form.email.trim() || !form.phone.trim() || !form.message.trim()) {
      setStatus({
        type: 'error',
        message: contact.form.errorMessage,
      });
      return;
    }

    setSubmitting(true);
    try {
      await enquiryService.submit(form);
      setStatus({
        type: 'success',
        message: contact.form.successMessage,
      });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: 'error',
        message: contact.form.errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-[#111317]/15 bg-[#F5F4F0]/60 px-4 py-3.5 text-sm text-[#111317] placeholder:text-[#111317]/40 focus:border-[#D95D39] focus:bg-white focus:outline-none transition-colors';

  return (
    <div className="overflow-x-hidden">
      {/* 1. CONTACT HERO */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 bg-architectural-grid">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono-label text-xs uppercase tracking-[0.24em] text-[#D95D39] mb-6"
          >
            CONTACT NORTHLINE
          </motion.p>
          <MaskedHeading
            text={contact.hero.headline}
            as="h1"
            immediate
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.03em] leading-[1.02] text-[#111317] max-w-4xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-[#111317]/75 max-w-3xl leading-relaxed"
          >
            {contact.hero.supportingText}
          </motion.p>
        </div>
      </section>

      {/* 2. FORM & DIRECT INFO */}
      <section className="py-16 sm:py-24 bg-[#F5F4F0]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Enquiry Form */}
          <RevealSection className="lg:col-span-7 rounded-2xl bg-white border border-[#111317]/10 p-6 sm:p-10 shadow-sm">
            <div className="mb-8 space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#111317]">
                {contact.form.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#111317]/70">
                {contact.form.supportingText}
              </p>
            </div>

            {status.type === 'success' && (
              <div
                role="status"
                className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-start gap-3 text-emerald-900"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <p className="text-sm leading-relaxed">{status.message}</p>
              </div>
            )}

            {status.type === 'error' && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3 text-red-900"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <p className="text-sm leading-relaxed">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Full Name <span className="text-[#D95D39]">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Company / Organisation
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Organisation name"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Work Email <span className="text-[#D95D39]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Phone Number <span className="text-[#D95D39]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98000 00000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Project Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City / Region"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="approximateArea" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Approximate Project Area (optional)
                  </label>
                  <input
                    id="approximateArea"
                    name="approximateArea"
                    type="text"
                    value={form.approximateArea}
                    onChange={handleChange}
                    placeholder="e.g. 50,000 sq. ft."
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="expectedStart" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                    Expected Project Start (optional)
                  </label>
                  <input
                    id="expectedStart"
                    name="expectedStart"
                    type="text"
                    value={form.expectedStart}
                    onChange={handleChange}
                    placeholder="e.g. Q3 2026"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono-label uppercase tracking-wider text-[#111317]/70 mb-2">
                  Project Brief / Message <span className="text-[#D95D39]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share your site status, intended use, timeline or key requirements..."
                  className={inputClass}
                />
              </div>

              <div className="pt-2">
                <MagneticButton type="submit" variant="primary" disabled={submitting}>
                  <span>{submitting ? 'SENDING ENQUIRY...' : contact.form.submitLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </MagneticButton>
              </div>
            </form>
          </RevealSection>

          {/* Contact Info Block */}
          <RevealSection delay={0.12} className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#0B0D10] text-white p-8 sm:p-10 space-y-8">
              <div className="space-y-3">
                <span className="font-mono-label text-xs uppercase tracking-[0.22em] text-[#D95D39]">
                  Direct Channels
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                  {contact.info.heading}
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {contact.info.supportingText}
                </p>
              </div>

              <div className="space-y-5 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono-label text-[11px] uppercase tracking-wider text-white/45">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.info.email}`}
                      className="text-base text-white hover:text-[#D95D39] transition-colors"
                    >
                      {contact.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono-label text-[11px] uppercase tracking-wider text-white/45">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.info.phone}`}
                      className="text-base text-white hover:text-[#D95D39] transition-colors"
                    >
                      {contact.info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D95D39] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono-label text-[11px] uppercase tracking-wider text-white/45">
                      Office
                    </p>
                    <p className="text-base text-white/85 leading-relaxed">
                      {contact.info.officeAddress}
                    </p>
                  </div>
                </div>
              </div>

              {contact.info.socialLinks?.length > 0 && (
                <div className="pt-6 border-t border-white/10">
                  <p className="font-mono-label text-[11px] uppercase tracking-wider text-white/45 mb-3">
                    Connect
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {contact.info.socialLinks.map((social, idx) => (
                      <a
                        key={`${social.platform}-${idx}`}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-wider text-white hover:bg-[#D95D39] hover:border-[#D95D39] transition-colors"
                      >
                        <span>{social.label || social.platform}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
