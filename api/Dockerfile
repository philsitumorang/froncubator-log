FROM node:13.6.0-alpine3.10

RUN mkdir -p /api/src

WORKDIR /api

COPY package.json /api

RUN npm install
RUN npm install -g ts-node ts-node-dev typescript
CMD npm run start-local