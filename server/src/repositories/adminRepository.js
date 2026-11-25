import BaseRepository from './baseRepository.js';
import Admin from '../models/Admin.js';

class AdminRepository extends BaseRepository {
  constructor() {
    super(Admin);
  }

  async findByEmailWithPassword(email) {
    return this.model.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
  }

  async updateLastLogin(id) {
    return this.model.findByIdAndUpdate(id, { lastLoginAt: new Date() }, { new: true }).lean();
  }
}

export default new AdminRepository();
