FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN yarn global add nodemon

RUN yarn install

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
