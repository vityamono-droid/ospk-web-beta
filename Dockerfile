FROM node:22.20.0

WORKDIR /srv

COPY . .

RUN npm install

RUN npm exec -w @ospk/web-database -- prisma generate

RUN npm run prepare -w @ospk/web-database

RUN npm run build

ENV MODE=PROD

EXPOSE 11001
