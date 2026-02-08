# --- Stage 1: Frontend Builder (Alpine) ---
FROM node:22-alpine AS frontend-builder
WORKDIR /app/client

# Essential for Alpine to handle some npm package compilations if needed
RUN apk add --no-cache python3 make g++ libc6-compat

# Copy package files first to leverage Docker cache
COPY client/package*.json ./

# Environment variables to prevent memory-heavy Cypress downloads
ENV CYPRESS_INSTALL_BINARY=0

# Use 'ci' for a clean, faster, and more reliable install in Docker
# --no-audit and --no-fund save memory and time
RUN npm ci --no-audit --no-fund

COPY client/ .
RUN npm run build

# --- Stage 2: Backend Builder (Alpine) ---
FROM golang:1.23-alpine AS backend-builder
# Install build essentials for Go on Alpine
RUN apk add --no-cache git ca-certificates

WORKDIR /app/server
COPY server/go.mod server/go.sum* ./
RUN go mod download

COPY server/ .

# IMPORTANT: CGO_ENABLED=0 creates a statically linked binary
# This is required to run a Go binary built in Alpine on other Alpine images
RUN CGO_ENABLED=0 GOOS=linux go build -o /kielibuddy-server ./cmd

# --- Stage 3: Final Production Image (Alpine) ---
FROM alpine:3.20
WORKDIR /root/

# Add security certificates
RUN apk add --no-cache ca-certificates tzdata

# Copy the static backend binary
COPY --from=backend-builder /kielibuddy-server .
# Copy the built frontend assets from the frontend stage
COPY --from=frontend-builder /app/client/dist ./dist

# Standard production environment variables
ENV PORT=8080
EXPOSE 8080

CMD ["./kielibuddy-server"]