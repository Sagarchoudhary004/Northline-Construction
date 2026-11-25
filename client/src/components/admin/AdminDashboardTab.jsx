import { useEffect, useState } from 'react';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Image as ImageIcon,
  Inbox,
  RefreshCw,
} from 'lucide-react';
import { dashboardService } from '../../services';

export default function AdminDashboardTab({ onNavigateTab }) {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOverview = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await dashboardService.getOverview();
      setOverview(data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard overview.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOverview();
  }, []);

  if (loading) {
    return <div className="py-16 text-center text-sm text-slate-500">Loading dashboard metrics...</div>;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    );
  }

  const { enquiries, projects, media, contentStatus } = overview;

  const cards = [
    {
      label: 'Total Enquiries',
      value: enquiries.total,
      sub: `${enquiries.newCount} New • ${enquiries.inProgressCount} In Progress`,
      icon: Inbox,
      tab: 'enquiries',
    },
    {
      label: 'Portfolio Projects',
      value: projects.total,
      sub: `${projects.published} Published • ${projects.drafts} Hidden`,
      icon: Briefcase,
      tab: 'projects',
    },
    {
      label: 'Media Assets',
      value: media.total,
      sub:
        media.storage.activeProvider === 'cloudinary'
          ? 'Cloudinary Connected'
          : 'Local Storage Fallback',
      icon: ImageIcon,
      tab: 'media',
    },
    {
      label: 'Content Status',
      value: contentStatus.initialized ? 'Live' : 'Pending',
      sub: contentStatus.lastUpdatedAt
        ? `Updated ${new Date(contentStatus.lastUpdatedAt).toLocaleDateString()}`
        : 'Ready',
      icon: CheckCircle2,
      tab: 'home',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Dashboard Overview</h2>
          <p className="text-sm text-slate-500">
            Live summary of enquiries, published content, projects and media storage.
          </p>
        </div>
        <button
          type="button"
          onClick={loadOverview}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              type="button"
              onClick={() => onNavigateTab(card.tab)}
              className="text-left rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#D95D39] transition-colors shadow-2xs"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-label text-[11px] uppercase tracking-wider text-slate-500">
                  {card.label}
                </span>
                <Icon className="w-5 h-5 text-[#D95D39]" />
              </div>
              <div className="font-display text-3xl font-bold text-slate-900">{card.value}</div>
              <p className="mt-1.5 text-xs text-slate-500">{card.sub}</p>
            </button>
          );
        })}
      </div>

      {/* Recent Enquiries + Content Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 rounded-2xl border border-slate-200 bg-white overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Recent Project Enquiries
            </h3>
            <button
              type="button"
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs font-medium text-[#D95D39] hover:underline"
            >
              Manage All Enquiries →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {enquiries.recent.length === 0 ? (
              <p className="p-6 text-sm text-slate-500">No enquiries submitted yet.</p>
            ) : (
              enquiries.recent.map((item) => (
                <div
                  key={item._id}
                  className="px-6 py-4 flex flex-wrap items-center justify-between gap-4 hover:bg-slate-50"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-900">
                      {item.fullName}{' '}
                      {item.company && (
                        <span className="text-slate-400 font-normal">• {item.company}</span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.projectType} {item.location ? `• ${item.location}` : ''} • {item.email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700">
                      {item.status}
                    </span>
                    <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-6 space-y-5">
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Website Content Status
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { label: 'Home Page Content', ok: contentStatus.homeSectionsReady, tab: 'home' },
              { label: 'About Us Content', ok: contentStatus.aboutSectionsReady, tab: 'about' },
              { label: 'Contact & Footer Info', ok: contentStatus.contactReady, tab: 'contact' },
              { label: 'Published Projects', ok: projects.published > 0, tab: 'projects' },
            ].map((row) => (
              <li
                key={row.label}
                className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
              >
                <span className="text-slate-700">{row.label}</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab(row.tab)}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    row.ok
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {row.ok ? 'Active' : 'Needs Review'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
