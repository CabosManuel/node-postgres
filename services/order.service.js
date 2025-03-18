import boom from "@hapi/boom";

export default class OrderService {
  constructor() {}
  async create(data) {
    return data;
  }

  async getAll() {
    return [];
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}
