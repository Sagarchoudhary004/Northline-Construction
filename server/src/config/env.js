import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/northline_build',
  jwtSecret: process.env.JWT_SECRET || 'northline_dev_fallback_secret_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    folder: process.env.CLOUDINARY_FOLDER || 'northline-build',
  },
  adminSeed: {
    name: process.env.ADMIN_NAME || 'Northline Admin',
    email: process.env.ADMIN_EMAIL || 'admin@northlinebuild.com',
    password: process.env.ADMIN_PASSWORD || 'Northline@2026!',
  },
};

export const isCloudinaryConfigured = () => {
  const { cloudName, apiKey, apiSecret } = env.cloudinary;
  return Boolean(
    cloudName &&
      apiKey &&
      apiSecret &&
      !cloudName.startsWith('your_') &&
      !apiKey.startsWith('your_') &&
      !apiSecret.startsWith('your_')
  );
};

export default env;
