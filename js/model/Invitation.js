define([
  'init/stackmob'
], function () {
  return Backbone.Model.extend({
    defaults: {
      createdate: null,
      exes: [],
      givenanswers: [],
      invitation_id: null,
      lastmoddate: null
    }
  });
});