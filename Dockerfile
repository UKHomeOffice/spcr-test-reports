FROM quay.io/ukhomeofficedigital/cop-node:18-alpine

# apk is Alpine Package Keeper
RUN apk update && apk upgrade --no-cache && rm -Rf /var/cache/apk/* \
    && mkdir -p /app \
    && addgroup -S app && adduser -S -G app app
WORKDIR '/app'

COPY package*.json ./
RUN npm ci && npm cache clean --force
COPY . .

RUN npm build \
    && chown -R app:app /app \
    && chmod -R 755 /app
USER app
EXPOSE 3000
CMD ["npm", "start"]
