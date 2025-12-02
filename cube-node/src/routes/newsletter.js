const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');
const { validate } = require('../middleware/validation');
const { formLimiter } = require('../middleware/rateLimiter');

/**
 * POST /api/newsletter
 * Subscribe to newsletter
 */
router.post(
  '/',
  formLimiter,
  validate('newsletterSubscription'),
  async (req, res, next) => {
    try {
      const { email } = req.body;

      // Check if email already exists
      const existingSubscription = await Newsletter.findOne({ email });

      if (existingSubscription) {
        if (existingSubscription.status === 'subscribed') {
          return res.status(400).json({
            success: false,
            error: {
              message: 'This email is already subscribed to our newsletter',
              code: 'ALREADY_SUBSCRIBED',
            },
          });
        } else {
          // Resubscribe if previously unsubscribed
          existingSubscription.status = 'subscribed';
          existingSubscription.subscribedAt = new Date();
          existingSubscription.unsubscribedAt = null;
          await existingSubscription.save();

          return res.status(200).json({
            success: true,
            message: 'Successfully resubscribed to newsletter',
            doc: {
              id: existingSubscription._id,
              email: existingSubscription.email,
              subscribedAt: existingSubscription.subscribedAt,
            },
          });
        }
      }

      // Create new subscription
      const subscription = await Newsletter.create({
        email,
        ipAddress: req.ip,
        userAgent: req.get('user-agent'),
      });

      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        doc: {
          id: subscription._id,
          email: subscription.email,
          subscribedAt: subscription.subscribedAt,
        },
      });
    } catch (error) {
      if (error.code === 'DUPLICATE_EMAIL' || error.code === 11000) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'This email is already subscribed to our newsletter',
            code: 'ALREADY_SUBSCRIBED',
          },
        });
      }
      next(error);
    }
  }
);

/**
 * DELETE /api/newsletter/:email
 * Unsubscribe from newsletter
 */
router.delete(
  '/:email',
  async (req, res, next) => {
    try {
      const { email } = req.params;

      const subscription = await Newsletter.findOne({ email });

      if (!subscription) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Email not found in our newsletter subscribers',
            code: 'NOT_FOUND',
          },
        });
      }

      subscription.status = 'unsubscribed';
      subscription.unsubscribedAt = new Date();
      await subscription.save();

      res.status(200).json({
        success: true,
        message: 'Successfully unsubscribed from newsletter',
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
