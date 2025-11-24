const Page = require('../../models/Page');
const Stat = require('../../models/Stat');
const Testimonial = require('../../models/Testimonial');

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
        .populate('sections.leaders.image')
        .populate('sections.timelineItems.podcastImage')
        .populate('sections.cards.image')
        .populate('sections.heroBackgroundImage')
        .populate('sections.insightsBackgroundImage')
        .populate('sections.galleryBackgroundImage')
        .populate('sections.newsEventsBackgroundImage')
        .populate('sections.exploreMoreBackgroundImage')
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
        .populate('sections.jobs')
        .populate('sections.leaders.image')
        .populate('sections.timelineItems.podcastImage')
        .populate('sections.cards.image')
        .populate('sections.heroBackgroundImage')
        .populate('sections.insightsBackgroundImage')
        .populate('sections.galleryBackgroundImage')
        .populate('sections.newsEventsBackgroundImage')
        .populate('sections.exploreMoreBackgroundImage');
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
        case 'exploreCardsSection':
          return 'ExploreCardsSection';
        case 'aboutHeroSection':
          return 'AboutHeroSection';
        case 'leadershipSection':
          return 'LeadershipSection';
        case 'timelineSection':
          return 'TimelineSection';
        case 'corporateResponsibilitySection':
          return 'CorporateResponsibilitySection';
        case 'statsSection':
          return 'StatsSection';
        case 'testimonialsSection':
          return 'TestimonialsSection';
        case 'resourcesHeroSection':
          return 'ResourcesHeroSection';
        case 'insightsImpactSection':
          return 'InsightsImpactSection';
        case 'resourceGallerySection':
          return 'ResourceGallerySection';
        case 'newsEventsSection':
          return 'NewsEventsSection';
        case 'exploreMoreSection':
          return 'ExploreMoreSection';
        default:
          return 'GenericSection';
      }
    },
  },

  // Field resolvers for sections that need to fetch related data
  StatsSection: {
    stats: async () => {
      return await Stat.find({ active: true }).sort({ order: 1 });
    },
  },

  TestimonialsSection: {
    testimonials: async () => {
      return await Testimonial.find({ active: true }).populate('avatar').sort({ order: 1 });
    },
  },
};

module.exports = pageResolvers;
