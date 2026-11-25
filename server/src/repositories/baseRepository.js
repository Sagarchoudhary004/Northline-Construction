export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}, options = {}) {
    const { sort = { createdAt: -1 }, limit = 0, skip = 0, select = null, populate = null } = options;
    let query = this.model.find(filter).sort(sort);
    if (skip) query = query.skip(skip);
    if (limit) query = query.limit(limit);
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    return query.lean();
  }

  async findOne(filter = {}, options = {}) {
    const { select = null, lean = true } = options;
    let query = this.model.findOne(filter);
    if (select) query = query.select(select);
    return lean ? query.lean() : query;
  }

  async findById(id, options = {}) {
    const { select = null, lean = true } = options;
    let query = this.model.findById(id);
    if (select) query = query.select(select);
    return lean ? query.lean() : query;
  }

  async create(payload) {
    const doc = await this.model.create(payload);
    return doc.toObject();
  }

  async updateById(id, payload, options = { new: true, runValidators: true }) {
    return this.model.findByIdAndUpdate(id, payload, options).lean();
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id).lean();
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }
}
