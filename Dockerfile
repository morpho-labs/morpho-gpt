FROM --platform=linux/amd64 node:18-alpine AS builder

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

RUN npm run build


FROM --platform=linux/amd64 node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install --production

COPY --from=builder /app/dist ./dist

CMD ["npm", "start"]
