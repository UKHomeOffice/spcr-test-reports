FROM node:alpine

WORKDIR '/app'

RUN addgroup -S app && adduser -S -G app app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build


RUN chown -R app:app /app
RUN chmod -R 755 /app
USER app

EXPOSE 3000

CMD ["npm", "start"]
