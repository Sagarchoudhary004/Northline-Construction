import BaseRepository from './baseRepository.js';
import Enquiry from '../models/Enquiry.js';

class EnquiryRepository extends BaseRepository {
  constructor() {
    super(Enquiry);
  }

  async searchAndFilter({ status, search } = {}) {
    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }
    if (search && search.trim()) {
      const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { fullName: regex },
        { company: regex },
        { email: regex },
        { projectType: regex },
        { location: regex },
        { message: regex },
      ];
    }
    return this.findAll(filter, { sort: { createdAt: -1 } });
  }

  async getStatusBreakdown() {
    const rows = await this.model.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    return rows.reduce((acc, row) => {
      acc[row._id] = row.count;
      return acc;
    }, {});
  }
}

export default new EnquiryRepository();
