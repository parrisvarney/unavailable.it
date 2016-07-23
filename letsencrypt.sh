awk '$1 ~ "^deb" { $3 = $3 "-backports"; print; exit }' /etc/apt/sources.list > /etc/apt/sources.list.d/backports.list
apt-get update
apt-get install -y python-certbot-apache -t jessie-backports
certbot --apache -d unavailable.it --email parris.varney@gmail.com --agree-tos --redirect
