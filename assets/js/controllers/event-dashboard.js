var BottleuckDashboard = Marionette.Controller.extend({
  initialize: function(options) {
    app.addRegions({
      participantsList: '#participants-list'
    });

    app.reqres.setHandler('user:current', function() {
      return options.currentUser;
    });

    app.reqres.setHandler('event:current', function() {
      return options.model;
    });
  }
  , dashboard: function() {
    var participants = this.options.model.participants();

    // send the current event id along to filter the
    // participants we get back
    var options = { data: $.param({ event: this.options.model.id }) };

    var interval = function() {
      participants.fetch(options).always(function() {
        setTimeout(interval, 15000);
      });
    };

    participants.fetch(options).then(function() {
      app.participantsList.show(new ParticipantsList({ collection: participants }));
      setTimeout(interval, 15000);
    });
  }
});
