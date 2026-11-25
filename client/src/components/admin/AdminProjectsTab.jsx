import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  Edit3,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { projectService } from '../../services';
import { useSite } from '../../context/SiteContext';
import AdminImagePicker from './AdminImagePicker';

const EMPTY_PROJECT = {
  title: '',
  category: 'Commercial',
  location: '',
  area: '',
  description: '',
  imageUrl: '',
  imageAlt: '',
  published: true,
  isFictionalDemo: true,
};

export default function AdminProjectsTab() {
  const { refreshSiteData } = useSite();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    setLoading(true);
    try {
      const list = await projectService.getAllProjectsAdmin();
      setProjects(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing._id) {
        await projectService.updateProject(editing._id, editing);
      } else {
        await projectService.createProject(editing);
      }
      setEditing(null);
      await loadProjects();
      await refreshSiteData();
    } catch (err) {
      setError(err.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  const handleMove = async (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= projects.length) return;
    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(target, 0, moved);
    setProjects(updated);
    try {
      await projectService.reorderProjects(updated.map((p) => p._id));
      await refreshSiteData();
    } catch (err) {
      setError(err.message);
      loadProjects();
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await projectService.togglePublish(id);
      await loadProjects();
      await refreshSiteData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This action cannot be undone.`)) return;
    try {
      await projectService.deleteProject(id);
      await loadProjects();
      await refreshSiteData();
    } catch (err) {
      setError(err.message);
    }
  };

  const inputCls =
    'w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-[#D95D39] focus:outline-none';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">Project Management</h2>
          <p className="text-sm text-slate-500">
            Add, edit, reorder, publish/unpublish, and manage portfolio project photography.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY_PROJECT })}
          className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-16 text-center text-sm text-slate-500">Loading projects...</div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, idx) => (
            <div
              key={project._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-semibold text-slate-900 truncate">
                      {project.title}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono-label uppercase ${
                        project.published
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {project.published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {project.category} • {project.location} • {project.area}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, -1)}
                  title="Move up"
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  disabled={idx === projects.length - 1}
                  onClick={() => handleMove(idx, 1)}
                  title="Move down"
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleTogglePublish(project._id)}
                  title={project.published ? 'Unpublish' : 'Publish'}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  {project.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{project.published ? 'Unpublish' : 'Publish'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...project })}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project._id, project.title)}
                  className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                {editing._id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Title *</label>
                  <input
                    required
                    className={inputCls}
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Category *</label>
                  <input
                    required
                    className={inputCls}
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Location *</label>
                  <input
                    required
                    className={inputCls}
                    value={editing.location}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Area *</label>
                  <input
                    required
                    className={inputCls}
                    value={editing.area}
                    onChange={(e) => setEditing({ ...editing, area: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  className={inputCls}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>

              <AdminImagePicker
                label="Project Photograph"
                category="project"
                value={editing.imageUrl || ''}
                onChange={(url) => setEditing({ ...editing, imageUrl: url })}
              />

              <div className="flex flex-wrap gap-6 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.published)}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                  />
                  <span>Published on Home Page</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.isFictionalDemo)}
                    onChange={(e) => setEditing({ ...editing, isFictionalDemo: e.target.checked })}
                  />
                  <span>Mark as Concept / Demonstration Entry</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-slate-200 px-5 py-2.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#D95D39] px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c] disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
