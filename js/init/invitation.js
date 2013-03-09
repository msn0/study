define([
  'jquery',
  'widget/LatexEngine',
  'schema/Exercises',
  'schema/Exercise',
  'view/Exercise',
  'text!template/Exercise.tmpl',
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
  ExerciseTemplate,
  Invitation,
  Submit,
  SubmitView,
  SubmitTemplate
) {
  return {
    
    run: function () {
      this.exercises = new Exercises();
      this.invitation = new Invitation({
        invitation_id: this.getInvitationId()
      });
      this.fetchInvitationDetails();
    },
    
    getInvitationId: function () {
      return location.hash.replace("#",'');
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
      this.exercises.each(function (exercise) {
        (new ExerciseView({
          model: exercise,
          el: $(".exerciseList"),
          template: ExerciseTemplate
        })).render();
      });
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