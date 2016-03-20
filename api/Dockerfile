# Build the container:
#  cd /path/to/api/folder
#  docker build --file Dockerfile -t api .
#
# Start the container instance:
#  cd /path/to/api/folder
#  docker run -itd -v $PWD:/var/www/html/ -p 8080:80 --link db:mysql --name api api
#
# Verify apache is running
#  curl http://localhost:8080 -v

# https://hub.docker.com/_/php/
FROM php:7-apache

COPY ./vhost.conf /etc/apache2/sites-enabled/vhost.conf

RUN a2enmod rewrite
RUN a2enmod headers
RUN docker-php-ext-install pdo_mysql

# DEV STUFF
RUN pecl install -o -f xdebug \
    && rm -rf /tmp/pear \
    && echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20151012/xdebug.so" > /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_enable=1"       >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_handler=dbgp"   >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_port=9000"      >> /usr/local/etc/php/conf.d/xdebug.ini \
    && echo "xdebug.remote_connect_back=1" >> /usr/local/etc/php/conf.d/xdebug.ini
