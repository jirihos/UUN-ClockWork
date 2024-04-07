const mongo = require("../db/mongo-db");

class UserMongo {
  constructor() {
    this.userCol = mongo.getCollection("user");
    mongo.initializeCollection("user", () => this.initialize());
  }

  async initialize() {
    await this.userCol.createIndex({ username: 1 }, { unique: true });
    const passwordHash = await require("bcrypt").hash("admin", 10);
    await this.userCol.insertOne({
      username: "admin",
      passwordHash,
      role: "admin",
    });
  }

  async create(object) {
    const result = await this.userCol.insertOne(object);
    object._id = result.insertedId;
    return object;
  }

  async getByUsername(username) {
    return await this.userCol.findOne({ username });
  }
}

module.exports = new UserMongo();
