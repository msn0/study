define([
  'init/stackmob'
], function () {
  return Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template || '';
      this.model.bind("change:isSubmitted", this.render, this);
    },
    events: {
      "click button": "submit"
    },
    submit: function () {
      if (this.model.get('isSubmitted')) {
        return;
      }
      this.model.set("isSubmitted", true);
    },
    render: function () {
      var template = $.tmpl(this.template, this.model.toJSON());
      this.$el.empty();
      this.$el.html(template);
      return this;
    }
  });
});