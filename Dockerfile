# build stage
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
COPY ./common ./common
RUN npm ci --quiet && npm run build

# production stage
FROM node:14

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/dist ./build

EXPOSE 3000

CMD ["node", "/app/build/listen.js"]