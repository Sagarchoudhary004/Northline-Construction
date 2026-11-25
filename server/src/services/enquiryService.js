import enquiryRepository from '../repositories/enquiryRepository.js';
import { ENQUIRY_STATUSES } from '../models/Enquiry.js';
import AppError from '../utils/AppError.js';

class EnquiryService {
  async createEnquiry(payload) {
    return enquiryRepository.create({
      fullName: payload.fullName,
      company: payload.company || '',
      email: payload.email,
      phone: payload.phone,
      projectType: payload.projectType || 'Commercial',
      location: payload.location || '',
      approximateArea: payload.approximateArea || '',
      expectedStart: payload.expectedStart || '',
      message: payload.message,
      status: 'New',
    });
  }

  async listEnquiries(query = {}) {
    return enquiryRepository.searchAndFilter(query);
  }

  async getEnquiryById(id) {
    const enquiry = await enquiryRepository.findById(id);
    if (!enquiry) {
      throw new AppError('Enquiry not found.', 404);
    }
    return enquiry;
  }

  async updateEnquiry(id, payload) {
    const existing = await enquiryRepository.findById(id);
    if (!existing) {
      throw new AppError('Enquiry not found.', 404);
    }

    const updates = {};
    if (payload.status !== undefined) {
      if (!ENQUIRY_STATUSES.includes(payload.status)) {
        throw new AppError(`Invalid status. Allowed: ${ENQUIRY_STATUSES.join(', ')}`, 400);
      }
      updates.status = payload.status;
    }
    if (payload.adminNotes !== undefined) {
      updates.adminNotes = payload.adminNotes;
    }

    return enquiryRepository.updateById(id, updates);
  }

  async deleteEnquiry(id) {
    const deleted = await enquiryRepository.deleteById(id);
    if (!deleted) {
      throw new AppError('Enquiry not found.', 404);
    }
    return deleted;
  }
}

export default new EnquiryService();
