require('dotenv').config();
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Send contact form notification to admin
   * @param {Object} submission - Contact submission data
   * @returns {Promise<void>}
   */
  async sendContactNotification(submission) {
    const { name, email, phone, interestedField, message } = submission;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Name:</span> ${name}
            </div>
            <div class="field">
              <span class="label">Email:</span> ${email}
            </div>
            <div class="field">
              <span class="label">Phone:</span> ${phone}
            </div>
            <div class="field">
              <span class="label">Interested In:</span> ${interestedField}
            </div>
            <div class="field">
              <span class="label">Message:</span><br>
              ${message || 'No message provided'}
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from Cube Highways website contact form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Cube Highways <noreply@cubehighways.com>',
      to: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@cubehighways.com',
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Contact notification email sent to ${mailOptions.to}`);
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Send resume submission notification to hiring team
   * @param {Object} resumeData - Resume submission data
   * @returns {Promise<void>}
   */
  async sendResumeNotification(resumeData) {
    const { fullName, number, jobId, resumeUrl } = resumeData;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #28a745; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Resume Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <span class="label">Candidate Name:</span> ${fullName}
            </div>
            <div class="field">
              <span class="label">Phone Number:</span> ${number}
            </div>
            ${jobId ? `<div class="field"><span class="label">Job ID:</span> ${jobId}</div>` : ''}
            <div class="field">
              <span class="label">Resume:</span><br>
              <a href="${resumeUrl}" class="button">Download Resume</a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from Cube Highways career portal.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Cube Highways <noreply@cubehighways.com>',
      to: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@cubehighways.com',
      subject: `New Resume Submission from ${fullName}`,
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Resume notification email sent to ${mailOptions.to}`);
    } catch (error) {
      console.error('❌ Email sending failed:', error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  /**
   * Send confirmation email to user who submitted contact form
   * @param {string} email - User email
   * @param {string} name - User name
   * @returns {Promise<void>}
   */
  async sendContactConfirmation(email, name) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #777; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Thank You for Contacting Us</h2>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to Cube Highways. We have received your message and our team will get back to you shortly.</p>
            <p>We appreciate your interest in our services.</p>
            <p>Best regards,<br>Cube Highways Team</p>
          </div>
          <div class="footer">
            <p>Cube Highways - Infrastructure Excellence</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Cube Highways <noreply@cubehighways.com>',
      to: email,
      subject: 'Thank you for contacting Cube Highways',
      html: htmlContent,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Confirmation email sent to ${email}`);
    } catch (error) {
      console.error('❌ Confirmation email failed:', error.message);
      // Don't throw error for confirmation emails
    }
  }
}

module.exports = new EmailService();
