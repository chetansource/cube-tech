const Page = require('../../models/Page');

const pageResolvers = {
  Query: {
    Pages: async (_, { where, limit = 10, page = 1 }) => {
      const query = {};

      // Build query from where input
      if (where) {
        if (where.slug?.equals) {
          query.slug = where.slug.equals;
        }
        if (where.slug?.contains) {
          query.slug = { $regex: where.slug.contains, $options: 'i' };
        }
        if (where.status?.equals) {
          query.status = where.status.equals;
        }
      }

      const skip = (page - 1) * limit;
      const docs = await Page.find(query)
        .populate('sections.backgroundImage')
        .populate('sections.image')
        .populate('sections.jobs')
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 });

      const totalDocs = await Page.countDocuments(query);

      return {
        docs,
        totalDocs,
        limit,
        page,
        totalPages: Math.ceil(totalDocs / limit),
      };
    },

    Page: async (_, { id }) => {
      return await Page.findById(id)
        .populate('sections.backgroundImage')
        .populate('sections.image')
        .populate('sections.jobs');
    },
  },

  Section: {
    __resolveType(section) {
      switch (section.blockType) {
        case 'faqSection':
          return 'FaqSection';
        case 'contact-info':
          return 'ContactInfo';
        case 'careerTitle':
          return 'CareerTitle';
        case 'jobListSection':
          return 'JobListSection';
        case 'heroSection':
          return 'HeroSection';
        default:
          return 'GenericSection';
      }
    },
  },
};

module.exports = pageResolvers;
