FROM node:alpine

WORKDIR '/app'

RUN addgroup -S app && adduser -S -G app app

RUN chown -R app:app .

RUN chmod -R 755 .

USER app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
RUN npm build

CMD ["npm", "start"]
