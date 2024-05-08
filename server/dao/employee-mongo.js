const mongo = require("../db/mongo-db");

class EmployeeMongo {
  constructor() {
    this.employeeCol = mongo.getCollection("employee");
    mongo.initializeCollection("employee", () => this.initialize());
  }

  async initialize() {
    await this.employeeCol.createIndex({ code: 1 }, { unique: true });
  }

  async create(object) {
    const result = await this.employeeCol.insertOne(object);
    object._id = result.insertedId;
    return object;
  }

  async findByCode(code) {
    return await this.employeeCol.findOne({ code });
  }

  async list() {
    return await this.employeeCol.find({}).toArray();
  }

  async getAllExistingCodes() {
    const options = {
      projection: { _id: 0, code: 1 },
    };

    const documents = await this.employeeCol.find({}, options).toArray();
    const existingCodes = documents.map((document) => document.code);
    return existingCodes;
  }
  /**
   * Get employee by departmentId
   * @param {string} departmentId
   */
  async getByDepartmentId(departmentId) {
    return await this.employeeCol.findOne({
      departmentId: departmentId,
    });
  }

  async search(body, pageIndex, pageSize) {
    console.log(body);

    const filter = {};

    if (body.firstName) {
      filter.firstName = {$regex: body.firstName}
    }
    if (body.lastName) {
      filter.lastName = {$regex: body.lastName}
    }
    if (body.departmentId) {
      filter.departmentId = body.departmentId;
    }

    const cursor = await this.employeeCol.aggregate([
      {
        $match: filter,
      },
      {
        $facet: {
          pageInfo: [{ $count: "totalCount" }],
          items: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
        },
      },
    ]);


    const data = await cursor.next();

    const totalCount = data.pageInfo[0]?.totalCount || 0;
    data.pageInfo = {
      pageIndex,
      pageSize,
      totalCount,
    };
    
    return data;
  }
}
module.exports = new EmployeeMongo();
