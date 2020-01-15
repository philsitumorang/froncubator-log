FROM node:13.6.0-alpine3.10

RUN mkdir -p /frontend/public
RUN mkdir -p /frontend/src

WORKDIR /frontend

COPY package.json /frontend

RUN npm install
CMD npm run start