
// just a really easy way to render a template, good for EmptyViews
var DumbView = function(template) {
  return Marionette.ItemView.extend({ template: template });
};
