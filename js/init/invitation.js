define([
  'jquery',
  'widget/LatexEngine',
  'schema/Exercises',
  'schema/Exercise',
  'view/Exercise',
  'schema/Invitation',
  'model/submit',
  'view/submit',
  'text!template/Submit.tmpl',
  'init/stackmob'
], function (
  $, 
  latexEngine, 
  Exercises,
  Exercise,
  ExerciseView, 
  Invitation,
  Submit,
  SubmitView,
  SubmitTemplate
) {
  return {
    
    run: function (options) {
      this.template = options.template;
      this.id = options.id;
      this.exercises = new Exercises();
      this.invitation = new Invitation({
        invitation_id: this.id
      });
      this.fetchInvitationDetails();
    },
    
    fetchInvitationDetails: function () {
      this.invitation.fetchExpanded(1, {
        success: _.bind(function () {
          this.feedExercises();
          this.renderViews();
        }, this)
      });
    },
    
    feedExercises: function () {
      this.invitation.get('exes').forEach(_.bind(function (exercise) {
        this.exercises.add(new Exercise(exercise));
      }, this));
    },

    renderViews: function () {
      this.exercises.each(_.bind(function (exercise) {
        (new ExerciseView({
          model: exercise,
          el: $(".exerciseList"),
          template: this.template
        })).render();
      }, this));
      this.renderLatex();
      this.renderGivenAnswers();
      this.renderSubmitView();
    },

    renderLatex: function () {
      latexEngine.getExpresions();
    },

    renderGivenAnswers: function () {
      if(this.invitation.get("givenanswers")) {
        this.invitation.get("givenanswers").forEach(_.bind(function (answerindex, index) {
          $('.exercise').eq(index).find('input[data-index=' + answerindex + ']').attr('checked', 'checked');
        }, this));
      }
    },

    renderSubmitView: function () {
      var submit = new Submit({
        exercises: this.exercises,
        invitation: this.invitation
      });
      var submitView = new SubmitView({
        model: submit,
        el: $('.submit'),
        template: SubmitTemplate
      });
      submitView.render();
    }

  };
});