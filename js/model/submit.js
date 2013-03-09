define(['init/stackmob'], function () {
  return Backbone.Model.extend({
    defaults: {
      exercises: [],
      invitation: null,
      isSubmitted: false
    }
  });
});