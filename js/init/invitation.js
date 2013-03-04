define([
  'jquery',
  'widget/LatexEngine',
  'schema/Exercises',
  'init/stackmob'
], function ($, latexEngine, exercises) {
  return {
    run: function () {
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