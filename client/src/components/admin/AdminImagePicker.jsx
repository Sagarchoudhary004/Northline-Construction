import { useRef, useState } from 'react';
import { Image as ImageIcon, Upload, X, Check } from 'lucide-react';
import { mediaService } from '../../services';

export default function AdminImagePicker({
  label = 'Image',
  value = '',
  onChange,
  category = 'general',
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [libraryItems, setLibraryItems] = useState([]);
  const [loadingLib, setLoadingLib] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowed.includes(file.type)) {
      setUploadError('Only JPEG, PNG, WebP, or AVIF images are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File exceeds 5 MB limit.');
      return;
    }

    setUploading(true);
    try {
      const uploaded = await mediaService.upload(file, {
        title: file.name.replace(/\.[^/.]+$/, ''),
        category,
      });
      onChange(uploaded.url);
    } catch (err) {
      setUploadError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const openLibrary = async () => {
    setLibraryOpen(true);
    setLoadingLib(true);
    try {
      const res = await mediaService.list('all');
      setLibraryItems(res.items || []);
    } catch {
      setLibraryItems([]);
    } finally {
      setLoadingLib(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-mono-label text-[11px] uppercase tracking-wider text-slate-600">
        {label}
      </label>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="w-28 h-20 rounded-lg overflow-hidden bg-slate-200 shrink-0 border border-slate-200 flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-slate-400" />
          )}
        </div>

        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/uploads/... or https://res.cloudinary.com/..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 focus:border-[#D95D39] focus:outline-none"
          />

          <div className="flex flex-wrap gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#111317] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#D95D39] transition-colors disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
            </button>

            <button
              type="button"
              onClick={openLibrary}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Choose from Library</span>
            </button>
          </div>

          {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
        </div>
      </div>

      {libraryOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[82vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Select Image from Media Library
              </h3>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 gap-4">
              {loadingLib ? (
                <p className="col-span-full text-center text-sm text-slate-500 py-8">
                  Loading media library...
                </p>
              ) : libraryItems.length === 0 ? (
                <p className="col-span-full text-center text-sm text-slate-500 py-8">
                  No uploaded images yet.
                </p>
              ) : (
                libraryItems.map((item) => {
                  const selected = value === item.url;
                  return (
                    <button
                      key={item._id}
                      type="button"
                      onClick={() => {
                        onChange(item.url);
                        setLibraryOpen(false);
                      }}
                      className={`group relative rounded-xl overflow-hidden border text-left transition-all ${
                        selected
                          ? 'border-[#D95D39] ring-2 ring-[#D95D39]'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div className="aspect-[4/3] bg-slate-100">
                        <img
                          src={item.url}
                          alt={item.alt || item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5 bg-white">
                        <p className="text-xs font-medium text-slate-800 truncate">{item.title}</p>
                        <p className="text-[10px] font-mono-label uppercase text-slate-400">
                          {item.storageProvider}
                        </p>
                      </div>
                      {selected && (
                        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#D95D39] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
