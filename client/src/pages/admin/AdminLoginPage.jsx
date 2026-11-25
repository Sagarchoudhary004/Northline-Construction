import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useDocumentMeta } from '../../hooks/useDocumentMeta';
import BrandMark from '../../components/common/BrandMark';

export default function AdminLoginPage() {
  const { isAuthenticated, checking, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useDocumentMeta('Admin Login — Northline Build', 'Secure content management login.');

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0B0D10] text-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#D95D39] animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col justify-between p-6 sm:p-10 bg-architectural-grid-dark">
      <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
        <Link to="/">
          <BrandMark light />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono-label uppercase tracking-wider text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Website</span>
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-12 rounded-2xl border border-white/10 bg-[#14171D] p-8 sm:p-10 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#D95D39]/15 border border-[#D95D39]/30 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-[#D95D39]" />
          </div>
          <div>
            <p className="font-mono-label text-[11px] uppercase tracking-[0.22em] text-[#D95D39]">
              Protected Portal
            </p>
            <h1 className="font-display text-2xl font-semibold text-white">Admin Sign In</h1>
          </div>
        </div>

        <p className="text-sm text-white/65 mb-7 leading-relaxed">
          Sign in to manage Home & About content, project portfolio entries, contact details, media uploads, and client enquiries.
        </p>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 flex items-start gap-2.5 text-sm text-red-200"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="block font-mono-label text-[11px] uppercase tracking-wider text-white/60 mb-2">
              Admin Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@northlinebuild.com"
              className="w-full rounded-xl border border-white/15 bg-[#0B0D10] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#D95D39] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="block font-mono-label text-[11px] uppercase tracking-wider text-white/60 mb-2">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-xl border border-white/15 bg-[#0B0D10] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#D95D39] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#D95D39] px-6 py-3.5 text-xs font-medium uppercase tracking-wider text-white hover:bg-[#c54e2c] transition-colors disabled:opacity-60"
          >
            <Lock className="w-4 h-4" />
            <span>{submitting ? 'Signing In...' : 'Sign In to Admin Panel'}</span>
          </button>
        </form>
      </div>

      <p className="text-center font-mono-label text-[11px] text-white/40 uppercase tracking-widest">
        Northline Build Content Management System
      </p>
    </div>
  );
}
