import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '' },
    imageAlt: { type: String, default: '' },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', default: null },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    isFictionalDemo: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1, createdAt: 1 });

export default mongoose.model('Project', projectSchema);
