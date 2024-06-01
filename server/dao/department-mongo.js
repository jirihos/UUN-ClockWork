const mongo = require("../db/mongo-db");
const { ObjectId } = require("mongodb");

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

  /**
   * Get department by ID
   * @param {string} _id
   */
  async getById(_id) {
    return await this.departmentCol.findOne({
      _id: new ObjectId(_id),
    });
  }

  /**
   * Delete department by ID
   * @param {string} _id
   */
  async delete(_id) {
    // No need to return the result
    await this.departmentCol.deleteOne({
      _id: new ObjectId(_id),
    });
  }

  async findById(_id) {
    console.log(_id);
    return await this.departmentCol.findOne({ _id: new ObjectId(_id) });
  }
}

module.exports = new DepartmentMongo();
