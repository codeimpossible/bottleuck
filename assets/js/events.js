var EventListItem = Marionette.ItemView.extend({
  template: 'assets/templates/events-list-item.html',
  ui: {
    'delete': '.btn-delete-event'
  },
  events: {
    'click @ui.delete': 'delete'
  },

  delete: function() {
    var del = this.ui.delete.find('.fa').removeClass('fa-trash').addClass('fa-spin fa-circle-o-notch');
    this.model.destroy().always(function() {
      del.removeClass('fa-spin fa-circle-o-notch').addClass('fa-trash');
    });
  }
});

var EventsList = Marionette.CompositeView.extend({
  childView: EventListItem,
  childViewContainer: '.events-list',
  template: 'assets/templates/events-list.html',

  ui: {
    'toggle': '.btn-toggle-create-event',
    'form': '.form-create-event',
    'title': '[name=title]',
    'description': '[name=description]'
  },

  events: {
    'click @ui.toggle': 'toggleForm',
    'submit form': 'save'
  },

  initialize: function() {
    this.model = new Event();
    this.listenTo(this.model, 'invalid', this.showRequired);
    this.listenTo(this.collection, 'add', this.hideForm);
    this.listenTo(this.model, 'sync', this.add);
  },

  add: function() {
    this.collection.add([this.model.toJSON()]);
  },

  toggleForm: function() {
    this.ui.form.toggleClass('hidden');
  },

  hideForm: function() {
    this.ui.title.val('');
    this.ui.title.val('');
    this.ui.form.find('.has-error').removeClass('has-error');
    this.toggleForm();
  },

  showRequired: function(model, error) {
    this.ui.form.find('.help-block').remove();
    this.ui.title.parent('.form-group').addClass('has-error');
    this.$('button[type=submit]').addClass('btn-danger').removeClass('btn-primary');
    this.ui.title.after('<p class="help-block">' + error + '</p>');
  },

  save: function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.$('button[type=submit]').removeClass('btn-danger').addClass('btn-primary');

    this.model.set({
      title: this.ui.title.val(),
      description: this.ui.description.val(),
      owner: this.options.currentUser.id
    });

    if(this.model.save()) {
      this.$('button[type=submit]').html('<i class="fa fa-spin fa-circle-notch-o"></i> Creating...');
    }

    return false;
  }
});

var Event = Backbone.Model.extend({
  urlRoot: '/event',
  validate: function() {
    if(!this.get('title')) {
      return 'Title is required.';
    }
  }
});

var Events = Backbone.Collection.extend({
  model: Event
});
