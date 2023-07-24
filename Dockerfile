# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app
# Copy package.json, package-lock.json, and tsconfig.json to the Docker image
COPY . . 

# Install the application dependencies inside the Docker image
RUN npm cache clean --force
RUN npm install 
WORKDIR /app/src
RUN npm run build

# FROM --platform=linux/amd64 node:18-alpine AS runner
# WORKDIR /app
# COPY --from=builder /app/dist ./
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/node_modules ./

CMD ["npm", "start"]
