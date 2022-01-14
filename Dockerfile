FROM node:16-alpine
RUN mkdir /cooklog
WORKDIR /cooklog

ARG WORKDIR
ARG CONTAINER_PORT
ARG REACT_APP_API_URL

ENV HOME=/${WORKDIR} \
  LANG=C.UTF-8 \
  TZ=Asia/Tokyo \
  HOST=0.0.0.0 \
  REACT_APP_API_URL=${REACT_APP_API_URL}

# ENV check
RUN echo ${CONTAINER_PORT}
RUN echo ${REACT_APP_API_URL}

COPY package*.json ./
RUN yarn install

COPY . ./

RUN yarn run build
