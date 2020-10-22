FROM node:12.18-alpine

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install app dependencies
COPY ["package*.json", "yarn.lock"]
RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "start"]
