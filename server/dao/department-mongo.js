const mongo = require("../db/mongo-db");
class DepartmentMongo {
  constructor() {
    this.departmentCol = mongo.getCollection("department");
    mongo.initializeCollection("department", () => this.initialize());
  }

  async initialize() {
    await this.departmentCol.createIndex({ name: 1 }, { unique: true });
  }

  async list(pageIndex, pageSize) {
    return await mongo.listPage(this.departmentCol, pageIndex, pageSize);
  }

  async create(object) {
    const result = await this.departmentCol.insertOne(object);
    object._id = result.insertedId;
    return object;
  }

  async getByName(departmentName) {
    return await this.departmentCol.findOne({
      name: departmentName,
    });
  }

  async getById(_id) {
    return await this.departmentCol.findOne({
      _id: _id,
    });
  }
  async delete(_id) {
    // No need to return the result
    await this.departmentCol.deleteOne({
      _id: _id,
    });
  }
}

module.exports = new DepartmentMongo();
