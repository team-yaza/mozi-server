FROM node:16-alpine

WORKDIR /usr/src/mozi-server

COPY *.* /usr/src/mozi-server/

RUN yarn install

COPY . /usr/src/mozi-server

# RUN yarn build

CMD [ "yarn", "dev" ]