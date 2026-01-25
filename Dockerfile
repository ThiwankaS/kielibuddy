FROM node:22-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

FROM golang:1.23-alpine AS backend-builder
WORKDIR /app/server
COPY server/go.mod ./
RUN go mod download
COPY server/ .
RUN go build -o /kielibuddy-server main.go

FROM alpine:latest
WORKDIR /root/
COPY --from=backend-builder /kielibuddy-server .
COPY --from=frontend-builder /app/client/dist ./dist
ENV PORT=8080
EXPOSE 8080
CMD ["./kielibuddy-server"]