define([
  'backbone',
  'init/invitation',
  'init/admin',
  'init/stackmob'
], function (Backbone, invitation, admin) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "get/:id": "getInvitation",
      "admin/check/:id": "adminCheckInvitation",
      "*actions": "defaultRoute" 
    }
  }); 
  var appRouter = new AppRouter();
  appRouter.on('route:getInvitation', function (id) {
    require(['text!template/Exercise.tmpl'], function (ExerciseTemplate) {
      invitation.run({
        "id": id, 
        "template": ExerciseTemplate
      });
    });
  });
  appRouter.on('route:adminCheckInvitation', function (id) {
    require(['text!template/ExerciseAdmin.tmpl'], function (ExerciseAdminTemplate) {
      admin.run({
        "id": id, 
        "template": ExerciseAdminTemplate
      });
    });
  });
  appRouter.on('route:defaultRoute', function (actions) {
    console.log("default routing", actions);
  });
  Backbone.history.start();
});