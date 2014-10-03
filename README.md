# bottleuck

a [Sails](http://sailsjs.org) application

# Installation

 - install mongodb, default settings are fine when installing
 - install nodejs/bower
 - install sails `npm install -g sails`
 - `npm install && bower install`

#### Alternatively

If you have [vagrant](https://docs.vagrantup.com/v2/) setup, you can run `vagrant up` from the bottleuck root and this will create a new Ubuntu VM that will host the bottleuck site for you. After the VM is running you just need to run the following commands:

    $ vagrant ssh
    $ cd /opt/bottleuck
    $ sails lift

The VM has port-forwarding configured so you can still access the site by visiting: [http://localhost:1337](http://localhost:1337).


## Running the site for the first time

You should just need to run `sails lift` from the bottleuck directory. This will start the site locally at [http://localhost:1337](http://localhost:1337).

# Things to improve
I did this as a challenge, port as much of bottleuck from RoR to Node/Sails in a week as I can. Using a MPA structure. So, I cut some corners. Okay, I cut a **shit-ton** of corners. Here they are.

### Separate the Join Event logic from the Participants List.
It would be nicer to have the server conditionally render the join section only if the user hasn't already joined and they aren't the owner. Sharing the participants collection between the two views would make this a lot cleaner.

### Refactor less
I rushed through this and used mixins wrong, I started using the components directory half way through and liked that pattern better.

### More Features
I really didn't get as far as I would have liked. There are a ton of features I wanted to be able to get done:

 - Voting on Beers
 - iCal support for events
 - having a date for your event (see the feature above)
 - an event countdown if it hasn't started yet
 - a feed of tweets that use a custom hashtag you set for your event
 - facebook, twitter, google+ login
