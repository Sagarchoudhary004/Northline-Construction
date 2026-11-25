import mediaRepository from '../repositories/mediaRepository.js';
import storageContext from './storageStrategy.js';
import AppError from '../utils/AppError.js';

class MediaService {
  async listMedia(category = 'all') {
    const items = await mediaRepository.findByCategory(category);
    return {
      items,
      storageStatus: storageContext.getStatus(),
    };
  }

  async uploadMedia(file, metadata = {}) {
    const uploaded = await storageContext.uploadFile(file);
    return mediaRepository.create({
      title: metadata.title || file.originalname.replace(/\.[^/.]+$/, ''),
      originalName: file.originalname,
      url: uploaded.url,
      publicId: uploaded.publicId,
      storageProvider: uploaded.storageProvider,
      mimeType: file.mimetype,
      bytes: uploaded.bytes || file.size,
      width: uploaded.width || 0,
      height: uploaded.height || 0,
      alt: metadata.alt || metadata.title || file.originalname,
      category: metadata.category || 'general',
    });
  }

  async replaceMedia(id, file, metadata = {}) {
    const existing = await mediaRepository.findById(id);
    if (!existing) {
      throw new AppError('Media record not found.', 404);
    }

    const uploaded = await storageContext.uploadFile(file);
    await storageContext.deleteFile(existing.publicId, existing.storageProvider).catch(() => null);

    return mediaRepository.updateById(id, {
      title: metadata.title || existing.title,
      originalName: file.originalname,
      url: uploaded.url,
      publicId: uploaded.publicId,
      storageProvider: uploaded.storageProvider,
      mimeType: file.mimetype,
      bytes: uploaded.bytes || file.size,
      width: uploaded.width || 0,
      height: uploaded.height || 0,
      alt: metadata.alt ?? existing.alt,
      category: metadata.category || existing.category,
    });
  }

  async deleteMedia(id) {
    const existing = await mediaRepository.findById(id);
    if (!existing) {
      throw new AppError('Media record not found.', 404);
    }
    await storageContext.deleteFile(existing.publicId, existing.storageProvider).catch(() => null);
    return mediaRepository.deleteById(id);
  }
}

export default new MediaService();
