define([
  'jquery',
  'widget/LatexEngine',
  'schema/Exercises',
  'schema/Exercise',
  'view/Exercise',
  'view/Invitation',
  'model/Invitation',
  'text!template/Invitation.tmpl',
  'widget/DataGateway',
  'init/stackmob'
], function (
  $, 
  latexEngine, 
  Exercises,
  Exercise,
  ExerciseView, 
  InvitationView,
  Invitation,
  InvitationTemplate,
  DataGateway
) {
  return {
    
    run: function (options) {
      this.dataGateway = new DataGateway().init({
        storage: sessionStorage
      });
      this.dataGateway.getInvitation(options.id, this.renderView);
    },

    renderView: function (model) {
      this.invitation = new Invitation(model);
      var view = new InvitationView({
        model: this.invitation,
        el: $(".content"),
        template: InvitationTemplate
      });
      view.render();
    }

  };
});