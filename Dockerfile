FROM node:20-alpine

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run db:init
RUN npm run db:deploy
RUN npm run build

CMD ["npm", "start"]