# THIS IS AN EXAMPLE DOCKERFILE
FROM node:18-alpine

RUN apk update && apk upgrade --no-cache && rm -Rf /var/cache/apk/*

USER 1000

ENTRYPOINT ["sleep", "3600"]