import { v2 as cloudinary } from 'cloudinary';
import env, { isCloudinaryConfigured } from './env.js';

/**
 * Singleton wrapper around Cloudinary SDK v2.
 */
class CloudinaryClient {
  constructor() {
    this.configured = false;
    this.init();
  }

  init() {
    if (isCloudinaryConfigured()) {
      cloudinary.config({
        cloud_name: env.cloudinary.cloudName,
        api_key: env.cloudinary.apiKey,
        api_secret: env.cloudinary.apiSecret,
        secure: true,
      });
      this.configured = true;
    }
  }

  getClient() {
    if (!this.configured && isCloudinaryConfigured()) {
      this.init();
    }
    return cloudinary;
  }

  isReady() {
    return this.configured || isCloudinaryConfigured();
  }
}

export default new CloudinaryClient();
