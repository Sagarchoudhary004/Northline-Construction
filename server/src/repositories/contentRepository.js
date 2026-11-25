import BaseRepository from './baseRepository.js';
import SiteContent from '../models/SiteContent.js';

class ContentRepository extends BaseRepository {
  constructor() {
    super(SiteContent);
  }

  async getPrimary() {
    return this.findOne({ key: 'primary' });
  }

  async upsertPrimary(updatePayload) {
    return this.model
      .findOneAndUpdate(
        { key: 'primary' },
        { $set: updatePayload },
        { new: true, upsert: true, runValidators: true }
      )
      .lean();
  }
}

export default new ContentRepository();
