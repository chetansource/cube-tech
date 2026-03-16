const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');
const Resume = require('../models/Resume');

// Helper to escape CSV fields
const escCsv = (val) => {
  if (val == null) return '';
  const str = String(val).replace(/"/g, '""').replace(/\n/g, ' ');
  return `"${str}"`;
};

// GET /api/export/contact-submissions
router.get('/contact-submissions', async (req, res) => {
  const records = await ContactSubmission.find({}).sort({ submittedAt: -1 }).lean();
  const header = 'Name,Email,Phone,Interested Field,Message,Status,Submitted At';
  const rows = records.map((r) =>
    [r.name, r.email, r.phone, r.interestedField, r.message, r.status,
      r.submittedAt ? new Date(r.submittedAt).toISOString() : ''
    ].map(escCsv).join(',')
  );
  const csv = [header, ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="contact-submissions.csv"');
  res.send(csv);
});

// GET /api/export/resumes
router.get('/resumes', async (req, res) => {
  const records = await Resume.find({})
    .populate('jobId', 'title')
    .populate('resumeUpload', 'url originalFilename')
    .sort({ submittedAt: -1 })
    .lean();
  const header = 'Full Name,Phone,Job Title,Resume File,Resume URL,Status,Notes,Submitted At';
  const rows = records.map((r) =>
    [
      r.fullName,
      r.number,
      r.jobId?.title || 'General Application',
      r.resumeUpload?.originalFilename || '',
      r.resumeUpload?.url || '',
      r.status,
      r.notes,
      r.submittedAt ? new Date(r.submittedAt).toISOString() : '',
    ].map(escCsv).join(',')
  );
  const csv = [header, ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="resumes.csv"');
  res.send(csv);
});

module.exports = router;
