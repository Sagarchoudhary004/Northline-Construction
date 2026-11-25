import { useEffect, useState } from 'react';
import { CheckCircle2, Plus, Save, Trash2 } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { contentService } from '../../services';

export default function AdminContactTab() {
  const { content, refreshSiteData } = useSite();
  const [contactForm, setContactForm] = useState(null);
  const [footerForm, setFooterForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.contact && content?.footer) {
      setContactForm(structuredClone(content.contact));
      setFooterForm(structuredClone(content.footer));
    }
  }, [content]);

  if (!contactForm || !footerForm) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    setError('');
    try {
      await Promise.all([
        contentService.updateSection('contact', contactForm),
        contentService.updateSection('footer', footerForm),
      ]);
      await refreshSiteData();
      setSavedMsg('Contact & footer details updated across the website.');
    } catch (err) {
      setError(err.message || 'Failed to save contact settings.');
    } finally {
      setSaving(false);
    }
  };

  const addSocial = () => {
    setContactForm((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        socialLinks: [
          ...(prev.info.socialLinks || []),
          { platform: 'LinkedIn', label: 'LinkedIn', url: 'https://linkedin.com' },
        ],
      },
    }));
  };

  const updateSocial = (idx, field, value) => {
    setContactForm((prev) => {
      const next = [...prev.info.socialLinks];
      next[idx] = { ...next[idx], [field]: value };
      return { ...prev, info: { ...prev.info, socialLinks: next } };
    });
  };

  const removeSocial = (idx) => {
    setContactForm((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        socialLinks: prev.info.socialLinks.filter((_, i) => i !== idx),
      },
    }));
  };

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#D95D39] focus:outline-none';

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Contact & Footer</h2>
          <p className="text-sm text-slate-500">
            Update business email, phone number, office address, social profiles, and footer copy.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c]"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Contact & Footer'}</span>
        </button>
      </div>

      {savedMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-2.5 text-sm text-emerald-800">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedMsg}</span>
        </div>
      )}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          Direct Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Business Email</label>
            <input
              type="email"
              className={inputCls}
              value={contactForm.info.email}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  info: { ...contactForm.info, email: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Phone Number</label>
            <input
              className={inputCls}
              value={contactForm.info.phone}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  info: { ...contactForm.info, phone: e.target.value },
                })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Office Address</label>
            <input
              className={inputCls}
              value={contactForm.info.officeAddress}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  info: { ...contactForm.info, officeAddress: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono-label uppercase tracking-wider text-slate-600">
              Social Links
            </h4>
            <button
              type="button"
              onClick={addSocial}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Social Profile</span>
            </button>
          </div>
          {(contactForm.info.socialLinks || []).map((social, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-7 gap-2 items-center">
              <input
                className={`${inputCls} sm:col-span-2`}
                value={social.platform}
                onChange={(e) => updateSocial(idx, 'platform', e.target.value)}
                placeholder="Platform"
              />
              <input
                className={`${inputCls} sm:col-span-2`}
                value={social.label}
                onChange={(e) => updateSocial(idx, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                className={`${inputCls} sm:col-span-2`}
                value={social.url}
                onChange={(e) => updateSocial(idx, 'url', e.target.value)}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => removeSocial(idx)}
                className="p-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          Contact Page Copy & Footer Content
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Contact Hero Headline</label>
            <input
              className={inputCls}
              value={contactForm.hero.headline}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  hero: { ...contactForm.hero, headline: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Form Heading</label>
            <input
              className={inputCls}
              value={contactForm.form.heading}
              onChange={(e) =>
                setContactForm({
                  ...contactForm,
                  form: { ...contactForm.form, heading: e.target.value },
                })
              }
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Footer Brand Line</label>
            <input
              className={inputCls}
              value={footerForm.brandLine}
              onChange={(e) => setFooterForm({ ...footerForm, brandLine: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Footer CTA Text</label>
            <input
              className={inputCls}
              value={footerForm.ctaText}
              onChange={(e) => setFooterForm({ ...footerForm, ctaText: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Copyright Notice</label>
            <input
              className={inputCls}
              value={footerForm.copyrightText}
              onChange={(e) => setFooterForm({ ...footerForm, copyrightText: e.target.value })}
            />
          </div>
        </div>
      </section>
    </form>
  );
}
