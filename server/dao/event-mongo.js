const { ObjectId } = require("mongodb");
const mongo = require("../db/mongo-db");
const { shiftsPipeline } = require("../db/mongo-pipeline");
const { ObjectId } = require("mongodb");

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

  async listShifts(pageIndex, pageSize, timestampFrom, timestampTo) {
    const extendedPipeline = [
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
          arrivalTs: "$arrivalTimestamp",
          leaveTs: "$leaveTimestamp",
          employeeFirstName: "$employeeDetails.firstName",
          employeeLastName: "$employeeDetails.lastName",
          department: "$departmentDetails.name", // Adjust the field names as needed
        },
      },
      // {
      //   $match: {
      //     arrivalTs: { $gte: new Date(timestampFrom) }, // Filter arrivals after 'from'
      //     leaveTs: { $lte: new Date(timestampTo) }, // Filter leaves before 'to'
      //   },
      // },
      // Step 6: Pagination stage
      {
        $facet: {
          pageInfo: [
            { $count: "totalCount" },
            {
              $addFields: {
                pageIndex: pageIndex,
                pageSize: pageSize,
              },
            },
          ],
          items: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
        },
      },
      // Step 7: Unwind pageInfo
      {
        $unwind: "$pageInfo",
      },
      // Step 8: Final projection
      {
        $project: {
          pageInfo: 1,
          items: 1,
        },
      },
    ];

    return await mongo.listPipelinePage(
      this.eventCol,
      extendedPipeline,
      pageIndex,
      pageSize,
    );
  }
}

module.exports = new eventMongo();
