require('dotenv').config();
const { S3Client } = require('@aws-sdk/client-s3');

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const AWS_CONFIG = {
  bucket: process.env.AWS_S3_BUCKET || 'cube-highways-media',
  region: process.env.AWS_REGION || 'us-east-1',
};

module.exports = { s3Client, AWS_CONFIG };
