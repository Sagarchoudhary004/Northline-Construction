import { useEffect, useRef, useState } from 'react';
import { Cloud, Copy, HardDrive, RefreshCw, Trash2, Upload, Check } from 'lucide-react';
import { mediaService } from '../../services';

const CATEGORIES = ['all', 'hero', 'sector', 'project', 'about', 'general'];

export default function AdminMediaTab() {
  const [items, setItems] = useState([]);
  const [storageStatus, setStorageStatus] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('general');
  const [uploadTitle, setUploadTitle] = useState('');
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const fileInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const [replacingId, setReplacingId] = useState(null);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const data = await mediaService.list(categoryFilter);
      setItems(data.items || []);
      setStorageStatus(data.storageStatus || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [categoryFilter]);

  const validateFile = (file) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.type)) {
      return 'Invalid file type. Only JPEG, PNG, WebP, and AVIF images are allowed.';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size exceeds 5 MB limit.';
    }
    return null;
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError('');

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    try {
      await mediaService.upload(file, {
        title: uploadTitle || file.name.replace(/\.[^/.]+$/, ''),
        category: uploadCategory,
      });
      setUploadTitle('');
      await loadMedia();
    } catch (err) {
      setError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const triggerReplace = (id) => {
    setReplacingId(id);
    replaceInputRef.current?.click();
  };

  const handleReplace = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replacingId) return;
    setError('');

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    try {
      await mediaService.replace(replacingId, file);
      await loadMedia();
    } catch (err) {
      setError(err.message || 'Replace failed.');
    } finally {
      setUploading(false);
      setReplacingId(null);
      if (replaceInputRef.current) replaceInputRef.current.value = '';
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Remove "${title}" from media library?`)) return;
    try {
      await mediaService.remove(id);
      await loadMedia();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.url);
    setCopiedId(item._id);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Media Management (Multer + Cloudinary)
          </h2>
          <p className="text-sm text-slate-500">
            Upload, replace, and remove images with strict file type (JPEG/PNG/WebP/AVIF) and 5 MB validation.
          </p>
        </div>

        {storageStatus && (
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium border ${
              storageStatus.cloudinaryConfigured
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {storageStatus.cloudinaryConfigured ? (
              <>
                <Cloud className="w-3.5 h-3.5" />
                <span>Cloudinary Cloud Active</span>
              </>
            ) : (
              <>
                <HardDrive className="w-3.5 h-3.5" />
                <span>Local Fallback (Set Cloudinary keys in server/.env)</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Upload Box */}
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Image Title (optional)
            </label>
            <input
              type="text"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              placeholder="e.g. Site Elevation View"
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm focus:border-[#D95D39] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
            <select
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-sm focus:border-[#D95D39] focus:outline-none"
            >
              {CATEGORIES.filter((c) => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>
                  {cat.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleUpload}
            className="hidden"
          />
          <input
            ref={replaceInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleReplace}
            className="hidden"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-[#D95D39] px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c] disabled:opacity-60"
          >
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-mono-label uppercase tracking-wider transition-colors ${
              categoryFilter === cat
                ? 'bg-[#111317] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-12 text-center text-sm text-slate-500">Loading media assets...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 relative">
                  <img
                    src={item.url}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-black/70 px-2.5 py-0.5 font-mono-label text-[10px] uppercase text-white">
                    {item.category}
                  </span>
                  <span className="absolute top-2.5 right-2.5 rounded-full bg-white/90 px-2 py-0.5 font-mono-label text-[10px] uppercase text-slate-700">
                    {item.storageProvider}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-sm text-slate-900 truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.url}</p>
                </div>
              </div>

              <div className="px-4 pb-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                >
                  {copiedId === item._id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => triggerReplace(item._id)}
                    title="Replace image"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id, item.title)}
                    title="Delete image"
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
