define([], function () {
  var LatexEngine = {
    url: "http://latex.codecogs.com/png.latex",
    getExpresions: function () {
      var that = this,
          expression;
      $(".tex").each(function () {
        expression = $(this).html();
        $(this).html("<img src='" + that.url + "?" + expression + "' />");
      });
    }
  };
  return Object.create(LatexEngine);
});