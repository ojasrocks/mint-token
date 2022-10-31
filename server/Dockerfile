
FROM node:18

WORKDIR /app
COPY . /app/

RUN npm i -g @nestjs/cli
RUN npm ci --silent

EXPOSE 4000