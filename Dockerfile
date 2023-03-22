FROM node:18-alpine as pre-build
COPY package*.json ./
RUN npm version 0.0.1

FROM node:18-alpine

WORKDIR /app/

COPY --from=pre-build package*.json ./

RUN npm install --production && rm -rf /root/.npm

COPY dist ./

CMD ["node", "app.js"]
