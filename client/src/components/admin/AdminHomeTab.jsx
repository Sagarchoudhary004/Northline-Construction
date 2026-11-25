import { useEffect, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { contentService } from '../../services';
import AdminImagePicker from './AdminImagePicker';

export default function AdminHomeTab() {
  const { content, refreshSiteData } = useSite();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.home) {
      setForm(structuredClone(content.home));
    }
  }, [content]);

  if (!form) return null;

  const updateField = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setForm((prev) => {
      const items = [...prev[section].items];
      items[index] = { ...items[index], [field]: value };
      return {
        ...prev,
        [section]: { ...prev[section], items },
      };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg('');
    setError('');
    try {
      await contentService.updateSection('home', form);
      await refreshSiteData();
      setSavedMsg('Home page content saved and published to live website.');
    } catch (err) {
      setError(err.message || 'Failed to save Home content.');
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#D95D39] focus:outline-none';

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Home Page Content</h2>
          <p className="text-sm text-slate-500">
            Edit headlines, CTAs, capability cards, sector cards, and hero/section photography.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c] disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Home Content'}</span>
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

      {/* Hero Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          1. Hero Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Eyebrow</label>
            <input
              className={inputCls}
              value={form.hero.eyebrow}
              onChange={(e) => updateField('hero', 'eyebrow', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Headline</label>
            <input
              className={inputCls}
              value={form.hero.headline}
              onChange={(e) => updateField('hero', 'headline', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Supporting Text</label>
            <textarea
              rows={2}
              className={inputCls}
              value={form.hero.supportingText}
              onChange={(e) => updateField('hero', 'supportingText', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Primary CTA Label</label>
            <input
              className={inputCls}
              value={form.hero.primaryCtaLabel}
              onChange={(e) => updateField('hero', 'primaryCtaLabel', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Primary CTA Link</label>
            <input
              className={inputCls}
              value={form.hero.primaryCtaLink}
              onChange={(e) => updateField('hero', 'primaryCtaLink', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Secondary CTA Label</label>
            <input
              className={inputCls}
              value={form.hero.secondaryCtaLabel}
              onChange={(e) => updateField('hero', 'secondaryCtaLabel', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Secondary CTA Link</label>
            <input
              className={inputCls}
              value={form.hero.secondaryCtaLink}
              onChange={(e) => updateField('hero', 'secondaryCtaLink', e.target.value)}
            />
          </div>
        </div>
        <AdminImagePicker
          label="Hero Banner Photograph"
          category="hero"
          value={form.hero.heroImage || ''}
          onChange={(url) => updateField('hero', 'heroImage', url)}
        />
      </section>

      {/* Approach Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          2. Introductory Approach Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Section Label</label>
            <input
              className={inputCls}
              value={form.approach.label}
              onChange={(e) => updateField('approach', 'label', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Headline</label>
            <input
              className={inputCls}
              value={form.approach.headline}
              onChange={(e) => updateField('approach', 'headline', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Description</label>
            <textarea
              rows={3}
              className={inputCls}
              value={form.approach.description}
              onChange={(e) => updateField('approach', 'description', e.target.value)}
            />
          </div>
        </div>
        <AdminImagePicker
          label="Approach Section Photograph"
          category="about"
          value={form.approach.image || ''}
          onChange={(url) => updateField('approach', 'image', url)}
        />
      </section>

      {/* Capabilities Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          3. Capabilities Section (01–04)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Section Label</label>
            <input
              className={inputCls}
              value={form.capabilities.label}
              onChange={(e) => updateField('capabilities', 'label', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Headline</label>
            <input
              className={inputCls}
              value={form.capabilities.headline}
              onChange={(e) => updateField('capabilities', 'headline', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Introduction</label>
            <textarea
              rows={2}
              className={inputCls}
              value={form.capabilities.introduction}
              onChange={(e) => updateField('capabilities', 'introduction', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.capabilities.items.map((item, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <input
                  className={inputCls}
                  value={item.number}
                  onChange={(e) => updateArrayItem('capabilities', idx, 'number', e.target.value)}
                  placeholder="01"
                />
                <input
                  className={`${inputCls} col-span-2`}
                  value={item.title}
                  onChange={(e) => updateArrayItem('capabilities', idx, 'title', e.target.value)}
                  placeholder="Title"
                />
              </div>
              <textarea
                rows={3}
                className={inputCls}
                value={item.description}
                onChange={(e) => updateArrayItem('capabilities', idx, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Sectors Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          4. Sectors Section
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Section Label</label>
            <input
              className={inputCls}
              value={form.sectors.label}
              onChange={(e) => updateField('sectors', 'label', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Headline</label>
            <input
              className={inputCls}
              value={form.sectors.headline}
              onChange={(e) => updateField('sectors', 'headline', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Introduction</label>
            <textarea
              rows={2}
              className={inputCls}
              value={form.sectors.introduction}
              onChange={(e) => updateField('sectors', 'introduction', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {form.sectors.items.map((sector, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <input
                className={inputCls}
                value={sector.title}
                onChange={(e) => updateArrayItem('sectors', idx, 'title', e.target.value)}
                placeholder="Sector Title"
              />
              <textarea
                rows={2}
                className={inputCls}
                value={sector.description}
                onChange={(e) => updateArrayItem('sectors', idx, 'description', e.target.value)}
              />
              <AdminImagePicker
                label={`Sector Image (${sector.title})`}
                category="sector"
                value={sector.image || ''}
                onChange={(url) => updateArrayItem('sectors', idx, 'image', url)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Selected Work Header + Why Northline + Closing CTA */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          5. Selected Work Header, Why Northline & Closing CTA
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Selected Work Headline</label>
            <input
              className={inputCls}
              value={form.selectedWork.headline}
              onChange={(e) => updateField('selectedWork', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Selected Work Disclaimer</label>
            <input
              className={inputCls}
              value={form.selectedWork.disclaimer}
              onChange={(e) => updateField('selectedWork', 'disclaimer', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Why Northline Headline</label>
            <input
              className={inputCls}
              value={form.whyNorthline.headline}
              onChange={(e) => updateField('whyNorthline', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Closing CTA Headline</label>
            <input
              className={inputCls}
              value={form.closingCta.headline}
              onChange={(e) => updateField('closingCta', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Closing CTA Button Label</label>
            <input
              className={inputCls}
              value={form.closingCta.buttonLabel}
              onChange={(e) => updateField('closingCta', 'buttonLabel', e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-600 mb-1">Closing CTA Supporting Text</label>
            <textarea
              rows={2}
              className={inputCls}
              value={form.closingCta.supportingText}
              onChange={(e) => updateField('closingCta', 'supportingText', e.target.value)}
            />
          </div>
        </div>
      </section>
    </form>
  );
}
