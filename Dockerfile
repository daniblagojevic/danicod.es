# ============================================
# Dependencies Stage
# ============================================
FROM node:20-alpine AS deps
WORKDIR /app
 
# Enable corepack (for managing package manager versions)
RUN corepack enable
 
# Copy package management files
COPY package.json pnpm-lock.yaml* ./
 
# Prefetch dependencies using cache mount
RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 \
  pnpm fetch
# Install dependencies using cache mount (frozen lockfile, offline mode)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 \
  pnpm install --frozen-lockfile --offline
 
# ============================================
# Build Stage
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app
 
# Enable corepack
RUN corepack enable
 
# Copy node_modules from dependencies stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source code
COPY . .
 
# ============================================
# Build Arguments
# Only declare variables needed at build time
# ============================================
 
# NEXT_PUBLIC_* variables (will be embedded in client-side JavaScript)
ARG NEXT_PUBLIC_SERVER_URL
 
# S3 Storage
ARG S3_ENDPOINT
ARG S3_BUCKET
ARG S3_ACCESS_KEY_ID
ARG S3_SECRET
 
# DATABASE_URI is needed for static site generation (SSG) at build time
ARG DATABASE_URI

# PAYLOAD_SECRET
ARG PAYLOAD_SECRET

# SUPER_ADMIN_ID
ARG SUPER_ADMIN_ID

# NODE_ENV
ARG NODE_ENV
 
# ============================================
# Build Environment Variables
# ============================================
 
# Set NEXT_PUBLIC_* as environment variables so Next.js can embed them in the bundle
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
 
# S3 Storage
ENV S3_ENDPOINT=${S3_ENDPOINT}
ENV S3_BUCKET=${S3_BUCKET}
ENV S3_ACCESS_KEY_ID=${S3_ACCESS_KEY_ID}
ENV S3_SECRET=${S3_SECRET}

# DATABASE_URI for static site generation
ENV DATABASE_URI=${DATABASE_URI}

# PAYLOAD_SECRET
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}

# SUPER_ADMIN_ID
ENV SUPER_ADMIN_ID=${SUPER_ADMIN_ID}

# Set NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
 
# Build the application
RUN --mount=type=cache,target=/root/.local/share/pnpm/store/v3 \
  pnpm build
 
# ============================================
# Runtime Stage
# ============================================
FROM node:20-alpine AS runner
WORKDIR /app
 
# ============================================
# No build arguments or environment variables needed here
# All runtime secrets will be injected by the container runtime (dokploy)
# Next.js standalone mode reads environment variables at runtime
# ============================================
 
# Set production environment
ENV NODE_ENV=production
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
 
# Create system user group and user (for secure execution)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
 
# Copy necessary files from build stage
# COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
 
# Switch to non-root user
USER nextjs
 
# Expose port
EXPOSE 3000
 
# Set port and hostname
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
 
# Start the application
CMD ["node", "server.js"]