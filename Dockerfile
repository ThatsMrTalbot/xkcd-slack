FROM node:7-slim

RUN npm i -g yarn

ADD . /opt/xkcd

RUN cd /opt/xkcd && \
    yarn install && \
    yarn run build

WORKDIR "/wd"
VOLUME "/wd"
ENTRYPOINT ["node", "/opt/xkcd/bin/app.js"]