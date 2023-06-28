# Use an official Node.js runtime as the base image
FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app
# Copy package.json, package-lock.json, and tsconfig.json to the Docker image
COPY package*.json ./
COPY tsconfig.json ./

COPY . .
# Install the application dependencies inside the Docker image
RUN npm cache clean --force

# RUN npm install -g npm@latest

RUN npm install 
RUN npm run build

CMD ["npm", "start"]
