# Build the container:
#  docker build --rm --file Dockerfile -t unavailable.it .
#
# Start the container instance:
#  docker run -itd -v $PWD:/var/www/html/ -p 80:80 -p 443:443 --link db:mysql --name unavailable.it unavailable.it
#
# Verify apache is running
#  curl http://localhost -v
#
# Make site HTTPS
#  docker exec -it unavailable.it bash -c './letsencrypt.sh'

# https://hub.docker.com/_/php/
FROM php:7-apache

COPY ./vhost.conf /etc/apache2/sites-enabled/vhost.conf

RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod headers
RUN docker-php-ext-install pdo_mysql
