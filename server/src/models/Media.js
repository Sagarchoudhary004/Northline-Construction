import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    originalName: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
    storageProvider: { type: String, enum: ['cloudinary', 'local'], default: 'cloudinary' },
    mimeType: { type: String, required: true },
    bytes: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    alt: { type: String, trim: true, default: '' },
    category: {
      type: String,
      enum: ['hero', 'sector', 'project', 'about', 'general'],
      default: 'general',
    },
  },
  { timestamps: true }
);

mediaSchema.index({ createdAt: -1 });

export default mongoose.model('Media', mediaSchema);
