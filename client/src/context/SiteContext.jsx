import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { contentService, projectService } from '../services';

const SiteContext = createContext(null);

export function SiteProvider({ children }) {
  const [content, setContent] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshSiteData = useCallback(async () => {
    try {
      setError(null);
      const [siteContent, publicProjects] = await Promise.all([
        contentService.getContent(),
        projectService.getPublicProjects(),
      ]);
      setContent(siteContent);
      setProjects(publicProjects);
    } catch (err) {
      setError(err.message || 'Failed to load site data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSiteData();
  }, [refreshSiteData]);

  return (
    <SiteContext.Provider value={{ content, projects, loading, error, refreshSiteData }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
