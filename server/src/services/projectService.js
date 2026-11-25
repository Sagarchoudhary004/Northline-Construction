import projectRepository from '../repositories/projectRepository.js';
import AppError from '../utils/AppError.js';

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

class ProjectService {
  async getPublicProjects() {
    return projectRepository.findPublished();
  }

  async getAllProjects() {
    return projectRepository.findAllOrdered();
  }

  async createProject(payload) {
    const baseSlug = slugify(payload.slug || payload.title);
    if (!baseSlug) {
      throw new AppError('Project title is required to generate a valid slug.', 400);
    }

    const existing = await projectRepository.findOne({ slug: baseSlug });
    const uniqueSlug = existing ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;
    const count = await projectRepository.count();

    return projectRepository.create({
      ...payload,
      slug: uniqueSlug,
      order: payload.order ?? count,
    });
  }

  async updateProject(id, payload) {
    const current = await projectRepository.findById(id);
    if (!current) {
      throw new AppError('Project not found.', 404);
    }

    const update = { ...payload };
    if (payload.title && payload.slug) {
      update.slug = slugify(payload.slug);
    }

    return projectRepository.updateById(id, update);
  }

  async reorderProjects(orderedIds) {
    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      throw new AppError('orderedIds array is required.', 400);
    }
    return projectRepository.bulkReorder(orderedIds);
  }

  async togglePublish(id) {
    const current = await projectRepository.findById(id);
    if (!current) {
      throw new AppError('Project not found.', 404);
    }
    return projectRepository.updateById(id, { published: !current.published });
  }

  async deleteProject(id) {
    const deleted = await projectRepository.deleteById(id);
    if (!deleted) {
      throw new AppError('Project not found.', 404);
    }
    return deleted;
  }
}

export default new ProjectService();
