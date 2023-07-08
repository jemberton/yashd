FROM node:18-alpine

RUN mkdir -p /yashd/api
WORKDIR /yashd/api

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5172

CMD [ "npm", "run", "start:nodemon" ]
