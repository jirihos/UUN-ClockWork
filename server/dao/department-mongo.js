const mongo = require("../db/mongo-db");

class DepartmentMongo {
  constructor() {
    this.departmentCol = mongo.getCollection("department");
  }

  async list(pageIndex, pageSize) {
    return await mongo.listPage(this.departmentCol, pageIndex, pageSize);
  }
}

module.exports = new DepartmentMongo();
