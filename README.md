# bottleuck

a [Sails](http://sailsjs.org) application

# Installation

 - install mongodb, default settings are fine when installing
 - install nodejs
 - install sails, bower and passport `npm install -g sails bower passport`
 - `npm install && bower install`
 - setup mongodb `mongo ./scripts/mongo-setup.js`
 - run the site: `sails lift`

#### Alternatively

If you have [vagrant](https://docs.vagrantup.com/v2/) setup, you can run `vagrant up` from the bottleuck root and this will create a new Ubuntu VM that will host the bottleuck site for you. After the VM is running you just need to run the following commands:

    $ vagrant ssh
    $ cd /opt/bottleuck
    $ sails lift

The VM has port-forwarding configured so you can still access the site by visiting: [http://localhost:1337](http://localhost:1337).


## Running the site for the first time

You should just need to run `sails lift` from the bottleuck directory. This will start the site locally at [http://localhost:1337](http://localhost:1337).
