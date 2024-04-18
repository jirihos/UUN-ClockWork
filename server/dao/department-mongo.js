const mongo = require("../db/mongo-db");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
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
  // TODO uprvit zbyle fkce
  async getById(_id) {
    return await this.departmentCol.findOne({
      _id: _id,
    });
  }
  async delete(departmentName) {
    // No need to return the result
    await this.departmentCol.deleteOne({
      name: departmentName,
    });
  }
}

module.exports = new DepartmentMongo();
