define([
  'jquery',
  'widget/LatexEngine',
  'schema/Exercises',
  'schema/Exercise',
  'view/Exercise',
  'schema/Invitation',
  'init/stackmob'
], function (
  $, 
  latexEngine, 
  Exercises,
  Exercise,
  ExerciseView, 
  Invitation
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
      window.exercises = this.exercises;
      window.invitation = this.invitation;
      this.exercises.each(_.bind(function (exercise, i) {
        (new ExerciseView({
          model: exercise.set({ 
            isCorrect: this.isCorrect(exercise, i)
          }),
          el: $(".exerciseList"),
          template: this.template
        })).render();
      }, this));
      this.renderLatex();
      this.renderGivenAnswers();
    },

    isCorrect: function (exercise, i) {
      if (this.invitation.get('givenanswers')) {
        return exercise.get('correctanswers') + "" === this.invitation.get('givenanswers')[i];
      } else {
        return false;
      }
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
    }

  };
});