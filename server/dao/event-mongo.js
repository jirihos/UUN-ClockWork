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

  async listShifts(timestampFrom, timestampTo) {
    const extendedPipeline = [
      {
        $match: {
          timestamp: {
            $gte: new Date(timestampFrom),
            $lte: new Date(timestampTo),
          }, // Filter arrivals after 'from'
        },
      },

      ...shiftsPipeline,

      // Step 1: Join with the employee collection
      {
        $lookup: {
          from: "employee",
          localField: "employeeCode",
          foreignField: "code", // Adjust the field names as needed
          as: "employeeDetails",
        },
      },
      {
        $lookup: {
          from: "department",
          let: { departmentIds: "$employeeDetails.departmentId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    { $toObjectId: "$_id" }, // Convert the foreign _id to ObjectId
                    {
                      $map: {
                        // Iterate over the array and convert each element to ObjectId
                        input: "$$departmentIds",
                        as: "deptId",
                        in: { $toObjectId: "$$deptId" },
                      },
                    },
                  ],
                },
              },
            },
          ],
          as: "departmentDetails",
        },
      },
      {
        $project: {
          employeeCode: 1,
          employeeFirstName: "$employeeDetails.firstName",
          employeeLastName: "$employeeDetails.lastName",
          department: "$departmentDetails.name", // Adjust the field names as needed
          arrivalTs: "$arrivalTimestamp",
          leaveTs: "$leaveTimestamp",
        },
      },
      // {
      //   $match: {
      //     arrivalTs: { $gte: new Date(timestampFrom) }, // Filter arrivals after 'from'
      //     leaveTs: { $lte: new Date(timestampTo) }, // Filter leaves before 'to'
      //   },
      // },
    ];

    const cursor = await this.eventCol.aggregate(extendedPipeline);
    return await cursor.toArray();
  }
}

module.exports = new eventMongo();
