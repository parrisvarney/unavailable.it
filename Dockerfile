# Build the container:
#  cd /path/to/api/folder
#  docker build --file Dockerfile -t unavailable.it .
#
# Start the container instance:
#  cd /path/to/api/folder
#  docker run -itd -v $PWD:/var/www/html/ -p 8080:80 --link db:mysql --name unavailable.it unavailable.it
#
# Verify apache is running
#  curl http://localhost:8080 -v

# https://hub.docker.com/_/php/
FROM php:7-apache

COPY ./vhost.conf /etc/apache2/sites-enabled/vhost.conf

RUN a2enmod rewrite
RUN a2enmod headers
RUN docker-php-ext-install pdo_mysql
