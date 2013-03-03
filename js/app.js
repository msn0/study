require.config({
  paths: {
    jquery: 'lib/jquery-1.9.1.min',
    underscore: 'lib/underscore-min',
    backbone: 'lib/backbone-min',
    stackmob: 'lib/stackmob-js-0.8.0-bundled-min',
    stackmobInit: 'init/stackmob'
  },
  shim: {
    'jquery': {
        exports: '$'
    },
    'backbone': {
        deps: ["underscore", "jquery"],
        exports: "backbone"
    },
    'underscore': {
        exports: '_'
    },
    'stackmob': {
        deps: ["underscore", "jquery", "backbone"],
        exports: "StackMob"
    }
  }
});

require([
  'underscore',
  'stackmobInit',
  'init/invitation'
], function (_, stackmob, invitation) {
  stackmob.run();
  invitation.run();
});