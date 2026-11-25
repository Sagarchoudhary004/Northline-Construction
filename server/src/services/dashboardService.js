import contentRepository from '../repositories/contentRepository.js';
import projectRepository from '../repositories/projectRepository.js';
import enquiryRepository from '../repositories/enquiryRepository.js';
import mediaRepository from '../repositories/mediaRepository.js';
import storageContext from './storageStrategy.js';

class DashboardService {
  async getOverview() {
    const [
      totalEnquiries,
      breakdown,
      recentEnquiries,
      totalProjects,
      publishedProjects,
      totalMedia,
      siteContent,
    ] = await Promise.all([
      enquiryRepository.count(),
      enquiryRepository.getStatusBreakdown(),
      enquiryRepository.findAll({}, { sort: { createdAt: -1 }, limit: 5 }),
      projectRepository.count(),
      projectRepository.count({ published: true }),
      mediaRepository.count(),
      contentRepository.getPrimary(),
    ]);

    return {
      enquiries: {
        total: totalEnquiries,
        newCount: breakdown.New || 0,
        inProgressCount: breakdown['In Progress'] || 0,
        respondedCount: breakdown.Responded || 0,
        closedCount: breakdown.Closed || 0,
        recent: recentEnquiries,
      },
      projects: {
        total: totalProjects,
        published: publishedProjects,
        drafts: totalProjects - publishedProjects,
      },
      media: {
        total: totalMedia,
        storage: storageContext.getStatus(),
      },
      contentStatus: {
        initialized: Boolean(siteContent),
        lastUpdatedAt: siteContent?.updatedAt || null,
        homeSectionsReady: Boolean(siteContent?.home?.hero?.headline),
        aboutSectionsReady: Boolean(siteContent?.about?.story?.headline),
        contactReady: Boolean(siteContent?.contact?.info?.email),
      },
    };
  }
}

export default new DashboardService();
