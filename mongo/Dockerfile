# FROM mongo:3.6
FROM mvertes/alpine-mongo:4.0.6-1

RUN /bin/sh -c "apk add --no-cache bash"
RUN /bin/sh -c "apk add --no-cache nano"

# Auth Configuration. Modify as needed.
# These environment variables can also be specified through command line or docker-compose configuration
ENV AUTH yes

ADD ./run.sh /run.sh
ADD ./set_mongodb_password.sh /set_mongodb_password.sh

RUN chmod +x /run.sh
RUN chmod +x /set_mongodb_password.sh

CMD ["/run.sh"]