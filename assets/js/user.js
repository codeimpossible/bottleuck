var ProfileView = Marionette.ItemView.extend({
  template: 'assets/templates/user-profile.html'
});

var User = Backbone.Model.extend({
  urlRoot: '/user',

  events: function() {
    var ev = new Events(this.get('events') || []);
    ev.url = '/user/' + this.id + '/events';
    return ev;
  }
});


var UserProfile = Marionette.Controller.extend({
  initialize: function() {
    app.addRegions({
      eventsList: '#events-list'
    });
  }
  , profile: function() {
    var user = this.options.model;
    var events = user.events();
    events.fetch().then(function() {
      app.eventsList.show(new EventsList({ collection: events, currentUser: user }));
    });
  }
});
