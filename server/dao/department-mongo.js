const mongo = require("../db/mongo-db");

class DepartmentMongo {
  constructor() {
    this.departmentCol = mongo.getCollection("department");
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
}

module.exports = new DepartmentMongo();
