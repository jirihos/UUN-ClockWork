const mongo = require("../db/mongo-db");

class eventMongo {
    constructor() {
      this.eventCol = mongo.getCollection("event");
      mongo.initializeCollection("event", () => this.initialize());
    }

    async initialize() {
      await this.eventCol.createIndex({ employeeCode: 1 }, { unique: false });
    }
  
    async create(event) {
      return await this.eventCol.insertOne(event);
    }
  }
  
module.exports = new eventMongo();