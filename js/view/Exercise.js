define([
  'init/stackmob'
], function () {
  return Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template || '';
    },
    render: function () {
      var template = $.tmpl(this.template, this.model.toJSON());
      this.$el.append(template);
      return this;
    }
  });
});