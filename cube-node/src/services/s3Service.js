const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client, AWS_CONFIG } = require('../config/aws');
const path = require('path');

class S3Service {
  /**
   * Upload file to S3
   * @param {Buffer} fileBuffer - File buffer
   * @param {string} fileName - Original filename
   * @param {string} mimeType - File MIME type
   * @param {string} folder - Folder path in S3
   * @returns {Promise<{url: string, key: string}>}
   */
  async uploadFile(fileBuffer, fileName, mimeType, folder = 'general') {
    const timestamp = Date.now();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileExtension = path.extname(sanitizedFileName);
    const baseName = path.basename(sanitizedFileName, fileExtension);
    const uniqueFileName = `${baseName}-${timestamp}${fileExtension}`;

    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');

    const key = `${folder}/${year}/${month}/${uniqueFileName}`;

    const params = {
      Bucket: AWS_CONFIG.bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
      // ACL: 'public-read', // Make files publicly accessible
    };

    try {
      await s3Client.send(new PutObjectCommand(params));

      const url = `https://${AWS_CONFIG.bucket}.s3.${AWS_CONFIG.region}.amazonaws.com/${key}`;

      return { url, key };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }

  /**
   * Delete file from S3
   * @param {string} key - S3 object key
   * @returns {Promise<void>}
   */
  async deleteFile(key) {
    const params = {
      Bucket: AWS_CONFIG.bucket,
      Key: key,
    };

    try {
      await s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
      console.error('S3 Delete Error:', error);
      throw new Error(`Failed to delete file from S3: ${error.message}`);
    }
  }

  /**
   * Generate signed URL for private file access
   * @param {string} key - S3 object key
   * @param {number} expiresIn - URL expiration in seconds (default: 1 hour)
   * @returns {Promise<string>}
   */
  async getSignedUrl(key, expiresIn = 3600) {
    const command = new GetObjectCommand({
      Bucket: AWS_CONFIG.bucket,
      Key: key,
    });

    try {
      return await getSignedUrl(s3Client, command, { expiresIn });
    } catch (error) {
      console.error('S3 Signed URL Error:', error);
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }
}

module.exports = new S3Service();
