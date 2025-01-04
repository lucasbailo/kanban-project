FROM node:16.13.0 AS development

WORKDIR /lucas/frontend/src/app

COPY package*.json ./

COPY . .

RUN npm run build

EXPOSE 4200