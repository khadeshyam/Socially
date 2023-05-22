FROM node:18-alpine

WORKDIR /server

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 5000

CMD ["npm","run","dev"]
