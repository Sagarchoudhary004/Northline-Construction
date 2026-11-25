import contentRepository from '../repositories/contentRepository.js';
import AppError from '../utils/AppError.js';

const ALLOWED_SECTIONS = ['home', 'about', 'contact', 'footer', 'seo'];

class ContentService {
  async getSiteContent() {
    const content = await contentRepository.getPrimary();
    if (!content) {
      throw new AppError('Site content has not been initialized yet.', 404);
    }
    return content;
  }

  async updateSection(section, payload) {
    if (!ALLOWED_SECTIONS.includes(section)) {
      throw new AppError(`Invalid content section "${section}".`, 400);
    }
    const existing = await this.getSiteContent();
    const mergedSection = { ...existing[section], ...payload };
    return contentRepository.upsertPrimary({ [section]: mergedSection });
  }

  async updateAll(payload) {
    const allowedPayload = {};
    for (const key of ALLOWED_SECTIONS) {
      if (payload[key] !== undefined) {
        allowedPayload[key] = payload[key];
      }
    }
    if (Object.keys(allowedPayload).length === 0) {
      throw new AppError('No valid content sections provided.', 400);
    }
    return contentRepository.upsertPrimary(allowedPayload);
  }
}

export default new ContentService();
