const sharp = require('sharp');

class ImageService {
  /**
   * Optimize and resize image
   * @param {Buffer} imageBuffer - Original image buffer
   * @param {Object} options - Optimization options
   * @returns {Promise<{buffer: Buffer, width: number, height: number}>}
   */
  async optimizeImage(imageBuffer, options = {}) {
    const {
      width = null,
      height = null,
      quality = 80,
      format = 'webp',
    } = options;

    try {
      let image = sharp(imageBuffer);

      // Get metadata
      const metadata = await image.metadata();

      // Resize if dimensions provided
      if (width || height) {
        image = image.resize(width, height, {
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Convert format and optimize
      if (format === 'webp') {
        image = image.webp({ quality });
      } else if (format === 'jpeg' || format === 'jpg') {
        image = image.jpeg({ quality });
      } else if (format === 'png') {
        image = image.png({ quality });
      }

      const buffer = await image.toBuffer();
      const info = await sharp(buffer).metadata();

      return {
        buffer,
        width: info.width,
        height: info.height,
      };
    } catch (error) {
      console.error('Image Optimization Error:', error);
      throw new Error(`Failed to optimize image: ${error.message}`);
    }
  }

  /**
   * Create multiple image sizes (thumbnail, medium, large)
   * @param {Buffer} imageBuffer - Original image buffer
   * @returns {Promise<Object>}
   */
  async createImageSizes(imageBuffer) {
    try {
      const sizes = {
        thumbnail: { width: 150, height: 150 },
        medium: { width: 800, height: 600 },
        large: { width: 1920, height: 1080 },
      };

      const results = {};

      for (const [sizeName, dimensions] of Object.entries(sizes)) {
        results[sizeName] = await this.optimizeImage(imageBuffer, {
          width: dimensions.width,
          height: dimensions.height,
          quality: 80,
          format: 'webp',
        });
      }

      // Keep original in WebP format
      results.original = await this.optimizeImage(imageBuffer, {
        quality: 85,
        format: 'webp',
      });

      return results;
    } catch (error) {
      console.error('Create Image Sizes Error:', error);
      throw new Error(`Failed to create image sizes: ${error.message}`);
    }
  }

  /**
   * Check if file is an image
   * @param {string} mimeType - File MIME type
   * @returns {boolean}
   */
  isImage(mimeType) {
    return mimeType.startsWith('image/');
  }

  /**
   * Get image dimensions
   * @param {Buffer} imageBuffer - Image buffer
   * @returns {Promise<{width: number, height: number}>}
   */
  async getImageDimensions(imageBuffer) {
    try {
      const metadata = await sharp(imageBuffer).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
      };
    } catch (error) {
      console.error('Get Image Dimensions Error:', error);
      throw new Error(`Failed to get image dimensions: ${error.message}`);
    }
  }
}

module.exports = new ImageService();
