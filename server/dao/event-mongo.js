const { ObjectId } = require("mongodb");
const mongo = require("../db/mongo-db");
const { shiftsPipeline } = require("../db/mongo-pipeline");

class eventMongo {
  constructor() {
    this.eventCol = mongo.getCollection("event");
    mongo.initializeCollection("event", () => this.initialize());
  }

  async initialize() {
    await this.eventCol.createIndex({ employeeCode: 1 }, { unique: false });
  }

  async create(event) {
    const result = await this.eventCol.insertOne(event);
    event._id = result.insertedId;
    return event;
  }

  async listShiftsByEmployeeCode(employeeCode, pageIndex, pageSize) {
    const pipeline = [
      {
        $match: {
          employeeCode,
        },
      },
      ...shiftsPipeline,
    ];

    return await mongo.listPipelinePage(
      this.eventCol,
      pipeline,
      pageIndex,
      pageSize,
    );
  }

  async delete(_id) {
    return await this.eventCol.deleteOne({ _id: new ObjectId(_id) });
  }
}

module.exports = new eventMongo();
