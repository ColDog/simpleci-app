FROM ubuntu

# install nginx
RUN apt-get update && apt-get install -y nginx
RUN apt-get install -y python
RUN rm -rf /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/default

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

# Copy files
COPY dist /usr/share/nginx/html/

# configuration settings
COPY bin /usr/share/nginx/bin

EXPOSE 80 443
CMD ["nginx -g \"daemon off;\""]
