FROM nginx:1.17.7-alpine

RUN /bin/sh -c "apk add --no-cache bash"
RUN /bin/sh -c "apk add --no-cache nano"

COPY ./nginx.local.conf /etc/nginx/nginx.conf
EXPOSE 80