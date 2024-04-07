const { MongoClient } = require("mongodb");

class MongoDb {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI);
    this.db = this.client.db(process.env.MONGODB_DB_NAME);
  }

  getCollection(name) {
    return this.db.collection(name);
  }

  async collectionExists(name) {
    const collections = await this.db.listCollections().toArray();
    return collections.some((collection) => collection.name === name);
  }

  // calls initializer if the collection doesn't exist
  async initializeCollection(name, initializer) {
    const exists = await this.collectionExists(name);
    if (!exists) {
      await initializer();
    }
  }
}

module.exports = new MongoDb();
