const Service = require('../../models/Service');
const Partner = require('../../models/Partner');
const Testimonial = require('../../models/Testimonial');
const Award = require('../../models/Award');
const Solution = require('../../models/Solution');
const Stat = require('../../models/Stat');
const Timeline = require('../../models/Timeline');
const SiteSettings = require('../../models/SiteSettings');

const generalResolvers = {
  Query: {
    Services: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Service.find(query).populate('image').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Partners: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Partner.find(query).populate('logo').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Testimonials: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Testimonial.find(query).populate('avatar').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Awards: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Award.find(query).populate('logo').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Solutions: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Solution.find(query).populate('image').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Stats: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Stat.find(query).sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    Timeline: async (_, { limit }) => {
      const query = { active: true };
      let queryBuilder = Timeline.find(query).populate('image').sort({ order: 1 });

      if (limit) {
        queryBuilder = queryBuilder.limit(limit);
      }

      return await queryBuilder;
    },

    SiteSettings: async () => {
      const settings = await SiteSettings.getInstance();

      // Manually populate nested icon references
      if (settings && settings.footer && settings.footer.socials) {
        await SiteSettings.populate(settings, {
          path: 'logo favicon',
        });

        // Populate each social icon manually since it's deeply nested
        for (let i = 0; i < settings.footer.socials.length; i++) {
          if (settings.footer.socials[i].icon) {
            await SiteSettings.populate(settings, {
              path: `footer.socials.${i}.icon`,
              model: 'Media',
            });
          }
        }
      }

      return settings;
    },
  },
};

module.exports = generalResolvers;
