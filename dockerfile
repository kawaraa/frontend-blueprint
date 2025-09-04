# Use NGINX to serve pre-built static files (from your local dist/)
# --- Stage 1: Build React app ---
FROM node:18-alpine AS builder

WORKDIR /
COPY package*.json ./
RUN npm install
# Pass variable from build args
ARG NEXT_API_URL
ENV NEXT_API_URL=$NEXT_API_URL

COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:stable-alpine
# FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx public folder
COPY --from=builder /dist /usr/share/nginx/html

# Copy custom nginx config for better caching/SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


## 1. Build the Docker Image: docker build -t frontend .
## 2. Test Locally: docker run -p 3000:80 frontend
## 4. docker exec -it frontend /bin/sh