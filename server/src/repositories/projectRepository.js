import BaseRepository from './baseRepository.js';
import Project from '../models/Project.js';

class ProjectRepository extends BaseRepository {
  constructor() {
    super(Project);
  }

  async findPublished() {
    return this.findAll({ published: true }, { sort: { order: 1, createdAt: 1 } });
  }

  async findAllOrdered() {
    return this.findAll({}, { sort: { order: 1, createdAt: 1 } });
  }

  async bulkReorder(orderedIds = []) {
    const ops = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } },
      },
    }));
    if (ops.length === 0) return [];
    await this.model.bulkWrite(ops);
    return this.findAllOrdered();
  }
}

export default new ProjectRepository();
