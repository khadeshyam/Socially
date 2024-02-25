FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]