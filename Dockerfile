FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm i

ENV NODE_ENV=development
COPY src ./src
COPY public ./public
COPY next.config.js .
COPY tsconfig.json .

EXPOSE 3000

CMD ["pnpm", "dev"]