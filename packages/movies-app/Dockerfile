FROM node:14.15.0-alpine

WORKDIR /movies

COPY package*.json ./

RUN npm install

ADD . .

RUN npm build

EXPOSE 4000

CMD ["node", "./dist/main.js"]