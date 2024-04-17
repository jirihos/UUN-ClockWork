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
  async getByName(body) {
    return await this.employeeCol.findOne({
      employeeCode: body.departmentName,
    });
  }
  async getById(body) {
    return await this.employeeCol.findOne({ employeeCode: body.departmentId });
  }
}

module.exports = new DepartmentMongo();
