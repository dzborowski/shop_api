FROM node:14.15.0-alpine3.10

WORKDIR /usr/shop_api

COPY ["package.json", "."]
COPY ["package-lock.json", "."]

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
