import BaseRepository from './baseRepository.js';
import Media from '../models/Media.js';

class MediaRepository extends BaseRepository {
  constructor() {
    super(Media);
  }

  async findByCategory(category) {
    const filter = category && category !== 'all' ? { category } : {};
    return this.findAll(filter, { sort: { createdAt: -1 } });
  }
}

export default new MediaRepository();
