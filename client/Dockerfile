FROM node:18-alpine

WORKDIR /client

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
