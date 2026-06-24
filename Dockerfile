# syntax=docker/dockerfile:1.7
# ============================================================================
# 1 Horizon — production container for Google Cloud Run.
# Multi-stage build. Final image ships only the Next.js standalone server +
# static assets on top of node:20-alpine. No npm, no dev deps, no source.
# ============================================================================

# ---- Stage 1: install dependencies -----------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app

# Alpine needs libc6-compat for Next.js SWC native binaries.
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# ---- Stage 2: build --------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry so no network calls happen during build.
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ---- Stage 3: runtime ------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Cloud Run sets PORT dynamically; default to 8080 locally.
ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

# Run as a non-root user.
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy the standalone server + public assets + prerendered static content.
# The standalone output puts everything (minimal node_modules, server.js)
# under .next/standalone. .next/static must be placed alongside it.
COPY --from=builder --chown=nextjs:nodejs /app/public         ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

USER nextjs

EXPOSE 8080

# The standalone build produces a top-level server.js entrypoint.
CMD ["node", "server.js"]
