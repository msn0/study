define([
  'backbone',
  'init/invitation',
  'init/stackmob'
], function (Backbone, invitation) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "get/:id": "getInvitation",
      "admin": "runAdmin",
      "*actions": "defaultRoute" 
    }
  }); 
  var appRouter = new AppRouter();
  appRouter.on('route:getInvitation', function (id) {
    invitation.run(id);
  });
  appRouter.on('route:runAdmin', function () {
    console.log("admin routing");
  });
  appRouter.on('route:defaultRoute', function (actions) {
    console.log("default routing", actions);
  });
  Backbone.history.start();
});