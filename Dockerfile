FROM node:12.19.0-alpine

WORKDIR /usr/shop_api/node

COPY package.json ./
COPY yarn.lock ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]
