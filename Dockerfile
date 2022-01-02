FROM node:16-alpine
RUN mkdir /cooklog
WORKDIR /cooklog

ENV LANG=C.UTF-8 \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0 \
    API_URL=${API_URL}

COPY package*.json ./
RUN yarn install

COPY . ./

RUN yarn run build
