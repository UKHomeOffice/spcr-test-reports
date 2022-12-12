FROM quay.io/ukhomeofficedigital/cop-node:18-alpine

# apk is Alpine Package Keeper
RUN apk update && apk upgrade --no-cache && rm -Rf /var/cache/apk/* \
    && mkdir -p /app \

WORKDIR '/app'

COPY package*.json ./
RUN npm ci && npm cache clean --force \
    && chown -R 1000:1000 /app \
    && chmod -R 755 /app

COPY . .

USER 1000
EXPOSE 3000
CMD ["npm", "start"]
