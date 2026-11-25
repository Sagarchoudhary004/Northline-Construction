import { useEffect, useState } from 'react';
import { Eye, Search, Trash2, X } from 'lucide-react';
import { enquiryService } from '../../services';

const STATUS_OPTIONS = ['All', 'New', 'In Progress', 'Responded', 'Closed'];

const STATUS_BADGE = {
  New: 'bg-blue-50 text-blue-700 border-blue-200',
  'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
  Responded: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-slate-100 text-slate-600 border-slate-200',
};

export default function AdminEnquiriesTab() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await enquiryService.list({ status: statusFilter, search });
      setEnquiries(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEnquiries();
  };

  const openDetails = (item) => {
    setSelected(item);
    setNotes(item.adminNotes || '');
  };

  const handleUpdate = async (newStatus) => {
    if (!selected) return;
    setUpdating(true);
    try {
      const updated = await enquiryService.update(selected._id, {
        status: newStatus || selected.status,
        adminNotes: notes,
      });
      setSelected(updated);
      await loadEnquiries();
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    await enquiryService.remove(id);
    if (selected?._id === id) setSelected(null);
    loadEnquiries();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-slate-900">Enquiry Management</h2>
        <p className="text-sm text-slate-500">
          Review, search, filter, update workflow status, and manage project submissions.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-[#111317] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:w-80">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, location..."
              className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm focus:border-[#D95D39] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-[#111317] px-4 py-2 text-xs font-medium text-white hover:bg-[#D95D39]"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">No matching enquiries found.</div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 font-mono-label text-[11px] uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-5">Client</th>
                <th className="py-3.5 px-4">Project Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Received</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {enquiries.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="py-4 px-5">
                    <p className="font-medium text-slate-900">{item.fullName}</p>
                    <p className="text-xs text-slate-500">
                      {item.company ? `${item.company} • ` : ''}
                      {item.email}
                    </p>
                  </td>
                  <td className="py-4 px-4 text-slate-700">{item.projectType}</td>
                  <td className="py-4 px-4 text-slate-600">{item.location || '—'}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_BADGE[item.status] || STATUS_BADGE.New
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openDetails(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-900">
                  {selected.fullName}
                </h3>
                <p className="text-xs text-slate-500">
                  Submitted {new Date(selected.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4 border border-slate-200">
                <div>
                  <span className="text-xs text-slate-400">Company</span>
                  <p className="font-medium text-slate-800">{selected.company || '—'}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Work Email</span>
                  <p className="font-medium text-slate-800">{selected.email}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Phone</span>
                  <p className="font-medium text-slate-800">{selected.phone}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Project Type</span>
                  <p className="font-medium text-slate-800">{selected.projectType}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Location</span>
                  <p className="font-medium text-slate-800">{selected.location || '—'}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Approximate Area / Start</span>
                  <p className="font-medium text-slate-800">
                    {selected.approximateArea || '—'} • {selected.expectedStart || '—'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-mono-label text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Project Brief / Message
                </h4>
                <p className="rounded-xl border border-slate-200 p-4 text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>

              <div>
                <label className="block font-mono-label text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Update Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {['New', 'In Progress', 'Responded', 'Closed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdate(st)}
                      className={`rounded-full px-4 py-1.5 text-xs font-medium border transition-colors ${
                        selected.status === st
                          ? 'bg-[#D95D39] text-white border-[#D95D39]'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-mono-label text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Internal Admin Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-[#D95D39] focus:outline-none"
                  placeholder="Add follow-up notes..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={updating}
                  onClick={() => handleUpdate(selected.status)}
                  className="rounded-full bg-[#111317] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#D95D39]"
                >
                  {updating ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
