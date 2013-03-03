define([
  'jquery',
  'underscore',
  'stackmob',
  'widget/LatexEngine',
  'schema/Exercises'
], function ($, _, StackMob, latexEngine, exercises) {
  return {
    run: function () {
      var Exercise = StackMob.Model.extend({
        schemaName: 'exercise'
      });
      var Exercises = StackMob.Collection.extend({
        model: Exercise
      });
      
      var exercises = new Exercises();
      exercises.fetch({
        success: function (exercises) {
          exercises.each(function (model) {
            console.log(model.get('answers'));
            $(".exerciseList").append("<p>" + model.get('question') + "</p>");
            model.get('answers').forEach(function (answer) {
              $(".exerciseList").append("<li>" + answer + "</li>");
            });
          });
          latexEngine.getExpresions();
        }
      });    
    }
  };
});