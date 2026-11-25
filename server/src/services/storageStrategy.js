import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import cloudinaryClient from '../config/cloudinary.js';
import env from '../config/env.js';
import AppError from '../utils/AppError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_UPLOADS_DIR = path.resolve(__dirname, '../../uploads');

/**
 * Strategy Pattern for image storage (Cloudinary primary, local disk fallback).
 */
class CloudinaryStorageStrategy {
  get name() {
    return 'cloudinary';
  }

  async upload(file, options = {}) {
    const cloudinary = cloudinaryClient.getClient();
    const folder = options.folder || env.cloudinary.folder;

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'image',
          transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        },
        (error, res) => {
          if (error) return reject(error);
          resolve(res);
        }
      );
      uploadStream.end(file.buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      storageProvider: 'cloudinary',
      bytes: result.bytes || file.size,
      width: result.width || 0,
      height: result.height || 0,
    };
  }

  async remove(publicId) {
    if (!publicId) return;
    const cloudinary = cloudinaryClient.getClient();
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }
}

class LocalDiskStorageStrategy {
  get name() {
    return 'local';
  }

  async upload(file) {
    await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
    const ext = path.extname(file.originalname || '.png').toLowerCase() || '.png';
    const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    const fullPath = path.join(LOCAL_UPLOADS_DIR, filename);
    await fs.writeFile(fullPath, file.buffer);

    return {
      url: `/uploads/${filename}`,
      publicId: `local/${filename}`,
      storageProvider: 'local',
      bytes: file.size,
      width: 0,
      height: 0,
    };
  }

  async remove(publicId) {
    if (!publicId || !publicId.startsWith('local/')) return;
    const filename = publicId.replace('local/', '');
    if (filename.startsWith('seed/')) return;
    const target = path.join(LOCAL_UPLOADS_DIR, path.basename(filename));
    await fs.unlink(target).catch(() => null);
  }
}

class StorageContext {
  constructor() {
    this.cloudinaryStrategy = new CloudinaryStorageStrategy();
    this.localStrategy = new LocalDiskStorageStrategy();
  }

  resolveStrategy(preferredProvider = null) {
    if (preferredProvider === 'local') return this.localStrategy;
    if (cloudinaryClient.isReady()) return this.cloudinaryStrategy;
    return this.localStrategy;
  }

  async uploadFile(file, options = {}) {
    if (!file || !file.buffer) {
      throw new AppError('No image file buffer provided.', 400);
    }
    const strategy = this.resolveStrategy();
    return strategy.upload(file, options);
  }

  async deleteFile(publicId, storageProvider) {
    const strategy = this.resolveStrategy(storageProvider);
    return strategy.remove(publicId);
  }

  getStatus() {
    return {
      activeProvider: cloudinaryClient.isReady() ? 'cloudinary' : 'local',
      cloudinaryConfigured: cloudinaryClient.isReady(),
    };
  }
}

export default new StorageContext();
