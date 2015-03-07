FROM ubuntu:14.04

RUN apt-get update

RUN apt-get install -y nodejs npm

ADD start.sh /tmp/

RUN chmod +x /tmp/start.sh

EXPOSE 8080

CMD ./tmp/start.sh
