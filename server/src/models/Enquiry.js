import mongoose from 'mongoose';

export const PROJECT_TYPES = [
  'Industrial',
  'Commercial',
  'Institutional',
  'Healthcare',
  'Hospitality',
  'Residential',
  'Other',
];

export const ENQUIRY_STATUSES = ['New', 'In Progress', 'Responded', 'Closed'];

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    projectType: { type: String, enum: PROJECT_TYPES, default: 'Commercial' },
    location: { type: String, trim: true, default: '' },
    approximateArea: { type: String, trim: true, default: '' },
    expectedStart: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ENQUIRY_STATUSES, default: 'New' },
    adminNotes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

enquirySchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Enquiry', enquirySchema);
