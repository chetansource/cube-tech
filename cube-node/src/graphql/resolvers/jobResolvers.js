const Job = require('../../models/Job');

const jobResolvers = {
  Query: {
    Jobs: async (_, { where, limit = 10, page = 1 }) => {
      const query = {};

      if (where) {
        if (where.status?.equals) {
          query.status = where.status.equals;
        }
        if (where.department?.equals) {
          query.department = where.department.equals;
        }
      }

      const skip = (page - 1) * limit;
      const docs = await Job.find(query)
        .limit(limit)
        .skip(skip)
        .sort({ postedDate: -1 });

      const totalDocs = await Job.countDocuments(query);

      return {
        docs,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
    },

    Job: async (_, { id }) => {
      return await Job.findById(id);
    },
  },
};

module.exports = jobResolvers;
