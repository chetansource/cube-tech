# Multi-stage build for Node.js backend
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production && npm cache clean --force

# Production stage
FROM base AS production
WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application code
COPY . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["npm", "start"]
