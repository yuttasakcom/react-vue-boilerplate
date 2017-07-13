FROM nginx:1.12.1
MAINTAINER YoProgrammer <yuttasakcom@gmail.com>
COPY config/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY dist/ /var/www/html