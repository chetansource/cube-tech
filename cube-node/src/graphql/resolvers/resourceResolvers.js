const Resource = require('../../models/Resource');

const resourceResolvers = {
  Query: {
    Resources: async (_, { where, limit = 10, page = 1 }) => {
      const query = {};

      if (where) {
        if (where.slug?.equals) {
          query.slug = where.slug.equals;
        }
        if (where.category?.equals) {
          query.category = where.category.equals;
        }
        if (where.status?.equals) {
          query.status = where.status.equals;
        }
        if (where.featured !== undefined) {
          query.featured = where.featured;
        }
      }

      const skip = (page - 1) * limit;
      const docs = await Resource.find(query)
        .populate('image')
        .limit(limit)
        .skip(skip)
        .sort({ publishedAt: -1, createdAt: -1 });

      const totalDocs = await Resource.countDocuments(query);

      return {
        docs,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
    },

    Resource: async (_, { id, slug }) => {
      const query = id ? { _id: id } : { slug };
      return await Resource.findOne(query).populate('image');
    },
  },
};

module.exports = resourceResolvers;
