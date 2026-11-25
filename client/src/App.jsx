import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { SiteProvider } from './context/SiteContext';
import { AuthProvider } from './context/AuthContext';
import { CursorProvider } from './context/CursorContext';
import PublicLayout from './components/layout/PublicLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminLayoutPage from './pages/admin/AdminLayoutPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AuthProvider>
        <SiteProvider>
          <CursorProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                </Route>
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<AdminLayoutPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </CursorProvider>
        </SiteProvider>
      </AuthProvider>
    </MotionConfig>
  );
}
