const mongo = require("../db/mongo-db");

class employeeMongo {
    constructor() {
      this.employeeCol = mongo.getCollection("employee");
      mongo.initializeCollection("employee", () => this.initialize());
    }

    async initialize() {
      await this.employeeCol.createIndex({ employeeCode: 1 }, { unique: true });
    }

    async create(employee) {
      return await this.employeeCol.insertOne({ employeeCode: employee.employeeCode });
    }
  
    async findByCode(body) {
      return await this.employeeCol.findOne({ employeeCode: body.employeeCode });
    }

  }
  
  module.exports = new employeeMongo();