const mongo = require("../db/mongo-db");

class DepartmentMongo {
  constructor() {
    this.departmentCol = mongo.getCollection("department");
    mongo.initializeCollection("department", () => this.initialize());
  }

  async initialize() {
    await this.departmentCol.createIndex(
      { departmentName: 1 },
      { unique: true },
    );
  }

  async list(pageIndex, pageSize) {
    return await mongo.listPage(this.departmentCol, pageIndex, pageSize);
  }

  async create(department) {
    return await this.departmentCol.insertOne({
      departmentName: department.departmentName,
    });
  }
  async getByName(department) {
    return await this.departmentCol.findOne({
      departmentName: department.departmentName,
    });
  }
  async getById(department) {
    return await this.departmentCol.findOne({
      departmentId: department.departmentId,
    });
  }
  async delete(department) {
    return await this.departmentCol.deleteOne({
      departmentId: department.departmentId,
    });
  }
}

module.exports = new DepartmentMongo();
