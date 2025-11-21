const Project = require('../../models/Project');

const projectResolvers = {
  Query: {
    Projects: async (_, { where, limit = 10, page = 1 }) => {
      const query = {};

      if (where) {
        if (where.slug?.equals) {
          query.slug = where.slug.equals;
        }
        if (where.status?.equals) {
          query.status = where.status.equals;
        }
        if (where.category?.equals) {
          query.category = where.category.equals;
        }
        if (where.featured !== undefined) {
          query.featured = where.featured;
        }
      }

      const skip = (page - 1) * limit;
      const docs = await Project.find(query)
        .populate('mainImage')
        .populate('gallery')
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      const totalDocs = await Project.countDocuments(query);

      return {
        docs,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
    },

    Project: async (_, { id, slug }) => {
      const query = id ? { _id: id } : { slug };
      return await Project.findOne(query)
        .populate('mainImage')
        .populate('gallery');
    },
  },
};

module.exports = projectResolvers;
