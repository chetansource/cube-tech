const PopularSearch = require('../../models/PopularSearch');

const popularSearchResolvers = {
  Query: {
    PopularSearches: async (_, { limit = 20 }) => {
      try {
        const searches = await PopularSearch.find({ active: true })
          .sort({ order: 1 })
          .limit(limit);
        return searches;
      } catch (error) {
        console.error('Error fetching popular searches:', error);
        return [];
      }
    },
  },
};

module.exports = popularSearchResolvers;
