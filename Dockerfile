FROM ubuntu:14.04

MAINTAINER Asep Bagja Priandana <bepitulaz@gmail.com>

RUN apt-get update

RUN apt-get install -y nodejs npm

COPY . /src

RUN cd /src

RUN npm cache clean

RUN npm install

EXPOSE 3000
CMD["node", "/src/index.js"]
