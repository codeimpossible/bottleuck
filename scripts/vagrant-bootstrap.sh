#!/usr/bin/env bash

apt-get update

# install nodejs and any build deps
apt-get -q -y install git python-software-properties make g++ vim
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get -q -y install nodejs

# install mongodb
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb-org

# install sails, bower and passport globally
npm install -g sails bower passport

# make a self-contained copy of the bottleuck source
sudo cp -r /vagrant /opt/bottleuck

cd /opt/bottleuck

# remove the node modules dir, in case some deps need to build on our OS
rm -rf node_modules/

# vagrant needs to own the bottleuck dir
chown -R vagrant /opt/bottleuck

npm install

mongo /opt/bottleuck/scripts/mongo-setup.js
