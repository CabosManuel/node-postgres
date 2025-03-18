import boom from "@hapi/boom";
import getConnection from "../libs/postgres.js";

export class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async getAll() {
    const client = await getConnection();
    const rta = await client.query("SELECT * FROM task");
    return rta.rows;
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
