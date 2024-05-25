const shiftsPipeline = [
  {
    $sort: {
      timestamp: 1,
    },
  },
  {
    $group: {
      _id: "$employeeCode",
      documents: {
        $push: "$$ROOT",
      },
    },
  },
  // Add an index field to each document
  {
    $addFields: {
      index: {
        $range: [
          0,
          {
            $size: "$documents",
          },
        ],
      },
    },
  },
  // Project the documents and their previous and next documents
  {
    $project: {
      documents: 1,
      nextDocument: {
        $map: {
          input: "$index",
          as: "idx",
          in: {
            $arrayElemAt: [
              "$documents",
              {
                $add: ["$$idx", 1],
              },
            ],
          },
        },
      },
      prevDocument: {
        $map: {
          input: "$index",
          as: "idx",
          in: {
            $cond: {
              if: {
                $eq: ["$$idx", 0],
              },
              then: {
                $literal: null,
              },
              else: {
                $arrayElemAt: [
                  "$documents",
                  {
                    $subtract: ["$$idx", 1],
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
  // Merge the arrays
  {
    $project: {
      documents: {
        $map: {
          input: "$documents",
          as: "doc",
          in: {
            $mergeObjects: [
              "$$doc",
              {
                prevDocument: {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $indexOfArray: ["$documents", "$$doc"],
                        },
                        0,
                      ],
                    },
                    // Handle first document where there's no previous
                    then: null,
                    else: {
                      $arrayElemAt: [
                        "$prevDocument",
                        {
                          $indexOfArray: ["$documents", "$$doc"],
                        },
                      ],
                    },
                  },
                },
                nextDocument: {
                  $cond: {
                    if: {
                      $eq: [
                        {
                          $indexOfArray: ["$documents", "$$doc"],
                        },
                        {
                          $subtract: [
                            {
                              $size: "$documents",
                            },
                            1,
                          ],
                        },
                      ],
                    },
                    // Handle last document where there's no next
                    then: null,
                    else: {
                      $arrayElemAt: [
                        "$nextDocument",
                        {
                          $indexOfArray: ["$documents", "$$doc"],
                        },
                      ],
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  // Compile shifts
  {
    $project: {
      shifts: {
        $map: {
          input: "$documents",
          as: "doc",
          in: {
            $cond: {
              if: {
                $eq: ["$$doc.type", "arrival"],
              },
              then: {
                $cond: {
                  if: {
                    $eq: ["$$doc.nextDocument.type", "leave"],
                  },
                  then: {
                    arrivalTerminalId: "$$doc.terminalId",
                    leaveTerminalId: "$$doc.nextDocument.terminalId",
                    arrivalTimestamp: "$$doc.timestamp",
                    leaveTimestamp: "$$doc.nextDocument.timestamp",
                  },
                  else: {
                    arrivalTerminalId: "$$doc.terminalId",
                    leaveTerminalId: null,
                    arrivalTimestamp: "$$doc.timestamp",
                    leaveTimestamp: null,
                  },
                },
              },
              else: {
                $cond: {
                  if: {
                    $eq: ["$$doc.prevDocument.type", "arrival"],
                  },
                  then: null,
                  else: {
                    arrivalTerminalId: null,
                    leaveTerminalId: "$$doc.terminalId",
                    arrivalTimestamp: null,
                    leaveTimestamp: "$$doc.timestamp",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    $unwind: "$shifts",
  },
  {
    $match: {
      $expr: {
        $ne: ["$shifts", null],
      },
    },
  },
  {
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [{ employeeCode: "$_id" }, "$shifts"],
      },
    },
  },
  {
    $addFields: {
      sortTimestamp: {
        $min: ["$arrivalTimestamp", "$leaveTimestamp"],
      },
    },
  },
  {
    $sort: {
      sortTimestamp: -1,
    },
  },
  {
    $unset: "sortTimestamp",
  },
];

module.exports = {
  shiftsPipeline,
};
