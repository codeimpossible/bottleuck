var BottleuckListItem = Marionette.ItemView.extend({
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

var BottleucksList = Marionette.CompositeView.extend({
  childView: BottleuckListItem,
  childViewContainer: '.events-list',
  template: 'assets/templates/events-list.html',

  ui: {
    'toggle': '.btn-toggle-create-event',
    'form': '.form-create-event',
    'title': '[name=title]',
    'starts_at': '[data-input-type=datetime]',
    'description': '[name=description]'
  },

  events: {
    'click @ui.toggle': 'toggleForm',
    'submit form': 'save'
  },

  initialize: function() {
    this.model = new Bottleuck();
    this.listenTo(this.model, 'invalid', this.showRequired);
    this.listenTo(this.collection, 'add', this.hideForm);
    this.listenTo(this.model, 'sync', this.add);
  },

  onRender: function() {
    this.ui.starts_at.datetimepicker({
      icons: {
        time: 'fa fa-clock-o',
        date: 'fa fa-calendar',
        up: 'fa fa-arrow-up',
        down: 'fa fa-arrow-down'
      }
    });
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

    var currentUser = app.request('user:current');

    var starts_at = new Date(this.ui.starts_at.find('input').val());

    this.model.set({
      title: this.ui.title.val(),
      description: this.ui.description.val(),
      starts_at: new Date(starts_at.toUTCString()),
      owner: currentUser.id
    });

    if(this.model.save()) {
      this.$('button[type=submit]').html('<i class="fa fa-spin fa-circle-notch-o"></i> Creating...');
    }

    return false;
  }
});
