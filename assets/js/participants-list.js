var ParticipantListItem = Marionette.ItemView.extend({
  template: 'assets/templates/participants-list-item.html',

  ui: {
    'leave': '.btn-leave-event'
  },

  events: {
    'click @ui.leave': 'leave'
  },

  leave: function() {
    var del = this.ui.leave.find('.fa').removeClass('fa-trash').addClass('fa-spin fa-circle-o-notch');
    this.model.destroy({ wait: true }).always(function() {
      del.removeClass('fa-spin fa-circle-o-notch').addClass('fa-trash');
    });
  }
});

var ParticipantsList = Marionette.CompositeView.extend({
  emptyView: DumbView('assets/templates/no-participants.html'),
  childView: ParticipantListItem,
  childViewContainer: '.participants-list',
  template: 'assets/templates/participants-list.html',

  ui: {
    'list': '.participants-list',
    'join': 'form [type=submit]',
    'beer': '[name=beer]'
  },

  events: {
    'click @ui.join': 'join'
  },

  initialize: function() {
    // update the visibility of the join form whenever the list changes
    this.listenTo(this.collection, 'add remove reset', this.ensureJoinForm);
    this.on('render', this.ensureJoinForm);
  },

  ensureJoinForm: function() {
    var currentUser = app.request('user:current');
    var participant = this.collection.find(function(p) {
      return p.get('user').id === currentUser.id;
    });

    // the user is already a participant, don't show the join section
    this.$('.join-event').toggle(!participant);
  },

  join: function(e) {
    e.preventDefault();
    e.stopPropagation();

    var currentUser = app.request('user:current');
    var currentEvent = app.request('event:current');
    if(this.ui.beer.val()) {
      this.collection.create({
        user: currentUser.toJSON(),
        beer: this.ui.beer.val(),
        event: currentEvent.toJSON()
      });
    }

    return false;
  }
});
