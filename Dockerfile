FROM node:22-bullseye

WORKDIR /home/node/fiap_g38/app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]
