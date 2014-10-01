var Bottleuck = Backbone.Model.extend({
  urlRoot: '/api/event',
  validate: function() {
    if(!this.get('title')) {
      return 'Title is required.';
    }
  },

  participants: function() {
    var p = new Backbone.Collection(this.get('participants') || []);
    p.url = '/api/participant';
    return p;
  }
});

var Bottleucks = Backbone.Collection.extend({
  model: Bottleuck
});

var User = Backbone.Model.extend({
  urlRoot: '/api/user',

  events: function() {
    var ev = new Bottleucks(this.get('events') || []);
    ev.url = this.url() + '/events';
    return ev;
  }
});
