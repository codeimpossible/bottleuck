var UserProfile = Marionette.Controller.extend({
  initialize: function(options) {
    app.addRegions({
      eventsList: '#events-list'
    });

    app.reqres.setHandler('user:current', function() {
      return options.model;
    });
  }
  , profile: function() {
    var events = this.options.model.events();
    events.fetch().then(function() {
      app.eventsList.show(new BottleucksList({ collection: events }));
    });
  }
});
