const { MongoClient } = require("mongodb");

class MongoDb {
  constructor() {
    this.client = new MongoClient(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    // attempt to connect
    this.client
      .connect()
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error(err);
        console.error("MongoDB failed to connect");
        process.exit(1);
      });

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

  async listPage(collection, pageIndex, pageSize) {
    return await this.listPipelinePage(collection, null, pageIndex, pageSize);
  }

  async listPipelinePage(collection, pipeline, pageIndex, pageSize) {
    pipeline = pipeline || [];

    const cursor = await collection.aggregate([
      ...pipeline,
      {
        $facet: {
          pageInfo: [{ $count: "totalCount" }],
          items: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
        },
      },
    ]);

    const data = await cursor.next();

    // correct pageInfo
    const totalCount = data.pageInfo[0]?.totalCount || 0;
    data.pageInfo = {
      pageIndex,
      pageSize,
      totalCount,
    };

    return data;
  }
}

module.exports = new MongoDb();
