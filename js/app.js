require.config({
  baseUrl: './js/',
  paths: {
    'jquery': 'jquery',
    'backbone': 'backbone',
    'underscore': 'underscore',
    'stackmob': 'lib/stackmob-js-0.8.0-bundled-min'
  },
  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    stackmob: {
      deps: ["underscore", "jquery", "backbone"],
      exports: "StackMob"
    },
    'jquery.tmpl': ['jquery']
  }
});

require([
  'init/invitation',
  'init/stackmob',
  'jquery.tmpl'
], function (invitation) {
  invitation.run();
});