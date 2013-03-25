define([
  'widget/LatexEngine',
  'schema/Invitation',
  'widget/DataGateway',
  'init/stackmob'
], function (
  latexEngine,
  SchemaInvitation,
  DataGateway
) {
  return Backbone.View.extend({
    initialize: function (options) {
      this.template = options.template || '';
      this.dataGateway = new DataGateway().init({
        storage: sessionStorage
      });
    },
    events: {
      "click .submit": "submit",
      "change .answer input": "checkAnswer"
    },
    checkAnswer: function (e) {
      var exerciseNumber = $(e.target).closest('.exercise').index();
      var givenanswers = this.model.get('givenanswers');
      var givenanswer;
      if ($(e.target).hasClass('single')) {
        givenanswer = $(e.target).data('index');
      } 
      else if ($(e.target).hasClass('input')) {
        givenanswer = $(e.target).val();
      }
      givenanswers[exerciseNumber] = givenanswer + "";
      this.model.set('givenanswers', givenanswers);
      console.log(givenanswers);
      this.enableSubmitButton();
    },
    enableSubmitButton: function () {
      this.$el.find('.submitButton').removeClass('disabled');
    },
    disableSubmitButton: function () {
      this.$el.find('.submitButton').addClass('disabled');
    },
    submit: function () {
      var invitation = new SchemaInvitation({
        invitation_id: this.model.get('invitation_id')
      });
      invitation.set({
        givenanswers: this.model.get('givenanswers')
      });
      this.dataGateway.setInvitation(invitation, _.bind(this.disableSubmitButton, this));
    },
    render: function () {
      var template = $.tmpl(this.template, this.model.toJSON());
      this.$el.html(template);
      latexEngine.getExpresions();
      return this;
    }
  });
});