const Joi = require('joi');

// Validation schemas
const schemas = {
  contactSubmission: Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    email: Joi.string().email().required().trim().lowercase(),
    phone: Joi.string().min(10).max(15).required().trim(),
    interestedField: Joi.string().required().trim(),
    message: Joi.string().max(2000).allow('').trim(),
  }),

  resumeSubmission: Joi.object({
    fullName: Joi.string().min(2).max(100).required().trim(),
    number: Joi.string().min(10).max(15).required().trim(),
    jobId: Joi.string().optional().allow('', null),
    resumeUpload: Joi.string().required(), // Media ID
  }),

  mediaUpload: Joi.object({
    alt: Joi.string().max(200).optional().allow('').trim(),
    caption: Joi.string().max(500).optional().allow('').trim(),
    folder: Joi.string().max(50).optional().default('general').trim(),
  }),

  newsletterSubscription: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
  }),
};

/**
 * Validation middleware factory
 * @param {string} schemaName - Name of the schema to validate against
 * @returns {Function} Express middleware
 */
const validate = (schemaName) => {
  return (req, res, next) => {
    const schema = schemas[schemaName];

    if (!schema) {
      return res.status(500).json({
        success: false,
        error: {
          message: 'Validation schema not found',
          code: 'SCHEMA_NOT_FOUND',
        },
      });
    }

    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Return all errors
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      const errors = error.details.reduce((acc, detail) => {
        acc[detail.path[0]] = detail.message;
        return acc;
      }, {});

      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: errors,
        },
      });
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

module.exports = { validate };
