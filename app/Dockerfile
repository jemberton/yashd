FROM node:18-alpine

RUN mkdir -p /yashd/app
WORKDIR /yashd/app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
