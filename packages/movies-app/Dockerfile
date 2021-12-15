FROM node:14.15.0-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN cat package.json
RUN ls /app
RUN npm install

ADD . .

RUN npm build

EXPOSE 4000

CMD ["npm", "run", "start:prod"]