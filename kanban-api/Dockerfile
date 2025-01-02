# Specify Node Version and Image
FROM node:20.10.0 AS development

# Specify the working dir
WORKDIR /lucas/src/app

COPY package*.json ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci
RUN npm run build

EXPOSE 3000

FROM node:20.10.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /lucas/src/app

COPY --from=development /lucas/src/app/ .

EXPOSE 3000

CMD ["node", "dist/main" ]