FROM node:22-alpine3.18
WORKDIR /app
COPY . .

RUN yarn install

EXPOSE 3000
CMD ["yarn", "start"]