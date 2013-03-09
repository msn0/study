define([
  'schema/Invitation',
  'init/stackmob'
], function (Invitation) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template || '';
      this.model.bind("change:isSubmitted", this.render, this);
    },
    events: {
      "click button": "submit"
    },
    getInvitation: function () {
      var invitation = new Invitation({
        invitation_id: this.model.get('invitation').get('invitation_id')
      });
      return invitation;
    },
    submit: function () {
      // if (this.model.get('isSubmitted')) {
        // return;
      // }
      this.clearGivenAnswers();
      $(".exercise").each(_.bind(function(index, exercise){
       var answer = $(exercise).find('.answer input:checked').data('index');
       this.givenanswers.push(answer + "");
      }, this));
      // console.log(this.model.get('invitation').get('invitation_id'));
      console.log(this.givenanswers);
      this.submitAnswers();
      // this.model.get('exercises').forEach(_.bind(function (exercise) {
        // console.log(exercise.get('selectedAnswers'));
      // }, this));
      // this.model.set("isSubmitted", true);
    },
    submitAnswers: function () {
      var invitation = this.getInvitation();
      invitation.set({
        givenanswers: this.givenanswers
      });
      invitation.save();
    },
    clearGivenAnswers: function () {
      this.givenanswers = [];
    },
    render: function () {
      var template = $.tmpl(this.template, this.model.toJSON());
      this.$el.empty();
      this.$el.html(template);
      return this;
    }
  });
});