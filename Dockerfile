FROM node:14.15.0-alpine3.10

WORKDIR /usr/shop_api

COPY ["package.json", "."]
COPY ["package-lock.json", "."]

RUN ["npm", "ci"]

COPY . .

RUN ["npm", "run", "prod:build"]

CMD ["npm", "run", "prod:start"]
