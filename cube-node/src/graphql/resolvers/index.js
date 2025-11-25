const { GraphQLDateTime } = require('graphql-scalars');
const pageResolvers = require('./pageResolvers');
const jobResolvers = require('./jobResolvers');
const projectResolvers = require('./projectResolvers');
const resourceResolvers = require('./resourceResolvers');
const generalResolvers = require('./generalResolvers');
const popularSearchResolvers = require('./popularSearchResolvers');

// Merge all resolvers
const resolvers = {
  DateTime: GraphQLDateTime,

  Query: {
    ...pageResolvers.Query,
    ...jobResolvers.Query,
    ...projectResolvers.Query,
    ...resourceResolvers.Query,
    ...generalResolvers.Query,
    ...popularSearchResolvers.Query,
  },

  Section: pageResolvers.Section,
  StatsSection: pageResolvers.StatsSection,
  TestimonialsSection: pageResolvers.TestimonialsSection,
};

module.exports = resolvers;
