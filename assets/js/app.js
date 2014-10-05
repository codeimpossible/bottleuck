var app = new Marionette.Application();

// override the default template loader for marionette
// templates are pushed into a global JST object, so look there
// instead of the DOM
Marionette.TemplateCache.prototype.loadTemplate = function(id) {
  return JST[id];
};

// our client side templates are pre-compiled by sails. so just
// return the template from compileTemplate
Marionette.TemplateCache.prototype.compileTemplate = function(template) {
  return template;
};

app.on('start', function() {
  app.vent.trigger('app:start', app);
});

$(document).ajaxStart(function() {
  $('.js-loading').css('display', 'inline');
}).ajaxStop(function() {
  $('.js-loading').css('display', 'none');
});
