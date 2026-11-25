import { useEffect, useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import { contentService } from '../../services';
import AdminImagePicker from './AdminImagePicker';

export default function AdminAboutTab() {
  const { content, refreshSiteData } = useSite();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (content?.about) {
      setForm(structuredClone(content.about));
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
      await contentService.updateSection('about', form);
      await refreshSiteData();
      setSavedMsg('About page content saved and published.');
    } catch (err) {
      setError(err.message || 'Failed to save About content.');
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
          <h2 className="font-display text-2xl font-bold text-slate-900">About Us Content</h2>
          <p className="text-sm text-slate-500">
            Update story, approach, core values, process steps, and about photography.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c] disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Content'}</span>
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

      {/* About Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          1. About Hero
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
              rows={3}
              className={inputCls}
              value={form.hero.supportingText}
              onChange={(e) => updateField('hero', 'supportingText', e.target.value)}
            />
          </div>
        </div>
        <AdminImagePicker
          label="About Hero Photograph"
          category="about"
          value={form.hero.image || ''}
          onChange={(url) => updateField('hero', 'image', url)}
        />
      </section>

      {/* Story & Approach */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          2. Our Story & Approach
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Story Headline</label>
            <input
              className={inputCls}
              value={form.story.headline}
              onChange={(e) => updateField('story', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Story Description</label>
            <textarea
              rows={3}
              className={inputCls}
              value={form.story.description}
              onChange={(e) => updateField('story', 'description', e.target.value)}
            />
          </div>
          <AdminImagePicker
            label="Story Section Photograph"
            category="about"
            value={form.story.image || ''}
            onChange={(url) => updateField('story', 'image', url)}
          />
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Approach Headline</label>
            <input
              className={inputCls}
              value={form.approach.headline}
              onChange={(e) => updateField('approach', 'headline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Approach Description</label>
            <textarea
              rows={3}
              className={inputCls}
              value={form.approach.description}
              onChange={(e) => updateField('approach', 'description', e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Values & Process */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
        <h3 className="font-display text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
          3. Core Values & Process Steps
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.values.items.map((val, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <input
                className={inputCls}
                value={val.title}
                onChange={(e) => updateArrayItem('values', idx, 'title', e.target.value)}
              />
              <textarea
                rows={2}
                className={inputCls}
                value={val.description}
                onChange={(e) => updateArrayItem('values', idx, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <label className="block text-xs font-medium text-slate-600 mb-1">Process Headline</label>
          <input
            className={inputCls}
            value={form.process.headline}
            onChange={(e) => updateField('process', 'headline', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.process.items.map((step, idx) => (
            <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <input
                  className={inputCls}
                  value={step.number}
                  onChange={(e) => updateArrayItem('process', idx, 'number', e.target.value)}
                />
                <input
                  className={`${inputCls} col-span-2`}
                  value={step.title}
                  onChange={(e) => updateArrayItem('process', idx, 'title', e.target.value)}
                />
              </div>
              <textarea
                rows={2}
                className={inputCls}
                value={step.description}
                onChange={(e) => updateArrayItem('process', idx, 'description', e.target.value)}
              />
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}
