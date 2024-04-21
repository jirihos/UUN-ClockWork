const mongo = require("../db/mongo-db");

class TerminalMongo {
  constructor() {
    this.terminalCol = mongo.getCollection("terminal");
    mongo.initializeCollection("terminal", () => this.initialize());
  }

  async initialize() {
    await this.terminalCol.createIndex({ name: 1 }, { unique: true });
    await this.terminalCol.createIndex({ apiKey: 1 }, { unique: true });
  }

  async create(object) {
    const result = await this.terminalCol.insertOne(object);
    object._id = result.insertedId;
    return object;
  }

  async findByName(name) {
    return this.terminalCol.findOne({ name });
  }
}

module.exports = new TerminalMongo();
