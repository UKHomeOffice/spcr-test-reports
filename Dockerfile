FROM node:alpine

WORKDIR '/app'

COPY package*.json ./

RUN npm install

COPY . .

USER 1000
EXPOSE 3000
RUN npm build

CMD ["npm", "start"]
