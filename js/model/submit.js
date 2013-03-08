define(['init/stackmob'], function () {
  return Backbone.Model.extend({
    defaults: {
      exercises: [],
      isSubmitted: false
    }
  });
});